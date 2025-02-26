const btnCargar = document.getElementById('cargar');
const btnLimpiar = document.getElementById('limpiar');
const btnBuscar = document.getElementById('buscar');
const inputBusqueda = document.getElementById('inputBusqueda');
const mensaje = document.getElementById('Mensaje');
const tabla = document.getElementById('table');
const tbody = document.getElementById('tbody');

btnCargar.addEventListener('click', cargar);
btnLimpiar.addEventListener('click', limpiar);
btnBuscar.addEventListener('click', buscarPorId);

function buscarPorId() {
    const id = inputBusqueda.value;
    if (!id) {
        mensaje.innerHTML = "Por favor ingrese un ID";
        return;
    }

    const http = new XMLHttpRequest;
    const url = `https://jsonplaceholder.typicode.com/albums/${id}`;
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            limpiar();
            const user = JSON.parse(this.responseText);
            if (user) {
                const fila = document.createElement('tr');
                const col1 = document.createElement('td');
                col1.textContent = 1;
                fila.appendChild(col1);    

                const col2 = document.createElement('td');
                col2.textContent = user.id;
                fila.appendChild(col2);   
                
                const col3 = document.createElement('td');
                col3.textContent = user.name;
                fila.appendChild(col3);     

                const col4 = document.createElement('td');
                col4.textContent = user.title;
                fila.appendChild(col4);  
                tbody.appendChild(fila);
                
                mensaje.innerHTML = "Album encontrado";
            }
        } else if (this.status == 404) {
            limpiar();
            mensaje.innerHTML = "Album no encontrado";
        }
    }
}

function cargar() {
    var registros = 0;
    const http = new XMLHttpRequest;
    const url = "https://jsonplaceholder.typicode.com/albums";
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4) {
            const datos = JSON.parse(this.responseText);
            datos.forEach(user => {
                ++registros;
                const fila = document.createElement('tr');
                const col1 = document.createElement('td');
                col1.textContent = registros;
                fila.appendChild(col1);    

                const col2 = document.createElement('td');
                col2.textContent = user.id;
                fila.appendChild(col2);        

                const col3 = document.createElement('td');
                col3.textContent = user.id;
                fila.appendChild(col3);     

                const col4 = document.createElement('td');
                col4.textContent = user.title;
                fila.appendChild(col4);  
                tbody.appendChild(fila);
            });
            tabla.appendChild(tbody);
            mensaje.innerHTML = "Cantidad de Registros: " + registros;
        } else mensaje.innerHTML = "Surgio un error o aun no termina";
    }
}

function limpiar(){
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    inputBusqueda.innerHTML = "";

}
