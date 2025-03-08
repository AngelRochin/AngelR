const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('Mensaje');
const tbody = document.getElementById('tbody');
const inputPais = document.getElementById('txtPais');
const banderaImg = document.getElementById('banderaPais');

btnBuscar.addEventListener('click', buscarPais);
btnLimpiar.addEventListener('click', limpiar);

function buscarPais() {
    const pais = inputPais.value.trim().toLowerCase();
    mensaje.innerHTML = "Buscando país...";
    tbody.innerHTML = "";
    banderaImg.style.display = "none"; // Ocultar la bandera antes de mostrar el resultado

    if (!pais) {
        mensaje.innerHTML = "ingresa el nombre de un pais.";
        return;
    }

    fetch("https://restcountries.com/v3.1/all")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo conectar con el servicio.");
            }
            return response.json();
        })
        .then(data => {
            const paisEncontrado = data.find(country =>
                country.name.common.toLowerCase() === pais ||
                country.name.official.toLowerCase() === pais
            );

            if (!paisEncontrado) {
                mensaje.innerHTML = "No se encontró un país con ese nombre.";
                return;
            }
            mostrarPais(paisEncontrado);
        })
        .catch(error => {
            mensaje.innerHTML = "Error al conectar con el servidor: " + error.message;
        });
}

function mostrarPais(pais) {
    limpiar();

    const idiomas = pais.languages ? Object.values(pais.languages).join(", ") : "N/A";
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td style="font-size: 16px; font-weight: bold;">1</td>
        <td style="font-size: 14px;">${pais.name.common}</td>
        <td style="font-size: 14px;">${idiomas}</td>
        <td style="font-size: 14px;">${pais.population.toLocaleString()}</td>
        <td style="font-size: 14px;">${pais.capital ? pais.capital[0] : "N/A"}</td>
    `;
    tbody.appendChild(fila);

    /*
    banderaImg.src = pais.flags.png;
    banderaImg.style.display = "block"; */
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    banderaImg.style.display = "none";
}
