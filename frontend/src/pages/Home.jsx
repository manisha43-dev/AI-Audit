import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold text-center mb-4">
        Are You Overpaying for AI Tools?
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-xl mb-8">
        Enter your AI subscriptions and get an instant audit — see exactly
        where you're overspending and how much you can save.
      </p>
      <button
        onClick={() => navigate("/audit")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
      >
        Audit My AI Spend →
      </button>
      <p className="text-gray-500 mt-4 text-sm">Free. No login required.</p>
    </div>
  );
}