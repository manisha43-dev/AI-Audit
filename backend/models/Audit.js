const mongoose=require("mongoose")


const AuditSchema=new mongoose.Schema({
    shareId:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    company:{type:String,default:""},
    role:{type:String,default:""},
    teamSize:{type:String,default:""},
    tools:{type:Array,required:true},
    auditData:{type:Object,required:true},
    aiSummary:{type:String,default:""},
    createdAt:{type:Date,default:Date.now},
})


module.exports=mongoose.model("Audit",AuditSchema);