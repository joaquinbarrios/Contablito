

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


document.addEventListener("DOMContentLoaded", async () => {

document.getElementById('btng').addEventListener("click",  function(e){

 const id = document.getElementById('idd').value
 const nombre = document.getElementById('nombre').value
 const desc = document.getElementById('desc').value
 const stock = document.getElementById('stock').value
 const costo = document.getElementById('costo').value

 let datarr = ({id,nombre,desc,stock,costo})

  
  postJSONData('/saveprod' , datarr)
  
  const tr = document.getElementById("data");

  tr.innerHTML += `
  <td>${id}</td>
  <td>${nombre}</td>
  <td>${desc}</td>
  <td>${stock}</td>
  <td>${costo}</td>
  
`
});
});