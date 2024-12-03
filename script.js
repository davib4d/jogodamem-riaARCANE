let tabuleiro = document.getElementById('tabuleiro');
let pontos = document.getElementById('pontos');
let erros = document.getElementById('erros');

let pontuacao = 0;
let tentativas = 3;
let cartasViradas = [];
let cartas = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 
    'img4.jpg', 'img5.jpg', 'img6.jpg',
    'img1.jpg', 'img2.jpg', 'img3.jpg', 
    'img4.jpg', 'img5.jpg', 'img6.jpg'
];


cartas = cartas.sort(() => Math.random() - 0.5);


cartas.forEach((carta) => {
    let divCarta = document.createElement('div');
    divCarta.classList.add('carta');
    divCarta.setAttribute('data-valor', carta);
    divCarta.innerHTML = `<img src="costa.jpg" class="costas">`; // Costas da carta
    divCarta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(divCarta);
});

function virarCarta() {
    if (cartasViradas.length < 2 && !this.classList.contains('virada')) {
        this.classList.add('virada');
        this.innerHTML = `<img src="${this.getAttribute('data-valor')}" class="frente">`;
        cartasViradas.push(this);
    }

    if (cartasViradas.length === 2) {
        verificarPar();
    }
}

function verificarPar() {
    let [carta1, carta2] = cartasViradas;
    if (carta1.getAttribute('data-valor') === carta2.getAttribute('data-valor')) {
        pontuacao += 3;
        cartasViradas = [];
    } else {
        pontuacao = Math.max(0, pontuacao - 2);
        tentativas--;
        setTimeout(() => {
            carta1.innerHTML = `<img src="costa.jpg" class="costas">`;
            carta2.innerHTML = `<img src="costa.jpg" class="costas">`;
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
    atualizarPlacar();
}

function atualizarPlacar() {
    pontos.textContent = pontuacao;
    erros.textContent = tentativas;

    if (tentativas === 0) {
        alert('Você perdeu!');
        reiniciarJogo();
    }

    if (document.querySelectorAll('.virada').length === cartas.length) {
        alert('Parabéns, você venceu!');
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    pontuacao = 0;
    tentativas = 3;
    cartasViradas = [];
    tabuleiro.innerHTML = '';
    cartas = cartas.sort(() => Math.random() - 0.5);
    cartas.forEach((carta) => {
        let divCarta = document.createElement('div');
        divCarta.classList.add('carta');
        divCarta.setAttribute('data-valor', carta);
        divCarta.innerHTML = `<img src="costa.jpg" class="costas">`;
        divCarta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(divCarta);
    });
    atualizarPlacar();
}

atualizarPlacar();
