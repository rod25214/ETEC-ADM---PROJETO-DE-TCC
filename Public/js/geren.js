function redirecionar(pagina) {
    window.location.href = pagina;
  }

  window.addEventListener('load', function() {
  exibirItensSalvos();
  });

  function createProtDiv() {
  // Obtenha o valor do input de descrição
  var descricaoInputValue = document.getElementById('descricaoInput').value;

  // Verifique se o campo de descrição está vazio
  if (descricaoInputValue.trim() === '') {
    // Mostre um alerta se o campo de descrição estiver vazio
    alert('Por favor, preencha o campo de descrição do produto antes de realizar essa pesquisa.');
    return;
  }

  var protDiv = document.createElement("div");
  protDiv.className = "prot";

  // Create the nested div with class "ad-b"
  var adBDiv = document.createElement("div");
  adBDiv.className = "ad-b";

  var circuloDiv = document.createElement("div");
  circuloDiv.className = "circulo-x";

  var avisoDiv = document.createElement("div");
  avisoDiv.className = "aviso-div";

  const textWrapper7Div = document.createElement('div');
  textWrapper7Div.classList.add('text-wrapper-7b');
  textWrapper7Div.textContent = 'Filtrado pela descrição';

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
  adBDiv.appendChild(avisoDiv);
  avisoDiv.appendChild(textWrapper7Div);
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
  var tabela = document.getElementById('estoque-tabela');
  var linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  // Itere sobre as linhas da tabela para filtrar com base na descrição
  for (var i = 0; i < linhas.length; i++) {
    var descricaoTabela = linhas[i].getElementsByTagName('td')[3].textContent.toLowerCase();
  
    // Verifique se a descrição na tabela contém o texto inserido no input (ignorando maiúsculas e minúsculas)
    if (descricaoTabela.includes(descricaoInputValue.toLowerCase())) {
      // Se a descrição corresponder, exiba a linha
      linhas[i].style.display = '';
    } else {
      // Se a descrição não corresponder, oculte a linha
      linhas[i].style.display = 'none';
    }
  }
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

  tbody.addEventListener('click', function(event) {
    // Verifica se o clique foi em uma célula da linha (exceto na célula de número)
    if (event.target.tagName === 'TD' && event.target.cellIndex !== 0) {
      // Obtém os valores da célula clicada
      const nomeClicado = event.target.parentNode.querySelector('td:nth-child(3)').textContent;
      const codigoClicado = event.target.parentNode.querySelector('td:nth-child(2)').textContent;
      const descricaoClicada = event.target.parentNode.querySelector('td:nth-child(4)').textContent;

      document.getElementById('descricaoInput').value = descricaoClicada;
      document.getElementById('nomeprodutoInput').value = nomeClicado;
      document.getElementById('codigoInput').value = codigoClicado;
      
      // Chama a função buscarProduto após definir os valores nos inputs
      buscarProduto();
      
      // Remove a div "prot" e a classe "active" do blur element
      document.body.removeChild(protDiv);
      var blurElement = document.querySelector('.blur');
      if (blurElement) {
        blurElement.classList.remove('active');
      }
    }    
  
  });

}

