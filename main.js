// URL base de la API (FastAPI)
var enlace_api = 'http://98.89.161.171:8000';

// ====================
// 📋 LISTAR EMPLEADOS
// ====================
var solicitar_lista = (event) => {
    fetch(enlace_api + '/employees')
        .then(r => r.json())
        .then(json => {
            // Si la API devuelve un objeto { "employees": [...] }
            // var employees = json.employees;

            // Si la API devuelve directamente un array de objetos
            var employees = json;

            var table = document.getElementById("table_body");
            table.innerHTML = ""; // limpiar tabla antes de renderizar

            for (let index = 0; index < employees.length; index++) {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                // Ajusta según el formato real de tu API
                cell1.innerHTML = employees[index].id;
                cell2.innerHTML = employees[index].name;
                cell3.innerHTML = employees[index].age;
            }
        })
        .catch(err => {
            console.log("Error al solicitar lista:", err);
        });
};

// ====================
// ➕ AGREGAR EMPLEADO
// ====================
if (document.forms[0]) {
    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
        event.preventDefault();

        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;

        var data = {
            name: nombre,
            age: parseInt(edad)
        };

        fetch(enlace_api + '/employees', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (response.ok) {
                    location.href = "index.html";
                } else {
                    throw "Error al grabar";
                }
            })
            .catch(err => {
                console.log("Error al grabar:", err);
            });
    });
}
