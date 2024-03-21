function formatarValor(valor) {
  return parseFloat(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function limitarTexto(texto, limite) {
        if (texto.length > limite) {
          return texto.substring(0, limite) + '...';
        }
        return texto;
}

function calcularSomaValores() {
  var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];
  var soma = storedData.reduce(function (acc, item) {
    var valorSemSimbolo = item.valor.replace('R$ ', '');
    return acc + parseFloat(valorSemSimbolo.replace(',', '.'));
  }, 0);

  document.querySelector('.text-va').textContent = 'R$ ' + formatarValor(soma.toFixed(2));
}

function excluirLinha(row) {
  var tabelaCorpo = document.getElementById('tabelaCorpo-1');
  var rowIndex = row.getAttribute('data-id');
  var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];
  
  storedData = storedData.filter(function(item) {
    return item.id !== parseInt(rowIndex);
  });

  localStorage.setItem('itemsList', JSON.stringify(storedData));
  tabelaCorpo.deleteRow(row.rowIndex);

  var rows = tabelaCorpo.getElementsByTagName('tr');
  for (var i = 1; i < rows.length; i++) {
    rows[i].setAttribute('data-id', i);
    rows[i].cells[0].innerHTML = i;
  }

  calcularSomaValores();
}

window.onload = function () {
  var tabelaCorpo = document.getElementById('tabelaCorpo-1');
  var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];

  if (storedData.length > 0) {
    for (var i = 0; i < storedData.length; i++) {
      var newRow = tabelaCorpo.insertRow();
      newRow.setAttribute('data-id', i + 1);
      var cellNum = newRow.insertCell(0);
      var cellDescricao = newRow.insertCell(1);
      var cellPagoNo = newRow.insertCell(2);
      var cellValor = newRow.insertCell(3);
      var cellDataHora = newRow.insertCell(4);

      cellNum.innerHTML = i + 1;
      cellDescricao.innerHTML = limitarTexto(storedData[i].descricao === '' ? '-' : storedData[i].descricao, 10);
      cellPagoNo.innerHTML = storedData[i].pagono;
      cellValor.innerHTML = 'R$ ' + formatarValor(storedData[i].valor);
      cellDataHora.innerHTML = storedData[i].dataHora;
    }
  }
  document.querySelector('.delet').addEventListener('click', function () {
    // Limpa os dados da tabela removendo todas as linhas do corpo da tabela
    var tabelaCorpo = document.getElementById('tabelaCorpo-1');
    tabelaCorpo.innerHTML = '';

    // Limpa os dados armazenados no localStorage
    localStorage.removeItem('itemsList');

    calcularSomaValores();
  });


  calcularSomaValores(); // Chama a função inicialmente para exibir o valor do pagamento
};


window.addEventListener('load', function () {
  const totalP = document.querySelector('.text-val');
  const pagamentoP = document.querySelector('.text-va');
  const diferencaP = document.querySelector('.text-va1');

  function calcularTotalCompra() {
    const linhas = document.querySelectorAll('.styled-table tbody tr');
    let totalCompra = 0;

    linhas.forEach(function (linha) {
      const colunas = linha.querySelectorAll('td');
      if (colunas.length > 0) {
        const totalItem = parseFloat(colunas[5].textContent.replace(/[^\d,-]/g, '').replace(',', '.'));
        totalCompra += totalItem;
      }
    });

    return totalCompra;
  }

  function formatarValor(valor) {
    return parseFloat(valor).toFixed(2).replace('.', ',');
  }

  function calcularDiferenca() {
    const totalCompra = calcularTotalCompra();
    const valorPagamento = parseFloat(pagamentoP.textContent.replace(/[^\d,-]/g, '').replace(',', '.'));
    const diferenca = valorPagamento - totalCompra;
    return diferenca;
  }

  function exibirDiferenca() {
    const diferenca = calcularDiferenca();
    const diferencaFormatada = 'R$ ' + formatarValor(diferenca);
    diferencaP.textContent = diferencaFormatada;

    // Adiciona ou remove a classe CSS 'negativo' dependendo se a diferença é negativa
    if (diferenca < 0) {
      diferencaP.classList.add('negativo');
    } else {
      diferencaP.classList.remove('negativo');
    }
  }

  exibirDiferenca(); // Chama a função inicialmente para exibir a diferença
  totalP.addEventListener('DOMSubtreeModified', exibirDiferenca); // Atualiza a diferença quando o total da compra é modificado
  pagamentoP.addEventListener('DOMSubtreeModified', exibirDiferenca); // Atualiza a diferença quando o valor do pagamento é modificado
});