function createProtDiv1() {
  // Obtenha o valor do input de descrição
  var descricaoInputValue = document.getElementById('codigoInput').value;

  // Verifique se o campo de descrição está vazio
  if (descricaoInputValue.trim() === '') {
    // Mostre um alerta se o campo de descrição estiver vazio
    alert('Por favor, preencha o campo de código do produto antes de realizar essa pesquisa.');
    return;
  }

  var protDiv = document.createElement("div");
  protDiv.className = "prot";

  // Create the nested div with class "ad-b"
  var adBDiv = document.createElement("div");
  adBDiv.className = "ad-b";

  var circuloDiv = document.createElement("div");
  circuloDiv.className = "circulo-x";

  var avisoDiv = document.createElement("div");
  avisoDiv.className = "aviso-div";

  const textWrapper7Div = document.createElement('div');
  textWrapper7Div.classList.add('text-wrapper-7b');
  textWrapper7Div.textContent = 'Filtrado pelo código';

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
  adBDiv.appendChild(avisoDiv);
  avisoDiv.appendChild(textWrapper7Div);
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
  var tabela = document.getElementById('estoque-tabela');
  var linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  // Itere sobre as linhas da tabela para filtrar com base na descrição
  for (var i = 0; i < linhas.length; i++) {
    var descricaoTabela = linhas[i].getElementsByTagName('td')[1].textContent.toLowerCase();
  
    // Verifique se a descrição na tabela contém o texto inserido no input (ignorando maiúsculas e minúsculas)
    if (descricaoTabela.includes(descricaoInputValue.toLowerCase())) {
      // Se a descrição corresponder, exiba a linha
      linhas[i].style.display = '';
    } else {
      // Se a descrição não corresponder, oculte a linha
      linhas[i].style.display = 'none';
    }
  }
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

  tbody.addEventListener('click', function(event) {
    // Verifica se o clique foi em uma célula da linha (exceto na célula de número)
    if (event.target.tagName === 'TD' && event.target.cellIndex !== 0) {
      // Obtém os valores da célula clicada
      const nomeClicado = event.target.parentNode.querySelector('td:nth-child(3)').textContent;
      const codigoClicado = event.target.parentNode.querySelector('td:nth-child(2)').textContent;
      const descricaoClicada = event.target.parentNode.querySelector('td:nth-child(4)').textContent;

      document.getElementById('descricaoInput').value = descricaoClicada;
      document.getElementById('nomeprodutoInput').value = nomeClicado;
      document.getElementById('codigoInput').value = codigoClicado;
      
      // Chama a função buscarProduto após definir os valores nos inputs
      buscarProduto();
      
      // Remove a div "prot" e a classe "active" do blur element
      document.body.removeChild(protDiv);
      var blurElement = document.querySelector('.blur');
      if (blurElement) {
        blurElement.classList.remove('active');
      }
    }    
  
  });

}

function createProtDiv2() {
  // Obtenha o valor do input de descrição
  var descricaoInputValue = document.getElementById('nomeprodutoInput').value;

  // Verifique se o campo de descrição está vazio
  if (descricaoInputValue.trim() === '') {
    // Mostre um alerta se o campo de descrição estiver vazio
    alert('Por favor, preencha o campo de nome do produto antes de realizar essa pesquisa.');
    return;
  }

  var protDiv = document.createElement("div");
  protDiv.className = "prot";

  // Create the nested div with class "ad-b"
  var adBDiv = document.createElement("div");
  adBDiv.className = "ad-b";

  var circuloDiv = document.createElement("div");
  circuloDiv.className = "circulo-x";

  var avisoDiv = document.createElement("div");
  avisoDiv.className = "aviso-div";

  const textWrapper7Div = document.createElement('div');
  textWrapper7Div.classList.add('text-wrapper-7b');
  textWrapper7Div.textContent = 'Filtrado pelo nome';

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
  adBDiv.appendChild(avisoDiv);
  avisoDiv.appendChild(textWrapper7Div);
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
  var tabela = document.getElementById('estoque-tabela');
  var linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  // Itere sobre as linhas da tabela para filtrar com base na descrição
  for (var i = 0; i < linhas.length; i++) {
    var descricaoTabela = linhas[i].getElementsByTagName('td')[2].textContent.toLowerCase();
  
    // Verifique se a descrição na tabela contém o texto inserido no input (ignorando maiúsculas e minúsculas)
    if (descricaoTabela.includes(descricaoInputValue.toLowerCase())) {
      // Se a descrição corresponder, exiba a linha
      linhas[i].style.display = '';
    } else {
      // Se a descrição não corresponder, oculte a linha
      linhas[i].style.display = 'none';
    }
  }
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

  tbody.addEventListener('click', function(event) {
    // Verifica se o clique foi em uma célula da linha (exceto na célula de número)
    if (event.target.tagName === 'TD' && event.target.cellIndex !== 0) {
      // Obtém os valores da célula clicada
      const nomeClicado = event.target.parentNode.querySelector('td:nth-child(3)').textContent;
      const codigoClicado = event.target.parentNode.querySelector('td:nth-child(2)').textContent;
      const descricaoClicada = event.target.parentNode.querySelector('td:nth-child(4)').textContent;

      document.getElementById('descricaoInput').value = descricaoClicada;
      document.getElementById('nomeprodutoInput').value = nomeClicado;
      document.getElementById('codigoInput').value = codigoClicado;
      
      // Chama a função buscarProduto após definir os valores nos inputs
      buscarProduto();
      
      // Remove a div "prot" e a classe "active" do blur element
      document.body.removeChild(protDiv);
      var blurElement = document.querySelector('.blur');
      if (blurElement) {
        blurElement.classList.remove('active');
      }
    }    
  
  });

}

