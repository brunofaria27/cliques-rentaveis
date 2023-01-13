// Página inicial de Login
const LOGIN_URL = "login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = [];

// Objeto para o usuário corrente
var usuarioCorrente = {};

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = [
  {
    id: generateUUID(),
    nome: "admin",
    cpf: "00000000000",
    senha: "adm123",
    balance: "0",
  },
  {
    id: generateUUID(),
    nome: "admin2",
    cpf: "00000000000",
    senha: "adm123",
    balance: "0",
  },
];

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp() {
  // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
  usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");
  if (usuarioCorrenteJSON) {
    usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
  }

  // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
  // Obtem a string JSON com os dados de usuários a partir do localStorage
  var usuariosJSON = localStorage.getItem("db_usuarios");

  // Verifica se existem dados já armazenados no localStorage
  if (!usuariosJSON) {
    // Se NÃO há dados no localStorage

    // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
    console.log(
      "Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial."
    );

    // Copia os dados iniciais para o banco de dados
    db_usuarios = dadosIniciais;

    // Salva os dados iniciais no local Storage convertendo-os para string antes
    localStorage.setItem("db_usuarios", JSON.stringify(dadosIniciais));
  } else {
    // Se há dados no localStorage

    // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
    db_usuarios = JSON.parse(usuariosJSON);
  }
}

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(cpf, senha) {
  // Verifica todos os itens do banco de dados de usuarios
  // para localizar o usuário informado no formulario de login
  for (var i = 0; i < db_usuarios.length; i++) {
    var usuario = db_usuarios[i];

    // Se encontrou login, carrega usuário corrente e salva no Session Storage
    if (cpf == usuario.cpf && senha == usuario.senha) {
      usuarioCorrente.id = usuario.id;
      usuarioCorrente.nome = usuario.nome; // NOME DE USER ARMAZENADO EM usuarioCorrente.nome
      usuarioCorrente.cpf = usuario.cpf;
      usuarioCorrente.senha = usuario.senha;
      usuarioCorrente.balance = usuario.balance;

      // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
      sessionStorage.setItem(
        "usuarioCorrente",
        JSON.stringify(usuarioCorrente)
      );

      console.log("Usuário logado com sucesso!");
      // Retorna true para usuário encontrado
      return true;
    }
  }

  // Se chegou até aqui é por que não encontrou o usuário e retorna falso
  return false;
}

function existsCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  var Soma;
  var Resto;
  Soma = 0;
  if (cpf == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function validateCPF(cpf) {
  if (existsCPF(cpf) == false) {
    $(
      '<div class="alert alert-danger" role="alert">O CPF informado não é válido.</div>'
    )
      .appendTo("#alerta-campos")
      .fadeIn(300)
      .delay(3000)
      .fadeOut(400);
    return false;
  }

  for (var i = 0; i < db_usuarios.length; i++) {
    if (cpf == db_usuarios[i].cpf) {
      $(
        '<div class="alert alert-danger" role="alert">Já existe um usuário cadastrado com esse CPF.</div>'
      )
        .appendTo("#alerta-campos")
        .fadeIn(300)
        .delay(3000)
        .fadeOut(400);
      return false;
    }
  }
  return true;
}

function addUser(nome, cpf, senha) {
  // Cria um objeto de usuario para o novo usuario
  let newId = generateUUID();
  let usuario = {
    id: newId,
    nome: nome,
    cpf: cpf,
    senha: senha,
    balance: 0,
  };

  // Inclui o novo usuario no banco de dados baseado em JSON
  db_usuarios.push(usuario);

  // Salva o novo banco de dados com o novo usuário no localStorage
  localStorage.setItem("db_usuarios", JSON.stringify(db_usuarios));
}

function setUserPass() {}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();
