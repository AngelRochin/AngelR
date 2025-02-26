const btnCargar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('Mensaje');
const tabla = document.getElementById('table');
const tbody = document.getElementById('tbody');
const poster = document.getElementById('Poster');

btnCargar.addEventListener('click', buscarBebida);
btnLimpiar.addEventListener('click', limpiar);

function buscarBebida() {
    const bebida = document.getElementById('txtPelicula').value.trim();
    if (!bebida) {
        mensaje.innerHTML = "Por favor, ingrese un nombre de bebida.";
        return;
    }

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(bebida)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo conectar con el servicio.");
            }
            return response.json();
        })
        .then(data => {
            if (!data.drinks) {
                mensaje.innerHTML = "No se encontró ninguna bebida con ese nombre exacto.";
            } else {
                const bebidaExacta = data.drinks.find(drink => 
                    drink.strDrink.toLowerCase() === bebida.toLowerCase()
                );

                if (bebidaExacta) {
                    mostrarBebida(bebidaExacta);
                } else {
                    mensaje.innerHTML = "No se encontró una bebida con ese nombre exacto.";
                }
            }
        })
        .catch(error => {
            mensaje.innerHTML = "Ocurrió un error al conectar con el servidor: " + error.message;
        });
}

function mostrarBebida(drink) {
    limpiar();

    let ingredientes = [];
    for (let i = 1; i <= 15; i++) {
        let ingrediente = drink[`strIngredient${i}`];
        let medida = drink[`strMeasure${i}`];

        if (ingrediente) {
            ingredientes.push(`${medida ? medida : ''} ${ingrediente}`.trim());
        }
    }

    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>1</td>
        <td>${drink.idDrink}</td>
        <td>${drink.strDrink}</td>
        <td>${drink.strCategory || "N/A"}</td>
        <td>${drink.strGlass || "N/A"}</td>
        <td>${drink.strAlcoholic || "N/A"}</td>
        <td>${drink.strInstructions || "Sin instrucciones"}</td>
        <td>${ingredientes.join(", ") || "No especificados"}</td>
    `;
    tbody.appendChild(fila);


    poster.src = drink.strDrinkThumb || "/img/alcoholicas .jpg";
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    poster.src = "/img/alcoholicas .jpg";
}
