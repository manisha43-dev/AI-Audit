const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Audit = require("../models/Audit");
const { Resend } = require("resend");
const Anthropic = require("@anthropic-ai/sdk");
const rateLimit = require("express-rate-limit");
const { model } = require("mongoose");


const resend = new Resend(process.env.RESEND_API_KEY)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });


//Rate limiter

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Too many request, please try again later" },
})

//Generate AI Summary

async function generateSummary(auditData, tools) {
    try {
        const toolNames = tools.map((t) => t.toolName).join(",");
        const savings = auditData.totalMonthlySavings;

        const message = await anthropic.messages.create({
            model: "claude-opus-4-6",
            max_tokens: 200,
            messages: [
                {
                    role: "user",
                    content: `You are an AI spend analyst. Write a concise 80-100 word personalized summary for a team using: ${toolNames}. 
          Their potential monthly savings is $${savings}. 
          Key recommendations: ${auditData.results
                            .filter((r) => r.action !== "keep")
                            .map((r) => r.recommendation)
                            .join(". ")}.
          Be specific, professional, and actionable. No fluff.`,
                },
            ],
        })
        return message.content[0].text;
    }
    catch(err){
         // Fallback template
    return `Based on your current AI tool stack, we identified $${auditData.totalMonthlySavings}/month in potential savings ($${auditData.totalAnnualSavings}/year). Key optimizations include plan downgrades and switching to better-fit tools for your use cases. Implementing these changes could significantly reduce your AI spend without impacting productivity.`;
  
    }
}

// POST /api/audit/save
router.post("/save", limiter, async (req, res) => {
  try {
    const { email, company, role, teamSize, tools, auditData } = req.body;

    if (!email || !tools || !auditData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const shareId = uuidv4().split("-")[0]; // short ID

    // Generate AI summary
    const aiSummary = await generateSummary(auditData, tools);

    // Save to MongoDB
    const audit = new Audit({
      shareId,
      email,
      company,
      role,
      teamSize,
      tools,
      auditData,
      aiSummary,
    });
    await audit.save();

    // Send confirmation email
    const shareUrl = `${process.env.CLIENT_URL}/result/${shareId}`;
    await resend.emails.send({
      from: "audit@yourdomain.com",
      to: email,
      subject: "Your AI Spend Audit Report",
      html: `
        <h2>Your AI Spend Audit Results</h2>
        <p>You could save <strong>$${auditData.totalMonthlySavings}/month</strong> 
        ($${auditData.totalAnnualSavings}/year) on AI tools.</p>
        <h3>AI Analysis</h3>
        <p>${aiSummary}</p>
        <h3>Recommendations</h3>
        <ul>
          ${auditData.results
            .map(
              (r) =>
                `<li><strong>${r.toolName}</strong>: ${r.recommendation}
                ${r.savings > 0 ? `(Save $${r.savings}/mo)` : ""}</li>`
            )
            .join("")}
        </ul>
        <p><a href="${shareUrl}">View & Share Your Report →</a></p>
      `,
    });

    res.json({ shareId, aiSummary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/audit/result/:shareId
router.get("/result/:shareId", async (req, res) => {
  try {
    const audit = await Audit.findOne({ shareId: req.params.shareId });
    if (!audit) return res.status(404).json({ error: "Not found" });

    // Return without personal info
    res.json({
      shareId: audit.shareId,
      auditData: audit.auditData,
      aiSummary: audit.aiSummary,
      createdAt: audit.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
