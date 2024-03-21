function redirecionar(pagina) {
  window.location.href = pagina;
}

let tabelaOriginal;

// Função para inicializar a tabela original
document.addEventListener('DOMContentLoaded', function() {
  tabelaOriginal = document.querySelector('.styled-table').cloneNode(true);
});


document.addEventListener('DOMContentLoaded', function() {
  const semEstoqueButton = document.querySelector('.sem-estoque-button');
  const insuficienteButton = document.querySelector('.insuficiente-button');
  const comEstoqueButton = document.querySelector('.com-estoque-button');

  semEstoqueButton.addEventListener('click', function() {
    toggleButton(semEstoqueButton);
    filtrarItens();
  });

  insuficienteButton.addEventListener('click', function() {
    toggleButton(insuficienteButton);
    filtrarItens();
  });

  comEstoqueButton.addEventListener('click', function() {
    toggleButton(comEstoqueButton);
    filtrarItens();
  });

  function toggleButton(clickedButton) {
    const buttons = [semEstoqueButton, insuficienteButton, comEstoqueButton];
    buttons.forEach(function(button) {
      if (button !== clickedButton) {
        button.classList.remove('active');
      }
    });
    clickedButton.classList.toggle('active');
  }

  function filtrarItens() {
    const semEstoqueAtivo = semEstoqueButton.classList.contains('active');
    const insuficienteAtivo = insuficienteButton.classList.contains('active');
    const comEstoqueAtivo = comEstoqueButton.classList.contains('active');
  
    const linhasTabela = document.querySelectorAll('.styled-table tbody tr');
    linhasTabela.forEach(function(linha) {
      const classificacaoItem = linha.querySelector('td:nth-child(8)').textContent.trim();
      let exibirLinha = false;
  
      if (
        (semEstoqueAtivo && classificacaoItem === 'Sem Estoque') ||
        (insuficienteAtivo && classificacaoItem === 'Insuficiente') ||
        (comEstoqueAtivo && classificacaoItem === 'Com Estoque')
      ) {
        exibirLinha = true;
      } else if (!semEstoqueAtivo && !insuficienteAtivo && !comEstoqueAtivo) {
        exibirLinha = true;
      }
  
      if (exibirLinha) {
        linha.style.display = ''; // Exibir linhas correspondentes às classificações ativas ou todas as linhas se nenhum botão estiver ativo
      } else {
        linha.style.display = 'none'; // Esconder linhas que não correspondem às classificações ativas
      }
    });
  }
});

