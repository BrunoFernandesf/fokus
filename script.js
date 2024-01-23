const html = document.querySelector('html')
const focobt = document.querySelector('.app__card-button--foco')
const curtobt = document.querySelector('.app__card-button--curto')
const longobt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const playPause = document.querySelector('#start-pause')
const musicaInput = document.querySelector('#alternar-musica')
const startPauseComecar = document.querySelector('#start-pause span')
const imgPause = document.querySelector('.app__card-primary-butto-icon')
const timer = document.querySelector('#timer')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('sons/play.wav')
const musicaPause = new Audio('sons/pause.mp3')
const musicaBeep = new Audio('sons/beep.mp3')

let duracaoSegundos = 1500
let intervaloId = null

musica.loop = true

musicaInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focobt.addEventListener('click', () => {
    duracaoSegundos = 1500
    alteraContexto('foco')
    focobt.classList.add('active')
})

curtobt.addEventListener('click', () => {
    duracaoSegundos = 300
    alteraContexto('descanso-curto')
    curtobt.classList.add('active')
})

longobt.addEventListener('click', () => {
    duracaoSegundos = 900
    alteraContexto('descanso-longo')
    longobt.classList.add('active')
})

function alteraContexto(contexto) {
    tempoNaTela()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = 
            `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;

        case "dsescanso-longo":
            titulo.innerHTML = 
            `Hora de voltar à superficies,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(duracaoSegundos <= 0) {
        musicaBeep.play()
        zerar()
        alert('Tempo finalizado')
        startPauseComecar.textContent = 'Começar'
        return
    }
    duracaoSegundos -= 1
    tempoNaTela()
}

playPause.addEventListener('click', iniciar)

function iniciar() {
    if(intervaloId) {
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseComecar.textContent = 'Pausar'
    imgPause.setAttribute('src','imagens/pause.png')
}

function zerar() {
    startPauseComecar.textContent = 'Retomar'
    imgPause.setAttribute('src','imagens/play_arrow.png')
    musicaPause.play()
    clearInterval(intervaloId)
    intervaloId = null
}

function tempoNaTela() {
    const tempo = new Date(duracaoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

tempoNaTela()