document.addEventListener("DOMContentLoaded", function () {
  const inforOpcao = document.querySelector('.infor-opçao');
  const tabelaVendas = document.querySelector('.styled-table tbody');
  const totalP = document.querySelector('.valor');

  function calcularTotalCompra() {
    const linhas = tabelaVendas.querySelectorAll('tr');
    let totalCompra = 0;

    linhas.forEach(function (linha) {
      const colunas = linha.querySelectorAll('td');
      if (colunas.length > 0) {
        const totalItem = parseFloat(colunas[5].textContent.replace(/[^\d,-]/g, '').replace('.', '').replace(',', '.'));
        totalCompra += totalItem;
      }
    });

    return totalCompra;
  }

  function atualizarTotalCompra() {
    const totalCompra = calcularTotalCompra();
    const valorNumerico = totalCompra.toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    }).replace('R$', '').trim();
    totalP.textContent = valorNumerico;
  }

  // Evento para atualizar o total da compra sempre que houver alterações na tabela de vendas
  document.addEventListener('input', function (event) {
    if (event.target.classList.contains('QuantidadeInput')) {
      validarQuantidade(event.target);
      atualizarTotalCompra();
    }
  });
  document.addEventListener('input', function (event) {
    if (event.target.classList.contains('rectangle-quant')) {
      validarQuantidade(event.target);
      atualizarTotalCompra();
    }
  });


  // Adiciona um event listener para o botão Adicionar pelo Estoque
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('botao-1')) {
      // HTML a ser inserido na div infor-opção
      const htmlParaInserir = `
        <div class="tabela-scroll-1"> 
          <table class="styled-table-1"> 
            <thead>
              <tr>
                <th colspan="8">Estoque</th>
              </tr>
              <tr>
                <th>Nº</th>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor de venda</th>
                <th>Quantidade em estoque</th>
                <th>Custo do produto</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <button class="estoque-button">Ver Estoque Completo</button>
      `;
  
      // Insere o HTML dentro da div infor-opção
      inforOpcao.innerHTML = htmlParaInserir;
      const estoqueButton = document.querySelector('.estoque-button');
      estoqueButton.addEventListener('click', function() {
        window.location.href = 'estoque-venda.html';
      });
    }
    if (event.target.classList.contains('botao-2')) {
      const tabela = document.querySelector('.styled-table tbody');
      const quantidadeLinhas = tabela.querySelectorAll('tr').length;
    
      // Cria o HTML para as opções do select
      let htmlOpcoes = '';
      for (let i = 1; i <= quantidadeLinhas; i++) {
        htmlOpcoes += `<option value="${i}">Nº${i}</option>`;
      }
    
      // HTML para o botão-2
      const htmlParaInserir = `
        <button class="editar-q">Editar Quantidade</button>
        <select id="select-n" class="select-n">
          ${htmlOpcoes}
        </select>
        <input oninput="validarQuantidade(this)" type="number" id="Quantidade-Input" placeholder="Nova quantidade" class="QuantidadeInput">
      `;
    
      // Insere o HTML dos botões na div infor-opção
      inforOpcao.innerHTML = htmlParaInserir;
    
      // Adiciona um event listener ao botão 'Editar Quantidade'
      function renderizarTabela() {
        const tabelaVendas = document.querySelector('.styled-table tbody');
        const totalP = document.querySelector('.valor');
      
        // Limpar a tabela antes de renderizar os novos produtos
        tabelaVendas.innerHTML = '';
      
        // Obter os produtos salvos no armazenamento local
        const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];
      
        // Adicionar os produtos à tabela de vendas na página "Venda.html"
        produtosVenda.forEach(function (produto) {
          const novaLinha = document.createElement('tr');
          novaLinha.innerHTML = `
              <td>${produto.numero}</td>
              <td>${produto.codigo}</td>
              <td>${produto.nome}</td>
              <td>${produto.valorUnitario}</td>
              <td class="QuantidadeCell">${produto.quantidade}</td>
              <td style="color: #a178f1;">${calcularTotal(produto.valorUnitario, produto.quantidade)}</td>
          `;
          tabelaVendas.appendChild(novaLinha);
          
        });
      
        // Atualizar o total da compra
        const totalCompra = calcularTotalCompra();
        const valorNumerico = totalCompra.toLocaleString('pt-BR', {
          minimumFractionDigits: 2
        }).replace('R$', '').trim();
        totalP.textContent = valorNumerico;
      }
      
      // Chamar a função de renderização quando a página carregar
      window.addEventListener('load', function () {
        renderizarTabela();
      });
      
 // Adicionar um event listener ao botão 'Editar Quantidade'
