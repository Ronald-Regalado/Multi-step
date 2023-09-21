// seleccionar opciones del paso 3
const seleccionar = (arreglo) => {
    arreglo.forEach((element) => {
        element.addEventListener('click', () => {
            element.classList.toggle('select');
            element.querySelector('input').checked = element.querySelector('input').checked ? false : true;
        })
    });
}
// seleccionar opciones del paso 2
const Toggle = (arreglo) => {
    arreglo.forEach((element, x) => {
        element.addEventListener('click', () => {
            let object = {};
            arreglo.forEach((e, index) => {
                if (index != x) {
                    e.classList.remove('select');
                }
            })
            element.classList.toggle('select');
        })
    });

}
// obtener datos de las eleciones para poder hacer el resumen dinámico
const obtenerDatos = (arreglo) => {
    let object = {}
    arreglo.forEach(e => {
        if (e.classList.contains('select')) {
            let newobject = {}
            newobject.modo = e.querySelector('.modo').textContent;
            newobject.value = e.querySelector('.value').textContent;
            object[e.querySelector('.modo').getAttribute('name')] = newobject;
        }
    })
    return object;
}

const contiene = (array, clase) => {
    let flag = false;
    array.forEach(e => {
        if (e.classList.contains('select')) {
            flag = true;
        }
    })
    return flag;
}







// -------------Formulario----------------
const expresiones = {
    name: /^[a-zA-Z\s]{2,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phoneNumber: /^\d{7,14}$/
}
const validacion = {
    name: false,
    email: false,
    phoneNumber: false
}
const validarCampo = (expresion, input) => {
    let campo = document.querySelector(`form #${input.name} .incorrecto`);
    if (expresion.test(input.value)) {
        input.classList.remove('incorrectInput');
        campo.classList.add('displayControl');
        return true;
    } else {
        input.classList.add('incorrectInput');
        campo.classList.remove('displayControl');
        return false;
    }
}
const validarFormulario = (formulario, campos) => {
    if (validacion.name && validacion.email && validacion.phoneNumber) {
        // formulario.submit();
        return true;
    }
    campos.forEach(input => {
        validacion[input.name] = validarCampo(expresiones[input.name], input);
    })
    return false;
}
//------------------------------------------

export {
    seleccionar,
    Toggle,
    contiene,
    validarCampo,
    validarFormulario,
    validacion,
    expresiones,
    obtenerDatos
}