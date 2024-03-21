function redirecionar(pagina) {
    window.location.href = pagina;
  }

  function carregarInformacoes() {
    // Recupere os dados do armazenamento local
    var dadosString = localStorage.getItem("informacoesEmpresa");

    // Se houver dados salvos, preencha os campos no HTML
    if (dadosString) {
      var dados = JSON.parse(dadosString);

      document.getElementById("nomeEmpresa").innerHTML = dados.nome || "";
      document.getElementById("descricaoEmpresa").innerHTML = dados.descricao || "";
      document.getElementById("cnpjInfo").innerHTML = `<div class="text-1">${dados.cnpj || "Aqui seu CNPJ"}</div>`;
      document.getElementById("dataAberturaInfo").innerHTML = `<div class="text-2">${dados.dataAbertura || "Aqui a data de abertura"}</div>`;
      document.getElementById("cnaeInfo").innerHTML = `<div class="text-3">${dados.cnae || "Aqui o CNAE"}</div>`;
      document.getElementById("cnaeSecundarioInfo").innerHTML = `<div class="text-4">${dados.cnaeSecundario || "Aqui o CNAE secundário"}</div>`;
      document.getElementById("cepInfo").innerHTML = `<div class="text-5">${dados.cep || "Aqui o CEP da empresa"}</div>`;
      document.getElementById("emailInfo").innerHTML = `<div class="text-6">${dados.email || "Aqui o Email da empresa"}</div>`;
      document.getElementById("telefoneFixoInfo").innerHTML = `<div class="text-7">${dados.telefoneFixo || "Aqui seu Telefone fixo"}</div>`;
      document.getElementById("telefoneCelularInfo").innerHTML = `<div class="text-8">${dados.telefoneCelular || "Aqui o Telefone celular"}</div>`;
      document.getElementById("whatsappInfo").innerHTML = `<div class="text-9">${dados.whatsapp || "Aqui o WhatsApp"}</div>`;
    }
  }

