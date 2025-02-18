let listaNumerosSorteador = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    }

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o Número Secreto com ${tentativas} ${palavraTentativa}!!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Número Secreto é menor que o chute');
        } else {
            exibirTextoNaTela('p', 'Número Secreto é maior que o chute');
        } 
        tentativas++;
        limparCampo();
    } 
    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1 );
    let quantidadeNumeroNaLista = listaNumerosSorteador.length;

    if(quantidadeNumeroNaLista == numeroLimite) {
        listaNumerosSorteador = [];
    }
    if (listaNumerosSorteador.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
    listaNumerosSorteador.push(numeroEscolhido);
    console.log(listaNumerosSorteador);
    return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}