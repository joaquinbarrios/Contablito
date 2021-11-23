
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

var transacciones = [];

function trans(transacciones){

  
  let htmlContentToAppend = "";
  for(let i = 0; i < transacciones.length; i++){
      let transaccion = transacciones[i];

          htmlContentToAppend += `
          
          
          <table style="width:100%">
          <tr>
            <td>`+transaccion.Transaccion_Producto+`</td>
            <td>`+transaccion.Transaccion_Tipo+`</td>
            <td>`+transaccion.Transaccion_Fecha+`</td>
            <td>`+transaccion.Transaccion_Cantidad+`</td>
            <td>`+transaccion.Transaccion_Costo_Unitario+`</td>
            <td>`+transaccion.Transaccion_Subtotal+`</td>
            <td>`+transaccion.Transaccion_IVA+`</td>
            <td>`+transaccion.Transaccion_Total+`</td>
          </tr>
        </table>`
      document.getElementById("transs").innerHTML = htmlContentToAppend;

  }
}

document.addEventListener("DOMContentLoaded", async function(e){

const transacciones = (await getJSONData('http://localhost:3000/getdata/transacciones')).data;

    trans(transacciones)

});
