let carts = document.querySelectorAll("#addToCart");

/* action on click on button "Ajouter au panier" */
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers([i]);
    })
}

/* keeping cart saved after page reload */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('#cart span').textContent = productNumbers;
        document.querySelector('#cart span').classList.add('text-danger');
    }
}
/* Increment cart numbers */
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#cart span').textContent = 1
    }

    setItems(product);
}

onLoadCartNumbers();


/* else {
        // if nothing in cart display
        let empyCart = document.querySelector('#emptyCart')
        emptyCart.innerHTML = `
      <div class="col-12 text-center">
          <span>Votre panier est vide !</span>
          <hr class="line my-5">
      </div>
      <div class="col-6 mx-auto mt-3">
          <a class="btn btn-primary w-100" type="button" href="index.html"><span>Continuer mon shopping</span></a>
      </div>`;
    }
*/