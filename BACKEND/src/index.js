import app from './app.js'
import dotenv from 'dotenv'
import connectToDatabase from './Database/db.js'

dotenv.config({
    path: "./public/temp/.env"
}) 

connectToDatabase()
.then(() => {
    app.listen( process.env.PORT || 8000, ()=>{
    console.log(`SERVER RUNNING ON ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error("Failed to connect to database", err)
})
export default app