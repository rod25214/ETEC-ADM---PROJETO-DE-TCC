function redirecionar(pagina) {
  window.location.href = pagina;
}

function validarNumerosComVirgula(valor) {
    return /^[0-9]+(,[0-9]+)?$/.test(valor);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    function gerarCodigoAleatorio() {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let codigo = '';
      for (let i = 0; i < 10; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
      }
      return codigo;
    }
  
    function codigoUnico(codigo, produtos) {
      return produtos.some(produto => produto.codigoProduto === codigo);
    }
  


    const salvarBtn = document.getElementById('salvarBtn');
    const valorProdutoInput = document.querySelector('.valor-produto');
    const quantidadeEstoqueInput = document.querySelector('.Quantidade-estoque');
    const custoProdutoInput = document.querySelector('.Custo-produto');
    const nomeProdutoInput = document.querySelector('.nome-produto');
    const descricaoProdutoInput = document.querySelector('.descrição-produto');
    const codigoProdutoInput = document.querySelector('.codigo-produto');

    salvarBtn.addEventListener('click', function() {
      let todosCorretos = true;
  
      if (!validarNumerosComVirgula(valorProdutoInput.value)) {
        valorProdutoInput.classList.remove('correto');
        valorProdutoInput.classList.add('erro');
        todosCorretos = false;
      } else {
        valorProdutoInput.classList.remove('erro');
        valorProdutoInput.classList.add('correto');
      }
  
      if (!/^[0-9]+$/.test(quantidadeEstoqueInput.value)) {
        quantidadeEstoqueInput.classList.remove('correto');
        quantidadeEstoqueInput.classList.add('erro');
        todosCorretos = false;
      } else {
        quantidadeEstoqueInput.classList.remove('erro');
        quantidadeEstoqueInput.classList.add('correto');
      }
  
      if (!validarNumerosComVirgula(custoProdutoInput.value)) {
        custoProdutoInput.classList.remove('correto');
        custoProdutoInput.classList.add('erro');
        todosCorretos = false;
      } else {
        custoProdutoInput.classList.remove('erro');
        custoProdutoInput.classList.add('correto');
      }
  
      if (nomeProdutoInput.value.trim() === '') {
        nomeProdutoInput.classList.add('erro');
        todosCorretos = false;
      } else {
        nomeProdutoInput.classList.remove('erro');
        nomeProdutoInput.classList.add('correto');
      }
  
      if (descricaoProdutoInput.value.trim() === '') {
        descricaoProdutoInput.classList.add('erro');
        todosCorretos = false;
      } else {
        descricaoProdutoInput.classList.remove('erro');
        descricaoProdutoInput.classList.add('correto');
      }
      if (codigoProdutoInput.value.trim() === '') {
        let novoCodigo = gerarCodigoAleatorio();
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        
        // Verificar se o código gerado já existe na lista de produtos
        while (codigoUnico(novoCodigo, produtos)) {
          novoCodigo = gerarCodigoAleatorio();
        }
        
        codigoProdutoInput.value = novoCodigo;
        codigoProdutoInput.classList.add('correto');
      } else {
        codigoProdutoInput.classList.remove('erro');
        codigoProdutoInput.classList.add('correto');
      }
  
      if (todosCorretos) {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  
        // Cria um objeto com os dados do novo produto
        const novoProduto = {
          nomeProduto: nomeProdutoInput.value,
          codigoProduto: codigoProdutoInput.value,
          descricaoProduto: descricaoProdutoInput.value,
          valorProduto: valorProdutoInput.value,
          quantidadeEstoque: quantidadeEstoqueInput.value,
          custoProduto: custoProdutoInput.value
        };
        
        // Obter o último índice da lista de produtos
        const ultimoIndice = produtos.length > 0 ? produtos[produtos.length - 1].id : 0;
  
        // Definir o novo índice para o próximo produto
        novoProduto.id = ultimoIndice + 1;

        // Adiciona o novo produto à lista
        produtos.push(novoProduto);
  
        // Armazena a lista atualizada no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));
        
        window.location.href = 'seuproduto.html';
      }

    });
    document.addEventListener("DOMContentLoaded", function() {
      const inputImagem = document.getElementById('inputImagem');
    
      inputImagem.addEventListener('change', function(event) {
        // ... (seu código existente para mostrar a imagem no preview)
      });
    });
    
 
  
    // Adicionar evento de input para retornar ao estilo original no focus
    valorProdutoInput.addEventListener('input', function() {
      valorProdutoInput.classList.remove('erro');
      valorProdutoInput.classList.remove('correto');
    });
  
    quantidadeEstoqueInput.addEventListener('input', function() {
      quantidadeEstoqueInput.classList.remove('erro');
      quantidadeEstoqueInput.classList.remove('correto');
    });
  
    custoProdutoInput.addEventListener('input', function() {
      custoProdutoInput.classList.remove('erro');
      custoProdutoInput.classList.remove('correto');
    });
  
    nomeProdutoInput.addEventListener('input', function() {
      nomeProdutoInput.classList.remove('erro');
        nomeProdutoInput.classList.remove('correto');
    });
  
    descricaoProdutoInput.addEventListener('input', function() {
      descricaoProdutoInput.classList.remove('erro');
        descricaoProdutoInput.classList.remove('correto');
    });
  });


/*--------------preview imagem----------------*/
document.addEventListener("DOMContentLoaded", function() {
  const inputImagem = document.getElementById('inputImagem');

  inputImagem.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      const leitor = new FileReader();
      const imagePreview = document.createElement('img');
      imagePreview.classList.add('image-preview');
      const overlap = document.querySelector('.overlap-2');
      overlap.innerHTML = ''; 

      leitor.onload = function(e) {
        imagePreview.src = e.target.result;
        overlap.appendChild(imagePreview); 
      };

      leitor.readAsDataURL(arquivo);
    }
  });
});

/*-----------------------------------------------------*/
