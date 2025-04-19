const express=require("express");
const cron=require("node-cron");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const expenseEmail = require("./emailService/Expense");

dotenv.config();
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
  console.log("DB connection is successfull");
}).catch((err)=>{
  console.log(err);
});
app.listen(process.env.PORT,()=>{
  console.log(`Background services are running on port ${process.env.PORT}`)
})

const scheduleRun=()=>{
  cron.schedule('* * * * *',()=>{
    expenseEmail()
  });
};

scheduleRun();