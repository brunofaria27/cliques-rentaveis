$(() => {
  $("cpf_login")
    .mask("000.000.000-00")
    .replaceAll(/[\.\-]/g, "");

  $("cpf_cadastro")
    .mask("000.000.000-00")
    .replaceAll(/[\.\-]/g, "");
});
