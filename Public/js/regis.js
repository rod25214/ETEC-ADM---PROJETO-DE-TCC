function redirecionar(pagina) {
    window.location.href = pagina;
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Função para exibir as compras na tabela
    function exibirComprasNaTabela() {
      // Obter a tabela de compras e seu corpo
      var tabelaCompras = document.getElementById('Registro-compras');
      // Limpar o corpo da tabela antes de exibir os itens
      tabelaCompras.innerHTML = '';
  
      // Obter a lista de compras do armazenamento local com a chave gerenCompra
      var listaGerenCompra = JSON.parse(localStorage.getItem('gerenCompra')) || [];
  
      // Iterar sobre a lista de compras e adicionar as linhas à tabela
      listaGerenCompra.forEach(function (compra, index) {
        var linha = tabelaCompras.insertRow();
  
        // Adicionar as células com os dados da compra
        linha.insertCell(0).textContent = index + 1; // Número da compra
        linha.insertCell(1).textContent = compra.codigoCompra;
        linha.insertCell(2).textContent = compra.dataHora;
        linha.insertCell(3).textContent = formatarValor(compra.totalCompra);
  
        // Adicionar um botão "Ver mais informações" com um evento de clique
        const cellMaisInformacoes = linha.insertCell(4);
        const linkMaisInformacoes = document.createElement('a');
        linkMaisInformacoes.textContent = 'Mais informações';
        linkMaisInformacoes.classList.add('link'); // Adicione a classe desejada para estilizar o link
        linkMaisInformacoes.href = '#'; // Adicione aqui a URL ou o comportamento desejado
        linkMaisInformacoes.addEventListener('click', function () {
          mostrarDetalhesDaCompra(compra);
        });
        cellMaisInformacoes.appendChild(linkMaisInformacoes);
      });
    }

    function formatarValor(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    exibirComprasNaTabela();

  });
  