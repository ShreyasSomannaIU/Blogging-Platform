import express from 'express'

const app = express()

app.get('/',()=>{
    res.send("SERVER RUNNING")
})

app.listen('8000', ()=>{
    console.log("SERVER RUNNING ON PORT 8000")
})