// Questão 1

// a
function mediaAritmetica(a, b) {
    console.log((a + b) / 2);
}

mediaAritmetica(5, 7)

// b
function areaRetangulo(a, b) {
    console.log("Área do retangulo: ", a * b);
    console.log("Perímetro do retangulo: ", (a * 2) + (b * 2));
}

areaRetangulo(5, 7)

// c
function parOuImpar(num) {
    if (num % 2 == 0) {
        console.log(num + " é um número par");
    } else {
        console.log(num + " é um número ímpar");
    }
}

parOuImpar(5)
parOuImpar(12)

// Questão 2
function anosParaDia(idade) {
    console.log(idade + " anos, são: " + idade * 365 + " dias");
}

anosParaDia(1)
anosParaDia(20)

// Questão 3
function horasParaSegundos(horas, minutos, segundos) {
    var horasEmSegundos = (horas * 60) * 60;
    var minutosEmSegundos = minutos * 60;
    var totalEmSegundos = horasEmSegundos + minutosEmSegundos + segundos;
    console.log(horas + " horas, " + minutos + " minutos e " + segundos + " segundos, são: " + totalEmSegundos + " segundos");
}

horasParaSegundos(1, 0, 0)
horasParaSegundos(0, 1, 0)
horasParaSegundos(8, 58, 14)

// Questão 4
function salarioLiquido(diasTrabalhados, precoDia) {
    var salarioBruto = diasTrabalhados * precoDia;
    var salarioLiquido = salarioBruto - (salarioBruto * 0.08);
    console.log("O preço do salário liquido é de: R$ " + salarioLiquido);
}

salarioLiquido(10, 20)

// Questão 5
function tarifaDeLigacao(duracaoChamada) {
    var precoTotal = 1.15;
    if (duracaoChamada <= 3) {
        console.log("Total a ser pago é de: R$ " + precoTotal);
    } else {
        var tempoAdicional = duracaoChamada - 3;
        var precoAdicional = tempoAdicional * 0.26;
        precoTotal += precoAdicional;
        console.log("Total a ser pago é de: R$ " + precoTotal);
    }
}

tarifaDeLigacao(3)
tarifaDeLigacao(4)

// Questão 6
function reajusteSalario(salarioAtual) {
    var primerioAno = (salarioAtual * 0.07) + salarioAtual;
    var segundoAno = (primerioAno * 0.06) + primerioAno;
    var terceiroAno = (segundoAno * 0.05) + segundoAno;
    console.log("Salário do primeiro ano vai ser de R$ " + primerioAno);
    console.log("Salário do segundo ano vai ser de R$ " + segundoAno);
    console.log("Salário do terceiro ano vai ser de R$ " + terceiroAno);
}

reajusteSalario(1500)

// Questão 7
function totalPago(idFuncionario, horasTrabalhadas, precoHora) {
    var pagamentoAdicional = 0;
    var pagamentoNormal = 0;

    if (horasTrabalhadas > 40) {
        var horasAdicionais = horasTrabalhadas - 40;
        precoHoraAdicional = (precoHora * 0.5) + precoHora
        pagamentoAdicional = horasAdicionais * precoHoraAdicional

        pagamentoNormal = 40 * precoHora
    } else {
        pagamentoNormal = horasTrabalhadas * precoHora
    }
    var totalPago = pagamentoNormal + pagamentoAdicional;

    console.log("O funcionario " + idFuncionario + " irá receber R$ " + totalPago);
}

totalPago(1, 40, 200)
totalPago(1, 45, 200)

// Questão 8
function mediaEAprovacao(nota1, nota2, nota3, nota4) {
    var somaNotas = nota1 + nota2 + nota3 + nota4;
    var media = somaNotas / 4;

    if (media >= 7) {
        console.log("O aluno é está aprovado, com uma nota de: " + media);
    } else {
        console.log("O aluno é está reprovado, com uma nota de: " + media);
    }
}
mediaEAprovacao(7, 5, 7, 9)

// Questão 9
function indicePoluicao(indicePoluicao) {
    var situacao = "";

    if (indicePoluicao < 35) {
        situacao = "agradavel";
    } else if (indicePoluicao < 60) {
        situacao = "desagradavel";
    } else if (indicePoluicao > 60) {
        situacao = "perigoso";
    }
    console.log("O meio ambiente está " + situacao);
}
indicePoluicao(30)
indicePoluicao(50)
indicePoluicao(80)

// Questão 10
function triangulo(lado1, lado2, lado3) {
    var list = [lado1, lado2, lado3];
    list = list.sort();
    var isTrinagulo = false;

    if (list[0] + list[1] > list[2]) {
        console.log("Esses lados podem formar um triangulo");
        isTrinagulo = true;
    } else {
        console.log("Esses lados não podem formar um triangulo");
        isTrinagulo = false;
    }

    if (isTrinagulo) {
        if (lado1 == lado2 && lado2 == lado3) {
            console.log("Esse triagulo é equilatero");
        } else if (lado1 != lado2 && lado2 != lado3) {
            console.log("Esse triagulo é escaleno");
        } else if ((lado1 == lado2 && lado2 != lado3) || (lado1 == lado3 && lado2 != lado3) || (lado2 == lado3 && lado3 != lado1)) {
            console.log("Esse triagulo é isoceles");
        }
    }

}
triangulo(1, 2, 3)
triangulo(2, 2, 3)
triangulo(2, 3, 4)
triangulo(3, 3, 3)

