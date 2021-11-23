const express = require('express');
const { is } = require('express/lib/request');
const mysql = require('mysql')



//Create connection 
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'curso'
});

//Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...')
})

const app = express();
const PORT = process.env.PORT || 3000;

//Cors

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Acess-Control-Allow-Headers','Origin, x-Requested-With,Content-Type, Accept');
    next();
});

//Create DB 

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql,(err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database Created...')
    });
});

// Create table

app.get('/createpotstable', (req, res) => {
    let sql = 'CREATE TABLE postss(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql,(err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Postss table created...')
    });
});

//Select posts 
app.get('/getdata/:tabla', (req,res)=>{
    
    let sql=`select * FROM ${req.params.tabla}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Select single post

app.get('/getpost/:id', (req,res)=>{
    
    let sql=`select* FROM productos WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
        
    });
});

//Insert post
app.get('/ipost/:id/:info', (req,res)=>{
    let post = {Transaccion_Id:req.params.id, Transaccion_Producto:req.params.info};
    let sql='INSERT INTO transacciones SET ?';
    let query = db.query(sql, post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post Inserted...');
    });
});

//Update post
app.get('/updatepost/:id', (req,res)=>{
    let newtitle = 'Arroz';
    let sql=`UPDATE transacciones SET Transaccion_Producto = '${newtitle}' WHERE Transaccion_id=${req.params.id}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//Delete post

app.get('/deletepost/:id', (req,res)=>{
    let newtitle = 'Update Title';
    let sql=`DELETE FROM postss WHERE id=${req.params.id}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.use(express.static('fronted'));
app.listen(PORT, () => {
    console.log('server started on port 3000')
});

