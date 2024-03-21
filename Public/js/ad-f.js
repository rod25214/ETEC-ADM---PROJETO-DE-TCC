function redirecionar(pagina) {
    window.location.href = pagina;
  }

  function trocarTipo() {
    // Obtém os elementos por classe
    var selectElement = document.querySelector('.ad-f-select');
    var inputElement = document.querySelector('.codigo-produto');
    var h1Element = document.querySelector('.a1a');

    // Verifica se o tipo do elemento atual é 'select' e troca para 'input' e vice-versa
    if (selectElement && selectElement.tagName.toLowerCase() === 'select') {
      // Troca para <input>
      var inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.className = 'codigo-produto';
      inputElement.placeholder = 'Adicionar Função';
      selectElement.parentNode.replaceChild(inputElement, selectElement);

      // Atualiza o texto do h1
      h1Element.innerText = 'Voltar para as funções já adicionadas';

      // Ajusta o estilo do h1
      h1Element.style.top = '12px';
    } else if (inputElement && inputElement.tagName.toLowerCase() === 'input') {
      // Troca para <select>
      var selectElement = document.createElement('select');
      selectElement.className = 'ad-f-select';
      selectElement.placeholder = 'Select';
      inputElement.parentNode.replaceChild(selectElement, inputElement);

      // Atualiza o texto do h1
      h1Element.innerText = 'Caso não pareça a função desejada toque aqui';

      // Ajusta o estilo do h1
      h1Element.style.top = '2.5px'; // Valor inicial do top
    }
  }

  function salvarFuncionario() {
    // Obtenha os valores dos campos de entrada
    var nomeFuncionario = document.querySelector('.nome-produto').value;
    var descricaoFuncionario = document.querySelector('.descrição-produto').value;
    var dataNascimentoFuncionario = document.querySelector('.valor-produto').value;
    var dataInicioEmpresaFuncionario = document.querySelector('.Quantidade-estoque').value;
  
    var grauAcessoAppSelect = document.querySelector('.Custo-produto');
    var grauAcessoApp = grauAcessoAppSelect.options[grauAcessoAppSelect.selectedIndex].textContent;
  
    var funcaoCargoSelect = document.querySelector('.ad-f-select');
    var funcaoCargo = funcaoCargoSelect.options[funcaoCargoSelect.selectedIndex].textContent;
  
    // Verifique se os campos obrigatórios foram preenchidos
    if (nomeFuncionario.trim() === '' || descricaoFuncionario.trim() === '' || dataNascimentoFuncionario.trim() === '' || dataInicioEmpresaFuncionario.trim() === '' || funcaoCargo.trim() === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    // Obtenha as informações armazenadas atualmente no armazenamento local
    var funcionariosSalvos = JSON.parse(localStorage.getItem('funcionarios')) || [];
  
    // Crie um objeto para armazenar as informações do funcionário atual
    var funcionarioInfo = {
      nome: nomeFuncionario,
      descricao: descricaoFuncionario,
      dataNascimento: dataNascimentoFuncionario,
      dataInicioEmpresa: dataInicioEmpresaFuncionario,
      funcaoCargo: funcaoCargo,
      grauAcessoApp: grauAcessoApp,
      documentoAnexado: documentoAnexado // Adicione o documento anexado ao objeto do funcionário
    };
  
    // Adicione o novo funcionário ao array
    funcionariosSalvos.push(funcionarioInfo);
  
    // Converta o array para uma string JSON
    var funcionariosSalvosJSON = JSON.stringify(funcionariosSalvos);
  
    // Salve a string JSON no armazenamento local
    localStorage.setItem('funcionarios', funcionariosSalvosJSON);
  
    // Limpe o documento anexado após salvar
    documentoAnexado = null;
  
    // Alerta de sucesso (você pode modificar conforme necessário)
    alert('Funcionário salvo com sucesso!');
  }
  

  function formatarData(input) {
    // Remove caracteres não numéricos
    var valorLimpo = input.value.replace(/[^\d]/g, '');

    // Formatação: dd/mm/aaaa
    if (valorLimpo.length > 0) {
      if (valorLimpo.length > 2) {
        valorLimpo = valorLimpo.substring(0, 2) + '/' + valorLimpo.substring(2);
      }
      if (valorLimpo.length > 5) {
        valorLimpo = valorLimpo.substring(0, 5) + '/' + valorLimpo.substring(5, 9);
      }
    }

    // Atualiza o valor no campo de entrada
    input.value = valorLimpo;
  }

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

  var documentoAnexado = null;

  function anexarDocumento() {
    var inputDocumento = document.createElement('input');
    inputDocumento.type = 'file';
    inputDocumento.accept = '.pdf, .doc, .docx';
    inputDocumento.style.display = 'none';

    document.body.appendChild(inputDocumento);
    
    inputDocumento.click();

    inputDocumento.addEventListener('change', function() {
      var file = inputDocumento.files[0];
      
      if (file) {
        if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          var leitor = new FileReader();
          leitor.onload = function(e) {
            documentoAnexado = e.target.result;
            alert('Documento anexado com sucesso!');
          };
          leitor.readAsDataURL(file);
        } else {
          alert('Por favor, selecione um arquivo PDF ou Word.');
        }
      }

      document.body.removeChild(inputDocumento);
    });
  }

  function visualizarCurriculo() {
    if (documentoAnexado) {
      var linkVisualizar = document.getElementById('linkVisualizar');
      linkVisualizar.href = documentoAnexado;
      linkVisualizar.click();
    } else {
      alert('Nenhum currículo anexado.');
    }
  }

  function mudarTextoBotao(novoTexto) {
    var botao = document.querySelector('.botao-2');
    botao.textContent = novoTexto;
  }

  // Adicionando um evento para restaurar o texto original ao carregar a página
  window.onload = function() {
    mudarTextoBotao(textoOriginalBotao);
  };