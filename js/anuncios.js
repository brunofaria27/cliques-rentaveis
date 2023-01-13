window.onload = () => {
  window.event.preventDefault();

  if (JSON.parse(sessionStorage.getItem("usuarioCorrente")) == null) {
    window.location = "login.html";
  }

  showAD();
  showBalanceProf();
};

document
  .getElementById("sacar-modal")
  .addEventListener("click", updateSaqueValueBalance);

document.getElementById("ad-btn").addEventListener("click", ganharSaldo);

document.getElementById("ad-btn").addEventListener("click", modalStatus);

function modalStatus(event) {
  event.preventDefault();

  $("#modalGanho").modal("hide");
  $("#modalGanho").hide();
  $(".overlay").fadeIn();
  $("#loading").fadeIn();

  setTimeout(function () {
    $(".overlay").fadeOut();
    $("#loading").fadeOut();
    $("#modalGanho").show();
    $("#modalGanho").modal("show");
  }, 3000);
}

function ganharSaldo(event) {
  event.preventDefault();

  var valorSorteado = Math.random() * (5.1 - 1.2) + 1.2;

  let texto =
    `Um valor de R$` +
    valorSorteado.toFixed(2) +
    " foi adicionado ao seu saldo por ter clicado nao anúncio. Continue e ganhe cada vez mais!";

  document.getElementById("valor-ganho").innerHTML = texto;

  let usuarios = JSON.parse(localStorage.getItem("db_usuarios"));
  let obj = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
  let usuario = usuarios.find((usuario) => usuario.id === obj.id);
  let balance = usuario.balance;
  let newBalance = balance + valorSorteado;
  usuario.balance = newBalance;
  localStorage.setItem("db_usuarios", JSON.stringify(usuarios));
}

function updateSaqueValueBalance(event) {
  event.preventDefault();

  var valor = document.getElementById("valor").value;
  var chave = document.getElementById("chave-pix").value;
  valorReal = valor.replace("R$ ", "").replace(",", "."); //Remove o R$ e a vírgula e substitui por ponto
  valorReal = parseFloat(valorReal); //Converte para float

  let usuarios = JSON.parse(localStorage.getItem("db_usuarios"));
  let obj = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
  let usuario = usuarios.find((usuario) => usuario.id === obj.id);

  if (valor == "" || chave == "") {
    $(
      '<div class="alert alert-danger" role="alert">Preencha todos os campos para continuar com o saque.</div>'
    )
      .appendTo("#alerta-modals")
      .fadeIn(300)
      .delay(3000)
      .fadeOut(400);
    return;
  }

  if (usuario.balance == 0) {
    $(
      '<div class="alert alert-danger" role="alert">Você não tem saldo para retirar.</div>'
    )
      .appendTo("#alerta-modals")
      .fadeIn(300)
      .delay(3000)
      .fadeOut(400);
    return;
  }
  let balance = usuario.balance;
  let newBalance = balance - valorReal;
  if (newBalance < 0) {
    $(
      '<div class="alert alert-danger" role="alert">Você não tem o valor atual para retirar.</div>'
    )
      .appendTo("#alerta-modals")
      .fadeIn(300)
      .delay(3000)
      .fadeOut(400);
    return;
  }

  usuario.balance = newBalance;
  localStorage.setItem("db_usuarios", JSON.stringify(usuarios));

  $(
    '<div class="alert alert-success" role="alert">Você realizou o saque, para a sua conta.</div>'
  )
    .appendTo("#alerta-modals")
    .fadeIn(300)
    .delay(3000)
    .fadeOut(400);
  setTimeout(function () {
    window.location.href = "anuncios.html";
  }, 3000);
}

function showBalanceProf() {
  window.event.preventDefault();

  let usuarios = JSON.parse(localStorage.getItem("db_usuarios"));
  let obj = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
  let usuario = usuarios.find((usuario) => usuario.id === obj.id);

  if (usuario.balance == 0) {
    document.getElementById("saldo-client").innerHTML =
      "<strong>SALDO: </strong>R$0,00";
  } else {
    var textoSaldo = "<strong>SALDO: </strong>R$" + usuario.balance.toFixed(2);
    document.getElementById("saldo-client").innerHTML = textoSaldo;
  }

  var textoNome = "Olá, " + usuario.nome;
  document.getElementById("nome-client").innerHTML = textoNome;
}

