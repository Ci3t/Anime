import express from 'express'
import './mongoose/mongoose.connect.js'
import { indexRoute } from './routes/index.route.js';
const app = express()


const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use('/',indexRoute)

app.get('/',(req,res)=>{
    res.send('HomePage')
})



app.listen(PORT,()=>{
    console.log(`Server Online at port ${PORT}`);
})