$(function() {
    atualizarDropList();
    $('select').change(consultarPorMoeda);
    $('#submit').click(consultarPorPeriodo);
});

const corpoTabela = $('table').find('tbody');

function atualizarDropList() {
    $.ajax({
        url: 'https://economia.awesomeapi.com.br/json/all'
    })
    .done(data => {
        Object.entries(data).forEach(moeda => {
            $('select').append(`<option>${moeda[0]}</option>`);
        });
    });
}

function consultarPorMoeda() {
    const moedaConsultada = $(this).val();
    
    $.ajax({
        url: `https://economia.awesomeapi.com.br/json/last/${moedaConsultada}`
    })
    .done(data => {
        const moeda = Object.values(data)[0].name.split('/')[0];
        const porcentagem = Object.values(data)[0].pctChange;
        const dataHora = Object.values(data)[0].create_date;
        const maximo = Object.values(data)[0].high;
        const compra = Object.values(data)[0].bid;
        const minimo = Object.values(data)[0].low;
        const venda = Object.values(data)[0].ask;

        const linha = novalinha(moeda, compra, venda, minimo, maximo, porcentagem, dataHora);
        linha.find('.botao-remover').click(removeLinha);
        corpoTabela.append(linha);

        mostrarTabela();
        scrollTabela();
    });
}

function consultarPorPeriodo() {
    const dataMinima = $('#data-minima').val().replaceAll("-","");
    const dataMaxima = $('#data-maxima').val().replaceAll("-","");
    const moeda = $('select').val();

    $.ajax({
        url: `https://economia.awesomeapi.com.br/${moeda}/${10**20}?start_date=${dataMinima}&end_date=${dataMaxima}`
    })

    .done(data => {
        const moeda = data[0].name.split('/')[0]
        scrollTabela();

        data.forEach(cotacao => {
            const dia = new Date(cotacao.timestamp*1000).getDate();
            const mes = new Date(cotacao.timestamp*1000).getMonth() +1;
            const ano = new Date(cotacao.timestamp*1000).getFullYear();
            const dataHora = `${ano}-${mes}-${dia}`
            const porcentagem = cotacao.pctChange;
            const maximo = cotacao.high;
            const compra = cotacao.bid;
            const minimo = cotacao.low;
            const venda = cotacao.ask;
            
            const linha = novalinha(moeda, compra, venda, minimo, maximo, porcentagem, dataHora);
            linha.find('.botao-remover').click(removeLinha);
            corpoTabela.append(linha);
        });
    });
}
