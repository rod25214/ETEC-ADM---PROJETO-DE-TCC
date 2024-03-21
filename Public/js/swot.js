function redirecionar(pagina) {
    window.location.href = pagina;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const botaoAdicionar = document.querySelector('.adiciona');
    const blurDiv = document.querySelector('.blur');
  
    botaoAdicionar.addEventListener('click', function() {
      blurDiv.classList.toggle('active');
  
      if (blurDiv.classList.contains('active')) {
        const contentDiv = document.querySelector('.content');
        const luBotao = createButtons();
  
        contentDiv.appendChild(luBotao);
  
        const sairDiv = document.querySelector('.sair');
        sairDiv.addEventListener('click', function() {
          blurDiv.classList.remove('active');
  
          const luBotao = document.querySelector('.lu-botão');
          if (luBotao) {
            luBotao.remove();
          }
        });
  
        // Adicionando evento ao botão 1 para criar as divs adicionais
        const botao1 = document.querySelector('.botao1');
        botao1.addEventListener('click', function() {
          createAdditionalDivs(contentDiv);
  
          // Remover tanto os botões quanto a seção original
          const luBotao = document.querySelector('.lu-botão');
          if (luBotao) {
            luBotao.remove();
          }
        });
      } else {
        const luBotao = document.querySelector('.lu-botão');
        if (luBotao) {
          luBotao.remove();
        }
      }
    });
  });
  // Função para criar os botões dentro da div lu-botão
