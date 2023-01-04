import express from 'express'
import './mongoose/mongoose.connect.js'
import * as expressAsync from "express-async-errors"
import { indexRoute } from './routes/index.route.js';
import path from 'path';
import cors from 'cors'
import * as url from 'url';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
//  require("express-async-errors");

import dotenv from 'dotenv'
import { errorHandler } from './middlewares/error.js';
import { handleNotFound } from './utils/helper.js';


dotenv.config()

const __dirname = url.fileURLToPath(new URL('./', import.meta.url));

const app = express()
const PORT = process.env.PORT || 5000;



app.use(cors())
app.use(express.json())
app.use('/',indexRoute)


const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));

app.use('/api', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.get('/',(req,res)=>{
    res.send('HomePage')
})

app.use('/*',handleNotFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Online at port ${PORT}`);
})