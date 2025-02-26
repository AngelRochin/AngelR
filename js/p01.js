const btnCargar = document.getElementById('cargar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('Mensaje');
const tabla = document.getElementById('table');
const tbody = document.getElementById('tbody');

btnCargar.addEventListener('click',cargar);
btnLimpiar.addEventListener('click',limpiar);


function cargar(){ //Obtiene los datos mediante una url, usando HttpRequest
    var registros = 0;
    const http = new XMLHttpRequest;
    const url = "https://jsonplaceholder.typicode.com/albums";
    http.open('GET', url,true);
    http.send();

    http.onreadystatechange = function(){
        //Validar respuesta del servidor
        if(this.status == 200 && this.readyState == 4)//200 significa que todo estuvo bien y validamos que termino el proceso el 4 es el ultimo
        {
            const datos = JSON.parse(this.responseText);//Convertimos la respuesta de txt a json
            datos.forEach(item => {
                ++registros;
                const fila = document.createElement('tr');
                    const col1 = document.createElement('td');
                        col1.textContent = registros;
                        fila.appendChild(col1);    

                    const col2 = document.createElement('td');
                        col2.textContent = item.userId;
                        fila.appendChild(col2);        

                    const col3 = document.createElement('td');
                        col3.textContent = item.id;
                        fila.appendChild(col3);     

                    const col4 = document.createElement('td');
                        col4.textContent = item.title;
                        fila.appendChild(col4);  
                        tbody.appendChild(fila);
            });
            tabla.appendChild(tbody);//agregamos ala tabla
            mensaje.innerHTML = "Cantidad de Registros " + registros;
        }else mensaje.innerHTML = "Surgio un error o aun no termina";
    }
}

function limpiar(){
    tbody.innerHTML= "";
    mensaje.innerHTML = "";
}
