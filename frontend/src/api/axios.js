import axios from "axios"

const api=axios.create({
    baseURL:process.env.REACT_APP_API_URL || "https://ai-audit-1.onrender.com",
})

export default api;