
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

function checkea(tabla){

  for(let i = 0; i <tabla.length; i++){
  
    if (document.getElementById(`${i}`).checked) {
      radio_value = document.getElementById(`${i}`).value;
      let data={radio_value}
      postJSONData('/borrar',data)
      
      }
    }
  alert('Datos eliminados correctamente, f5')
  }

var transacciones = [];

function trans(transacciones){

  
  let htmlContentToAppend = "";
  for(let i = 0; i < transacciones.length; i++){
      let transaccion = transacciones[i];

          htmlContentToAppend += `
          
          
          <table style="width:100%">
          <tr>
            <td><input class="form-check-input" type="checkbox" value=`+transaccion.Transaccion_Id+` id='${i}''></td>
            <td>`+transaccion.Transaccion_Producto+`</td>
            <td>`+transaccion.Transaccion_Tipo+`</td>
            <td>`+transaccion.Transaccion_Fecha+`</td>
            <td>`+transaccion.Transaccion_Cantidad+`</td>
            <td>$`+transaccion.Transaccion_Costo_Unitario+`</td>
            <td>$`+transaccion.Transaccion_Subtotal+`</td>
            <td>$`+transaccion.Transaccion_IVA+`</td>
            <td>$`+transaccion.Transaccion_Total+`</td>
          </tr>
        </table>`
      document.getElementById("transs").innerHTML = htmlContentToAppend;
      


  }
}

document.addEventListener("DOMContentLoaded", async function(e){

const transacciones = (await getJSONData('/getdata/transacciones')).data;

    trans(transacciones)    
    
    
    document.getElementById('borrar').addEventListener("click",  function(e){

      checkea(transacciones)

});


});


  