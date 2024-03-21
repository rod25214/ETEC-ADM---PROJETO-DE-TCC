window.addEventListener('load', function() {
  const params = new URLSearchParams(window.location.search);
  const codigoProduto = params.get('codigo');
  const nomeProduto = params.get('nome');
  const descricaoProduto = params.get('descricao');
  const valorProduto = params.get('valor');
  const quantidadeEstoque = params.get('quantidade');
  const custoProduto = params.get('custo');
 // Função para limitar o tamanho do texto e adicionar "..." se for muito grande
  function limitarTexto(texto, limite) {
    if (texto.length > limite) {
      return texto.substring(0, limite) + '...';
    }
    return texto;
  }

  
  document.querySelector('.text-wrapper-2').textContent = limitarTexto(nomeProduto, 14);

  const descricaoElement = document.querySelector('.lorem-ipsum-is');
  const blurElement = document.querySelector('.a');
  const imgElement = document.querySelector('.image');

  if (descricaoElement && blurElement && imgElement) {
    descricaoElement.addEventListener('click', toggleBlurAndCancelButton);
    imgElement.addEventListener('click', toggleBlurAndCancelButton);
    document.body.addEventListener('click', removeBlurAndCancelButton);
  }

  function toggleBlurAndCancelButton() {
    blurElement.classList.toggle('active');
    toggleCancelButton();
    toggleFundoOverlay();
  }

  function toggleCancelButton() {
    const cancelImg = document.querySelector('.cancel-img');
    if (!cancelImg && blurElement.classList.contains('active')) {
      createCancelButton();
    } else if (cancelImg && !blurElement.classList.contains('active')) {
      removeCancelButton();
    }
  }

  function toggleFundoOverlay() {
    const fundoElement = document.querySelector('.fundo');
    if (!fundoElement && blurElement.classList.contains('active')) {
      createFundoOverlay();
    } else if (fundoElement && !blurElement.classList.contains('active')) {
      removeFundoOverlay();
    }
  }

  function createFundoOverlay(nomeCompleto, descricaoCompleta, codigoCompleto) {
    const fundoDiv = document.createElement('div');
    fundoDiv.classList.add('fundo');
  
    const textoDescricaoDiv = document.createElement('div');
    textoDescricaoDiv.classList.add('texto-descrição');
    const descricaoP = document.createElement('p');
    descricaoP.classList.add('descrição-titulo');
    descricaoP.textContent = 'Descrição completa:'; // Texto "Descrição completa" adicionado aqui
    textoDescricaoDiv.appendChild(descricaoP);
    fundoDiv.appendChild(textoDescricaoDiv);
  
    const textoNomeDiv = document.createElement('div');
    textoNomeDiv.classList.add('texto-nome');
    const nomeP = document.createElement('p');
    nomeP.classList.add('nome-titulo');
    nomeP.textContent = 'Nome completa:';
    textoNomeDiv.appendChild(nomeP);
    fundoDiv.appendChild(textoNomeDiv);
  
    const textoCodiDiv = document.createElement('div');
    textoCodiDiv.classList.add('texto-codi');
    const codiP = document.createElement('p');
    codiP.classList.add('codi-titulo');
    codiP.textContent = 'Código completa:';
    textoCodiDiv.appendChild(codiP);
    fundoDiv.appendChild(textoCodiDiv);
  
    document.body.appendChild(fundoDiv);
  }

  function removeBlurAndCancelButton(event) {
    const cancelImg = document.querySelector('.cancel-img');
    if (cancelImg && (event.target === cancelImg || event.target.closest('.cancel-img'))) {
      blurElement.classList.remove('active');
      removeCancelButton();
      removeFundoOverlay();
    }
  }

  if (descricaoElement && descricaoProduto) {
    descricaoElement.textContent = limitarTexto(descricaoProduto, 200); // Limite de 200 caracteres para a descrição
  }

  const valorProdutoElement = document.querySelector('.text-wrapper-4');

  if (valorProdutoElement && valorProduto) {
    valorProdutoElement.textContent = formatarValor(valorProduto);
  }

  const custoProdutoElement = document.querySelector('.text-wrapper-12');

  if (custoProdutoElement && custoProduto) {
    custoProdutoElement.textContent = formatarValor(custoProduto);
  }

  const codigoProdutoElement = document.querySelector('.text-wrapper-cod');

  if (codigoProdutoElement && codigoProduto) {
    codigoProdutoElement.textContent = limitarTexto(codigoProduto, 10);
  } else {
    codigoProdutoElement.textContent = 'Sem código';
  }

  const quantidadeEstoqueElement = document.querySelector('.text-wrapper-6');

  if (quantidadeEstoqueElement && quantidadeEstoque) {
    quantidadeEstoqueElement.textContent = quantidadeEstoque;

    // Verifica se a quantidade de estoque é menor ou igual a 0
    if (quantidadeEstoque <= 0) {
      quantidadeEstoqueElement.style.color = '#D34748'; // Altera a cor do texto para vermelho
    } else if (quantidadeEstoque >= 1 && quantidadeEstoque < 10) {
      quantidadeEstoqueElement.style.color = '#D7860C'; // Altera a cor do texto para amarelo
    } else {
      quantidadeEstoqueElement.style.color = '#55BA17'; // Altera a cor do texto para verde
    }
  }
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

function redirecionar(pagina) {
  window.location.href = pagina;
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
      <td>${pagamento.dataHora}</td>`;
      tbody.appendChild(row);
    });
  });
});

  function preencherTabelaVenda() {
    // Obter o código do produto
    const codigoProduto = document.querySelector('.text-wrapper-cod').textContent;

    // Obter a tabelaRelatorio
    const tabelaRelatorio = document.getElementById('tabelaRelatorio');
    
    // Obter as linhas relevantes
    const linhasRelevantes = Array.from(tabelaRelatorio.querySelectorAll('tbody tr'))
      .filter((linha) => linha.cells[0].textContent === codigoProduto);

    // Obter a tabela-venda1
    const tabelaVenda1 = document.getElementById('tabela-venda1').querySelector('tbody');
    
    // Limpar a tabela-venda1
    tabelaVenda1.innerHTML = '';

    // Preencher a tabela-venda1 com os dados relevantes
    linhasRelevantes.forEach((linha, index) => {
      const valorVendido = linha.cells[2].textContent;
      const quantidadeVendida = linha.cells[3].textContent;
      const dataVenda = linha.cells[5].textContent;

      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `<td>${index + 1}</td>
                             <td>${valorVendido}</td>
                             <td>${quantidadeVendida}</td>
                             <td>${dataVenda}</td>`;
      
      tabelaVenda1.appendChild(novaLinha);
    });
  }

  // Chame a função quando a página for carregada
  window.onload = preencherTabelaVenda;

  function criarNovaDiv() {
  
    // Adicione a classe "nova-div" à nova div
    novaDiv.className = "nova-div";
    novaDiv.innerHTML = `
      <div class="group-a1">
        <div class="overlap-a1">
          <div class="rectangle-a1">
            <div class="text-wrapper-a1">Editando produto</div>
            <img class="vector1" src="img/vector 10.png" />
          </div>
        </div>
      </div>
      <div class="overlap1">
        <div class="group1">
          <div class="div-wrapper1">
            <button id="salvarBtn" class="salvarBtn1">Salvar</button>
          </div>
        </div>
  
        <p3 class="AVISO-FIXO1">*Código não pode ser alterado...</p3>
  
        <div class="overlap-21">
          <label for="inputImagem" class="custom-button1" title="Toque para trocar ou adicionar imagem"></label>
          <input type="file" id="inputImagem" accept="image/*" />
          <img class="image1" src="img/Image.png" />
          <img class="download1" src="img/Download.png" />
          <p class="p1">Coloque a foto do seu</p>
          <p class="p21">produto aqui!</p>
        </div>
  
        <input type="text" class="nome-produto1" placeholder="Nome do produto" value="${nomeProduto}">
        <div class="codigo-produto1"><h1 class="cod1">${codigoProduto}</h1></div>
        <input type="text" class="descrição-produto1" placeholder="Descrição do item/produto" value="${descricaoProduto}">
  
        <div class="rectangle1"></div>
        <div class="overlap-31">
          <div class="group-21">
            <div class="overlap-41">
              <input type="text" class="valor-produto1" placeholder="---,--" value="${valorProduto}">
            </div>
            <div class="text-wrapper-51">Valor de venda (unitário)</div>
          </div>
          <div class="Quantidade-estoque1"><h1 class="quant1">${quantidadeEstoque}</h1></div>
          <div class="text-wrapper-71">Quantidade em estoque</div>
        </div>
        <div class="overlap-51">
          <input type="text" class="Custo-produto1" placeholder="---,--" value="${custoProduto}">
        </div>
        <div class="text-wrapper-91">Custo do produto (unitário)</div>
        <div class="overlap-61"><div class="text-wrapper-101">Vendas ao longo do tempo</div></div>
        <div class="overlap-71">
          <p class="text-wrapper-111">Grafico do produto e botão para fornecedores do produto</p>
        </div>
      </div>
      <div class="seleção1"></div>
      <div class="bell-wrapper1"><img class="bell1" src="img/del.png" /></div>
    `;
  
    // Adicione a nova div ao corpo do documento ou a qualquer elemento desejado
    document.body.appendChild(novaDiv);
    document.addEventListener('click', function(event) {
      // Verifica se o clique foi na div com a classe "overlap-a1" ou em um de seus filhos
      if (event.target.closest('.overlap-a1')) {
        // Obtém a referência da nova div criada
        var novaDiv = document.querySelector('.nova-div');
    
        // Remove a nova div do DOM
        novaDiv.parentNode.removeChild(novaDiv);
      }
    });
  }
  
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
        button1.innerText = "Copiar dados do produto";
        button1.className = "generated-button";
  
        var button2 = document.createElement("button");
        button2.innerText = "Compras realizadas desse produto";
        button2.className = "generated-button";
  
        var button3 = document.createElement("button");
        button3.innerText = "Vendas realizadas desse produto";
        button3.className = "generated-button";
  
        var button4 = document.createElement("button");
        button4.innerText = "Fornecedores desse produto";
        button4.className = "generated-button";
  
        var button5 = document.createElement("button");
        button5.innerText = "Graficos do produto";
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
  
  function editarProduto(pagina) {
    // Obtém as informações do elemento que você deseja salvar
    var informacao = document.querySelector('.text-wrapper-cod').innerText;

    // Salva as informações no armazenamento local
    localStorage.setItem('editProduto', informacao);

    // Redireciona para a outra página
    window.location.href = pagina;
}

