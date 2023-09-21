import {
    seleccionar,
    Toggle,
    validarCampo,
    validarFormulario,
    validacion,
    expresiones,
    obtenerDatos,
    contiene
} from "./functions.js";

// constantes del DOM
const sections = document.getElementsByTagName('section');
const moveBtn = document.getElementById('moveBtn');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const stepNumber = document.getElementsByClassName('number');
const cardStep2 = document.querySelectorAll('.card');
const cardStep3 = document.querySelectorAll('.third_section_card');
const Switch = document.querySelector('.checkbox');
const campos = document.querySelectorAll('form input');
const form = document.querySelector('#formulario');
const change = document.querySelector('.change');
let dinamicContent = {
    step2: {},
    step3: {},
    time: 'Monthly',
    total: ''
}

// Paso entre seciones
let position = 0;
moveBtn.addEventListener('click', (e) => {
    if (position == 0 && e.target.textContent == 'Next Step') {
        if (validarFormulario(form, campos)) {
            sections[position].classList.toggle('displayControl');
            stepNumber[position].classList.toggle('stepSelect');
            sections[++position].classList.toggle('displayControl');
            stepNumber[position].classList.toggle('stepSelect');
        }

    } else {
        if (position == 1 && e.target.textContent == 'Next Step') {
            if (contiene(cardStep2,'select')) {
                sections[position].classList.toggle('displayControl');
                stepNumber[position].classList.toggle('stepSelect');
                sections[++position].classList.toggle('displayControl');
                stepNumber[position].classList.toggle('stepSelect');
            }
        } else {
            if (e.target.textContent == "Next Step" || e.target.textContent == "Confirm") {
                sections[position].classList.toggle('displayControl');
                if (position < 3)
                    stepNumber[position].classList.toggle('stepSelect');
                sections[++position].classList.toggle('displayControl');
                if (position < 4)
                    stepNumber[position].classList.toggle('stepSelect');
            }
            if (e.target.textContent == "Go Back") {
                sections[position].classList.toggle('displayControl');
                stepNumber[position].classList.toggle('stepSelect');
                sections[--position].classList.toggle('displayControl');
                stepNumber[position].classList.toggle('stepSelect');
            }
        }
    }
    switch (position) {
        case 0: {
            back.classList.add('hidden');
            break;
        }
        case 1: {
            back.classList.remove('hidden');
            break;
        }
        case 2: {
            next.textContent = 'Next Step';
            next.classList.remove('confirm');
            break;
        }
        case 3: {
            next.textContent = 'Confirm';
            next.classList.add('confirm');
            dinamicContent.step2 = obtenerDatos(cardStep2);
            dinamicContent.step3 = obtenerDatos(cardStep3);
            seciondinámica()
            break;
        }
        case 4: {
            next.classList.add('hidden');
            back.classList.add('hidden');
        }
    }
})
//Validar campos individualmente
campos.forEach(input => {
    input.addEventListener('blur', (e) => {
        validacion[e.target.name] = validarCampo(expresiones[e.target.name], e.target);
    })
})
//cambiar entre años y mes
Switch.addEventListener('change', () => {
    const time = document.querySelectorAll('.time');
    const price2 = document.querySelectorAll('.cardprice  ');
    const price3 = document.querySelectorAll('.price');
    time.forEach(e => {
        e.classList.toggle('displayControl');
    })
    price2.forEach(e => {
        e.classList.toggle('value');
    })
    price3.forEach(e => {
        e.classList.toggle('value');
    })
    const monthly = document.querySelector('#monthly');
    monthly.classList.toggle('textSelect')
    document.querySelector('#yearly').classList.toggle('textSelect');
    //para obtener el dato de monthly/yearly----más facil desde aquí
    if (monthly.classList.contains('textSelect')) {
        dinamicContent.time = 'Monthly';
        document.querySelector('#yr').textContent = 'mo';
    } else {
        dinamicContent.time = 'Yearly';
        document.querySelector('#yr').textContent = 'yr';
    }
})

change.addEventListener('click', () => {
    position = 1;
    sections[1].classList.remove('displayControl');
    sections[3].classList.add('displayControl');
    stepNumber[1].classList.add('stepSelect');
    stepNumber[3].classList.remove('stepSelect');
    next.textContent = 'Next Step';
    next.classList.remove('confirm');
})

const seciondinámica = () => {
    const template = document.querySelector('#resume');
    template.querySelector('#dinamicStep2 .dinamicTime').textContent = dinamicContent.time;
    template.querySelector('#total .dinamicTime').textContent = dinamicContent.time;
    template.querySelector('#dinamicStep2 .dinamicMode').textContent = dinamicContent.step2.plan.modo;
    template.querySelector('#dinamicStep2 .dinamicPrice').textContent = dinamicContent.step2.plan.value;

    let keys = Object.keys(dinamicContent.step3);
    keys.forEach(e => {
        document.querySelector(`.capsula #${e}`).textContent = dinamicContent.step3[e].modo;
        document.querySelector(`.capsula #${e}Price`).textContent = dinamicContent.step3[e].value;
    })
    let prices = Array();
    let total = 0;
    document.querySelectorAll('.dinamicPrice').forEach(e => {
        if (e.textContent != '')
            prices.push(e.textContent)
    });
    prices.forEach(e => {
        total += Number(e.split('$')[1].split('/')[0]);
    })
    document.querySelector('#totalValue').textContent = total
}

Toggle(cardStep2);
seleccionar(cardStep3);