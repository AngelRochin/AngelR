const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('Mensaje');
const tbody = document.getElementById('tbody');
const poster = document.getElementById('Poster');

btnBuscar.addEventListener('click', buscarAleatorio);
btnLimpiar.addEventListener('click', limpiar);

async function buscarAleatorio() {
    limpiar();

    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    try {
        const response = await axios.get(url);

        if (!response.data.drinks) {
            mensaje.innerHTML = "No se pudo obtener una bebida aleatoria.";
            return;
        }

        mostrarBebidas(response.data.drinks);
    } catch (error) {
        mensaje.innerHTML = `Hubo un problema al obtener la bebida aleatoria.`;
        console.error("Error en la búsqueda aleatoria:", error);
    }
}

function mostrarBebidas(bebidas) {
    limpiar();

    bebidas.forEach((drink, index) => {
        const ingredientes = [];
        for (let i = 1; i <= 15; i++) {
            const ingrediente = drink[`strIngredient${i}`];
            const medida = drink[`strMeasure${i}`];

            if (ingrediente) {
                ingredientes.push(`${medida ? medida.trim() : ''} ${ingrediente.trim()}`.trim());
            }
        }

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${drink.idDrink}</td>
            <td>${drink.strDrink}</td>
            <td>${drink.strCategory || "N/A"}</td>
            <td>${drink.strGlass || "N/A"}</td>
            <td>${drink.strAlcoholic || "N/A"}</td>
            <td>${drink.strInstructions || "Sin instrucciones"}</td>
            <td>${ingredientes.length ? ingredientes.join(", ") : "No especificados"}</td>
        `;
        tbody.appendChild(fila);
    });

    poster.src = bebidas[0].strDrinkThumb || "/img/alcoholicas .jpg";
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    poster.src = "/img/alcoholicas .jpg";
}