window.addEventListener('load', function() {
    const tabelaVendas = document.querySelector('.styled-table tbody');
    const totalP = document.querySelector('.valor');
    function limitarTexto(texto, limite) {
        if (texto.length > limite) {
          return texto.substring(0, limite) + '...';
        }
        return texto;
      }
    
    // Obter os produtos salvos no armazenamento local
    const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];

    // Adicionar os produtos à tabela de vendas na página "Venda.html"
    produtosVenda.forEach(function(produto) {
      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
          <td>${produto.numero}</td>
          <td>${limitarTexto(produto.codigo, 15)}</td>
          <td>${limitarTexto(produto.nome, 5)}</td>
          <td>${produto.valorUnitario}</td>
          <td>${produto.quantidade}</td>
          <td style="color: #a178f1;">${calcularTotal(produto.valorUnitario, produto.quantidade)}</td>
      `;
      tabelaVendas.appendChild(novaLinha);
  });
  
  // Função para calcular o total do produto (valor unitário multiplicado pela quantidade)
  function calcularTotal(valorUnitario, quantidade) {
    const valorNumerico = parseFloat(valorUnitario.replace(/[^\d,-]/g, '').replace(',', '.'));
    const total = valorNumerico * quantidade;
    return total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
  }
  
  });

  function redirecionar(pagina) {
    window.location.href = pagina;
  }

  window.addEventListener('load', function () {
    const tabelaVendas = document.querySelector('.styled-table tbody');
    const totalP = document.querySelector('.text-val');
  
    function calcularTotalCompra() {
      const linhas = tabelaVendas.querySelectorAll('tr'); // Seleciona todas as linhas da tabela
      let totalCompra = 0;
  
      // Percorre todas as linhas da tabela e soma os totais dos itens
      linhas.forEach(function (linha) {
        const colunas = linha.querySelectorAll('td');
        if (colunas.length > 0) {
          const totalItem = parseFloat(colunas[5].textContent.replace(/[^\d,-]/g, '').replace(',', '.')); // Obtém o total do item na coluna 5
          totalCompra += totalItem; // Soma o total do item ao total da compra
        }
      });
  
      return totalCompra;
    }
  
    function atualizarTotalCompra() {
      const totalCompra = calcularTotalCompra();
    
      // Exibe o total da compra sem o símbolo da moeda
      const valorNumerico = totalCompra.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
    
      // Exibe o valor numérico formatado na respectiva <p class="valor">0,00</p>
      totalP.textContent = valorNumerico;
    }
  
    // Atualiza o total da compra ao carregar a página
    atualizarTotalCompra();

    tabelaVendas.addEventListener('DOMSubtreeModified', function () {
      atualizarTotalCompra();
    });
  });


  var topValue = 390; // Valor inicial de 'top'
  var movido = false; // Variável de controle para verificar se já houve movimento
  var elementosCriados = false; // Variável para controlar se os elementos foram criados
  
  function ocultarElementos() {
    var formas = document.getElementById('formas');
    var line2 = document.getElementById('line2');
    var lista = document.getElementById('lista');
    var tabelaPaga = document.querySelector('.tabela-paga');
    var pagar = document.querySelector('.pagar');
    var voltarAoNormal = document.getElementById('voltarAoNormal');
  
    if (formas && line2 && lista && pagar && !movido && !elementosCriados) {
      formas.style.display = 'none';
      line2.style.display = 'none';
      lista.style.display = 'none';
  
      // Criação dos novos elementos
      var divExcluir = document.createElement('div');
      divExcluir.setAttribute('class', 'excluir');
  
      var h1PagamentoEm = document.createElement('h1');
      h1PagamentoEm.setAttribute('class', 'pagamento-em');
      h1PagamentoEm.textContent = 'Pagamento em Dinheiro';
  
      var selectFormaPg = document.createElement('select');
      selectFormaPg.setAttribute('id', 'forma-pg');
      var option = document.createElement('option');
      option.setAttribute('value', '00');
      option.textContent = 'Á Vista';
      selectFormaPg.appendChild(option);
  
      var input1 = document.createElement('input');
      input1.setAttribute('class', 'i1');
      input1.setAttribute('type', 'text');
      input1.setAttribute('placeholder', 'Informe o valor pago');
  
      var divLine = document.createElement('div');
      divLine.setAttribute('class', 'line-4');
  
      var input2 = document.createElement('input');
      input2.setAttribute('class', 'i2');
      input2.setAttribute('type', 'text');
      input2.setAttribute('placeholder', 'Descrição do pagamento');
  
      var button2 = document.createElement('button');
      button2.setAttribute('class', 'regis');
      button2.textContent = 'Registrar Pagamento em Dinheiro';
  
      // Adiciona os novos elementos à div tabela-paga
      divExcluir.appendChild(h1PagamentoEm);
      divExcluir.appendChild(divLine);
      divExcluir.appendChild(selectFormaPg);
      divExcluir.appendChild(input1);
      divExcluir.appendChild(input2);
      divExcluir.appendChild(button2);
  
      tabelaPaga.appendChild(divExcluir);
  
      pagar.style.top = topValue + 'px'; // Garante que a posição top seja atualizada ao ocultar
      movido = true; // Define movido como true para impedir movimento adicional
      elementosCriados = true; // Marcamos que os elementos foram criados
      voltarAoNormal.style.display = 'block'; // Exibe o botão "Voltar ao Normal"
    }
    button2.addEventListener('click', function () {
      var valorPago = document.querySelector('.i1').value;
      var descricaoPagamento = document.querySelector('.i2').value;
      var pago = 'Dinheiro';
      var regex = /^\d+(,\d{1,2})?$/;
    
      if (valorPago.trim() !== '' && regex.test(valorPago)) {
        var valorFormatado = parseFloat(valorPago.replace(',', '.')).toFixed(2); // Formata o valor com duas casas decimais
    
        var newItem = {
          descricao: descricaoPagamento === '' ? '-' : descricaoPagamento,
          valor: valorFormatado, // Utiliza o valor formatado
          dataHora: new Date().toLocaleString(),
          pagono: pago,
        };    
    
        var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];
        storedData.push(newItem);
    
        localStorage.setItem('itemsList', JSON.stringify(storedData));
    
        var tabelaCorpo = document.getElementById('tabelaCorpo-1');
        var dataAtual = new Date().toLocaleString();
        localStorage.setItem('dataHora', dataAtual); // Salva a data e hora no armazenamento local
    
        // Cria uma nova linha na tabela
        var newRow = tabelaCorpo.insertRow();
    
        // Obtém o índice correto para exibir o número da linha (começando de 1)
        var rowIndex = tabelaCorpo.rows.length;
    
        // Cria as células para cada coluna na nova linha
        var cellNum = newRow.insertCell(0);
        var cellDescricao = newRow.insertCell(1);
        var cellPagoNo = newRow.insertCell(2);
        var cellValor = newRow.insertCell(3);
        var cellDataHora = newRow.insertCell(4);
    
        // Insere os valores dos inputs nas células correspondentes
        cellNum.innerHTML = rowIndex; // Usa o índice corrigido para começar a numeração de 1
        cellDescricao.innerHTML =  limitarTexto(descricaoPagamento === '' ? '-' : descricaoPagamento,10);
        cellPagoNo.innerHTML = pago;
        cellValor.textContent = 'R$ ' + formatarValor(valorFormatado); // Utiliza o valor formatado
        cellDataHora.innerHTML = dataAtual;
    
        alert('Pagamento adicionado com sucesso.');
    
        // Limpa os valores dos inputs após salvar na tabela
        document.querySelector('.i1').value = '';
        document.querySelector('.i2').value = '';
        calcularSomaValores(); 
      } else {
        alert('Por favor, preencha o campo "Informe o valor pago" com números e vírgula (até 2 casas decimais).');
      }
    });
    
  
  
  }
  
  function moverParaBaixo() {
    var pagar = document.querySelector('.pagar');
  
    if (!movido) {
      topValue = 0; // Aumenta o valor de 'top' em 50 pixels (por exemplo)
  
      if (pagar) {
        pagar.style.top = topValue + 'px';
      }
    }
  }
  
  function ocultarElementos1() {
    var formas = document.getElementById('formas');
    var line2 = document.getElementById('line2');
    var lista = document.getElementById('lista');
    var tabelaPaga = document.querySelector('.tabela-paga');
    var pagar = document.querySelector('.pagar');
    var voltarAoNormal = document.getElementById('voltarAoNormal');
  
    if (formas && line2 && lista && pagar && !movido && !elementosCriados) {
      formas.style.display = 'none';
      line2.style.display = 'none';
      lista.style.display = 'none';
  
      // Criação dos novos elementos
      var divExcluir = document.createElement('div');
      divExcluir.setAttribute('class', 'excluir');

      var h1PagamentoEm = document.createElement('h1');
      h1PagamentoEm.setAttribute('class', 'pagamento-em');
      h1PagamentoEm.textContent = 'Pagamento no Cartão de Débito';

      var selectFormaPg = document.createElement('select');
      selectFormaPg.setAttribute('id', 'forma-pg');
      
      // Adiciona a opção "À Vista" como a primeira opção
      var optionAVista = document.createElement('option');
      optionAVista.setAttribute('value', '00');
      optionAVista.textContent = 'À Vista';
      selectFormaPg.appendChild(optionAVista);
  
      var input1 = document.createElement('input');
      input1.setAttribute('class', 'i1');
      input1.setAttribute('type', 'text');
      input1.setAttribute('placeholder', 'Informe o valor pago');

      var divLine = document.createElement('div');
      divLine.setAttribute('class', 'line-4');
  
      var input2 = document.createElement('input');
      input2.setAttribute('class', 'i2');
      input2.setAttribute('type', 'text');
      input2.setAttribute('placeholder', 'Descrição do pagamento');
  
      var button2 = document.createElement('button');
      button2.setAttribute('class', 'regis');
      button2.textContent = 'Registrar Pagamento feito no Cartão de Débito';
      button2.addEventListener('click', function () {
        var valorPago = document.querySelector('.i1').value;
        var descricaoPagamento = document.querySelector('.i2').value;
          var pago = 'Cartão de Débito';
        var regex = /^\d+(,\d{1,2})?$/;
      
        if (valorPago.trim() !== '' && regex.test(valorPago)) {
          var valorFormatado = parseFloat(valorPago.replace(',', '.')).toFixed(2); // Formata o valor com duas casas decimais
      
          var newItem = {
            descricao: descricaoPagamento === '' ? '-' : descricaoPagamento,
            valor: valorFormatado, // Utiliza o valor formatado
            dataHora: new Date().toLocaleString(),
            pagono: pago,
          };    
      
          var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];
          storedData.push(newItem);
      
          localStorage.setItem('itemsList', JSON.stringify(storedData));
      
          var tabelaCorpo = document.getElementById('tabelaCorpo-1');
          var dataAtual = new Date().toLocaleString();
          localStorage.setItem('dataHora', dataAtual); // Salva a data e hora no armazenamento local
      
          // Cria uma nova linha na tabela
          var newRow = tabelaCorpo.insertRow();
      
          // Obtém o índice correto para exibir o número da linha (começando de 1)
          var rowIndex = tabelaCorpo.rows.length;
      
          // Cria as células para cada coluna na nova linha
          var cellNum = newRow.insertCell(0);
          var cellDescricao = newRow.insertCell(1);
          var cellPagoNo = newRow.insertCell(2);
          var cellValor = newRow.insertCell(3);
          var cellDataHora = newRow.insertCell(4);
      
          // Insere os valores dos inputs nas células correspondentes
          cellNum.innerHTML = rowIndex; // Usa o índice corrigido para começar a numeração de 1
          cellDescricao.innerHTML = limitarTexto(descricaoPagamento === '' ? '-' : descricaoPagamento,10);
          cellPagoNo.innerHTML = pago;
          cellValor.textContent = 'R$ ' + formatarValor(valorFormatado); // Utiliza o valor formatado
          cellDataHora.innerHTML = dataAtual;
      
          alert('Pagamento adicionado com sucesso.');
      
          // Limpa os valores dos inputs após salvar na tabela
          document.querySelector('.i1').value = '';
          document.querySelector('.i2').value = '';
          calcularSomaValores(); 
        } else {
          alert('Por favor, preencha o campo "Informe o valor pago" com números e vírgula (até 2 casas decimais).');
        }
      });
      // Adiciona os novos elementos à div tabela-paga
      divExcluir.appendChild(h1PagamentoEm);
      divExcluir.appendChild(divLine);
      divExcluir.appendChild(selectFormaPg);
      divExcluir.appendChild(input1);
      divExcluir.appendChild(input2);
      divExcluir.appendChild(button2);
  
      tabelaPaga.appendChild(divExcluir);
  
      pagar.style.top = topValue + 'px'; // Garante que a posição top seja atualizada ao ocultar
      movido = true; // Define movido como true para impedir movimento adicional
      elementosCriados = true; // Marcamos que os elementos foram criados
      voltarAoNormal.style.display = 'block'; // Exibe o botão "Voltar ao Normal"
    }
  }

  function ocultarElementos2() {
    var formas = document.getElementById('formas');
    var line2 = document.getElementById('line2');
    var lista = document.getElementById('lista');
    var tabelaPaga = document.querySelector('.tabela-paga');
    var pagar = document.querySelector('.pagar');
    var voltarAoNormal = document.getElementById('voltarAoNormal');
  
    if (formas && line2 && lista && pagar && !movido && !elementosCriados) {
      formas.style.display = 'none';
      line2.style.display = 'none';
      lista.style.display = 'none';
  
      var divExcluir = document.createElement('div');
      divExcluir.setAttribute('class', 'excluir');
  
      var h1PagamentoEm = document.createElement('h1');
      h1PagamentoEm.setAttribute('class', 'pagamento-em');
      h1PagamentoEm.textContent = 'Pagamento no Cartão de Crédito';
  
      var selectFormaPg = document.createElement('select');
      selectFormaPg.setAttribute('id', 'forma-pg');
      
      var optionAVista = document.createElement('option');
      optionAVista.setAttribute('value', '00');
      optionAVista.textContent = 'À Vista';
      selectFormaPg.appendChild(optionAVista);
      
      for (var i = 2; i <= 12; i++) {
          var option = document.createElement('option');
          var value = i < 10 ? '0' + i : '' + i;
          option.setAttribute('value', value);
          option.textContent = i + 'x Vezes';
          selectFormaPg.appendChild(option);
      }
  
      var input1 = document.createElement('input');
      input1.setAttribute('class', 'i1');
      input1.setAttribute('type', 'text');
      input1.setAttribute('placeholder', 'Informe o valor pago');
  
      var divLine = document.createElement('div');
      divLine.setAttribute('class', 'line-4');
  
      var input2 = document.createElement('input');
      input2.setAttribute('class', 'i2');
      input2.setAttribute('type', 'text');
      input2.setAttribute('placeholder', 'Descrição do pagamento');
  
      var button2 = document.createElement('button');
      button2.setAttribute('class', 'regis');
      button2.textContent = 'Registrar Pagamento feito no Cartão de Crédito';
  
      button2.addEventListener('click', function () {
        var valorPago = document.querySelector('.i1').value;
        var descricaoPagamento = document.querySelector('.i2').value;
        var pago = 'Cartão de Crédito';
        var regex = /^\d+(,\d{1,2})?$/;
        var selectFormaPg = document.getElementById('forma-pg');
        var selectedOptionIndex = selectFormaPg.selectedIndex;
        var selectedOptionText = selectFormaPg.options[selectedOptionIndex].textContent;
        if (valorPago.trim() !== '' && regex.test(valorPago)) {
          var valorFormatado = parseFloat(valorPago.replace(',', '.')).toFixed(2); // Formata o valor com duas casas decimais
      
          var newItem = {
            descricao: descricaoPagamento === '' ? '-' : descricaoPagamento,
            valor: valorFormatado, // Utiliza o valor formatado
            dataHora: new Date().toLocaleString(),
            pagono: pago + ' (' + selectedOptionText + ')',
          };    
      
          var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];
          storedData.push(newItem);
      
          localStorage.setItem('itemsList', JSON.stringify(storedData));
      
          var tabelaCorpo = document.getElementById('tabelaCorpo-1');
          var dataAtual = new Date().toLocaleString();
          localStorage.setItem('dataHora', dataAtual); // Salva a data e hora no armazenamento local
      
          // Cria uma nova linha na tabela
          var newRow = tabelaCorpo.insertRow();
      
          // Obtém o índice correto para exibir o número da linha (começando de 1)
          var rowIndex = tabelaCorpo.rows.length;
      
          // Cria as células para cada coluna na nova linha
          var cellNum = newRow.insertCell(0);
          var cellDescricao = newRow.insertCell(1);
          var cellPagoNo = newRow.insertCell(2);
          var cellValor = newRow.insertCell(3);
          var cellDataHora = newRow.insertCell(4);
      
          // Insere os valores dos inputs nas células correspondentes
          cellNum.innerHTML = rowIndex; // Usa o índice corrigido para começar a numeração de 1
          cellDescricao.innerHTML = limitarTexto(descricaoPagamento === '' ? '-' : descricaoPagamento,10);
          cellPagoNo.innerHTML = pago + ' (' + selectedOptionText + ')';
          cellValor.textContent = 'R$ ' + formatarValor(valorFormatado); // Utiliza o valor formatado
          cellDataHora.innerHTML = dataAtual;
      
          alert('Pagamento adicionado com sucesso.');
      
          // Limpa os valores dos inputs após salvar na tabela
          document.querySelector('.i1').value = '';
          document.querySelector('.i2').value = '';
          calcularSomaValores(); 
        } else {
          alert('Por favor, preencha o campo "Informe o valor pago" com números e vírgula (até 2 casas decimais).');
        }
      });
      divExcluir.appendChild(h1PagamentoEm);
      divExcluir.appendChild(divLine);
      divExcluir.appendChild(selectFormaPg);
      divExcluir.appendChild(input1);
      divExcluir.appendChild(input2);
      divExcluir.appendChild(button2);
  
      tabelaPaga.appendChild(divExcluir);
  
      pagar.style.top = topValue + 'px';
      movido = true;
      elementosCriados = true;
      voltarAoNormal.style.display = 'block';
    }
  }
  

  function ocultarElementos3() {
    var formas = document.getElementById('formas');
    var line2 = document.getElementById('line2');
    var lista = document.getElementById('lista');
    var tabelaPaga = document.querySelector('.tabela-paga');
    var pagar = document.querySelector('.pagar');
    var voltarAoNormal = document.getElementById('voltarAoNormal');
  
    if (formas && line2 && lista && pagar && !movido && !elementosCriados) {
      formas.style.display = 'none';
      line2.style.display = 'none';
      lista.style.display = 'none';
  
      // Criação dos novos elementos
      var divExcluir = document.createElement('div');
      divExcluir.setAttribute('class', 'excluir');

      var h1PagamentoEm = document.createElement('h1');
      h1PagamentoEm.setAttribute('class', 'pagamento-em');
      h1PagamentoEm.textContent = 'Pagamento pelo PIX';

      var selectFormaPg = document.createElement('select');
      selectFormaPg.setAttribute('id', 'forma-pg');
      
      // Adiciona a opção "À Vista" como a primeira opção
      var optionAVista = document.createElement('option');
      optionAVista.setAttribute('value', '00');
      optionAVista.textContent = 'À Vista (PIX)';
      selectFormaPg.appendChild(optionAVista);
        
      var input1 = document.createElement('input');
      input1.setAttribute('class', 'i1');
      input1.setAttribute('type', 'text');
      input1.setAttribute('placeholder', 'Informe o valor pago');

      var divLine = document.createElement('div');
      divLine.setAttribute('class', 'line-4');
  
      var input2 = document.createElement('input');
      input2.setAttribute('class', 'i2');
      input2.setAttribute('type', 'text');
      input2.setAttribute('placeholder', 'Descrição do pagamento');
  
      var button2 = document.createElement('button');
      button2.setAttribute('class', 'regis');
      button2.textContent = 'Registrar Pagamento feito no PIX';

      button2.addEventListener('click', function () {
        var valorPago = document.querySelector('.i1').value;
        var descricaoPagamento = document.querySelector('.i2').value;
        var pago = 'PIX';
        var regex = /^\d+(,\d{1,2})?$/;
      
        if (valorPago.trim() !== '' && regex.test(valorPago)) {
          var valorFormatado = parseFloat(valorPago.replace(',', '.')).toFixed(2); // Formata o valor com duas casas decimais
      
          var newItem = {
            descricao: descricaoPagamento === '' ? '-' : descricaoPagamento,
            valor: valorFormatado, // Utiliza o valor formatado
            dataHora: new Date().toLocaleString(),
            pagono: pago,
          };    
      
          var storedData = JSON.parse(localStorage.getItem('itemsList')) || [];
          storedData.push(newItem);
      
          localStorage.setItem('itemsList', JSON.stringify(storedData));
      
          var tabelaCorpo = document.getElementById('tabelaCorpo-1');
          var dataAtual = new Date().toLocaleString();
          localStorage.setItem('dataHora', dataAtual); // Salva a data e hora no armazenamento local
      
          // Cria uma nova linha na tabela
          var newRow = tabelaCorpo.insertRow();
      
          // Obtém o índice correto para exibir o número da linha (começando de 1)
          var rowIndex = tabelaCorpo.rows.length;
      
          // Cria as células para cada coluna na nova linha
          var cellNum = newRow.insertCell(0);
          var cellDescricao = newRow.insertCell(1);
          var cellPagoNo = newRow.insertCell(2);
          var cellValor = newRow.insertCell(3);
          var cellDataHora = newRow.insertCell(4);
      
          // Insere os valores dos inputs nas células correspondentes
          cellNum.innerHTML = rowIndex; // Usa o índice corrigido para começar a numeração de 1
          cellDescricao.innerHTML = limitarTexto(descricaoPagamento === '' ? '-' : descricaoPagamento,10);
          cellPagoNo.innerHTML = pago;
          cellValor.textContent = 'R$ ' + formatarValor(valorFormatado); // Utiliza o valor formatado
          cellDataHora.innerHTML = dataAtual;
      
          alert('Pagamento adicionado com sucesso.');
      
          // Limpa os valores dos inputs após salvar na tabela
          document.querySelector('.i1').value = '';
          document.querySelector('.i2').value = '';
          calcularSomaValores(); 
        } else {
          alert('Por favor, preencha o campo "Informe o valor pago" com números e vírgula (até 2 casas decimais).');
        }
      });

      // Adiciona os novos elementos à div tabela-paga
      divExcluir.appendChild(h1PagamentoEm);
      divExcluir.appendChild(divLine);
      divExcluir.appendChild(selectFormaPg);
      divExcluir.appendChild(input1);
      divExcluir.appendChild(input2);
      divExcluir.appendChild(button2);
  
      tabelaPaga.appendChild(divExcluir);
  
      pagar.style.top = topValue + 'px'; // Garante que a posição top seja atualizada ao ocultar
      movido = true; // Define movido como true para impedir movimento adicional
      elementosCriados = true; // Marcamos que os elementos foram criados
      voltarAoNormal.style.display = 'block'; // Exibe o botão "Voltar ao Normal"
    }
  }
  
  function voltarAoNormal() {
    var formas = document.getElementById('formas');
    var line2 = document.getElementById('line2');
    var lista = document.getElementById('lista');
    var pagar = document.querySelector('.pagar');
    var tabelaPaga = document.querySelector('.tabela-paga');
    var voltarAoNormal = document.getElementById('voltarAoNormal');
  
    if (formas && line2 && lista && pagar && movido) {
      formas.style.display = 'block';
      line2.style.display = 'block';
      lista.style.display = 'block';
      pagar.style.top = '220px'; // Resetando a posição top
      movido = false; // Define movido como false para permitir movimento novamente
      voltarAoNormal.style.display = 'none'; // Oculta o botão "Voltar ao Normal"
  
      // Removendo os elementos dinâmicos
      var divExcluir = document.querySelector('.excluir');
      if (divExcluir) {
        tabelaPaga.removeChild(divExcluir);
        elementosCriados = false; // Marcamos que os elementos foram removidos
      }
    }
  }
  
  function calcularTotalCompra() {
    const tabelaVendas = document.querySelector('.styled-table tbody');
    const totalP = document.querySelector('.text-val');
    const linhas = tabelaVendas.querySelectorAll('tr');
    let totalCompra = 0;

    linhas.forEach(function (linha) {
      const colunas = linha.querySelectorAll('td');
      if (colunas.length > 0) {
        const totalItem = parseFloat(colunas[5].textContent.replace(/[^\d,-]/g, '').replace(',', '.'));
        totalCompra += totalItem;
      }
    });

    return totalCompra.toFixed(2); // Retorna o total da compra formatado para duas casas decimais
  }

  function redirecionarOuAlerta() {
    const valorTrocoElement = document.querySelector('.text-va1');
    const valorTrocoTexto = valorTrocoElement.textContent.replace('R$ ', '').replace(',', '.'); // Substituir vírgula por ponto
    const valorTroco = parseFloat(valorTrocoTexto);
  
    if (valorTroco >= 0) {
      const valorCompraFinal = calcularTotalCompra(); // Suponha que você tenha uma função calcularTotalCompra() para calcular o total da compra
      const dataHoraAtual = new Date();
  
      const numeroDaVenda = obterNumeroDaVenda(dataHoraAtual);
      const codigoVenda = `ADM3C-${formatarData(dataHoraAtual)}${numeroDaVenda}`;
  
      const novoPagamento = {
        codigoVenda: codigoVenda,
        dataHora: dataHoraAtual.toLocaleString(),
        valorDaCompra: valorCompraFinal,
        funcionario: 'não informado',
        itensVendidos: [],
        formasPagamento: []
      };
  
      // Capturar os itens vendidos da tabela
      const tabelaItens = document.getElementById('tabelaCorpo').querySelectorAll('tr');
      tabelaItens.forEach((item) => {
        const codigo = item.cells[1].textContent;
        const nomeItem = item.cells[2].textContent;
        const valorUnitario = item.cells[3].textContent;
        const quantidadeVendida = parseInt(item.cells[4].textContent);
        const total = item.cells[5].textContent;
  
        novoPagamento.itensVendidos.push({ codigo, nomeItem, valorUnitario, quantidadeVendida, total });
  
        // Atualizar a quantidade em estoque
        atualizarQuantidadeEstoque(codigo, quantidadeVendida);
      });
  
      // Capturar as formas de pagamento da tabela
      const tabelaFormasPagamento = document.getElementById('tabelaCorpo-1').querySelectorAll('tr');
      tabelaFormasPagamento.forEach((pagamento) => {
        const descricao = pagamento.cells[1].textContent;
        const pagoNo = pagamento.cells[2].textContent;
        const valor = parseFloat(pagamento.cells[3].textContent.replace('R$ ', '').replace(',', '.'));
        const dataHora = pagamento.cells[4].textContent;
  
        novoPagamento.formasPagamento.push({ descricao, pagoNo, valor, dataHora });
      });
  
      // Salvando no localStorage
      let dadosPagamentoAnteriores = JSON.parse(localStorage.getItem('dadosPagamento')) || [];
      dadosPagamentoAnteriores.push(novoPagamento);
      localStorage.setItem('dadosPagamento', JSON.stringify(dadosPagamentoAnteriores));
      localStorage.removeItem('itemsList');
      localStorage.removeItem('vendas');
      window.location.href = 'home.html';
      alert('Venda registrada com sucesso!');
    } else {
      alert('O pagamento completo ainda não foi registrado. Por favor, efetue o pagamento para continuar.');
    }
  }
  
  function obterNumeroDaVenda(dataHora) {
    // Recupera as vendas já existentes no localStorage para o dia atual
    const dadosPagamentoAnteriores = JSON.parse(localStorage.getItem('dadosPagamento')) || [];
    const vendasDoDiaAtual = dadosPagamentoAnteriores.filter((venda) => {
      const vendaDataHora = new Date(venda.dataHora);
      return (
        vendaDataHora.getFullYear() === dataHora.getFullYear() &&
        vendaDataHora.getMonth() === dataHora.getMonth() &&
        vendaDataHora.getDate() === dataHora.getDate()
      );
    });
  
    // Calcula o próximo número da venda
    const proximoNumeroVenda = vendasDoDiaAtual.length + 1;
  
    return proximoNumeroVenda;
  }
  
  function formatarData(data) {
    // Formatar a data para o formato desejado (sem barras).
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}${mes}${dia}`;
  }
  

  function atualizarQuantidadeEstoque(codigoProduto, quantidadeVendida) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  
    produtos.forEach(function(produto) {
      if (produto.codigoProduto === codigoProduto) {
        produto.quantidadeEstoque -= quantidadeVendida;
      }
    });
  
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }

  
  
  
  
  
  
