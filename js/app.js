window.addEventListener("load", () => {
    // Select modal elements
    let addedToCart = new bootstrap.Modal(
      document.querySelector("#addedToCart"),
      {
        keyboard: false,
      }
    );
    let cartPurchased = new bootstrap.Modal(
      document.querySelector("#cartPurchased"),
      {
        keyboard: false,
      }
    );
    let alreadyAddedToCart = new bootstrap.Modal(
      document.querySelector("#alreadyAddedToCart"),
      {
        keyboard: false,
      }
    );
    // add product to cart with buttons
    let addToCartButtons = document.querySelectorAll(".card-body");
    for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i];
      button.addEventListener("click", (e) => {
        addToCartClicked(e);
      });
    }
    // empty cart
    document
      .querySelector("#empty-cart")
      .addEventListener("click", () => emptyCart());
    // event for simulating payment confirmation
    document
      .querySelector("#btn-purchase")
      .addEventListener("click", () => purchaseClicked());
    // stopping pulse effect
    document.querySelector("#cart").addEventListener("click", () => {
      cart.classList.remove("hvr-pulse");
    });
    // activate/deactivate the cart buttons
    const toggleShoppingControls = (enable) => {
      if (enable) {
        document.querySelector("#empty-cart").classList.remove("disabled");
        document.querySelector("#btn-purchase").classList.remove("disabled");
        document.querySelector("#btn-purchase").classList.add("hvr-pulse");
      } else {
        document.querySelector("#empty-cart").classList.add("disabled");
        document.querySelector("#btn-purchase").classList.add("disabled");
        document.querySelector("#btn-purchase").classList.remove("hvr-pulse");
      }
    };
    // empty cart
    const emptyCart = () => {
      document.querySelector("tbody").innerHTML = "";
      updateCartTotal();
      toggleShoppingControls(false);
    };
    // simulate purchase and show modal
    const purchaseClicked = () => {
      document.querySelector("tbody").innerHTML = "";
      updateCartTotal();
      toggleShoppingControls(false);
      cartPurchased.show();
      setTimeout(() => {
        cartPurchased.hide();
      }, 2000);
    };
    // remove item from cart
    const removeCartItem = (event) => {
      let buttonClicked = event.target;
      let numRow = buttonClicked.parentNode.parentNode.getAttribute("row-number");
      document.querySelector(`#${numRow}`).remove();
      let numItemsAdded = document.querySelector("tbody").childElementCount;
      if (numItemsAdded == 0) {
        toggleShoppingControls(false);
      }
      updateCartTotal();
    };
    // add a new item to cart after clicking a cart buttom
    const addToCartClicked = (event) => {
      let button = event.target;
      let shopItem = button.parentNode.parentNode.parentNode;
      let productId = shopItem.getAttribute("product-id");
      let title = shopItem.firstElementChild.getAttribute("alt");
      let productName = shopItem.lastElementChild.firstElementChild.textContent;
      let price = shopItem.children[1].firstElementChild.innerText.replace(
        " € / Kg",
        ""
      );
      let imageSrc = shopItem.firstElementChild.src;
      addItemToCart(productId, title, productName, price, imageSrc);
      updateCartTotal();
    };
    // generate row for cart
    const addItemToCart = (productId, title, productName, price, imageSrc) => {
      let cartRow = document.createElement("tr");
      let rowId = "row-number-" + productId;
      cartRow.setAttribute("id", rowId);
      let cartItems = document.querySelectorAll("tr");
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].getAttribute("id") == rowId) {
          alreadyAddedToCart.show();
          setTimeout(() => {
            alreadyAddedToCart.hide();
          }, 2500);
          return;
        }
      }
      let itemsAdded = cartItems.length;
      let cartRowContents = `<th scope="row">${itemsAdded}</th>
          <td>
             <div class="card border-success mb-3 text-center">
                <div class="card-body text-success">
                   <img src="${imageSrc}" alt="${title}" class="img-thumbnail">
                </div>
                <div class="card-footer bg-transparent border-success">${productName}</div>
             </div>
          </td>
          <td>
             <h4 class="card-title pricing-card-title text-center">${price} € <small class="text-muted">/ Kg</small></h4>
          </td>
          <td>
             <div class="row">
                <div class="d-flex justify-content-center quantity col-12 col-md-6">
                   <input class="form-control rounded-sm text-dark border-info" type="number" min="1" max="10"
                      step="1" value="1" row-number="${rowId}">
                   <div class="quantity-nav">
                      <div class="quantity-button quantity-up border-info">
                        <i class="fa-solid fa-circle-arrow-up text-warning"></i>
                      </div>
                      <div class="quantity-button quantity-down border-info">
                        <i class="fa-solid fa-circle-arrow-down text-warning"></i>
                      </div>
                   </div>
                </div>
                <div class="text-center col-12 col-md-6">
                   <button type="button" class="btn btn-link text-danger mt-2" row-number="${rowId}">
                      <span>
                      <i class="fa-solid fa-circle-xmark"></i>
                      </span>
                   </button>
                </div>
             </div>
          </td>`;
      cartRow.innerHTML = cartRowContents;
      document.querySelector("tbody").appendChild(cartRow);
      cartRow.lastElementChild.lastElementChild.lastElementChild.firstElementChild.addEventListener(
        "click",
        removeCartItem
      );
      cartRow.lastElementChild.firstElementChild.firstElementChild.firstElementChild.addEventListener(
        "change",
        updateCartTotal()
      );
      cartRow.lastElementChild.firstElementChild.firstElementChild.firstElementChild.addEventListener(
        "input",
        () => {
          updateCartTotal();
        }
      );
      let input = cartRow.querySelector("input");
      let max = input.getAttribute("max");
      let min = input.getAttribute("min");
      let quantityUp = cartRow.querySelector(".quantity-up");
      quantityUp.firstElementChild.addEventListener("click", () => {
        if (parseFloat(input.value) < max) {
          input.value = parseFloat(input.value) + 1;
        }
        updateCartTotal();
      });
      let quantityDown = cartRow.querySelector(".quantity-down");
      quantityDown.addEventListener("click", () => {
        if (parseFloat(input.value) > min) {
          input.value = parseFloat(input.value) - 1;
        }
        updateCartTotal();
      });
  
      document.querySelector("#cart").classList.add("hvr-pulse");
      if (itemsAdded == 1) {
        toggleShoppingControls(true);
      }
  
      addedToCart.show();
      setTimeout(() => {
        addedToCart.hide();
      }, 1800);
    };
    // Updating the amount of money
    const updateCartTotal = () => {
      let cartItemContainer = document.querySelector("table");
      let cartPrices = cartItemContainer.querySelectorAll(".pricing-card-title");
      let cartQuantities = cartItemContainer.querySelectorAll("input");
      let total = 0;
      for (let i = 0; i < cartPrices.length; i++) {
        let price = cartPrices[i].textContent;
        let quantity = cartQuantities[i].value;
        price = parseFloat(price.replace(/[^0-9|^.]/, ""));
        total = total + price * quantity;
      }
      document.querySelector("#total-count").innerText = total.toFixed(2);
    };
  
    // Make items draggable
    const list_items = document.querySelectorAll(".draggable");
    const cart = document.querySelector("#cart");
    let draggedItem = null;
  
    for (let i = 0; i < list_items.length; i++) {
      const item = list_items[i];
  
      item.addEventListener("dragstart", () => {
        draggedItem = item;
        setTimeout(() => {
          item.style.opacity = "0.5";
        }, 200);
      });
  
      item.addEventListener("dragend", () => {
        setTimeout(() => {
          draggedItem.style.opacity = "1";
          draggedItem = null;
        }, 200);
      });
    }
  
    // Make drop into cart
  
    cart.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  
    cart.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
  
    // cart.addEventListener('dragleave',  (e)=> {
    // });
  
    cart.addEventListener("drop", () => {
      cart.classList.add("hvr-pulse");
      let productId = draggedItem.getAttribute("product-id");
      let title = draggedItem.firstElementChild.getAttribute("alt");
      let productName = draggedItem.lastElementChild.textContent;
      let price = draggedItem.children[1].firstElementChild.innerText.replace(
        " € / Kg",
        ""
      );
      let imageSrc = draggedItem.firstElementChild.src;
      addItemToCart(productId, title, productName, price, imageSrc);
      updateCartTotal();
    });
  });
  