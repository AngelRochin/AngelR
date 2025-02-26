document.addEventListener("DOMContentLoaded", () => {
    const btnCargar = document.getElementById("btnCargar");
    const btnLimpiar = document.getElementById("limpiar");
    const lista = document.getElementById("Lista");
    const mensaje = document.getElementById("mensaje");
    const poster = document.getElementById("poster");
    const h2Raza = document.getElementById("h2Raza");

    // Cargar razas automáticamente al iniciar
    cargarRazas();

    btnCargar.addEventListener("click", cargarImagen);
    btnLimpiar.addEventListener("click", limpiar);

    function cargarRazas() {
        const url = "https://dog.ceo/api/breeds/list/all";

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                return response.json();
            })
            .then(datos => {
                if (datos.status === "success") {
                    mostrarRazas(datos.message);
                } else {
                    mensaje.innerHTML = "Error al cargar las razas";
                }
            })
            .catch(error => {
                mensaje.innerHTML = "Surgió un error: " + error;
            });
    }

    function mostrarRazas(razas) {
        lista.innerHTML = `<option selected>Seleccionar una Raza</option>`; // Limpia el select

        for (let raza in razas) {
            if (razas[raza].length > 0) {
                // Si tiene subrazas, agregar cada una como opción
                razas[raza].forEach(subraza => {
                    const opcion = document.createElement("option");
                    opcion.value = `${raza}/${subraza}`; // Formato para la API
                    opcion.textContent = `${capitalizar(raza)} - ${capitalizar(subraza)}`;
                    lista.appendChild(opcion);
                });
            } else {
                // Si no tiene subrazas, agregar solo la raza principal
                const opcion = document.createElement("option");
                opcion.value = raza;
                opcion.textContent = capitalizar(raza);
                lista.appendChild(opcion);
            }
        }
    }

    function cargarImagen() {
        const seleccion = lista.value;
        if (seleccion === "Seleccionar una Raza") {
            mensaje.innerHTML = "Por favor selecciona una raza válida.";
            return;
        }

        const url = `https://dog.ceo/api/breed/${seleccion}/images/random`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                return response.json();
            })
            .then(datos => {
                if (datos.status === "success") {
                    limpiarMensaje();
                    h2Raza.innerHTML = capitalizarTexto(seleccion);
                    mostrarImagen(datos);
                } else {
                    mensaje.innerHTML = "No se encontró la raza";
                }
            })
            .catch(error => {
                mensaje.innerHTML = "Surgió un error: " + error;
            });
    }

    function mostrarImagen(datos) {
        poster.src = datos.message;
    }

    function limpiar() {
        poster.src = "/img/dog.jpg";
        mensaje.innerHTML = "";
        lista.selectedIndex = 0;
        h2Raza.innerHTML = "Razas Caninas";
    }

    function limpiarMensaje() {
        mensaje.innerHTML = "";
    }

    // Función para capitalizar la primera letra de un texto
    function capitalizar(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    // Función para formatear correctamente el nombre de raza/subraza
    function capitalizarTexto(texto) {
        return texto
            .split("/")
            .map(capitalizar)
            .join(" - ");
    }
});
