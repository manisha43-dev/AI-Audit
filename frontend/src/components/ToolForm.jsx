import { useState, useEffect } from "react";
import { TOOLS } from "../data/pricingData";

const USE_CASES = ["coding", "writing", "data", "research", "mixed"];

const emptyTool = () => ({
  id: Date.now(),
  toolId: "cursor",
  toolName: "Cursor",
  plan: "pro",
  spend: "",
  seats: 1,
  teamSize: 1,
  useCase: "coding",
});

export default function ToolForm({ onSubmit }) {
  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem("auditTools");
    return saved ? JSON.parse(saved) : [emptyTool()];
  });

  useEffect(() => {
    localStorage.setItem("auditTools", JSON.stringify(tools));
  }, [tools]);

  const addTool = () => setTools([...tools, emptyTool()]);

  const removeTool = (id) => setTools(tools.filter((t) => t.id !== id));

  const updateTool = (id, field, value) => {
    setTools(tools.map((t) => {
      if (t.id !== id) return t;
      const updated = { ...t, [field]: value };
      if (field === "toolId") {
        updated.toolName = TOOLS[value]?.name || value;
        updated.plan = Object.keys(TOOLS[value]?.plans || {})[0];
      }
      return updated;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tools);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {tools.map((tool, index) => (
        <div key={tool.id} className="bg-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Tool #{index + 1}</h3>
            {tools.length > 1 && (
              <button type="button" onClick={() => removeTool(tool.id)}
                className="text-red-400 hover:text-red-300 text-sm">
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tool Select */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">AI Tool</label>
              <select value={tool.toolId}
                onChange={(e) => updateTool(tool.id, "toolId", e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white">
                {Object.entries(TOOLS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            {/* Plan Select */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Plan</label>
              <select value={tool.plan}
                onChange={(e) => updateTool(tool.id, "plan", e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white">
                {Object.entries(TOOLS[tool.toolId]?.plans || {}).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            {/* Monthly Spend */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Monthly Spend ($)</label>
              <input type="number" value={tool.spend} min="0"
                onChange={(e) => updateTool(tool.id, "spend", Number(e.target.value))}
                placeholder="e.g. 40"
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white" />
            </div>

            {/* Seats */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Number of Seats</label>
              <input type="number" value={tool.seats} min="1"
                onChange={(e) => updateTool(tool.id, "seats", Number(e.target.value))}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white" />
            </div>

            {/* Team Size */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Team Size</label>
              <input type="number" value={tool.teamSize} min="1"
                onChange={(e) => updateTool(tool.id, "teamSize", Number(e.target.value))}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white" />
            </div>

            {/* Use Case */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Primary Use Case</label>
              <select value={tool.useCase}
                onChange={(e) => updateTool(tool.id, "useCase", e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white">
                {USE_CASES.map((u) => (
                  <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <button type="button" onClick={addTool}
        className="w-full border border-dashed border-gray-600 rounded-xl py-3 text-gray-400 hover:text-white hover:border-gray-400 transition">
        + Add Another Tool
      </button>

      <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition">
        Run Audit →
      </button>
    </form>
  );
}