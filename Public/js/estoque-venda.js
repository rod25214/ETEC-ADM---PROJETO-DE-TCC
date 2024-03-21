function redirecionar(pagina) {
    window.location.href = pagina;
  }

  window.addEventListener('load', function() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    const btnMostrarItensSemEstoque = document.getElementById('btnMostrarItensSemEstoque');
  
    function toggleLinhasSemEstoque() {
      const linhasSemEstoque = tabelaCorpo.getElementsByClassName('sem-estoque');
      for (let i = 0; i < linhasSemEstoque.length; i++) {
        const linha = linhasSemEstoque[i];
        linha.classList.toggle('hidden'); // Alternar a classe 'hidden'
      }
    }
  
    btnMostrarItensSemEstoque.addEventListener('click', function () {
      toggleLinhasSemEstoque();
      btnMostrarItensSemEstoque.textContent = btnMostrarItensSemEstoque.textContent === 'Ocultando Itens Sem Estoque' ?
        'Mostrando Itens Sem Estoque' :
        'Ocultando Itens Sem Estoque';
    });
  
    tabelaCorpo.addEventListener('click', function (event) {
      const elementoClicado = event.target;
      if (
        elementoClicado.tagName === 'TD' &&
        elementoClicado.parentNode.tagName === 'TR'
      ) {
        const linhaClicada = elementoClicado.parentNode;
        const colunas = linhaClicada.querySelectorAll('td');
        const quantidadeEstoque = parseInt(colunas[5].textContent);
    
        if (quantidadeEstoque <= 0) {
          event.stopPropagation(); // Impede a propagação do evento, evitando redirecionamento
          event.preventDefault(); // Evita a ação padrão do clique (neste caso, redirecionamento)
          alert('Não há este produto em estoque ou todos já foram adicionados, por isso não foi possível adicionar mais 1 do item na venda.');
        } else {
          const codigo = colunas[1].textContent;
          const nome = colunas[2].textContent;
          const valorUnitario = colunas[4].textContent;
    
          const produtoVenda = {
            codigo: codigo,
            nome: nome,
            valorUnitario: valorUnitario,
            quantidade: 1 // Defina a quantidade conforme necessário
          };
    
          const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
          produtoVenda.numero = vendas.length + 1;
          vendas.push(produtoVenda);
          localStorage.setItem('vendas', JSON.stringify(vendas));
    
          setTimeout(() => {
            window.location.href = 'Venda.html';
          });
        }
      }
    });
    
  
    // Função para determinar a classificação do estoque
    function getClassificacao(quantidadeEstoque) {
      if (quantidadeEstoque <= 0) {
        return 'Sem Estoque';
      } else if (quantidadeEstoque < 10) {
        return 'Insuficiente';
      } else {
        return 'Com Estoque';
      }
    }

  
    produtos.forEach(function(produto, index) {
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
      if (getClassificacao(produto.quantidadeEstoque) === 'Sem Estoque') {
        novaLinha.classList.add('sem-estoque');
        if (btnMostrarItensSemEstoque.textContent === 'Ocultar Itens Sem Estoque') {
          novaLinha.classList.add('hidden');
        }
      }
      tabelaCorpo.appendChild(novaLinha);
    });
  
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

  let tabelaOriginal;

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

window.addEventListener('load', function() {
  const tabelaVendas = document.querySelector('.styled-table-2 tbody');
  const totalP = document.querySelector('.valor');

  // Obter os produtos vendidos salvos no armazenamento local
  const produtosVenda = JSON.parse(localStorage.getItem('vendas')) || [];

  // Adicionar os produtos à tabela de vendas na página "Venda.html"
  produtosVenda.forEach(function(produto) {
    const tabelaProdutos = document.getElementById('tabelaCorpo');
    const linhasProdutos = tabelaProdutos.getElementsByTagName('tr');
    let produtoExistente = false;

    // Verificar se o produto já está na tabela de vendas
    for (let i = 0; i < tabelaVendas.rows.length; i++) {
      const colunas = tabelaVendas.rows[i].querySelectorAll('td');
      const codigoProdutoVenda = colunas[1].textContent;

      if (codigoProdutoVenda === produto.codigo) {
        // O produto já está na tabela, apenas incrementar a quantidade
        const quantidadeAtual = parseInt(colunas[4].textContent);
        const novaQuantidade = quantidadeAtual + produto.quantidade;
        colunas[4].textContent = novaQuantidade; // Atualizar a quantidade na tabela
        produtoExistente = true;
        break;
      }
    }

    if (!produtoExistente) {
      // Adicionar o produto à tabela de vendas
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
    }

    // Reduzir a quantidade em estoque do produto vendido na tabela de produtos
    for (let i = 0; i < linhasProdutos.length; i++) {
      const colunas = linhasProdutos[i].querySelectorAll('td');
      const codigoProduto = colunas[1].textContent;

      if (codigoProduto === produto.codigo) {
        const quantidadeVendida = produto.quantidade;
        const quantidadeEstoque = parseInt(colunas[5].textContent);
        if (quantidadeEstoque >= quantidadeVendida) {
          const novaQuantidadeEstoque = quantidadeEstoque - quantidadeVendida;
          colunas[5].textContent = `${novaQuantidadeEstoque} + Produtos que já estão registrados na venda`;// Reduz a quantidade em estoque pela quantidade vendida
        } else {
          // Lidar com o caso em que a quantidade vendida é maior que o estoque disponível (pode ser um erro ou situação excepcional)
          console.error('Erro: Quantidade vendida maior que o estoque disponível.');
        }
        break; // Encerrar a busca após encontrar o produto
      }
    }
  });

  // Função para calcular o total do produto (valor unitário multiplicado pela quantidade)
  function calcularTotal(valorUnitario, quantidade) {
    const valorNumerico = parseFloat(valorUnitario.replace(/[^\d.,-]/g, '').replace(',', '.'));
    const total = valorNumerico * quantidade;
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  }
});



