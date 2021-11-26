
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
      postJSONData('/borrar2',data)
      
      }
    }
  alert('Datos eliminados correctamente, F5')
  }

var productos = [];

function prods(productos){

  
  let htmlContentToAppend = "";
  for(let i = 0; i < productos.length; i++){
      let producto = productos[i];

          htmlContentToAppend += `
          
          
          <table style="width:100%">
          <tr>
            <td><input class="form-check-input" type="checkbox" value=`+producto.Prod_Id+` id='${i}''></td>
            <td>`+producto.Prod_Id+`</td>
            <td>`+producto.Prod_Nombre+`</td>
            <td>`+producto.Prod_Desc+`</td>
            <td>`+producto.Prod_Stock+`</td>
            <td>$`+producto.Prod_Precio+`</td>
          </tr>
        </table>`
      document.getElementById("prods").innerHTML = htmlContentToAppend;
      


  }
}

document.addEventListener("DOMContentLoaded", async function(e){

const productos = (await getJSONData('getdata/productos')).data;

    
    prods(productos)    
    
    
    document.getElementById('borrar').addEventListener("click",  function(e){

      checkea(productos)

});


});
