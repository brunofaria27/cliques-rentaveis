function applyCpfMask() {
  var input = document.getElementById("cpf_input");
  var value = input.value;
  value = value.replace(/\D/g, ""); // remove all non-digit characters
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  input.value = value;
}