function buscarProduto() {
  // Obtém o valor do input de código
  var codigoInputValue = document.getElementById("codigoInput").value;

  // Obtém a lista de produtos armazenada localmente
  var listaProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Procura o produto com o código correspondente na lista
  var produtoEncontrado = listaProdutos.find(function (produto) {
    return produto.codigoProduto === codigoInputValue;
  });

  // Se o produto for encontrado, exibe as informações
  if (produtoEncontrado) {
    // Exibe as informações correspondentes nos elementos HTML
    document.querySelector(".text-wrapper-estoque").innerText = produtoEncontrado.quantidadeEstoque;
    document.querySelector(".text-wrapper-preço").innerText = formatarValor(produtoEncontrado.valorProduto);
document.querySelector(".text-wrapper-custo").innerText = formatarValor(produtoEncontrado.custoProduto);

document.getElementById('lug-i1-Input').value = produtoEncontrado.valorProduto;
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
}

function registrarNaLista() {
  var quantidadeEstoque = document.querySelector(".text-wrapper-estoque").innerText.trim();

  // Verificar se há algo escrito na <div class="text-wrapper-estoque"></div>
  if (quantidadeEstoque === '') {
    // Se não houver, exibir uma mensagem de erro (opcional)
    alert('Por favor, selecione um produto antes de registrar na lista de compras.');
    return; // Abortar a execução da função
  }

  // Obter os valores dos campos relevantes
  var codigo = document.getElementById('codigoInput').value;
  var nome = document.getElementById('nomeprodutoInput').value;
  var descricao = document.getElementById('descricaoInput').value;
  var novoPrecoVenda = document.getElementById('lug-i1-Input').value;
  var quantidadeComprada = document.getElementById('lug-i2-Input').value;
  var custoUnitarioComprado = document.getElementById('lug-i3-Input').value;

  // Obter os valores das divs relevantes
  var precoAtual = document.querySelector(".text-wrapper-preço").textContent.trim();
  var quantidadeAtual = document.querySelector(".text-wrapper-estoque").textContent.trim();
  var custoAtual = document.querySelector(".text-wrapper-custo").textContent.trim();

  // Verificar se os campos estão vazios
  if (nome.trim() === '' || novoPrecoVenda.trim() === '' || quantidadeComprada.trim() === '' || custoUnitarioComprado.trim() === '') {
    // Exibir uma mensagem de erro (opcional)
    alert('Por favor, preencha todos os campos para registrar a compras.');
    return; // Abortar a execução da função
  }

  // Criar um objeto representando o novo item da lista de compras
  var novoItemCompra = {
    codigo: codigo,
    nome: nome,
    descricao: descricao,
    novoPrecoVenda: novoPrecoVenda,
    quantidadeComprada: quantidadeComprada,
    custoUnitarioComprado: custoUnitarioComprado,
    precoAtual: precoAtual,
    quantidadeAtual: quantidadeAtual,
    custoAtual: custoAtual
  };

  // Obter a lista de compras do armazenamento local ou criar uma nova se não existir
  var listaCompras = JSON.parse(localStorage.getItem('ListaCompra')) || [];

  // Adicionar o novo item à lista de compras
  listaCompras.push(novoItemCompra);

  // Armazenar a lista de compras atualizada no armazenamento local
  localStorage.setItem('ListaCompra', JSON.stringify(listaCompras));

  // Limpar os campos após o registro na lista
  document.getElementById('codigoInput').value = '';
  document.getElementById('nomeprodutoInput').value = '';
  document.getElementById('descricaoInput').value = '';
  document.getElementById('lug-i1-Input').value = '';
  document.getElementById('lug-i2-Input').value = '';
  document.getElementById('lug-i3-Input').value = '';

  exibirItensSalvos();// Exibir uma mensagem de sucesso (opcional)
  alert('Item registrado na lista de compras com sucesso!');
  limparInformacoes();
}

document.addEventListener('DOMContentLoaded', function () {
  // Adicione um evento de escuta ao input de nome
  var nomeInput = document.getElementById('nomeprodutoInput');
  nomeInput.addEventListener('input', limparInformacoes);

      // Adicione um evento de escuta ao input de código
      var codigoInput = document.getElementById('codigoInput');
      codigoInput.addEventListener('input', limparInformacoes);
  
      // Adicione um evento de escuta ao input de descrição
      var descricaoInput = document.getElementById('descricaoInput');
      descricaoInput.addEventListener('input', limparInformacoes);
});

function exibirItensSalvos() {
  // Obter a tabela da compra e seu corpo
  var tabelaCompra = document.getElementById('compra-tabela');
  var corpoTabelaCompra = document.getElementById('tabelaCorpo-compra');

  // Limpar o corpo da tabela antes de exibir os itens
  corpoTabelaCompra.innerHTML = '';

  // Obter a lista de compras do armazenamento local
  var listaCompras = JSON.parse(localStorage.getItem('ListaCompra')) || [];

  // Iterar sobre a lista de compras e adicionar as linhas à tabela
  listaCompras.forEach(function (item, index) {
    var linha = corpoTabelaCompra.insertRow();

    // Adicionar as células com os dados do item
    linha.insertCell(0).textContent = index + 1; // Número do item
    linha.insertCell(1).textContent = limitarTexto(item.codigo, 4);
    linha.insertCell(2).textContent = limitarTexto(item.nome, 4);
    linha.insertCell(3).textContent =  formatarValor(item.custoUnitarioComprado);
    linha.insertCell(4).textContent = item.quantidadeComprada;

    // Calcular o total (Custo Unit. * Quant. Comprada)
    var total = parseFloat(item.custoUnitarioComprado.replace(',', '.')) * parseInt(item.quantidadeComprada);
    linha.insertCell(5).textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  });

  function limitarTexto(texto, limite) {
    if (texto.length > limite) {
      return texto.substring(0, limite) + '...';
    }
    return texto;
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
}

document.addEventListener('DOMContentLoaded', function () {
  
  // Adicione um evento de clique ao botão salvarBtn
  var salvarBtn = document.getElementById('salvarBtn');
  salvarBtn.addEventListener('click', salvarCompra);

  // Função para salvar a compra em outro armazenamento local com a chave gerenCompra
  function salvarCompra() {
    // Obter a lista de compras do armazenamento local com a chave ListaCompra
    var listaCompras = JSON.parse(localStorage.getItem('ListaCompra')) || [];

    // Verificar se há itens na lista de compras
    if (listaCompras.length === 0) {
      alert('A lista de compras está vazia. Adicione itens antes de salvar.');
      return;
    }

    // Obter a data e horário do clique
    var dataHoraAtual = new Date();
    var dataHoraFormatada = dataHoraAtual.toLocaleString();

    // Gerar um código único para a compra
    var codigoCompra = gerarCodigoUnico();

    // Calcular o total da compra
    var totalCompra = calcularTotalCompra(listaCompras);

    // Obter a lista de compras do armazenamento local com a chave gerenCompra
    var listaGerenCompra = JSON.parse(localStorage.getItem('gerenCompra')) || [];

    // Certificar-se de que listaGerenCompra seja sempre um array
    if (!Array.isArray(listaGerenCompra)) {
      listaGerenCompra = [];
    }

    // Criar um objeto representando a compra a ser salva
    var compraParaSalvar = {
      codigoCompra: codigoCompra,
      dataHora: dataHoraFormatada,
      listaCompras: listaCompras,
      totalCompra: totalCompra
    };

    // Adicionar a compra à lista de compras do gerenCompra
    listaGerenCompra.push(compraParaSalvar);

    // Armazenar a lista de compras do gerenCompra no armazenamento local
    localStorage.setItem('gerenCompra', JSON.stringify(listaGerenCompra));

    listaCompras.forEach(function (itemCompra) {
      // Encontrar o produto correspondente no armazenamento local
      var produtoArmazenado = JSON.parse(localStorage.getItem('produtos')) || [];
  
      var produtoIndex = produtoArmazenado.findIndex(function (produto) {
        return produto.codigoProduto === itemCompra.codigo;
      });
  
      // Se o produto for encontrado no armazenamento local, atualize a quantidade em estoque e o valor do produto
      if (produtoIndex !== -1) {
        // Converter as quantidades para números
        var quantidadeComprada = parseInt(itemCompra.quantidadeComprada);
        var quantidadeEstoqueAtual = parseInt(produtoArmazenado[produtoIndex].quantidadeEstoque);
        var novoPrecoVenda = parseFloat(itemCompra.novoPrecoVenda.replace(',', '.'));
  
        // Somar as quantidades e atualizar o valor do produto
        var novaQuantidadeEstoque = quantidadeEstoqueAtual + quantidadeComprada;
        var novoValorProduto = novoPrecoVenda; // Pode haver lógica adicional aqui se necessário
  
        // Atualizar a quantidade em estoque e o valor do produto no produto do armazenamento local
        produtoArmazenado[produtoIndex].quantidadeEstoque = novaQuantidadeEstoque;
        produtoArmazenado[produtoIndex].valorProduto = novoValorProduto;
  
        // Atualizar o armazenamento local com os produtos modificados
        localStorage.setItem('produtos', JSON.stringify(produtoArmazenado));
      }
    });
  
    alert('Compra salva com sucesso em gerenCompra. Código da compra: ' + codigoCompra);
  window.location.href = "seuproduto.html";
    localStorage.removeItem('ListaCompra');
    exibirItensSalvos(); // Adapte conforme necessário
  }

  // Função para calcular o total da compra
  function calcularTotalCompra(listaCompras) {
    var totalCompra = 0;

    listaCompras.forEach(function (item) {
      var totalItem = parseFloat(item.custoUnitarioComprado.replace(',', '.')) * parseInt(item.quantidadeComprada);
      totalCompra += totalItem;
    });

    return totalCompra;
  }

    // Função para gerar um código único
    function gerarCodigoUnico() {
      // Gere um número aleatório de 6 dígitos
      var numeroAleatorio = Math.floor(100000 + Math.random() * 900000);
      
      // Converta o número para uma string e adicione algumas letras
      var codigoUnico = numeroAleatorio.toString() + gerarLetrasAleatorias();
  
      return codigoUnico;
    }
  
    // Função para gerar algumas letras aleatórias
    function gerarLetrasAleatorias() {
      var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var resultado = '';
      
      for (var i = 0; i < 2; i++) {
        resultado += letras.charAt(Math.floor(Math.random() * letras.length));
      }
      
      return resultado;
    }
});

function limparInformacoes() {
  // Limpa as informações nos elementos HTML
  document.querySelector(".text-wrapper-estoque").innerText = '';
  document.querySelector(".text-wrapper-preço").innerText = '';
  document.querySelector(".text-wrapper-custo").innerText = '';
}

function createProtDiv3() {

  var protDiv = document.createElement("div");
  protDiv.className = "prot";

  // Create the nested div with class "ad-b"
  var adBDiv = document.createElement("div");
  adBDiv.className = "ad-b";

  var circuloDiv = document.createElement("div");
  circuloDiv.className = "circulo-x";

  var avisoDiv = document.createElement("div");
  avisoDiv.className = "aviso-div";

  const textWrapper7Div = document.createElement('div');
  textWrapper7Div.classList.add('text-wrapper-7b');
  textWrapper7Div.textContent = 'Filtrado pela descrição';

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
  adBDiv.appendChild(avisoDiv);
  avisoDiv.appendChild(textWrapper7Div);
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

  tbody.addEventListener('click', function(event) {
    // Verifica se o clique foi em uma célula da linha (exceto na célula de número)
    if (event.target.tagName === 'TD' && event.target.cellIndex !== 0) {
      // Obtém os valores da célula clicada
      const nomeClicado = event.target.parentNode.querySelector('td:nth-child(3)').textContent;
      const codigoClicado = event.target.parentNode.querySelector('td:nth-child(2)').textContent;
      const descricaoClicada = event.target.parentNode.querySelector('td:nth-child(4)').textContent;

      document.getElementById('descricaoInput').value = descricaoClicada;
      document.getElementById('nomeprodutoInput').value = nomeClicado;
      document.getElementById('codigoInput').value = codigoClicado;
      
      // Chama a função buscarProduto após definir os valores nos inputs
      buscarProduto();
      
      // Remove a div "prot" e a classe "active" do blur element
      document.body.removeChild(protDiv);
      var blurElement = document.querySelector('.blur');
      if (blurElement) {
        blurElement.classList.remove('active');
      }
    }    
  
  });

}