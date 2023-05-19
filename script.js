$(document).ready(function() {
    var cartItems = [];
  
    $('.add-to-cart').click(function() {
      var name = $(this).data('name');
      var price = $(this).data('price');
  
      var item = {
        name: name,
        price: price,
        quantity: 1
      };
  
      var existingItem = cartItems.find(function(cartItem) {
        return cartItem.name === name;
      });
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push(item);
      }
  
      updateCart();
      showSuccessMessage('Item adicionado ao carrinho!');
    });
  
    $('#checkout-btn').click(function() {
      var totalPrice = cartItems.reduce(function(total, cartItem) {
        return total + (cartItem.price * cartItem.quantity);
      }, 0);
  
      var message = 'Resumo do Pedido:\n\n';
      cartItems.forEach(function(cartItem) {
        message += 'Item: ' + cartItem.name + '\n';
        message += 'Quantidade: ' + cartItem.quantity + '\n';
        message += 'Subtotal: R$ ' + (cartItem.price * cartItem.quantity).toFixed(2) + '\n\n';
      });
      message += 'Total: R$ ' + totalPrice.toFixed(2);
  
      var url = 'https://api.whatsapp.com/send?phone=SEU_NUMERO_DO_WHATSAPP&text=' + encodeURIComponent(message);
      window.open(url, '_blank');
  
      cartItems = [];
      updateCart();
      showSuccessMessage('Pedido enviado para o WhatsApp. Obrigado!');
    });
  
    function updateCart() {
      var tableBody = $('#cart tbody');
      tableBody.empty();
  
      var cartTotal = 0;
  
      cartItems.forEach(function(cartItem) {
        var total = cartItem.price * cartItem.quantity;
        cartTotal += total;
  
        var row = '<tr>';
        row += '<td>' + cartItem.name + '</td>';
        row += '<td>R$ ' + cartItem.price.toFixed(2) + '</td>';
        row += '<td>' + cartItem.quantity + '</td>';
        row += '<td>R$ ' + total.toFixed(2) + '</td>';
        row += '<td><button class="btn btn-danger btn-sm remove-item" data-name="' + cartItem.name + '">Remover</button></td>';
        row += '</tr>';
  
        tableBody.append(row);
      });
  
      $('#cart-total').text('R$ ' + cartTotal.toFixed(2));
  
      $('.remove-item').click(function() {
        var name = $(this).data('name');
        cartItems = cartItems.filter(function(cartItem) {
          return cartItem.name !== name;
        });
  
        updateCart();
        showSuccessMessage('Item removido do carrinho.');
      });
    }
  
    function showSuccessMessage(message) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  });
  