function showAD() {
  window.event.preventDefault();

  let anuncios = [
    `<div class="card shadow" style="width: 18rem">
    <img
      class="card-img-top"
      src="img\/adSapato.jpg"
      alt="Card image cap"
    />
    <div class="card-body">
      <strong class="d-inline-block mb-2 text-primary"
        >Facebook Ads</strong
      >
      <h3 class="mb-0">
        <a class="text-dark" href="#"> Clube do Homem </a>
      </h3>
      <p class="card-text">
        Os tênis mais estilosos e autênticos para te acompanhar em todos
        os momentos. Use o cupom CLUBEVIP e ganhe R$30 na sua compra.
      </p>
      <a id="ad-btn" class="btn btn-primary">Comprar agora!</a>
    </div>
  </div>`,
    `<div class="card shadow" style="width: 18rem">
  <img
    class="card-img-top"
    src="img\/adBrinco.jpg"
    alt="Card image cap"
  />
  <div class="card-body">
    <strong class="d-inline-block mb-2 text-primary"
      >Facebook Ads</strong
    >
    <h3 class="mb-0">
      <a class="text-dark" href="#"> Loja The Zion Joias </a>
    </h3>
    <p class="card-text">
    |Coleção nova Coração flat em Ouro 18K|
    </p>
    <p class="card-text">
    Coração é espelho da alma, refletindo amor, e vibrando em cor, simplesmente majestoso, deixando claro seu significado maravilhoso, se é amor de verdade tudo pode!
    Consulte nosso pronta entrega.
    </p>
    <a id="ad-btn" class="btn btn-primary" >Comprar agora!</a>
  </div>
</div>`,
    `<div class="card shadow" style="width: 18rem">
  <img
    class="card-img-top"
    src="img\/adTTK.jpg"
    alt="Card image cap"
  />
  <div class="card-body">
    <strong class="d-inline-block mb-2 text-primary"
      >TikTok Ads</strong
    >
    <p class="card-text">
    Venha criar e assistir vídeos 24 horas por dia, no TikTok. Ganhe para assistir e para produzir, estamos esperando por vocês!
    </p>
    <a id="ad-btn" class="btn btn-primary" >Comprar agora!</a>
  </div>
</div>`,
    `<div class="card shadow" style="width: 18rem">
<img
  class="card-img-top"
  src="img\/adColchao.jpg"
  alt="Card image cap"
/>
<div class="card-body">
  <strong class="d-inline-block mb-2 text-primary"
    >Facebook Marketplace</strong
  >
  <h3 class="mb-0">
      <a class="text-dark" href="#"> Emma Colchões Brasil </a>
    </h3>
  <p class="card-text">
  Vendas de Verão Emma
  </p>
  <a id="ad-btn" class="btn btn-primary">Comprar agora!</a>
</div>
</div>`,
    `<div class="card shadow" style="width: 18rem">
<img
  class="card-img-top"
  src="img\/adTenis.jpg"
  alt="Card image cap"
/>
<div class="card-body">
  <strong class="d-inline-block mb-2 text-primary"
    >Facebook Marketplace</strong
  >
  <h3 class="mb-0">
      <a class="text-dark" href="#"> Benedictuss </a>
    </h3>
  <p class="card-text">
  💥Tênis Fast Conforty R$ 229
  </p>
  <p class="card-text">
🚛Frete Grátis Para Todo Brasil
  </p>
  <p class="card-text">
🔥Por Tempo Limitado
  </p>
  <a id="ad-btn" class="btn btn-primary">Comprar agora!</a>
</div>
</div>`,
  ];
  let randomIndex = Math.floor(Math.random() * anuncios.length);
  document.getElementById("ads").innerHTML = anuncios[randomIndex];
}

function formatarValor(valor) {
  valor.value = valor.value.replace(/\D/g, ""); //Remove qualquer caractere que não seja numérico
  valor.value = valor.value.replace(/(\d)(\d{2})$/, "$1,$2"); //Coloca a vírgula antes dos dois últimos digitos
  valor.value = "R$ " + valor.value; //Adiciona o R$
}

function getValorReal(valor) {
  valorReal = valor.value.replace("R$ ", "").replace(",", "."); //Remove o R$ e a vírgula e substitui por ponto
  valorReal = parseFloat(valorReal); //Converte para float
  return valorReal;
}
