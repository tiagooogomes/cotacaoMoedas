function novalinha(moeda, compra, venda, minimo, maximo, porcentagem, dataHora) {
    const colunaMaximo = $('<td>').text(maximo).css('color', 'green');
    const colunaMoeda = $('<td>').text(moeda).css('color', 'yellow');
    const colunaMinimo = $('<td>').text(minimo).css('color', 'red');
    const colunaPorcentagem = $('<td>').html(porcentagem + '%');
    const colunaCompra = $('<td>').text('R$' + compra);
    const colunaVenda = $('<td>').text('R$'+ venda);
    const colunaDataHora = $('<td>').text(dataHora);
    const colunaRemover = $('<td>');
    const linha = $('<tr>');

    const botao = $('<button>').addClass('botao-remover').text('Remover');
    colunaRemover.append(botao);

    linha.append(colunaMoeda);
    linha.append(colunaCompra);
    linha.append(colunaVenda);
    linha.append(colunaMinimo);
    linha.append(colunaMaximo);
    linha.append(colunaPorcentagem);
    linha.append(colunaDataHora);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    const linha = $(this).parent().parent().fadeOut(1000);
    
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

function mostrarTabela() {
    $('section').stop().show(600);
}

function scrollTabela() {
    const posicaoTabela = $('table').offset().top;
    $('html, body').animate(
    {
        scrollTop: posicaoTabela + 'px'
    },1000);
}