const editarQButton = document.querySelector('.editar-q');
editarQButton.addEventListener('click', function () {
  const selectQuantidade = document.getElementById('select-n');
  const inputQuantidade = document.getElementById('Quantidade-Input');

  const indiceSelecionado = parseInt(selectQuantidade.value) - 1; // Índice baseado em 0
  const novaQuantidade = parseFloat(inputQuantidade.value);

  // Obter os produtos salvos no armazenamento local
  const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];

  if (indiceSelecionado >= 0 && indiceSelecionado < produtosVenda.length) {
    const numeroItemAlterado = produtosVenda[indiceSelecionado].numero;

    // Verificar se a quantidade foi alterada
    if (produtosVenda[indiceSelecionado].quantidade !== novaQuantidade) {
      inputQuantidade.value = '';
      alert(`Quantidade vendida do item Nº${numeroItemAlterado} foi alterada para ${novaQuantidade}`);
    }

    produtosVenda[indiceSelecionado].quantidade = novaQuantidade;
    localStorage.setItem('vendas', JSON.stringify(produtosVenda));

    // Chamar a função de renderização para atualizar a tabela
    renderizarTabela();
  }
});
    }
    
    if (event.target.classList.contains('botao-4')) {
      const tabela = document.querySelector('.styled-table tbody');
      const quantidadeLinhas = tabela.querySelectorAll('tr').length;

      // Cria o HTML para as opções do select
      let htmlOpcoes = '';
      for (let i = 1; i <= quantidadeLinhas; i++) {
        htmlOpcoes += `<option value="${i}">Nº${i}</option>`;
      }

      const htmlParaInserir = `
        <button class="del">Deletar Item</button>
        <select id="select-del" class="select-del">
           ${htmlOpcoes}
        </select>
      `;

      // Insere o HTML dos botões na div infor-opção
      inforOpcao.innerHTML = htmlParaInserir;

      // Adiciona um event listener ao botão 'Del' dentro do HTML inserido
      const delButton = document.querySelector('.del');
      delButton.addEventListener('click', function () {
        const selectDel = document.getElementById('select-del');
        const indiceSelecionado = parseInt(selectDel.value) - 1; // Índice baseado em 0

        // Remove a linha da tabela
        const tabelaVendas = document.querySelector('.styled-table tbody');
        const linhas = tabelaVendas.querySelectorAll('tr');
        if (indiceSelecionado >= 0 && indiceSelecionado < linhas.length) {
          linhas[indiceSelecionado].remove();
        }

        // Remove a entrada correspondente do armazenamento local
        const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];
        if (indiceSelecionado >= 0 && indiceSelecionado < produtosVenda.length) {
          produtosVenda.splice(indiceSelecionado, 1);
          localStorage.setItem('vendas', JSON.stringify(produtosVenda));

          // Atualiza os números nos índices no armazenamento local
          produtosVenda.forEach((produto, index) => {
            produto.numero = index + 1;
          });
          localStorage.setItem('vendas', JSON.stringify(produtosVenda));
        }

        // Atualiza o total da compra após a remoção
        atualizarTotalCompra();

        // Atualiza os números nas linhas restantes
        const linhasRestantes = tabelaVendas.querySelectorAll('tr');
        linhasRestantes.forEach((linha, index) => {
          const numeroCelula = linha.querySelector('td:first-child');
          numeroCelula.textContent = index + 1;
          // Atualiza o valor do seletor no caso de uma linha anterior ter sido removida
          if (numeroCelula.dataset.index) {
            numeroCelula.dataset.index = index + 1;
          }
        });
      });
    }
    if (event.target.classList.contains('botao-3')) {
      const htmlParaInserir = `
        <p class="text-lim"></p>
        <button class="limpar">Limpar Lista de Produtos</button>
      `;
  
      // Insere o HTML dos botões na div infor-opção
      inforOpcao.innerHTML = htmlParaInserir;
  
      // Event listener para o botão Limpar
      const limparBtn = document.querySelector('.limpar');
      limparBtn.addEventListener('click', function() {
        const tabelaVendas = document.querySelector('.styled-table tbody');
        tabelaVendas.innerHTML = ''; // Limpa o conteúdo da tabela de vendas
        localStorage.removeItem('vendas'); // Limpa os dados no armazenamento local

      });
    }



  });
});
window.addEventListener('load', function () {
  const tabelaVendas = document.querySelector('.styled-table tbody');
  const totalP = document.querySelector('.valor');
  const valorUnitarioP = document.querySelector('.valor-u');

  function calcularTotalCompra() {
    const linhas = tabelaVendas.querySelectorAll('tr'); // Seleciona todas as linhas da tabela
    let totalCompra = 0;
  
    // Percorre todas as linhas da tabela e soma os totais dos itens
    linhas.forEach(function (linha) {
      const colunas = linha.querySelectorAll('td');
      if (colunas.length > 0) {
        // Obtém o total do item na coluna 5 e substitui '.' por ''
        const totalItem = parseFloat(colunas[5].textContent.replace(/[^\d,-]/g, '').replace('.', '').replace(',', '.')); 
        totalCompra += totalItem; // Soma o total do item ao total da compra
      }
    });
  
    return totalCompra;
  }

  function atualizarTotalCompra() {
    const totalCompra = calcularTotalCompra();
  
    // Exibe o total da compra sem o símbolo da moeda
    const valorNumerico = totalCompra.toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    }).replace('R$', '').trim(); // Remove 'R$' e espaços em branco
  
    // Exibe o valor numérico formatado na respectiva <p class="valor">0,00</p>
    totalP.textContent = valorNumerico;
  }

  // Atualiza o total da compra ao carregar a página
  atualizarTotalCompra();
  function atualizarValorUnitario() {
    const linhas = tabelaVendas.querySelectorAll('tr');
    if (linhas.length > 0) {
      const ultimaLinha = linhas[linhas.length - 1]; // Obtém a última linha da tabela
      const colunas = ultimaLinha.querySelectorAll('td');

      if (colunas.length > 0) {
        const valorUnitario = colunas[3].textContent.trim(); // Obtém o valor unitário na coluna 3
        valorUnitarioP.textContent = valorUnitario.replace('R$', '').trim(); // Exibe o valor unitário sem 'R$' na <p class="valor-u">0,00</p>
      }
    }
  }

  // Atualiza o valor unitário ao carregar a página
  atualizarValorUnitario();
  // Evento para atualizar o total da compra sempre que houver alterações na tabela de vendas
  tabelaVendas.addEventListener('DOMSubtreeModified', function () {
    atualizarTotalCompra();
    atualizarValorUnitario();
  });
});

    window.addEventListener('load', function() {
  const tabelaVendas = document.querySelector('.styled-table tbody');
  const totalP = document.querySelector('.valor');

  // Obter os produtos salvos no armazenamento local
  const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];

  // Adicionar os produtos à tabela de vendas na página "Venda.html"
  produtosVenda.forEach(function(produto) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${produto.numero}</td>
        <td>${produto.codigo}</td>
        <td>${produto.nome}</td>
        <td>${produto.valorUnitario}</td>
        <td>${produto.quantidade}</td>
        <td style="color: #a178f1;">${calcularTotal(produto.valorUnitario, produto.quantidade)}</td>
    `;
    tabelaVendas.appendChild(novaLinha);
});

// Função para calcular o total do produto (valor unitário multiplicado pela quantidade)
function calcularTotal(valorUnitario, quantidade) {
  let valorNumerico = 0;
  let quantidadeNumerica = 0;

  if (typeof valorUnitario === 'string') {
    valorNumerico = parseFloat(valorUnitario.replace(/[^\d,]/g, '').replace(',', '.'));
  } else if (typeof valorUnitario === 'number') {
    valorNumerico = valorUnitario;
  }

  if (typeof quantidade === 'string') {
    quantidadeNumerica = parseFloat(quantidade.replace(/[^\d,.]/g, '').replace(',', '.'));
  } else if (typeof quantidade === 'number') {
    quantidadeNumerica = quantidade;
  }

  if (!isNaN(valorNumerico) && !isNaN(quantidadeNumerica)) {
    const total = valorNumerico * quantidadeNumerica;
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  } else {
    return 'Erro de cálculo';
  }
}




});

function redirecionar(pagina) {
  window.location.href = pagina;
}

function validarQuantidade(input) {
  // Remove caracteres não numéricos
  input.value = input.value.replace(/[^0-9]/g, '');

  // Obtém o valor do campo de entrada
  var valor = input.value;

  // Converte o valor para um número
  var numero = parseInt(valor, 10);

  // Verifica se o número é negativo
  if (numero <= 0 || isNaN(numero)) {
    alert("Por favor, insira apenas números acima de 1.");
    input.value = '';
  }
}

  document.addEventListener("DOMContentLoaded", function () {
    // Retrieve items from local storage
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Get the table body element
    const tabelaCorpo = document.getElementById("tabelaCorpo-3");

    // Function to format the value
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

    // Populate the table
    produtos.forEach((produto, index) => {
      const row = tabelaCorpo.insertRow(index);
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${produto.codigoProduto ? produto.codigoProduto : 'Sem Código'}</td>
        <td>${produto.nomeProduto}</td>
        <td>${produto.descricaoProduto}</td>
        <td>${formatarValor(produto.valorProduto)}</td>
        <td>${produto.quantidadeEstoque}</td>
        <td>${formatarValor(produto.custoProduto)}</td>
        <td class="${getClassColor(getClassificacao(produto.quantidadeEstoque))}">
          ${getClassificacao(produto.quantidadeEstoque)}
        </td>
      `;
    });
  });

