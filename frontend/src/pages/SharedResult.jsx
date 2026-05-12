import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api from "../api/axios"


const actionColor={
    downgrade:"text-yellow-400",
    switch:"text-blue-400",
    keep:"text-green-400",
}

const actionLabel={
    downgrade:"Downgrade",
    switch:"Switch",
    keep:"Keep",
}

const SharedResult = () => {
    const {id}=useParams();
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState("");
     const { auditData } = data;
  const { results, totalMonthlySavings, totalAnnualSavings } = auditData;


    useEffect(()=>{
        api.get(`/audit/result/${id}`)
        .then((res)=>setData(res.data))
        .catch(()=>setError("Result not found or expired."))
        .finally(()=>setLoading(false))
    },[id])

    if(loading){
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      Loading...
    </div>
  )}
  if(error){
    return(
<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">{error}</div>
)}

return(
       <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
       <div className="max-w-3xl mx-auto space-y-6">
   <h1 className="text-3xl font-bold">Shared Audit Result</h1>
        <p className="text-gray-400">
          This is a public audit result. Personal details are hidden.
        </p>


          {/* Hero */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-center">
          <p className="text-gray-300 text-sm mb-2">Potential Savings Found</p>
          <p className="text-6xl font-bold">${totalMonthlySavings}/mo</p>
          <p className="text-2xl text-blue-300 mt-2">
            ${totalAnnualSavings}/year
          </p>
        </div>


   {/* Per Tool */}
        <div className="space-y-4">
          {results.map((r) => (
            <div key={r.toolId} className="bg-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{r.toolName}</h3>
                  <p className="text-gray-400 text-sm capitalize">
                    Plan: {r.plan} · {r.seats} seat(s)
                  </p>
                </div>
                <span
                  className={`font-semibold text-sm ${actionColor[r.action]}`}
                >
                  {actionLabel[r.action]}
                </span>
              </div>
              <p className="text-gray-300 mt-3 text-sm">{r.recommendation}</p>
              {r.savings > 0 && (
                <p className="text-green-400 font-semibold mt-2">
                  Save ${r.savings}/mo
                </p>
              )}
            </div>
          ))}
        </div>


        {/* CTA */}
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-300 mb-3">Want to audit your own AI spend?</p>
         < a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold inline-block">
            Audit My Stack →
          </a>
        </div>
      </div>
    </div>
)



}

export default SharedResult
