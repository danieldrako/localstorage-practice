//? Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//? Event Listeners
eventListener();

function eventListener(){
    //* Cuando el usuario agrea un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    //*Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
      tweets = JSON.parse(localStorage.getItem('tweets') ) || [];

      console.log(tweets);

      crearHTML();
    })
}



//? Funciones
function agregarTweet(e){
    e.preventDefault();

    //* Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value; 

    //*Validación
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacío')

        return; //* evita que se ejecuten más lineas de la función
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //* Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]

    //* Una vez agregado, se crea el HTML
    crearHTML();

    //* Reiniciar el formulario
    formulario.reset();
}


//? Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //* Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //*Elimina la alerta despues de  3 segundos  
    setTimeout(() => {
      mensajeError.remove();
    },3000)
}


//? Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach(tweet => {
          //*Crear el HTML

            const li = document.createElement('li')

            //* Añadimos el texto
            li.innerText = tweet.tweet;

            // insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//? Agrega los Tweets actuales al local storage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//? Limpiar el HTML

function limpiarHTML(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


