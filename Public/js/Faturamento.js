

document.addEventListener('DOMContentLoaded', function() {
  const botaoAdicionar = document.querySelector('.adiciona');
  const blurDiv = document.querySelector('.blur');

  botaoAdicionar.addEventListener('click', function() {
    blurDiv.classList.toggle('active');

    // Verifica se a classe active está presente na div blur para exibir os botões e a div 'sair'
    if (blurDiv.classList.contains('active')) {
      const contentDiv = document.querySelector('.content');
      const luBotao = createButtons(); // Cria os botões

      // Adiciona os botões e a div 'sair' à div de conteúdo
      contentDiv.appendChild(luBotao);

      // Adiciona um evento de clique à div 'sair'
      const sairDiv = document.querySelector('.sair');
      sairDiv.addEventListener('click', function() {
        blurDiv.classList.remove('active'); // Remove a classe 'active' para desativar o blur

        // Remove as divs criadas quando a classe active é removida da div blur
        const luBotao = document.querySelector('.lu-botão');
        if (luBotao) {
          luBotao.remove();
        }
      });
    } else {
      const luBotao = document.querySelector('.lu-botão');
      // Remove os botões e a div 'sair' quando a classe active é removida da div blur
      if (luBotao) {
        luBotao.remove();
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
const dadosPagamento = JSON.parse(localStorage.getItem('dadosPagamento')) || [];
const corpoTabelaFaturamento = document.getElementById('corpoTabela-faturamento');

function preencherTabelaItensVendidos() {
  const faturamento = {};

  dadosPagamento.forEach((pagamento) => {
    if (pagamento.itensVendidos && pagamento.itensVendidos.length > 0) {
      pagamento.itensVendidos.forEach((item) => {
        const chave = `${item.codigo}_${item.valorUnitario}`;
        if (!faturamento[chave]) {
          faturamento[chave] = {
            codigo: item.codigo || '',
            nomeItem: item.nomeItem || '',
            valorUnitario: item.valorUnitario || '',
            quantidadeVendida: 0,
            faturamentoProduto: 0,
          };
        }
        faturamento[chave].quantidadeVendida += parseInt(item.quantidadeVendida);
      });
    }
  });

  Object.values(faturamento).forEach((faturamentoItem, index) => {
  // Removendo "R$" e espaços do valor unitário e convertendo para número
  const valorUnitarioLimpo = faturamentoItem.valorUnitario.replace(/[^\d,]/g, '').replace('R$', '').replace(',', '.').trim(); 
  const valorUnitarioNumerico = parseFloat(valorUnitarioLimpo);

  const valorTotal = valorUnitarioNumerico * faturamentoItem.quantidadeVendida;

  const newFaturamentoRow = document.createElement('tr');
  newFaturamentoRow.innerHTML = `
    <td>${index + 1}</td>
    <td>${faturamentoItem.codigo || ''}</td>
    <td>${faturamentoItem.nomeItem || ''}</td>
    <td>${faturamentoItem.valorUnitario || ''}</td>
    <td>${faturamentoItem.quantidadeVendida || ''}</td>
    <td class="destaque">R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
  `;
  corpoTabelaFaturamento.appendChild(newFaturamentoRow);
});

}

// Chamando a função para preencher as tabelas ao carregar a página
preencherTabelaItensVendidos();
});

function redirecionar(pagina) {
  window.location.href = pagina;
}

// Função para criar os botões dentro da div lu-botão
function createButtons() {
  const luBotaoDiv = document.createElement('div');
  luBotaoDiv.classList.add('lu-botão');

  const botao1 = document.createElement('button');
  botao1.classList.add('botao1');
  botao1.textContent = 'Gerenciador de vendas';

  const botao2 = document.createElement('button');
  botao2.classList.add('botao2');
  botao2.textContent = 'Baixar Tabela';

  const botao3 = document.createElement('button');
  botao3.classList.add('botao3');
  botao3.textContent = 'Graficos do faturamento';

  const botao4 = document.createElement('button');
  botao4.classList.add('botao4');
  botao4.textContent = 'Como calcular o faturamento?';
  // Criando a div 'sair'
  const sairDiv = document.createElement('div');
  sairDiv.classList.add('sair');
  const sairText = document.createElement('p');
  sairText.classList.add('sair-text');
  sairText.textContent = 'Sair';
  sairDiv.appendChild(sairText);

  // Adicionando os botões e a div 'sair' à div 'lu-botão'
  luBotaoDiv.appendChild(botao1);
  luBotaoDiv.appendChild(botao2);
  luBotaoDiv.appendChild(botao3);
  luBotaoDiv.appendChild(botao4);
  luBotaoDiv.appendChild(sairDiv);

  return luBotaoDiv;
}

