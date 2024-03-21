function redirecionar(pagina) {
    window.location.href = pagina;
  }

  function salvarInformacoes() {
    // Obtenha os valores dos campos de entrada
    var nome = document.getElementById("nomeInput").value;
    var descricao = document.getElementById("descriInput").value;
    var cnpj = document.getElementById("cnpjInput").value;
    var dataAbertura = document.getElementById("data-abertura-Input").value;
    var cnae = document.getElementById("CNAE-Input").value;
    var cnaeSecundario = document.getElementById("CNAE-secundário-Input").value;
    var cep = document.getElementById("CEP-Input").value;
    var email = document.getElementById("emailInput").value;
    var telefoneFixo = document.getElementById("telefone fixo-Input").value;
    var telefoneCelular = document.getElementById("telefone celular-Input").value;
    var whatsapp = document.getElementById("WhatsApp").value;

    // Crie um objeto para armazenar os dados
    var dados = {
      nome: nome,
      descricao: descricao,
      cnpj: cnpj,
      dataAbertura: dataAbertura,
      cnae: cnae,
      cnaeSecundario: cnaeSecundario,
      cep: cep,
      email: email,
      telefoneFixo: telefoneFixo,
      telefoneCelular: telefoneCelular,
      whatsapp: whatsapp
    };

    // Converta o objeto para uma string JSON
    var dadosString = JSON.stringify(dados);

    // Salve os dados no armazenamento local
    localStorage.setItem("informacoesEmpresa", dadosString);

     // Exiba um alerta
     alert("Informações salvas com sucesso!");

     // Redirecione para a página home.html
     window.location.href = "teste.html";
  }

  function carregarInformacoes() {
    // Recupere os dados do armazenamento local
    var dadosString = localStorage.getItem("informacoesEmpresa");

    // Se houver dados salvos, preencha os campos de entrada
    if (dadosString) {
      var dados = JSON.parse(dadosString);

      document.getElementById("nomeInput").value = dados.nome;
      document.getElementById("descriInput").value = dados.descricao;
      document.getElementById("cnpjInput").value = dados.cnpj;
      document.getElementById("data-abertura-Input").value = dados.dataAbertura;
      document.getElementById("CNAE-Input").value = dados.cnae;
      document.getElementById("CNAE-secundário-Input").value = dados.cnaeSecundario;
      document.getElementById("CEP-Input").value = dados.cep;
      document.getElementById("emailInput").value = dados.email;
      document.getElementById("telefone fixo-Input").value = dados.telefoneFixo;
      document.getElementById("telefone celular-Input").value = dados.telefoneCelular;
      document.getElementById("WhatsApp").value = dados.whatsapp;
    }
  }