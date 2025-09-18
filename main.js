var enlace_api = 'http://3.84.16.208:8000'

var solicitar_lista=  (event) => {
        fetch(enlace_api + '/employees')
        .then(r => r.json())
        .then(json => {
            var employees = json.employees
            var table = document.getElementById("table_body");
            for (let index = 0; index < employees.length; index++) {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = employees[index][0];
                cell2.innerHTML = employees[index][1];
                cell3.innerHTML = employees[index][2];             
            }
        })
        .catch(err => {
            console.log(err);
        })  
};

if(document.forms[0]){
    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
    event.preventDefault();
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var data = {
            name : nombre,
            age : parseInt(edad)
        }
        fetch(enlace_api + '/employees' ,{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if(response.ok) {
                location.href ="index.html";              
            } else {
                throw "Error al grabar";
            }        
        })
        .catch(err => {
            console.log(err);
        })  
    });
}