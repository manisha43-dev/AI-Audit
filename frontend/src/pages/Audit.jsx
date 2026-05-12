import { useState } from "react";
import ToolForm from "../components/ToolForm";
import AuditResult from "../components/AuditResult";
import { runAudit } from "../engine/auditEngine";

export default function Audit() {
  const [auditData, setAuditData] = useState(null);
  const [tools, setTools] = useState([]);

  const handleSubmit = (toolsData) => {
    setTools(toolsData);
    const result = runAudit(toolsData);
    setAuditData(result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Spend Auditor</h1>
        <p className="text-gray-400 mb-8">
          Fill in the tools your team pays for. We'll audit instantly.
        </p>
        {auditData ? (
          <AuditResult data={auditData} tools={tools} onReset={() => setAuditData(null)} />
        ) : (
          <ToolForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}