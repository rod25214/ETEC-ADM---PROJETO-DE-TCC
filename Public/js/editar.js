function redirecionar(pagina) {
  window.location.href = pagina;
}

document.addEventListener("DOMContentLoaded", function() {
  // Recupera a informação salva no armazenamento local
  var informacaoSalva = localStorage.getItem('editProduto');

  // Verifica se há informação salva
  if (informacaoSalva) {
      // Coloca a informação na div com a classe "text-wrapper-cod"
      document.querySelector('.text-wrapper-cod').innerText = informacaoSalva;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Obtém o código do produto da div "text-wrapper-cod"
  var codigoProduto = document.querySelector('.text-wrapper-cod').innerText;

  // Obtém os produtos do armazenamento local
  var produtosSalvos = localStorage.getItem('produtos');

  // Verifica se há produtos salvos
  if (produtosSalvos) {
      // Converte a string JSON dos produtos para um objeto JavaScript
      var produtos = JSON.parse(produtosSalvos);

      // Procura o produto com o código correspondente
      var produtoEncontrado = produtos.find(function(produto) {
          return produto.codigoProduto === codigoProduto;
      });

      // Se o produto for encontrado, preenche os campos do formulário
      if (produtoEncontrado) {
          document.querySelector('.nome-produto').value = produtoEncontrado.nomeProduto;
          document.querySelector('.valor-produto').value = produtoEncontrado.valorProduto;
          document.querySelector('.text-wrapper-6b').innerText = produtoEncontrado.quantidadeEstoque;
          document.querySelector('.Custo-produto').value = produtoEncontrado.custoProduto;
          document.querySelector('.descrição-produto').value = produtoEncontrado.descricaoProduto;
      }
  }
  document.getElementById('salvarBtn').addEventListener('click', function() {
    // Obtem os valores dos inputs
    var novoNomeProduto = document.querySelector('.nome-produto').value;
    var novaDescricaoProduto = document.querySelector('.descrição-produto').value;
    var novoValorProduto = document.querySelector('.valor-produto').value;
    var novoCustoProduto = document.querySelector('.Custo-produto').value;

    // Verifica se algum campo está vazio
    if (novoNomeProduto === '' || novaDescricaoProduto === '' || novoValorProduto === '' || novoCustoProduto === '') {
        alert('Todos os campos devem ser preenchidos.');
        return; // Para a execução se algum campo estiver vazio
    }

    // Atualiza as informações antigas com os novos valores
    produtoEncontrado.nomeProduto = novoNomeProduto;
    produtoEncontrado.descricaoProduto = novaDescricaoProduto;
    produtoEncontrado.valorProduto = novoValorProduto;
    produtoEncontrado.custoProduto = novoCustoProduto;

    // Atualiza o armazenamento local com os dados atualizados
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Informa ao usuário que as informações foram salvas
    alert('Informações salvas com sucesso!');
    window.location.href = 'seuproduto.html';
});
});

function mostrarConfirmacaoExclusao() {
  var confirmacaoDiv = document.getElementById("confirmacaoExclusao");
  confirmacaoDiv.style.display = "block";

  var blurDiv = document.querySelector(".blur");
  blurDiv.classList.add("active");
}

function cancelarExclusao() {
  var confirmacaoDiv = document.getElementById("confirmacaoExclusao");
  confirmacaoDiv.style.display = "none";

  var blurDiv = document.querySelector(".blur");
  blurDiv.classList.remove("active");
}

function confirmarExclusao() {
  // Obter o código do produto da div
  var codigoProduto = document.querySelector(".text-wrapper-cod").innerText.trim();

  // Obter os produtos do armazenamento local
  var produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Encontrar o índice do produto com o código correspondente
  var index = produtos.findIndex(function (produto) {
    return produto.codigoProduto === codigoProduto;
  });

  // Remover o produto se encontrado
  if (index !== -1) {
    produtos.splice(index, 1);

    // Atualizar o armazenamento local com os produtos modificados
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Exibir um alerta e redirecionar para a página produto.html
    alert("Produto deletado com sucesso!");
    window.location.href = "seuproduto.html";
  } else {
    // Produto não encontrado
    alert("Produto não encontrado para exclusão.");
    console.log("Produto não encontrado para exclusão.");
  }

  // Ocultar a confirmação e remover o desfoque
  cancelarExclusao();
}