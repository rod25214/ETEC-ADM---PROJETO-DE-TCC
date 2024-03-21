function redirecionar(pagina) {
    window.location.href = pagina;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Espera até que o DOM esteja totalmente carregado
  
    // Obtém a referência para a div com a classe 'circulo'
    var circuloDiv = document.querySelector('.circulo');
  
    // Adiciona um ouvinte de evento de clique à div 'circulo'
    circuloDiv.addEventListener('click', function () {
      // Obtém a referência para a div com a classe 'ajust'
      var ajustDiv = document.querySelector('.ajust');
  
      // Obtém o valor atual da propriedade 'left' como número
      var leftValue = parseInt(ajustDiv.style.left);
  
      // Obtém a referência para a div com a classe 'bell'
      var bellDiv = document.querySelector('.bell');
  
      // Verifica se o valor é -1039, se sim, define para 0 e adiciona a classe de rotação, caso contrário, define para -1039 e remove a classe de rotação
      if (leftValue === -1039) {
        ajustDiv.style.left = '0px';
        bellDiv.classList.remove('rotate-180');
      } else {
        ajustDiv.style.left = '-1039px';
        bellDiv.classList.remove('rotate-180');
        bellDiv.classList.add('rotate-180');
      }
    });
  });
  