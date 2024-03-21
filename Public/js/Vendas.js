window.addEventListener('load', function () {
  const tabela = document.getElementById('ta1'); // Obtém a referência da tabela na página 'home.html'

  // Recupera os dados de pagamentos salvos do armazenamento local
  const dadosPagamento = JSON.parse(localStorage.getItem('dadosPagamento'));

  if (dadosPagamento && dadosPagamento.length > 0) {
    // Se houver dados de pagamento salvos, percorre a lista e exibe na tabela
    dadosPagamento.forEach(function (pagamento, index) {
      const newRow = tabela.insertRow(); // Cria uma nova linha na tabela

      // Insere os valores do pagamento nas células correspondentes
      newRow.insertCell(0).textContent = index + 1; // Índice corrigido para começar de 1
      newRow.insertCell(1).textContent = pagamento.codigoVenda; // Corrige para usar o código de venda
      newRow.insertCell(2).textContent = pagamento.dataHora;
      newRow.insertCell(3).textContent = 'R$ ' + formatarValor(pagamento.valorDaCompra);
      newRow.insertCell(4).textContent = pagamento.funcionario;

      // Adiciona um link na última célula para mais informações
      const cellFuncionario = newRow.insertCell(5); // Corrige o índice para a célula do link
      const linkMaisInformacoes = document.createElement('a');
      linkMaisInformacoes.textContent = "Mais informações";
      linkMaisInformacoes.classList.add('link');
      linkMaisInformacoes.href = "#"; // Adicione aqui a URL ou o comportamento desejado
      cellFuncionario.appendChild(linkMaisInformacoes);
    });
  } else {
    // Se não houver dados de pagamento salvos, exibe uma mensagem na tabela
    const newRow = tabela.insertRow(); // Cria uma nova linha na tabela
    const cellMessage = newRow.insertCell(0); // Cria uma célula para a mensagem
    cellMessage.colSpan = 6; // Define a coluna para ocupar todas as colunas da tabela
    cellMessage.textContent = 'Nenhum pagamento registrado.'; // Mensagem de aviso
  }
});

function formatarValor(valor) {
  return parseFloat(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
  
// Função para criar os botões dentro da div lu-botão
function createButtons() {
  const luBotaoDiv = document.createElement('div');
  luBotaoDiv.classList.add('lu-botão');

  const botao1 = document.createElement('button');
  botao1.classList.add('botao1');
  botao1.textContent = 'Adicionar Item';

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

  function redirecionar(pagina) {
    window.location.href = pagina;
  }