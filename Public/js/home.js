  function redirecionar(pagina) {
    window.location.href = pagina;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var iaButton = document.querySelector(".IA");
    var blurElement = document.querySelector(".blur");
  
    iaButton.addEventListener("click", function () {
      blurElement.classList.toggle("active");
    });

    document.getElementById('mais-submit').addEventListener('click', function() {
      var imagem = document.querySelector('.mais-p');
      var btG = document.querySelector('.bt-g');
      var maisIA = document.querySelector('.mais-IA');
  
      imagem.classList.toggle('rotated');
  
      if (imagem.classList.contains('rotated')) {
          // Se a classe 'rotated' estiver presente, faça as alterações
          btG.style.left = '420px';
          maisIA.style.left = '408px';
      } else {
          // Se a classe 'rotated' não estiver presente, reverta as alterações
          btG.style.left = ''; 
          maisIA.style.left = '';
      }
  });

  document.getElementById('IA').addEventListener('click', function() {
    document.querySelector('.fundo-blur').style.zIndex = '999';
  });

  document.getElementById('deltIA').addEventListener('click', function() {
    document.querySelector('.fundo-blur').style.zIndex = '-2';
    blurElement.classList.toggle("active");
  });
  });




  