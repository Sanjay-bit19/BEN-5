require('dotenv').config({quiet:true});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health',(req,res)=>{
    res.json({status:'ok',time:new Date().toISOString()});

});


const PORT = process.env.PORT || 5000;

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[db] connected ->',mongoose.connection.host);
}

connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`[server] Ben 5 API listening on http://localhost:${PORT}`);
        });
    })
    .catch((err)=>{
        console.error('[db] connection failed:', err.message);
        process.exit(1);
    });
