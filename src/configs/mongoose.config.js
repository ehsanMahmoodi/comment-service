const mongoose = require('mongoose')
mongoose.set('strictQuery',true)
mongoose.connect(process.env.DB_URI).then(()=>console.log('mongoose connected successfully')).catch((err)=>console.log(err?.message))