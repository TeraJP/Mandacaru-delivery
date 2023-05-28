var whatsappButton = document.getElementById("whatsappButton");
whatsappButton.addEventListener("click", function () {
  var nameInput = document.getElementById("name");
  var addressInput = document.getElementById("address");
  var paymentMethodSelect = document.getElementById("payment-method");
  var pixFields = document.getElementById("pix-fields");
  var moneyChangeInput = document.getElementById("money-change");

  var name = nameInput.value;
  var address = addressInput.value;
  var paymentMethod = paymentMethodSelect.value;
  var moneyChange = '';

  if (paymentMethod === 'dinheiro') {
    moneyChange = moneyChangeInput.value;
  }

  if (name && address && paymentMethod && (paymentMethod !== 'dinheiro' || (paymentMethod === 'dinheiro' && moneyChange))) {
    var message = sessionStorage.getItem('checkoutMessage');
    var finalMessage = message + '\n\n';
    finalMessage += 'Nome: ' + name + '\n';
    finalMessage += 'Endereço: ' + address + '\n';
    finalMessage += 'Forma de Pagamento: ' + paymentMethod + '';

    if (paymentMethod === 'dinheiro') {
      finalMessage += '\nTroco para quanto: ' + moneyChange;
    }

    if(paymentMethod === 'pix') {
      finalMessage += ': (79) 99879-4942 / João Pedro, Will Pagamentos'
    }

    var url = 'https://api.whatsapp.com/send?phone=+55798116-9700&text=' + encodeURIComponent(finalMessage);
    window.open(url, '_blank');
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

function togglePaymentFields() {
  var paymentMethodSelect = document.getElementById("payment-method");
  var pixFields = document.getElementById("pix-fields");
  var moneyChangeContainer = document.getElementById("money-change-container");

  if (paymentMethodSelect.value === "pix") {
    pixFields.style.display = "block";
    moneyChangeContainer.style.display = "none";
  } else if (paymentMethodSelect.value === "dinheiro") {
    pixFields.style.display = "none";
    moneyChangeContainer.style.display = "block";
  } else {
    pixFields.style.display = "none";
    moneyChangeContainer.style.display = "none";
  }
}
