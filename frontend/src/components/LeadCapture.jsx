import { useState } from "react"
import api from "../api/axios"

const LeadCapture = ({auditData,tools,onDone}) => {

    const[form,setForm]=useState({
        email:"",
        company:"",
        role:"",
        teamSize:"",
        })

        const [loading,setLoading]=useState(false)
        const[error,setError]=useState("");

        const handleChange=(e)=>{
            setForm({...form,[e.target.name]:e.target.value})
        }

        const handleSubmit=async(e)=>{
            e.preventDefault();
            setLoading(true);
            setError("");

            try{
                const res=await api.post("/audit/save",{
                    ...form,
                    auditData,tools,
                })
                const {shareId}=res.data;
                onDone({id:shareId})
            }catch(err){
                console.log("Full error:", err);
  console.log("Response error:", err.response?.data);
  console.log("Message:", err.message);
                setError("Somethiing went wrong. Please try again");
            }finally{
                setLoading(false)
            }
        }

  return (
    <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold">Get Your Full Report</h2>
      <p className="text-gray-400 text-sm">
                We'll email you the full audit + a shareable link.

      </p>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Email- Required */}

        <div>
            <label className="text-sm text-gray-400 mb-1 block">
                Email <span className="text-red-400">*</span>
            </label>
            <input type="email" name="email" required  value={form.email} onChange={handleChange} placeholder="your@gmail.com"
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white"/>
        </div>

        {/* Optional Fields */}

<div className="grid grid-cols-2 gap-3">
    <div>
        <label className="text-sm text-gray-400 mb-1 block">
            Company <span className="text-gray-500">(optional)</span>
        </label>
        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="TCS" className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white"/>
    </div>
    <div>
        <label className="text-sm text-gray-400 mb-1 block">
            Role <span className="text-gray-500">(optional)</span>
        </label>
        <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Dev" className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white"/>
    </div>
</div>

<div>
    <label className="text-sm text-gray-400 mb-1 block">
        Team Size <span className="text-gray-500">(optional)</span>
    </label>
    <select name="teamSize" value={form.teamSize} onChange={handleChange} className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white">
        <option value="">Select...</option>
        <option value="1">Just me</option>
        <option value="2-5">2-5</option>
        <option value="6-20">6-20</option>
        <option value="21-50">21-50</option>
        <option value="50+">50+</option>
    </select>
</div>

{error && <p className="text-red-400 text-sm">{error}</p> }

<button type="submit" disabled={loading} className="w-full bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition">
    {loading?"Saving...":"Send My Report"}
</button>

      </form>
    </div>
  )
}

export default LeadCapture
