//Constantes que guardam os elementos usados nas funções.
const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const comecarPausar = document.querySelector('#start-pause');
const tempoNaTela = document.getElementById('timer');
const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const comecarAudio = new Audio('./sons/play.wav');
const pausarAudio = new Audio('./sons/pause.mp3');
const alarme = new Audio('./sons/beep.mp3');
musica.loop = true;

let tempo = 1500;
let intervalo = null;

mostrarTempo();

//Função que altera os botões, a imagem e a frase conforme o contexto muda.
function alterarContexto(contexto) {

    mostrarTempo();

    botoes.forEach(function (contexto) {

        contexto.classList.remove('active');

    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);

    //Switch para trocar de contexto.
    switch (contexto) {
        case 'foco':

            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;

            break;

        case 'descanso-curto':

            titulo.innerHTML = `
            Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;

            break;

        case 'descanso-longo':

            titulo.innerHTML = `
            Hora de voltar à superfície.,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;

            break;

        default:
            break;
    }

}

//Função para mostrar o tempo na tela.
function mostrarTempo() {
    const tempoData = new Date(tempo * 1000);
    const tempoFormatado = tempoData.toLocaleString('pt-Br', {minute:'2-digit', second:'2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

//Função para fazer a contagem regressiva e quando acabar tocar o alarme, zerar o intervalo, redefinir o tempo e o texto do botão.
const contagemRegressiva = () => {

    if (tempo <= 0) {
        alarme.play();
        alert('Tempo finalizado');
        zerar();
        comecarPausar.innerHTML = `
        <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Começar</span>
        `;
        return
    }
    tempo -= 1;
    mostrarTempo();
}

//Event listener de click para iniciar a contagem regressiva.
comecarPausar.addEventListener('click', iniciarPausar);

//Função que inicia e pausa o temporizador e seta o intervalo para 1s (1000ms), troca o texto do botão para pausar ou começar e troca as imagens para dar contexto ao botão.
function iniciarPausar() {

    if (intervalo) {
        zerar();
        pausarAudio.play();
        comecarPausar.innerHTML = `
        <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Começar</span>
        `;
        return
    }
    comecarAudio.play();
    intervalo = setInterval(contagemRegressiva, 1000);
    comecarPausar.innerHTML = `
    <img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
    <span>Pausar</span>
    `;

}

//Função que pausa a contagem regressiva do temporizador.
function zerar() {

    clearInterval(intervalo);
    intervalo = null;

}

//Event listeners para quando a aba com o contexto desejado for clicada.
focoBotao.addEventListener('click', () => {
    tempo = 1500;
    alterarContexto('foco');
    focoBotao.classList.add('active');
});

curtoBotao.addEventListener('click', () => {
    tempo = 300;
    alterarContexto('descanso-curto');
    curtoBotao.classList.add('active');
});

longoBotao.addEventListener('click', () => {
    tempo = 900;
    alterarContexto('descanso-longo');
    longoBotao.classList.add('active');
});

//Event listener para quando ativermos a checkbox da música.
musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})