function pesquisar() {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  table = document.querySelector('.styled-table');
  tr = table.getElementsByTagName('tr');
  var resultados = [];

  for (i = 0; i < tr.length; i++) {
    td = tr[i].querySelectorAll('td:not(:last-child)'); // Seleciona todas as colunas exceto a última
    var found = false;
    for (j = 0; j < td.length; j++) {
      txtValue = td[j].textContent || td[j].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        found = true;
        break;
      }
    }
    if (found) {
      resultados.push(tr[i].outerHTML);
    }
  }

  var tabelaOriginal = document.querySelector('.styled-table');
  var tabelaResultado = document.createElement('table');
  tabelaResultado.className = 'styled-table';

  var thead = tabelaOriginal.querySelector('thead').cloneNode(true);
  tabelaResultado.appendChild(thead);

  var tbody = tabelaResultado.createTBody();
  for (i = 0; i < resultados.length; i++) {
    var newRow = tbody.insertRow();
    newRow.outerHTML = resultados[i];
  }

  tabelaOriginal.parentNode.replaceChild(tabelaResultado, tabelaOriginal);

  var imgX = document.querySelector('.imagem-x');
  imgX.style.display = 'block'; // Mostra a imagem após a pesquisa
  setTimeout(function() {
    imgX.style.opacity = '1'; // Altera gradualmente a opacidade para 1
  }, 100);
  
  imgX.addEventListener('click', function() {
    var tabelaResultado = document.querySelector('.styled-table'); // Seleciona a tabela de resultados
    tabelaResultado.parentNode.replaceChild(tabelaOriginal.cloneNode(true), tabelaResultado);
    imgX.style.opacity = '0'; // Oculta a imagem
  
    var campoPesquisa = document.getElementById('searchInput');
    campoPesquisa.value = '';
    setTimeout(function() {
      imgX.style.cursor = 'default'; // Define o cursor para o estado normal
    }, 100);
  
    // Remover classe 'active' de todos os botões
    const buttons = [semEstoqueButton, insuficienteButton, comEstoqueButton];
    buttons.forEach(function(button) {
      button.classList.remove('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const dadosPagamento = JSON.parse(localStorage.getItem('dadosPagamento')) || [];

  // Selecionar a tabela
  const tabelaRelatorio = document.getElementById('tabelaRelatorio');
  const tbody = tabelaRelatorio.querySelector('tbody');

  // Iterar sobre os itens vendidos e adicionar à tabela
  dadosPagamento.forEach((pagamento) => {
    pagamento.itensVendidos.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${item.codigo}</td>
      <td>${item.nomeItem}</td>
      <td>${item.valorUnitario}</td>
      <td>${item.quantidadeVendida}</td>
      <td>${item.total}</td>
      <td>${pagamento.dataHora}</td>
      <td>${item.feito}</td>`
      tbody.appendChild(row);
    });
  });
});

window.addEventListener('load', function() {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const tabelaCorpo = document.getElementById('tabelaCorpo');

  // Itera sobre a lista de produtos e cria uma nova linha para cada produto na 
  produtos.forEach(function(produto, index) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
    <td>${index + 1}</td>
    <td>${produto.codigoProduto ? produto.codigoProduto : 'Sem Código'}</td>
    <td>${produto.nomeProduto}</td>
    <td>${produto.descricaoProduto}</td>
    <td>${formatarValor(produto.valorProduto)}</td>
    <td>${produto.quantidadeEstoque}</td>
    <td>${formatarValor(produto.custoProduto)}</td>
    <td class="${getClassColor(getClassificacao(produto.quantidadeEstoque))}">
    ${getClassificacao(produto.quantidadeEstoque)}</td>
  `;
      // Adiciona um event listener para cada linha da tabela
      novaLinha.addEventListener('click', function() {
        // Ao clicar na linha, redirecione para produto.html, passando os dados do produto como parâmetros via URL
        const parametrosURL = `criarnovoproduto.html?codigo=${produto.codigoProduto}&nome=${encodeURIComponent(produto.nomeProduto)}&descricao=${encodeURIComponent(produto.descricaoProduto)}&valor=${encodeURIComponent(produto.valorProduto)}&quantidade=${produto.quantidadeEstoque}&custo=${encodeURIComponent(produto.custoProduto)}`;
        window.location.href = parametrosURL;
      });
    tabelaCorpo.appendChild(novaLinha);
  });

  function getClassificacao(quantidadeEstoque) {
    if (quantidadeEstoque <= 0) {
      return 'Sem Estoque';
    } else if (quantidadeEstoque < 10) {
      return 'Insuficiente';
    } else {
      return 'Com Estoque';
    }
  }

  function formatarValor(valor) {
    const numero = parseFloat(valor.replace(',', '.'));
    if (isNaN(numero)) {
      return valor; // Retorna o valor original se não for um número válido
    }
    const numeroFormatado = numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: numero % 1 === 0 ? 2 : 2
    });
    return numeroFormatado;
  }

  function getClassColor(classificacao) {
    if (classificacao === 'Sem Estoque') {
      return 'sem-estoque'; // Nome da classe para "Sem Estoque"
    } else if (classificacao === 'Insuficiente') {
      return 'insuficiente'; // Nome da classe para "Insuficiente"
    } else if (classificacao === 'Com Estoque') {
      return 'com-estoque'; // Nome da classe para "Com Estoque"
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var bellWrapper = document.querySelector(".bell-wrapper");
  var blurElement = document.querySelector(".blur");

  bellWrapper.addEventListener("click", function () {
    // Toggle a classe 'active' no elemento .blur
    blurElement.classList.toggle("active");

    // Verifica se a classe 'active' está presente no elemento .blur
    if (blurElement.classList.contains("active")) {
      // Cria uma div com alguns botões


      var buttonsDiv = document.createElement("div");
      buttonsDiv.className = "buttons-container";

      var detalheDiv = document.createElement("div");
      detalheDiv.className = "detalhe";
      
      // Criar um elemento h1
      var h1Element = document.createElement("h1");
      h1Element.className = "h1-d";
      h1Element.textContent = "Mais Funcionalidades...";

      var button1 = document.createElement("button");
      button1.innerText = "Gerenciador de vendas";
      button1.className = "generated-button";
      button1.onclick = function() {
        redirecionar('vendas.html');
    };

      var button2 = document.createElement("button");
      button2.innerText = "Gerenciador de compras";
      button2.className = "generated-button";
      button2.onclick = function() {
        redirecionar('regis-compra.html');
    };

      var button3 = document.createElement("button");
      button3.innerText = "Registrar perda ou devolução";
      button3.className = "generated-button";
      button3.onclick = function() {
        createAdditionalDivs(document.body);
      };

      var button4 = document.createElement("button");
      button4.innerText = "Registrar compra";
      button4.className = "generated-button";
      button4.onclick = function() {
        redirecionar('geren-comp.html');
    };

      var button5 = document.createElement("button");
      button5.innerText = "Baixar Tabela (Estoque)";
      button5.className = "generated-button";

      // Adiciona os botões à div
      buttonsDiv.appendChild(button1);
      buttonsDiv.appendChild(button2);
      buttonsDiv.appendChild(button3);
      buttonsDiv.appendChild(button4);
      buttonsDiv.appendChild(button5);
      detalheDiv.appendChild(h1Element);
      buttonsDiv.appendChild(detalheDiv);

      // Adiciona a div com os botões ao corpo do documento
      document.body.appendChild(buttonsDiv);
    } else {
      // Se a classe 'active' não estiver presente, remove a div com os botões
      var buttonsContainer = document.querySelector(".buttons-container");
      if (buttonsContainer) {
        buttonsContainer.remove();
      }
    }
  });
});


