const express = require('express');
const { is } = require('express/lib/request');
const mysql = require('mysql')

//Create connection 
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

//Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...')
})

const app = express();

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
app.get('/getposts', (req,res)=>{
    
    let sql='select* FROM postss';
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Posts fetched...');
    });
});

//Select single post

app.get('/getpost/:id', (req,res)=>{
    
    let sql=`select* FROM postss WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
        
    });
});

//Update post
app.get('/updatepost/:id', (req,res)=>{
    let newtitle = 'mongo';
    let sql=`UPDATE postss SET title = '${newtitle}' WHERE id=${req.params.id}`;
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

app.listen('3000', () => {
    console.log('server started on port 3000')
});