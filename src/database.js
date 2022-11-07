import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/cafecito-c8i'; //BD local
// const url = 'mongodb+srv://emi:emi2020@cluster0.xgqs3sk.mongodb.net/cafecito-c8i';
// const url = 'mongodb://127.0.0.1:27017/cafecito-c8i';

mongoose.connect(url);

const datosConexion = mongoose.connection;

datosConexion.once('open', ()=>{
    console.log('BD conectada');
})