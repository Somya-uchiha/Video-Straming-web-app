const mongoose=require("mongoose");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://romeesh21:romeesh21@cluster0.7axh2ya.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
        }).then(()=> {
            console.log("DB Connection successful")
    })
    }catch(error)
    {
        console.log(error.message)
        process.exit()
    }
}

module.exports=connectDB;