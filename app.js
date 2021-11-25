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


app.use(express.static('frontend'));
app.use(express.json({limit:'1mb'}));
app.listen(PORT, () => {
    console.log('server started on port 3000')
});

//Select posts 
app.get('/getdata/:tabla', (req,res)=>{
    
    let sql=`select * FROM  ${req.params.tabla}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        
        res.send(result);
    });
});

//Select single post

app.get('/getpost/:id', (req,res)=>{
    
    let sql=`select* FROM productos WHERE Prod_Nombre = '${req.params.id}'`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
        
    });
});

app.post('/info', (req,res)=>{
    
    let sql=`select * FROM productos WHERE Prod_Nombre = '${req.body.producto}'`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});


//Insert post
app.post('/save', (req,res)=>{
    let post = {
         Transaccion_Id:req.body.id,
         Transaccion_Producto:req.body.producto,
         Transaccion_Cantidad:req.body.cantidad,
         Transaccion_Tipo:req.body.tipo,
         Transaccion_IVA:req.body.IVA,
         Transaccion_Total:req.body.total,
         Transaccion_Costo_Unitario:req.body.precio,
         Transaccion_Subtotal:req.body.subtotal,
         Transaccion_Fecha:req.body.fecha};
    let sql='INSERT INTO transacciones SET ?';
    let query = db.query(sql, post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.end
        
     });
});

app.post('/saveprod', (req,res)=>{
    let post = {
         Prod_Id:req.body.id,
         Prod_Nombre:req.body.nombre,
         Prod_Desc:req.body.desc,
         Prod_Stock:req.body.stock,
         Prod_Precio:req.body.costo
         };
    let sql='INSERT INTO productos SET ?';
    let query = db.query(sql, post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.end
        
     });
});



//Delete post

app.post('/borrar', (req,res)=>{
    
    let sql=`DELETE FROM transacciones WHERE Transaccion_Id=${req.body.radio_value}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        
    });
});

//Delete post

app.post('/borrar2', (req,res)=>{
    
    let sql=`DELETE FROM productos WHERE Prod_Id=${req.body.radio_value}`;
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        
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
