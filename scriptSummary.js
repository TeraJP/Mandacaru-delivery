var whatsappButton = document.getElementById("whatsappButton");
whatsappButton.addEventListener("click", function() {

  var nameInput = document.getElementById("name");
  var addressInput = document.getElementById("address");
  var moneyChangeInput = document.getElementById("money-change");

  var name = nameInput.value;
  var address = addressInput.value;
  var moneyChange = moneyChangeInput.value;

  var message = sessionStorage.getItem('checkoutMessage');
  var finalMessage = message + '\n\n';
  finalMessage += 'Nome: ' + name + '\n';
  finalMessage += 'Endereço: ' + address + '\n';
  finalMessage += 'Troco para quanto: ' + moneyChange;

  var url = 'https://api.whatsapp.com/send?phone=+55798116-9700&text=' + encodeURIComponent(finalMessage);
  window.open(url, '_blank');

});