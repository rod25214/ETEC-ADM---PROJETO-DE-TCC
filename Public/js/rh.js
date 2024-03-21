function redirecionar(pagina) {
    window.location.href = pagina;
  }

  function exibirFuncionarios() {
    // Obtenha a lista de funcionários salvos do armazenamento local
    var funcionariosSalvos = JSON.parse(localStorage.getItem('funcionarios')) || [];
  
    // Obtenha a referência para a div com a classe "overlap"
    var divOverlap = document.querySelector('.scroll-container-2');
  
    // Limpe o conteúdo atual da div "overlap"
    divOverlap.innerHTML = '';
  
    // Percorra a lista de funcionários salvos e crie as divs para cada um
    for (var i = 0; i < funcionariosSalvos.length; i++) {
      var funcionario = funcionariosSalvos[i];
  
      // Crie as divs para o funcionário
      var divFuncionario = document.createElement('div');
      divFuncionario.className = 'funcionario';
  
      // Adicione a div de foto do funcionário
      var divFotoFunci = document.createElement('div');
      divFotoFunci.className = 'foto-funci';
      // Configure a imagem do funcionário (substitua 'funcionario.foto' com a propriedade real)
      divFotoFunci.style.backgroundImage = 'url(' + funcionario.foto + ')';
      divFuncionario.appendChild(divFotoFunci);
  
      // Adicione a div de informações
      var divInform = document.createElement('div');
      divInform.className = 'inform';
      divFuncionario.appendChild(divInform);
  
      // Adicione o nome do funcionário
      var h1NomeFixo = document.createElement('h1');
      h1NomeFixo.className = 'nome-fixo';
      h1NomeFixo.textContent = 'Nome Completo do Funcionário:';
      divFuncionario.appendChild(h1NomeFixo);
  
      var h1Nome = document.createElement('h1');
      h1Nome.className = 'nome';
      h1Nome.textContent = funcionario.nome.length > 33 ? funcionario.nome.substring(0, 30) + '...' : funcionario.nome;
      divFuncionario.appendChild(h1Nome);

  
      // Adicione a div de idade
      var divIdade = document.createElement('div');
      divIdade.className = 'idade';
      divFuncionario.appendChild(divIdade);
  
      var h1IdadeFixo = document.createElement('h1');
      h1IdadeFixo.className = 'idade-fixo';
      h1IdadeFixo.textContent = 'Idade do Funcionário:';
      divIdade.appendChild(h1IdadeFixo);
  
      var h1IdadeN = document.createElement('h1');
      h1IdadeN.className = 'idade-n';
      h1IdadeN.textContent = funcionario.dataNascimento;
      divIdade.appendChild(h1IdadeN);
  
      // Adicione a div de função
      var divFuncao = document.createElement('div');
      divFuncao.className = 'funcao';
      divFuncionario.appendChild(divFuncao);
  
      var h1FuncaoFixo = document.createElement('h1');
      h1FuncaoFixo.className = 'idade-fixo';
      h1FuncaoFixo.textContent = 'Função do Funcionário:';
      divFuncao.appendChild(h1FuncaoFixo);
  
      var h1FuncaoN = document.createElement('h1');
      h1FuncaoN.className = 'funcao-n';
      h1FuncaoN.textContent = funcionario.funcaoCargo;
      divFuncao.appendChild(h1FuncaoN);
  
      // Adicione a div de tempo trabalhado
      var divTempoTrabalhado = document.createElement('div');
      divTempoTrabalhado.className = 'tempo-trabalhado';
      divFuncionario.appendChild(divTempoTrabalhado);
  
      var h1TempoFixo = document.createElement('h1');
      h1TempoFixo.className = 'idade-fixo';
      h1TempoFixo.textContent = 'Tempo na Empresa:';
      divTempoTrabalhado.appendChild(h1TempoFixo);
  
      var h1TempoN = document.createElement('h1');
      h1TempoN.className = 'tempo-n';
      h1TempoN.textContent = funcionario.dataInicioEmpresa;
      divTempoTrabalhado.appendChild(h1TempoN);
  
      // Adicione a descrição do funcionário
      var h1DescricaoFixo = document.createElement('h1');
      h1DescricaoFixo.className = 'descricao-fixo';
      h1DescricaoFixo.textContent = 'Descrição / Informações Adicionais do Funcionário:';
      divFuncionario.appendChild(h1DescricaoFixo);
  
      // Adicione a descrição do funcionário limitando para 365 caracteres
      var h1Descricao = document.createElement('h1');
      h1Descricao.className = 'descricao';
      h1Descricao.textContent = funcionario.descricao.length > 365 ? funcionario.descricao.substring(0, 365) + '...' : funcionario.descricao;
      divFuncionario.appendChild(h1Descricao);
  
      // Adicione a linha divisória
      var divLineD = document.createElement('div');
      divLineD.className = 'line-d';
      divFuncionario.appendChild(divLineD);
  
      // Adicione os botões
      var divBotoes = document.createElement('div');
      divBotoes.className = 'botões';
      divFuncionario.appendChild(divBotoes);
  
      var divScrollContainer = document.createElement('div');
      divScrollContainer.className = 'scroll-container';
      divBotoes.appendChild(divScrollContainer);
  
      var botoes = ['Mais Informações','Visualizar Curículo', 'Informações de Contato', 'Informações / Documentos', 'Competências e Habilidades', 'Recomendações Passadas', 'Certificados e Cursos', 'Trajeto na Empresa', 'Ponto (Entradas e Saídas)', 'Faltas Acumuladas', 'Gráficos Referente ao Funcionário', 'Grau de Acesso no APP', 'Configurações Avançadas'];
  
      for (var j = 0; j < botoes.length; j++) {
        var botao = document.createElement('button');
        botao.className = 'botao-1';
        botao.textContent = botoes[j];
        divScrollContainer.appendChild(botao);
      }
  
      // Adicione a div do funcionário à div "overlap"
      divOverlap.appendChild(divFuncionario);
    }
  }
  
  // Chame a função quando a página for carregada
  document.addEventListener('DOMContentLoaded', exibirFuncionarios);
  