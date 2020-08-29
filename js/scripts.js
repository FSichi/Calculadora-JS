
//VARIABLES

var operacion = document.getElementById('operacion');
var resultado = document.getElementById('resultado');
var botones = document.getElementById('botones');
var operacionCompletada = false;

// FUNCIONES


/* Retorna el Ultimo valor de la cadena  */
var ultimoDigito = function ultimoDigito() {
    return operacion.textContent.substring(operacion.textContent.length - 1);
};


/* Operaciones que trabajen con Coma y Presiono simbolos luego de Operar */
var operacionDecimal = function operacionDecimal(text) {

    // Cuando no tenemos nada y presionamos " , " y calculamos. El resultado se borra.
    if (operacion.textContent == '0' && text != '.')
    {
        operacion.textContent = '';
    } 

    //Cuando se hace el calculo y presionamos un operando -> El resultado se mueve arriba 
    if (operacionCompletada && isNaN(text)) {
        operacion.textContent = resultado.textContent;
        operacionCompletada = false;
    }

    //Cuando se presiono un Numero despues de calcular algo limpio Pantalla
    if (operacionCompletada && !isNaN(text)) {
        operacion.textContent = '';
        resultado.textContent = '0';
        operacionCompletada = false;
    }

    /*  */
    if (isNaN(ultimoDigito()) && isNaN(text)) {
        operacion.textContent = operacion.textContent.substring(0, operacion.textContent.length - 1);
    } else if (operacion.textContent.length < 24) {
        operacion.textContent += text;
    }
};

/* Metodo de Impresion */
var imprimirResultado = function imprimirResultado() {

    /* Analiza y comprueba que el ultimo digito no sea un numero */
    if (isNaN(ultimoDigito()) && ultimoDigito() !== ')') 
    {
        operacion.textContent = operacion.textContent.substring(0, operacion.textContent.length - 1);
    }

    /* Realiza la Operacion */
    resultado.textContent = eval(operacion.textContent);
    operacionCompletada = true;

    /* Propiedad que Reajusta el tam. de la pantalla para que quepa el resultado*/
    if (resultado.textContent.length > 9) {
        resultado.style.fontSize = '2em';
        resultado.style.marginTop = '1em';
    }
};


/* Funcion que cambia el simbolo (+)(-) */
var cambiarSimbolo = function cambiarSimbolo() {

    var ultimoNumero = '';
    var posicion = 0;

    if (!isNaN(ultimoDigito())) {
        for (var i = operacion.textContent.length - 1; i > 0; i--) {
            if (isNaN(operacion.textContent[i])) {
                posicion = i + 1;
                break;
            }
        }
    }

    ultimoNumero = operacion.textContent.substring(posicion);
    operacion.textContent = operacion.textContent.replace(ultimoNumero, '(' + ultimoNumero * -1 + ')');
};

/* Metodo de Reinicio de Pantalla - (Boton C) */
var reiniciarPantalla = function reiniciarPantalla() {

    operacion.textContent = '0';
    resultado.textContent = '0';

    resultado.style.fontSize = '4rem';
    resultado.style.marginTop = '0';
};


// EVENTOS

/* Eventos que suceden cuando se pulsa sobre un boton */
botones.addEventListener('click', function (e) {

    if (e.target.textContent !== '') {
        switch (e.target.textContent) {
            case '=':
                imprimirResultado();break;
            case 'C':
                reiniciarPantalla();break;
            case '+/-':
                cambiarSimbolo();break;
            case ',':
                operacionDecimal('.');break;
            default:
                operacionDecimal(e.target.textContent);
                break;
        }
    }
});