// Função para atualizar a tabela com os dados do armazenamento local
function atualizarTabelaVendas() {
  const tabelaVendas = document.querySelector('.styled-table tbody');
  tabelaVendas.innerHTML = ''; // Limpa o conteúdo atual da tabela

  // Obter os produtos salvos no armazenamento local
  const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];

  // Adicionar os produtos à tabela de vendas na página "Venda.html"
  produtosVenda.forEach(function (produto) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${produto.numero}</td>
        <td>${produto.codigo}</td>
        <td>${produto.nome}</td>
        <td>${produto.valorUnitario}</td>
        <td>${produto.quantidade}</td>
        <td style="color: #a178f1;">${calcularTotal(produto.valorUnitario, produto.quantidade)}</td>
    `;
    tabelaVendas.appendChild(novaLinha);
  });

  // Atualiza os números na tabela
  atualizarNumerosNaTabela();
}

function calcularTotal(valorUnitario, quantidade) {
  let valorNumerico = 0;
  let quantidadeNumerica = 0;

  if (typeof valorUnitario === 'string') {
    valorNumerico = parseFloat(valorUnitario.replace(/[^\d,]/g, '').replace(',', '.'));
  } else if (typeof valorUnitario === 'number') {
    valorNumerico = valorUnitario;
  }

  if (typeof quantidade === 'string') {
    quantidadeNumerica = parseFloat(quantidade.replace(/[^\d,.]/g, '').replace(',', '.'));
  } else if (typeof quantidade === 'number') {
    quantidadeNumerica = quantidade;
  }

  if (!isNaN(valorNumerico) && !isNaN(quantidadeNumerica)) {
    const total = valorNumerico * quantidadeNumerica;
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  } else {
    return 'Erro de cálculo';
  }
}

// Função para atualizar os números nas linhas da tabela
function atualizarNumerosNaTabela() {
  const tabelaVendas = document.querySelector('.styled-table tbody');
  const linhas = tabelaVendas.querySelectorAll('tr');

  linhas.forEach((linha, index) => {
    const numeroCelula = linha.querySelector('td:first-child');
    numeroCelula.textContent = index + 1;
    // Atualiza o valor do seletor no caso de uma linha anterior ter sido removida
    if (numeroCelula.dataset.index) {
      numeroCelula.dataset.index = index + 1;
    }
  });
}

// Chame a função para atualizar a tabela assim que a página for carregada
window.addEventListener('load', function () {
  atualizarTabelaVendas();
});

function createProtDiv() {
  // Verificar se o input de código está vazio
  var inputCodigo = document.querySelector('.rectangle-codigo');
  if (!inputCodigo.value.trim()) {
    alert('Informe primeiro o código do item.');
    return; // Sair da função se o input estiver vazio
  }

  var inputQuantidade = document.querySelector('.rectangle-quant');
  if (!inputQuantidade.value.trim()) {
    alert('Quantidade ainda não informada.');
    return; // Sair da função se o input estiver vazio
  }

  // Create the main div with class "prot"
  var protDiv = document.createElement("div");
  protDiv.className = "prot";

  // Create the nested div with class "ad-b"
  var adBDiv = document.createElement("div");
  adBDiv.className = "ad-b";

  var circuloDiv = document.createElement("div");
  circuloDiv.className = "circulo-x";

  // Create the div with class "tabela-scroll"
  var tabelaScrollDiv = document.createElement("div");
  tabelaScrollDiv.className = "tabela-scroll";

  // Create the table with class "styled-table" and id "estoque-tabela"
  var table = document.createElement("table");
  table.className = "styled-table";
  table.id = "estoque-tabela";

  // Create the table header
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["Nº", "Código", "Nome", "Descrição", "Valor de venda", "Quantidade em estoque", "Classificação"];

  headers.forEach(function(headerText) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body with ID "tabelaCorpo-b2"
  var tbody = document.createElement("tbody");
  tbody.id = "tabelaCorpo-b2";

  // Append an empty row to the table body
  var emptyRow = document.createElement("tr");
  headers.forEach(function () {
    var td = document.createElement("td");
    emptyRow.appendChild(td);
  });
  tbody.appendChild(emptyRow);

  // Append the table body to the table
  table.appendChild(tbody);

  // Append the table to the "tabela-scroll" div
  tabelaScrollDiv.appendChild(table);

  // Append the "tabela-scroll" div to the "ad-b" div
  adBDiv.appendChild(tabelaScrollDiv);

  // Append the "ad-b" div to the "prot" div
  protDiv.appendChild(adBDiv);
  adBDiv.appendChild(circuloDiv);
  // Append the "prot" div to the body or another desired location
  document.body.appendChild(protDiv);

  // Add the "active" class to the blur element
  var blurElement = document.querySelector('.blur');
  if (blurElement) {
    blurElement.classList.add('active');
  }
  circuloDiv.addEventListener('click', function () {
    // Remove the "prot" div from the body
    document.body.removeChild(protDiv);
  
    // Remove the "active" class from the blur element
    var blurElement = document.querySelector('.blur');
    if (blurElement) {
      blurElement.classList.remove('active');
    }
  });
  // Get the table body element
  var tbody = document.getElementById('tabelaCorpo-b2');

  // Clear existing rows in the table body
  tbody.innerHTML = '';

  // Retrieve products from localStorage
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  console.log('produtos from localStorage:', produtos);

  // Iterate over the list of products and create a new row for each product in the table
  produtos.forEach(function (produto, index) {
    console.log('Adding product to table:', produto);

    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td>${index + 1}</td>
      <td>${produto.codigoProduto ? produto.codigoProduto : 'Sem Código'}</td>
      <td>${produto.nomeProduto}</td>
      <td>${produto.descricaoProduto}</td>
      <td>${formatarValor(produto.valorProduto)}</td>
      <td>${produto.quantidadeEstoque}</td>
      <td class="${getClassColor(getClassificacao(produto.quantidadeEstoque))}">
        ${getClassificacao(produto.quantidadeEstoque)}
      </td>
    `;
    // Append the new row to the table body
    tbody.appendChild(novaLinha);
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
// ...

// Adiciona um evento de clique em cada linha da tabela
// ...

// Adiciona um evento de clique em cada linha da tabela
tbody.addEventListener('click', function(event) {
  // Verifica se o clique foi em uma célula da linha (exceto na célula de número)
  if (event.target.tagName === 'TD' && event.target.cellIndex !== 0) {
    // Obtém o índice da linha clicada
    const rowIndex = event.target.parentNode.rowIndex - 1; // Subtrai 1 para descontar a linha vazia inicial

    // Recupera o produto correspondente ao índice na lista de produtos
    const produtoSelecionado = produtos[rowIndex];

    // Verifica se o produto foi encontrado
    if (produtoSelecionado) {
      // Verifica se a quantidade em estoque é suficiente para adicionar à venda
      if (produtoSelecionado.quantidadeEstoque <= 0) {
        alert('Não há este produto em estoque ou todos já foram adicionados, por isso não foi possível adicionar mais 1 do item na venda.');
        return;
      }

      // Obtém o valor do input de quantidade
      var inputQuantidade = document.querySelector('.rectangle-quant');
      var quantidadeSelecionada = parseInt(inputQuantidade.value, 10);

      // Verifica se o valor do input de quantidade é válido
      if (isNaN(quantidadeSelecionada) || quantidadeSelecionada <= 0) {
        alert('Informe uma quantidade válida.');
        return;
      }

      // Obtém a lista de vendas do armazenamento local
      const vendas = JSON.parse(localStorage.getItem('vendas')) || [];

      // Obtém a quantidade atual de produtos na lista de vendas
      const quantidadeProdutosVenda = vendas.length;

      // Calcula o novo número para o próximo produto na venda
      const novoNumero = quantidadeProdutosVenda + 1;
      // Adiciona o produto à lista de vendas no armazenamento local
      const produtoVenda = {
        codigo: produtoSelecionado.codigoProduto,
        nome: produtoSelecionado.nomeProduto,
        descricao: produtoSelecionado.descricaoProduto,
        valorUnitario: formatarValor(produtoSelecionado.valorProduto),
        quantidade: quantidadeSelecionada,
        numero: novoNumero,
        custoProduto: formatarValor(produtoSelecionado.custoProduto)
      };

      // Adiciona o novo produto à lista de vendas
      vendas.push(produtoVenda);

      // Atualiza o armazenamento local com a nova lista de vendas
      localStorage.setItem('vendas', JSON.stringify(vendas));

      // Exibe uma mensagem indicando que o produto foi adicionado às vendas
      alert(`Produto "${produtoVenda.nome}" adicionado na lista vendas com a quantidade de ${produtoVenda.quantidade}.`);
      atualizarTabelaVendas();
      inputQuantidade.value = '';
      document.querySelector('.rectangle-codigo').value = '';
      document.body.removeChild(protDiv);
  
      // Remove the "active" class from the blur element
      var blurElement = document.querySelector('.blur');
      if (blurElement) {
        blurElement.classList.remove('active');
      }
    }
  }
});

}
