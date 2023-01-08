// Principal

function jogar() {
    var qtdeJogadores = definirQtdeJogadores();
    var jogadores = introduzirJogadores(qtdeJogadores);
    var jogadorVencedor = desenvolverPartida(jogadores);
    finalizarPartida(jogadorVencedor);
}

// Objetos

function criarEfeito(tipoDoEfeito, valor) {
    var efeito = {
        "TipoDoEfeito": tipoDoEfeito,
        "valor": valor,
    }
    return efeito;
}

function criarCasa(numero, tipoDoEfeito, valor) {
    var casa = {
        "numero": numero,
        "efeito": criarEfeito(tipoDoEfeito, valor),
    }
    return casa;
}

function criarTabuleiro() {
    var casas = [];

    for (let numeroDaCasa = 0; numeroDaCasa <= 35; numeroDaCasa++) {
        definirEfeitoDasCasas(casas, numeroDaCasa);
    }

    return casas;
}

function criarJogador(nome, cor) {
    jogador = {
        "nome": nome,
        "cor": cor,
        "casaAtual": 0
    }

    return jogador;
}

// Suporte

const efeitos = {
    Avancar: "avancar",
    Voltar: "voltar",
    JogarDeNovo: "jogar de novo",
    Semjogar: "sem jogar",
    Nenhum: "nenhum",
}

const tipoDeCasa = {
    ComEfeito: "comEfeito",
    Normal: "normal",
    Inexistente: "inexistente",
}

function definirQtdeJogadores() {
    var pergunta = "Bem vindo ao Safári do Benjamin e do Theodoro!\n" +
        "Para começarmos, informe a quantidade de pessoas que irão jogar:\n" +
        "(Informe um número maior que zero!)";

    var resposta = 0;
    while (resposta < 1) {
        resposta = prompt(pergunta);
    }

    return qtdeJogadores;
}

function introduzirJogadores(qtdeJogadores) {
    var jogadores = [];

    for (let index = 0; index < qtdeJogadores; index++) {
        
        nome = prompt(`Informe o nome do ${index + 1}° jogador:`);
        if (nome == "") {
            nome = `jogador ${index + 1}`;
        }

        cor = prompt(`Informe a cor do seu pião, ${nome}:`);

        var jogador = criarJogador(nome, cor);

        jogadores.push(jogador)

    };

    return jogadores;
}

function desenvolverPartida(jogadores) {
    var jogadorVencedor;
    var terminarPartida = false;

    while (!terminarPartida) {
        jogadores.forEach(jogador => {
            prompt(`${jogador.nome}, é sua vez!\n(Aperte Enter para continuar)`);

            var valorDoDado = jogarDado();
            prompt(`Dados Jogados! ${jogador.nome}, vai andar ${valorDoDado} casas!`);

            var casaPretendida = jogador.casaAtual + valorDoDado;
            // var tipoDeCasa = verificarCasa(casaPretendida);
        });
    }

    return jogadorVencedor;
}

function finalizarPartida(jogadorVencedore) {
    
}

// function verificarCasa(casa) {
//     if(casa < 0 || casa > 35) return tipoDeCasa.Inexistente;
//     if(casa == 6)
// }

function jogarDado() {
    return numeroAleatorio(1,6);
}

function definirEfeitoDasCasas(casas, numeroDaCasa) {
    switch (numeroDaCasa) {
        case 6:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.Avancar, 11)
            );
            break;

        case 10:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.Semjogar, 1)
            );
            break;

        case 13:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.Avancar, 15)
            );
            break;

        case 17:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.JogarDeNovo, 1)
            );
            break;

        case 24:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.Voltar, 12)
            );
            break;

        case 31:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.Avancar, 16)
            );
            break;

        default:
            casas.push(
                criarCasa(numeroDaCasa, efeitos.Nenhum, 0)
            );
            break;
    }
}

// logs

function mostrarTabuleiro() {
    var tabuleiro = criarTabuleiro();
    tabuleiro.forEach(casa => {
        log(`casa: ${casa.numero}\nefeito: ${casa.efeito.TipoDoEfeito} ${casa.efeito.valor}`);
    });
}

// Utilidades

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function log(texto) {
    console.log(texto);
}