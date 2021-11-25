

var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

const postJSONData = async (url, data)=> 
await(
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(data),
  })
).json();

var productos = [];
var transacciones = [];
var datarr = [];

function show(productos){

    console.log(productos)
    let htmlContentToAppend = "";
    for(let i = 0; i < productos.length; i++){
        let producto = productos[i];

            htmlContentToAppend += `
            <option id='selected'>`+producto.Prod_Descripcion+` </option>
            
            `
        document.getElementById("productos").innerHTML = htmlContentToAppend;

    }
}

function sendd(){

  document.getElementById("btn-guardar").addEventListener('click', async()=>{

    const id = -1*Math.floor(Math.random() * (1 - 10000))
    const producto = document.getElementById("productos").value
    const info = (await postJSONData('/info',{producto})) 
    const venta = document.getElementById("sale").value
    const fecha = document.getElementById("fecha").value
    const cantidad = document.getElementById("cantidad").value
    const precio = (info[0].Prod_Precio)
    const subtotal = precio*cantidad
    const IVA =Math.round((subtotal*22)/100)
    const total = (subtotal+IVA)
    let tipo = venta
    
    if (document.getElementById("purchase").checked){tipo='Compra'} 

    let dataq = {id,producto,tipo,fecha,cantidad,precio,IVA,total,subtotal}
    console.log(dataq)
      postJSONData('/save',dataq)
      getJSONData('/')
    
    const tr = document.getElementById("data");

    tr.innerHTML += `
    <td>${producto}</td>
    <td>${tipo}</td>
    <td>${cantidad}</td>
    <td>${fecha}</td>
    <td>${precio}</td>
    <td>${IVA}</td>
    <td>${total}</td>
    
`
    //  const fila = document.getElementById('trashbutton'+ id )
    
    //  fila.addEventListener('click', ()=>{

    //   borrar = {id}
    //   postJSONData('/borrar', borrar)
    //   tr.innerHTML = ''
    //   alert('Datos eliminados')
  // });

  });
}

function trans(transacciones){

  console.log(productos)
  let htmlContentToAppend = "";
  for(let i = 0; i < productos.length; i++){
      let transaccion = transacciones[i];

          htmlContentToAppend += `
          <option >`+transaccion.Transaccion_Producto+` </option>
          
          `
      document.getElementById("transs").innerHTML = htmlContentToAppend;

  }
}

document.addEventListener("DOMContentLoaded", async function(e){

    const productos = (await getJSONData('http://localhost:3000/getdata/productos')).data;
    
    show(productos)
    
    sendd();


});
