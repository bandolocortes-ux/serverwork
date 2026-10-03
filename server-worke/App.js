const cards = {
    disciplina: document.getElementById('resultado-disciplina'),
    soma: document.getElementById('resultado-soma'),
    notas: document.getElementById('resultado-notas'),
    tabuada: document.getElementById('resultado-tabuada'),
    maior: document.getElementById('resultado-maior'),
    maiorAteUm: document.getElementById('resultado-maior-ate-1')
};

function mostrarDisciplina() {
    const disciplina = document
        .getElementById('nome-disciplina')
        .value
        .trim();

    if (disciplina === '') {
        cards.disciplina.textContent = 'Digite o nome da disciplina.';
        return;
    }

    cards.disciplina.textContent = 'Disciplina: ' + disciplina;
}

function somarNumeros() {
    const num1 = parseFloat(
        document.getElementById('num1').value
    );

    const num2 = parseFloat(
        document.getElementById('num2').value
    );

    if (isNaN(num1) || isNaN(num2)) {
        cards.soma.textContent =
            'Valores inválidos. Digite apenas números.';
        return;
    }

    const soma = num1 + num2;

    cards.soma.textContent =
        `Soma: ${num1} + ${num2} = ${soma.toFixed(2)}`;
}

function mediaNotas() {
    const notas = [
        parseFloat(document.getElementById('nota1').value),
        parseFloat(document.getElementById('nota2').value),
        parseFloat(document.getElementById('nota3').value),
        parseFloat(document.getElementById('nota4').value)
    ];

    if (notas.some(nota => isNaN(nota))) {
        cards.notas.textContent =
            'Preencha todas as notas com valores válidos.';
        return;
    }

    const media =
        notas.reduce((acc, valor) => acc + valor, 0) /
        notas.length;

    const status =
        media > 7 ? 'APROVADO' : 'REPROVADO';

    cards.notas.textContent =
        `Notas: ${notas.join(', ')} | Média: ${media.toFixed(2)} | Status: ${status}`;
}

function tabuada() {
    const numero = parseInt(
        document.getElementById('tabuada-numero').value,
        10
    );

    if (isNaN(numero)) {
        cards.tabuada.textContent =
            'Digite um número válido.';
        return;
    }

    let resultado = `Tabuada do ${numero}:\n`;

    for (let i = 0; i <= 10; i++) {
        resultado +=
            `${numero} x ${i} = ${numero * i}\n`;
    }

    cards.tabuada.textContent = resultado;
}

function maiorValor() {
    const valorDigitado = parseFloat(
        document.getElementById('valor-maior').value
    );

    if (isNaN(valorDigitado)) {
        cards.maior.textContent =
            'Digite um valor válido.';
        return;
    }

    const valores = [2, 5, 9, 12, 7, 3];

    valores.push(valorDigitado);

    const maior = Math.max(...valores);

    cards.maior.textContent =
        `O maior valor informado foi: ${maior}`;
}

function maiorAteMenosUm() {
    const entrada =
        document.getElementById('valores-maior').value;

    if (entrada.trim() === '') {
        cards.maiorAteUm.textContent =
            'Digite pelo menos um valor.';
        return;
    }

    const numeros = entrada
        .split(/[\s,;]+/)
        .map(v => Number(v))
        .filter(v => !Number.isNaN(v));

    if (numeros.length === 0) {
        cards.maiorAteUm.textContent =
            'Nenhum valor válido foi informado.';
        return;
    }

    const semSinal = numeros.filter(v => v !== -1);

    if (semSinal.length === 0) {
        cards.maiorAteUm.textContent =
            'Nenhum valor positivo foi informado.';
        return;
    }

    const maior = Math.max(...semSinal);

    cards.maiorAteUm.textContent =
        `O maior valor informado foi: ${maior}`;
}


// Eventos dos botões
document
    .getElementById('btn-disciplina')
    .addEventListener('click', mostrarDisciplina);

document
    .getElementById('btn-soma')
    .addEventListener('click', somarNumeros);

document
    .getElementById('btn-notas')
    .addEventListener('click', mediaNotas);

document
    .getElementById('btn-tabuada')
    .addEventListener('click', tabuada);

document
    .getElementById('btn-maior')
    .addEventListener('click', maiorValor);

document
    .getElementById('btn-maior-ate-1')
    .addEventListener('click', maiorAteMenosUm);


// Registro do Service Worker
if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker
            .register('./sw.js')
            .then(() => {
                console.log(
                    'Service Worker registrado com sucesso.'
                );
            })
            .catch((error) => {
                console.error(
                    'Erro ao registrar o Service Worker:',
                    error
                );
            });

    });
}

mostrarDisciplina();