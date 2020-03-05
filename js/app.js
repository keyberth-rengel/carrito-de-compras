//variables
    
    //contenedor de los cursos para hacer delegation
    const listaCursos = document.getElementById('lista-cursos');
    //donde almacenaremos los datos en el carrito
    const datosCursos = document.getElementById('curso-al-carrito');
    //boton de vaciar el carrito
    const btnVaciarCarrito = document.getElementById('vaciar-carrito');
//contenedor que almacenara los cursos añadidos al carrito
    const carrito = document.getElementById('lista-carrito');
//Listeners
obtenerEventos();

function obtenerEventos() {
    //conocer donde el usuario dio click en el document
    listaCursos.addEventListener('click', añadirCurso);
    //borrar curso del DOM
    carrito.addEventListener('click', borrarCurso);
    //vaciar carrito
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
    //añadir de localStorage al DOM al cargar la pagina
    document.addEventListener('DOMContentLoaded', leerLocalStorage());
}
//funciones
    //conocer el estado del document
function añadirCurso(e){
    e.preventDefault();
 
    if (e.target.classList.contains('agregar-carrito')) {
        let contenedor = e.target.parentElement.parentElement;
       
        leerDatos(contenedor);
    }
}
    //leer datos y prepararlos
function leerDatos(contenedor){

    const datos = {
        imagen: contenedor.getElementsByTagName('IMG')[0].getAttribute('src'),
        titulo: contenedor.getElementsByTagName('H4')[0].textContent,
        precio: contenedor.querySelector('.precio span').textContent,
        id: contenedor.getElementsByTagName('A')[0].getAttribute('data-id')
    }
    insertarCarrito(datos);
}
//insertamos los datos al carrito de compras
function insertarCarrito(datos){
    let cursoListo = document.createElement('tr');
    cursoListo.innerHTML =
    `
        <tr> <img src="${datos.imagen}" width="80"></tr> 
        <tr> <p> ${datos.titulo} </p> </tr>
        <tr> <p> ${datos.precio} </p> </tr>
        <tr> <a href="#" class="borrar-curso" data-id="${datos.id}">X</a> </tr> 
    `;
    datosCursos.appendChild(cursoListo);
    console.log(cursoListo);
    //envair los datos que necesitamos a localStorage
    insertarCursoLocalStorage(datos);
}
//borrar carrito del DOM
function borrarCurso(e){
    e.preventDefault();
    let curso, cursoId;
    if (e.target.classList.contains('borrar-curso')) {
       e.target.parentElement.remove();
       curso = e.target.parentElement.parentElement;
       cursoId = curso.getElementsByTagName('a').getAttribute('data-id');
       eliminarCursoLocalStorage(cursoId);
    }
}
//vaciar todo el carrito
function vaciarCarrito(){
    //existen dos formas para vaciar el carrito la forma lenta
    //datosCursos.innerHTML = '';

    //forma recomendada
    while (datosCursos.firstChild) {
        datosCursos.removeChild(datosCursos.firstChild);
        return false;
    }
    vaciarCursosLocalStorage();
}
//comprobamos si hay algun contenido en localStorage
function obtenerLocalStorage(){
    let cursoLS;
    if ( localStorage.getItem('cursos') === null ) {
        cursoLS = [];
    }else{
        cursoLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursoLS;
}
//guardar cursos en localStorage
function insertarCursoLocalStorage(datos) {
    let cursos;
    cursos = obtenerLocalStorage();
    cursos.push(datos);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    
}
//leer cursos de localStorage y mostrarlos en el DOM
function leerLocalStorage(){
    let cursoLS;
    cursosLS = obtenerLocalStorage();
    console.log(cursosLS)
    cursoLS.forEach( datos => {
        let cursoListo = document.createElement('tr');
        cursoListo.innerHTML =
        `
            <tr> <img src="${datos.imagen}" width="80"> </tr> 
            <tr> <p> ${datos.titulo} </p> </tr>
            <tr> <p> ${datos.precio} </p> </tr>
            <tr> <a href="#" class="borrar-curso" data-id="${datos.id}">X</a> </tr> 
        `;
        datosCursos.appendChild(cursoListo);
    });
}
//elimianar de localStorage
function eliminarCursoLocalStorage(cursoId) {
    let cursoLS;
    cursosLS = obtenerLocalStorage();
    cursoLS.forEach( (curso, index) => {
        if (curso.id === cursoId) {
            cursoLS.splice(index, 1);
        }
        
    });
    localStorage.setItem('cursos', JSON.stringify(cursoLS));
} 
//vaciar los cursos de LocalStorage
function vaciarCursosLocalStorage() {
   
    localStorage.clear();
    
}