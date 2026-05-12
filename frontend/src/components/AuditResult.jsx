import { useState } from "react";
import LeadCapture from "./LeadCapture";

const actionColor = {
  downgrade: "text-yellow-400",
  switch: "text-blue-400",
  keep: "text-green-400",
};

const actionLabel = {
  downgrade: "⬇ Downgrade",
  switch: "🔄 Switch",
  keep: "✅ Keep",
};

export default function AuditResult({ data, tools, onReset }) {
  const { results, totalMonthlySavings, totalAnnualSavings } = data;
  const [showLead, setShowLead] = useState(false);
  const [shareId, setShareId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [aiSummary, setAiSummary] = useState("");



  const shareUrl = shareId
    ? `${window.location.origin}/result/${shareId}`
    : null;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Savings */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-center">
        <p className="text-gray-300 text-sm mb-2">Your Potential Savings</p>
        <p className="text-6xl font-bold text-white">
          ${totalMonthlySavings}/mo
        </p>
        <p className="text-2xl text-blue-300 mt-2">
          ${totalAnnualSavings}/year
        </p>
        {totalMonthlySavings === 0 && (
          <p className="text-green-400 mt-4 text-lg font-medium">
            🎉 You're spending well — no major optimizations found!
          </p>
        )}
        {totalMonthlySavings > 500 && (
          <div className="mt-4 bg-yellow-900 border border-yellow-600 rounded-xl p-4">
            <p className="text-yellow-300 font-semibold">
              💡 You're overspending significantly. Book a free Credex
              consultation to capture these savings.
            </p>
            <button className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold">
              Book Consultation →
            </button>
          </div>
        )}
      </div>

      {/* Per Tool Breakdown */}
      <div className="space-y-4">
        {results.map((r) => (
          <div key={r.toolId} className="bg-gray-800 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{r.toolName}</h3>
                <p className="text-gray-400 text-sm capitalize">
                  Plan: {r.plan} · {r.seats} seat(s) · ${r.currentSpend}/mo
                </p>
              </div>
              <span
                className={`font-semibold text-sm ${actionColor[r.action]}`}
              >
                {actionLabel[r.action]}
              </span>
            </div>
            <p>{aiSummary}</p>
            <p className="text-gray-300 mt-3 text-sm">{r.recommendation}</p>
            {r.savings > 0 && (
              <p className="text-green-400 font-semibold mt-2">
                Save ${r.savings}/mo · ${r.savings * 12}/year
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lead Capture or Share Link */}
      {!shareId ? (
        !showLead ? (
          <button
            onClick={() => setShowLead(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            📧 Get This Report via Email
          </button>
        ) : (
          <LeadCapture
            auditData={data}
            tools={tools}
            onDone={({id,summary}) =>{ setShareId(id); setAiSummary(summary)}}
          />
        )
      ) : (
        <div className="bg-gray-800 rounded-xl p-5 space-y-3">
          <p className="text-green-400 font-semibold">
            ✅ Report saved! Share your results:
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300"
            />
            <button
              onClick={copyLink}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full border border-gray-600 text-gray-400 hover:text-white py-3 rounded-xl transition"
      >
        ← Start Over
      </button>
    </div>
  );
}