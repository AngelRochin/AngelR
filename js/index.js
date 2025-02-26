function enlargeImage(image) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";
  
    const img = document.createElement("img");
    img.src = image.src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "10px";
  
    modal.appendChild(img);
    modal.onclick = () => document.body.removeChild(modal);
  
    document.body.appendChild(modal);
  }
  

  // Array con las rutas de las imágenes
const imagenes = [
  "/img/indeximg.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg"
];

let indiceActual = 0;

// Obtener el elemento de la imagen
const imagen = document.getElementById("imagen");

// Función para cambiar la imagen
function cambiarImagen() {
  indiceActual = (indiceActual + 1) % imagenes.length;
  imagen.src = imagenes[indiceActual];
}

// Asignar el evento de clic a la imagen
imagen.addEventListener("click", cambiarImagen);