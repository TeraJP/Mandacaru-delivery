
  function toggleCategory(categoryId) {
    var categoryContent = document.getElementById(categoryId);
    categoryContent.style.display = categoryContent.style.display === 'block' ? 'none' : 'block';
  }

document.addEventListener("DOMContentLoaded", function() {



    var cartItems = [];
  
    var addToCartButtons = document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", function() {
        var name = this.getAttribute("data-name");
        var price = parseFloat(this.getAttribute("data-price"));
  
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
    }
  
    var checkoutButton = document.getElementById("checkout-btn");
    checkoutButton.addEventListener("click", function() {
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
  
      sessionStorage.setItem('checkoutMessage', message);
      window.location.href = 'summary.html';
  
      cartItems = [];
      updateCart();
    });
  
    function updateCart() {
      var tableBody = document.getElementById("cart").getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";
  
      var cartTotal = 0;
  
      cartItems.forEach(function(cartItem) {
        var total = cartItem.price * cartItem.quantity;
        cartTotal += total;
  
        var row = "<tr>";
        row += '<td class="cart-item-name">' + cartItem.name + "</td>";
        row += "<td>R$ " + cartItem.price.toFixed(2) + "</td>";
        row += "<td>" + cartItem.quantity + "</td>";
        row += '<td><button class="btn btn-danger btn-sm remove-item" data-name="' + cartItem.name + '">Remover</button></td>';
        row += "</tr>";
  
        tableBody.innerHTML += row;
      });
  
      document.getElementById("cart-total").textContent = "R$ " + cartTotal.toFixed(2);
  
      var removeButtons = document.getElementsByClassName("remove-item");
      for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", function() {
          var name = this.getAttribute("data-name");
          cartItems = cartItems.filter(function(cartItem) {
            return cartItem.name !== name;
          });
  
          updateCart();
          showSuccessMessage("Item removido do carrinho.");
        });
      }
    }
  
    function showSuccessMessage(message) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top-end'
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.querySelector('.navbar');
    var navbarCollapse = document.querySelector('.navbar-collapse');
  
    document.addEventListener('click', function(event) {
      var target = event.target;
      if (!navbar.contains(target)) {
        navbarCollapse.classList.remove('show');
      }
    });
  });