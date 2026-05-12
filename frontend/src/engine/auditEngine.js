export function runAudit(tools) {
    const results = [];

    tools.forEach((tool) => {
    const { toolId, plan, spend, seats, teamSize, useCase } = tool;
    let recommendation = "";
    let savings = 0;
    let action = "keep";

    // --- Cursor ---
    if (toolId === "cursor") {
      if (plan === "business" && teamSize <= 2) {
        recommendation = "Downgrade to Pro — Business plan is overkill for teams under 3.";
        savings = (40 - 20) * seats;
        action = "downgrade";
      } else if (plan === "enterprise" && teamSize <= 10) {
        recommendation = "Switch to Business plan — Enterprise is for large orgs only.";
        savings = (100 - 40) * seats;
        action = "downgrade";
      } else {
        recommendation = "You're on the right plan for your team size.";
      }
    }

    // --- GitHub Copilot ---
    if (toolId === "github_copilot") {
      if (plan === "enterprise" && teamSize <= 20) {
        recommendation = "Downgrade to Business — Enterprise features aren't needed under 20 seats.";
        savings = (39 - 19) * seats;
        action = "downgrade";
      } else if (plan === "business" && seats === 1) {
        recommendation = "Switch to Individual plan — Business plan is for teams.";
        savings = (19 - 10) * seats;
        action = "downgrade";
      } else {
        recommendation = "Good fit for your usage.";
      }
    }

    // --- Claude ---
    if (toolId === "claude") {
      if (plan === "max" && useCase === "writing") {
        recommendation = "Downgrade to Pro — Max plan is for heavy API/coding use, not writing.";
        savings = (100 - 20) * seats;
        action = "downgrade";
      } else if (plan === "team" && seats === 1) {
        recommendation = "Switch to Pro — Team plan is for multiple users.";
        savings = (30 - 20) * seats;
        action = "downgrade";
      } else {
        recommendation = "Plan matches your use case well.";
      }
    }

    // --- ChatGPT ---
    if (toolId === "chatgpt") {
      if (plan === "enterprise" && teamSize <= 5) {
        recommendation = "Switch to Team plan — Enterprise is for large orgs.";
        savings = (60 - 30) * seats;
        action = "downgrade";
      } else if (plan === "plus" && useCase === "coding") {
        recommendation = "Consider switching to Cursor or GitHub Copilot for coding — better ROI.";
        savings = spend * 0.3;
        action = "switch";
      } else {
        recommendation = "Reasonable choice for your use case.";
      }
    }

    // --- Gemini ---
    if (toolId === "gemini") {
      if (plan === "ultra" && useCase === "research") {
        recommendation = "Consider Claude Pro instead — better for research at lower cost.";
        savings = (30 - 20) * seats;
        action = "switch";
      } else {
        recommendation = "Plan looks appropriate.";
      }
    }

    // --- Windsurf ---
    if (toolId === "windsurf") {
      if (plan === "teams" && teamSize <= 2) {
        recommendation = "Downgrade to Pro — Teams plan is overkill for 2 or fewer users.";
        savings = (35 - 15) * seats;
        action = "downgrade";
      } else {
        recommendation = "Good value for your team.";
      }
    }

    results.push({
      toolId,
      toolName: tool.toolName,
      plan,
      currentSpend: spend,
      seats,
      recommendation,
      savings: Math.round(savings),
      action,
    });
  });
    const totalMonthlySavings = results.reduce((sum, r) => sum + r.savings, 0);
    const totalAnnualSavings = totalMonthlySavings * 12;

    return { results, totalMonthlySavings, totalAnnualSavings };
}