// Questão 11
function mediaNotas(notas, aulasPresentes, totalAulas) {
    var frequenciaAceitavel = totalAulas*0.7;

    if(aulasPresentes<frequenciaAceitavel) {
        console.log("O aluno está reprovado por excesso de faltas");
    } else {
        var somaNotas = 0;
        
        for (let index = 0; index < notas.length; index++) {
            if (index<2) {
                somaNotas += notas[index]
            } else {
                somaNotas += notas[index]*2
            }    
        }
    
        var mediaNotas = somaNotas/6;
        
        if (mediaNotas>=7) {
            console.log("O aluno está aprovado com uma media de " + mediaNotas);
        } else if (mediaNotas>2.5){
            console.log("O aluno não está aprovado,mas pode fazer a final, com uma media de " + mediaNotas);
        } else {
            console.log("O aluno está reprovado por ter media menor que 2.5, com uma media de " + mediaNotas);
        }
    }
}
mediaNotas([7,7,7,7], 20, 20)
mediaNotas([7,7,7,7], 69, 100)
mediaNotas([5,5,6,10], 16, 20)
mediaNotas([2,2,2,2], 16, 20)

// Questão 12
function estacionamento(horasEntrada, minutosEntrada, horasSaida, minutosSaida) {
    var difHoras = horasSaida - (horasEntrada + 1);
    var totalMinutos = (60 - minutosEntrada) + (difHoras * 60) + minutosSaida;
    var totalHoras = totalMinutos/60;

    if(totalHoras>4) {
        console.log("Você ganhou uma lavagem gratis!");
    }
    
    totalPreco = Math.abs(Math.trunc(totalHoras) * 2.5);
    console.log("O preço é de R$ " + totalPreco);
}
estacionamento(10, 0, 11, 0)
estacionamento(10, 0, 14, 0)
estacionamento(10, 0, 14, 30)

// Questão 13
function prestacoes(dataVencimento, dataPagamento, valorPretacao) {
    var diaMesVencimento = dataVencimento.split("/");
    var diaVencimento = parseInt(diaMesVencimento[0], 10);
    var mesVencimento = parseInt(diaMesVencimento[1], 10);
    
    var diaMesPagamento = dataPagamento.split("/");
    var diaPagamento = parseInt(diaMesPagamento[0], 10);
    var mesPagamento = parseInt(diaMesPagamento[1], 10);

    if(diaPagamento<=diaVencimento && mesPagamento<=mesVencimento) {
        console.log("O pagamento está em dia. Obteve 10% de desconto.\n" + 
        "O valor da pretação agora é de R$ " + (valorPretacao - (valorPretacao*0.1)));
    } else if (diaPagamento<=(diaVencimento+5) && mesPagamento==mesVencimento) {
        console.log("O pagamento está atrasado. Não receberá desconto.\n" + 
        "O valor da pretação é de R$ " + valorPretacao);
    } else if (diaPagamento>(diaVencimento+5) && mesPagamento>=mesVencimento) {
        console.log("O pagamento está muito atrasado. Receberá multa de 2%.\n" + 
        "O valor da pretação agora é de R$ " + (valorPretacao + (valorPretacao*0.02)));
    }
}
prestacoes("10/2", "5/2", 100)
prestacoes("10/2", "10/2", 100)
prestacoes("10/2", "13/2", 100)
prestacoes("10/2", "18/2", 100)

// Questão 14
function impostoDeRenda(rendaAnual, numDependentes) {
    var desconto = (numDependentes*2)/100;

    var rendaLiquida = rendaAnual - (rendaAnual*desconto);

    if(rendaLiquida <= 20000) {
        console.log("Esse contribuinte não paga imposto.\n" + 
        "Por ter uma renda liquida de R$ " + rendaLiquida + " (<=20000)");
    } else if(rendaLiquida <= 50000) {
        console.log("Esse contribuinte paga imposto de 5% da sua renda.\n" + 
        "Por ter uma renda liquida de R$ " + rendaLiquida + " (<=50000).\n" +
        "Seu imposto é de R$ " + (rendaLiquida*0.05));
    } else if (rendaLiquida <= 100000) {
        console.log("Esse contribuinte paga imposto de 10% da sua renda.\n" + 
        "Por ter uma renda liquida de R$ " + rendaLiquida + " (<=100000).\n" +
        "Seu imposto é de R$ " + (rendaLiquida*0.1));
    } else if (rendaLiquida > 100000) {
        console.log("Esse contribuinte paga imposto de 15% da sua renda.\n" + 
        "Por ter uma renda liquida de R$ " + rendaLiquida + " (>100000).\n" +
        "Seu imposto é de R$ " + (rendaLiquida*0.15));
    }
}
impostoDeRenda(20000, 5)
impostoDeRenda(50000, 5)
impostoDeRenda(100000, 5)
impostoDeRenda(150000, 5)