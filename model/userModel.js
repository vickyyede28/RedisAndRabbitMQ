const mongoose =require ("mongoose");

const userSchema = new mongoose.Schema({
    schoolname: {type:String, require:true},
    studentname: {type:String, require:true},
    stream: {type:String, require:true},
    teacher: {type:String, require:true}
})

module.exports = mongoose.model("user",userSchema);