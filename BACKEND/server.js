import express from 'express'
const app = express()

app.get('/',(req, res)=>{
    res.end("SERVER RUNNING")
})

app.listen('8000', ()=>{
    console.log("SERVER RUNNING ON PORT 8000")
})