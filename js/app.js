//VARIABLES
const formulario = document.getElementById('buscador');
const marca = document.getElementById('marca');
const year = document.getElementById('año');
const minimo = document.getElementById('minimo');
const maximo = document.getElementById('maximo');
const puertas = document.getElementById('puertas');
const transmision = document.getElementById('transmision');
const color = document.getElementById('color');
const botonReset = document.querySelector('.reset')

//Resultado final de la busqueda
const resultado = document.getElementById('resultado');


const max = new Date().getFullYear();
const min = max - 10;

//Objeto que se completa con la busqueda del usuario

const datosBusqueda = {
    marca: '',
    year: '',
    minimo:'',
    maximo:'',
    puertas: '',
    color: '',
    transmision: '',
}


//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    //Select de años

    elegirAño();
});

//EventListener para el formulario

marca.addEventListener('change' ,(e) =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change' ,(e) =>{
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change' ,(e) =>{
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change' ,(e) =>{
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change' ,(e) =>{
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
});

color.addEventListener('change' ,(e) =>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

transmision.addEventListener('change' ,(e) =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});




//FUNCIONES

function mostrarAutos(autos) {

    limpiarHTML(); // emlimina html previo

    autos.forEach(auto => {
        const autoHtml = document.createElement('P');

        const {marca,modelo,year,precio,puertas,color,transmision} = auto;
        autoHtml.textContent = `
        ${auto.marca} ${auto.modelo} - ${auto.year} - $ ${auto.precio} - ${auto.puertas} Puertas - color ${auto.color} - ${auto.transmision} `;

        resultado.appendChild(autoHtml)
    });
};
//Limpiar HTML

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
};

//genera los años para seleccionar
function elegirAño(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
};


//Filtro

function filtrarAuto(){
    const resultado =autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    mostrarAutos(resultado);

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noHayResultados();
    }
};

function noHayResultados(){
    const noResultados = document.createElement('DIV');
    noResultados.classList.add('alerta', 'error');
    noResultados.textContent = 'No se encontraron resultados';
    resultado.appendChild(noResultados);
};

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
};

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
};

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= parseInt(datosBusqueda.minimo);
    }
    return auto;
};

function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= parseInt(datosBusqueda.maximo);
    }
    return auto;
};

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
};

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === (datosBusqueda.transmision);
    }
    return auto;
};

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === (datosBusqueda.color);
    }
    return auto;
};


botonReset.addEventListener('click' , resetForm);



function resetForm(){
    formulario.reset();
}