function createButtons() {
  const luBotaoDiv = document.createElement('div');
  luBotaoDiv.classList.add('lu-botão');

  const botao1 = document.createElement('button');
  botao1.classList.add('botao1');
  botao1.textContent = 'Adicionar Item';

  const botao2 = document.createElement('button');
  botao2.classList.add('botao2');
  botao2.textContent = 'Lista das Analises SWOT realizadas';

  const botao3 = document.createElement('button');
  botao3.classList.add('botao3');
  botao3.textContent = 'Baixar Tabela';


  const botao4 = document.createElement('button');
  botao4.classList.add('botao4');
  botao4.textContent = 'Como é feita a Analise SWOT?';


  const sairDiv = document.createElement('div');
  sairDiv.classList.add('sair');
  const sairText = document.createElement('p');
  sairText.classList.add('sair-text');
  sairText.textContent = 'Sair';
  sairDiv.appendChild(sairText);

  // Adicionando os botões e a div 'sair' à div 'lu-botão'
  luBotaoDiv.appendChild(botao1);
  luBotaoDiv.appendChild(botao2);
  luBotaoDiv.appendChild(botao3);
  luBotaoDiv.appendChild(botao4);
  luBotaoDiv.appendChild(sairDiv);

  return luBotaoDiv;
}
function createAdditionalDivs(parentDiv) {
  const protDiv = document.createElement('div');
  protDiv.classList.add('prot');

  const adBDiv = document.createElement('div');
  adBDiv.classList.add('ad-b');

  const group6bDiv = document.createElement('div');
  group6bDiv.classList.add('group-6b');

  const overlap6bDiv = document.createElement('div');
  overlap6bDiv.classList.add('overlap-6b');

  const rectangle6bDiv = document.createElement('div');
  rectangle6bDiv.classList.add('rectangle-6b');

  const textWrapper7Div = document.createElement('div');
  textWrapper7Div.classList.add('text-wrapper-7b');
  textWrapper7Div.textContent = 'Adicionar no Balanço 2023';

  const vectorImg = document.createElement('img');
  vectorImg.classList.add('vector');
  vectorImg.setAttribute('src', 'img/vector 10.png');

  const ajust0Div = document.createElement('div');
  ajust0Div.classList.add('ajus-0');

  const lineB1Div = document.createElement('div');
  lineB1Div.classList.add('line-b1');

  const ajustBDiv = document.createElement('div');
  ajustBDiv.classList.add('ajust-b');

  const butt1Div = document.createElement('div');
  butt1Div.classList.add('butt-1');

  const nomeIFixo1H1 = document.createElement('h1');
  nomeIFixo1H1.classList.add('nome-i-fixo');
  nomeIFixo1H1.textContent = 'Coloque aqui o Nome do item';

  const nomeInput = document.createElement('input');
  nomeInput.setAttribute('placeholder', 'Nome do item...');
  nomeInput.classList.add('rectangle-nome');
  nomeInput.setAttribute('type', 'text');

  butt1Div.appendChild(nomeIFixo1H1);
  butt1Div.appendChild(nomeInput);

  const butt2Div = document.createElement('div');
  butt2Div.classList.add('butt-2');

  const nomeIFixo2H1 = document.createElement('h1');
  nomeIFixo2H1.classList.add('nome-i-fixo');
  nomeIFixo2H1.textContent = 'Coloque aqui o Valor';

  const valorInput = document.createElement('input');
  valorInput.setAttribute('placeholder', 'Valor do item...   exemplo: 1239,85');
  valorInput.classList.add('rectangle-descr');
  valorInput.setAttribute('type', 'text');

  butt2Div.appendChild(nomeIFixo2H1);
  butt2Div.appendChild(valorInput);

  const butt3Div = document.createElement('div');
  butt3Div.classList.add('butt-3');

  const nomeIFixo3H1 = document.createElement('h1');
  nomeIFixo3H1.classList.add('nome-i-fixo');
  nomeIFixo3H1.textContent = 'Coloque aqui o Descrição (Não obrigatório)';

  const descrInput = document.createElement('input');
  descrInput.setAttribute('placeholder', 'Descrição do item...');
  descrInput.classList.add('rectangle-valor');
  descrInput.setAttribute('type', 'text');

  butt3Div.appendChild(nomeIFixo3H1);
  butt3Div.appendChild(descrInput);

  const h1TextAvisoI = document.createElement('h1');
  h1TextAvisoI.classList.add('text-aviso-i');
  h1TextAvisoI.textContent = '*hgggggggggdddddddffffffffffffdddddddddddddddddddddddgggdddddddffffffffffffddddddddddddddddddddddddddddddddddddhgggggggggdddddddffffffffffffddddddddddddddddddddddddddddddddddddhgggggggggdddddddffffffffffffddddddddddddddddddddddddddddddddddddhgggggggggdddddddffffffffffffddddddddddddddddddddddddddddddddddddhgggggggggdddddddffffffffffffdddddddddddddddddddddddddddddddddddd';

  const lineB2Div = document.createElement('div');
  lineB2Div.classList.add('line-b2');

  const selectYearDiv = document.createElement('select');
  selectYearDiv.setAttribute('id', 'selectYear');
  selectYearDiv.classList.add('rectangle-select');

  // Adicione as opções do select
  const selectOptions = [
    '--nenhum selecionado--', 'Forças', 'Fraquezas', 'Oportunidades', 'Ameaças'
  ];

  for (const optionValue of selectOptions) {
    const option = document.createElement('option');
    option.setAttribute('value', optionValue);
    option.textContent = optionValue;
    selectYearDiv.appendChild(option);
  }

  const nomeIFixoH1 = document.createElement('h1');
  nomeIFixoH1.classList.add('nome-i-fixo2');
  nomeIFixoH1.textContent = 'Selecione o local';

  const salvarBtn = document.createElement('button');
  salvarBtn.setAttribute('id', 'salvarBtn');
  salvarBtn.classList.add('salvarBtn');
  salvarBtn.textContent = 'Salvar novo item...';

  const alterarBtn = document.createElement('button');
  alterarBtn.setAttribute('id', 'alterarBtn');
  alterarBtn.classList.add('alterarBtn');
  alterarBtn.textContent = 'Alterar item já existente...';

  // Adicionando elementos à estrutura
  parentDiv.appendChild(protDiv);
  protDiv.appendChild(adBDiv);
  adBDiv.appendChild(group6bDiv);
  group6bDiv.appendChild(overlap6bDiv);
  overlap6bDiv.appendChild(rectangle6bDiv);
  rectangle6bDiv.appendChild(textWrapper7Div);
  rectangle6bDiv.appendChild(vectorImg);
  adBDiv.appendChild(ajust0Div);
  ajust0Div.appendChild(lineB1Div);
  ajust0Div.appendChild(ajustBDiv);
  ajustBDiv.appendChild(butt1Div);
  ajustBDiv.appendChild(butt2Div);
  ajustBDiv.appendChild(butt3Div);
  ajustBDiv.appendChild(h1TextAvisoI);
  ajustBDiv.appendChild(lineB2Div);
  ajustBDiv.appendChild(selectYearDiv);
  ajustBDiv.appendChild(nomeIFixoH1);
  ajustBDiv.appendChild(salvarBtn);
  ajustBDiv.appendChild(alterarBtn);

  overlap6bDiv.addEventListener('click', function() {
    const blurDiv = document.querySelector('.blur');
    blurDiv.classList.remove('active');
    parentDiv.removeChild(protDiv);
  });

  salvarBtn.addEventListener('click', function() {
    // Obtenha os valores dos inputs
    const nomeItem = nomeInput.value;
    const valorItem = formatarValor(valorInput.value); // Formate o valor antes de salvar
    const descricaoItem = descrInput.value || '-';
    const localSelecionado = selectYearDiv.value;
  
    // Verifique se a opção selecionada não é "--nenhum selecionado--"
    if (localSelecionado === '--nenhum selecionado--') {
      alert('Por favor, selecione o local.');
      return;
    }
  
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!nomeItem || !valorItem) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    // Crie um objeto para representar o novo item
    const novoItem = {
      nome: nomeItem,
      valor: valorItem,
      descricao: descricaoItem,
      local: localSelecionado,
    };
  
    // Obtenha o ano selecionado (por exemplo, 'balanço2023')
    const anoSelecionado = `balanço-2023`;
  
    // Obtenha o balanço correspondente do armazenamento local
    let balancoExistente = JSON.parse(localStorage.getItem(anoSelecionado)) || {};
  
    // Verifique se a área já existe no balanço, se não, crie um array vazio para ela
    if (!balancoExistente[localSelecionado]) {
      balancoExistente[localSelecionado] = [];
    }
  
    // Adicione o novo item à área correspondente no balanço
    balancoExistente[localSelecionado].push(novoItem);
  
    // Atualize o armazenamento local com o balanço atualizado
    localStorage.setItem(anoSelecionado, JSON.stringify(balancoExistente));
  
    // Limpe os campos de entrada após salvar
    nomeInput.value = '';
    valorInput.value = '';
    descrInput.value = '';
  
    // Notifique o usuário que o item foi salvo com sucesso
    alert('Item salvo com sucesso!');
    updateTables();
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
}