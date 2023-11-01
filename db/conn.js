const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
      
}).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err);
})


module.exports=mongoose;