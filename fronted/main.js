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

function sendd(productos){

  document.getElementById("btn-guardar").addEventListener('click',()=>{

       const producto = document.getElementById("productos").value
      if (producto==productos.Producto_Nombre){

        producto = productos.Producto_Id

      }
       datarr.push(producto)
       console.log(datarr[1])
       let htmlContentToAppend = "";
    

            htmlContentToAppend += `
            <div >`+datarr[1]+` </div>
            
            `
        document.getElementById("div-movimientos").innerHTML = htmlContentToAppend;

        //document.getJSONData(`http://localhost:3000/updatepost/:4/${producto}`)

    
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
    
    sendd(productos);



});

const guarda = ()=>{

  console.log(document.getElementById('selected'))
  

}
document.getElementById('compra').checked = true
console.log(document.getElementById('compra').checked)

document.getElementById('compra').addEventListener('change',function (e){


if (document.getElementById('compra').checked) {
  radio_value = document.getElementById('compra').value;
  
  console.log
}

})

