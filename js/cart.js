;
(() => {
    console.log('Javascript is loaded')
    const productsInShoppingCart = Cart.products
    if (productsInShoppingCart === null) {
        return hydratePage(productsInShoppingCart);
    }
})()

function hydratePage(productsInShoppingCart) {
    // Set total price
    document.getElementById('totalPrice').textContent = Cart.getTotalPrice() + '.0€'

    // Loop over all products and displays them
    const productList = Object.values(productsInShoppingCart)
    productList.forEach((product) => {
        displayProduct(product)
    })

    addEventListeners()
}

function displayProduct(product) {
    // Get & clone template
    const templateElt = document.getElementById('productTemplate')
    const cloneElt = document.importNode(templateElt.content, true)

    // Hydrate template
    cloneElt.getElementById('productImage').src = product.imageUrl
    cloneElt.getElementById('productLink').href = `/products.html?id=${product._id}`
    cloneElt.getElementById('productQuantity').selectedIndex = product.quantity - 1
    cloneElt.getElementById('productPrice').textContent = product.price / 100 + '.0€'
    cloneElt.getElementById('productTotalPrice').textContent = (product.price * product.quantity) / 100 + '.0€'

    // Add events
    cloneElt.getElementById('productQuantity').onchange = (e) => {
        e.preventDefault()

        Cart.updateProductQuantity(product._id, e.target.selectedIndex + 1)

        // Update product total price
        const totalPriceElt = e.target.parentElement.parentElement.parentElement.querySelector(
            '#productTotalPrice'
        )
        const newPrice = (product.price * Cart.getProductQuantity(product._id)) / 100 + '.0€'
        totalPriceElt.textContent = newPrice

        // Update all products total price
        document.getElementById('totalPrice').textContent = Cart.getTotalPrice() + '.0€'
    }

    // Display template
    document.getElementById('productsList').prepend(cloneElt);
    document.getElementById('cartButtons').innerHTML += `
      <div class="col-6">
        <a class="btn btn-primary w-100" type="button" href="index.html"><span>Continuer mon shopping</span></a>
      </div>
      <div class="col-6">
        <a id="order-button" class="btn btn-primary w-100" href="#down"><span>Commander</span></a>
      </div>`;

    // Display both blocks for "Contact / Adresse" and "Paiement"
    function displayCheckout() {
        const checkout = document.querySelector('#checkout');
        checkout.innerHTML += `
  <div id="down" class="row mb-5 pb-5">
      <div class="col-12 col-md-8">
          <div class="row">
          <!--====================CONTACT======================-->
              <div class="col mt-5 p-3">
                  <h3 class="d-flex justify-content-between align-items-center">Contact</h3>
                  <form>
                      <div class="row">
                          <div class="form-group col-md-4">
                              <label for="firstname">
                                  Prénom
                              </label>
                              <input type="text" name="Prénom" id="firstname" class="form-control" required />
                          </div>
                          <div class="form-group col-md-4">
                              <label for="lastname">
                                  Nom
                              </label>
                              <input type="text" name="Nom" id="lastname" class="form-control" required />
                          </div>
                      </div>
                      <div class="form-group col-md-6">
                          <label for="email">
                              Adresse email
                          </label>
                          <input id="email" name="Adresse email" class="form-control" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                      </div>
                      <div class="form-group col-sm-4">
                          <label for="telephone">
                              Téléphone
                          </label>
                          <input id="telephone" name="Téléphone" class="form-control" type="phone" required />
                      </div>
                  </form>
              </div>
          </div>
          <!--====================ADRESSE======================-->
          <h3 class="d-flex justify-content-between align-items-center mt-3">Adresse de livraison</h3>
          <div class="form-group col-md-8">
              <label for="address">
                  Rue
              </label>
              <input id="address" name="Adresse" class="form-control" type="address" required />
          </div>
          <div class="row">
              <div class="form-group col-md-4">
                  <label for="zipcode">
                      Code Postal
                  </label>
                  <input type="number" name="Code Postal" id="zipcode" class="form-control" required />
              </div>
              <div class="form-group col-md-4">
                  <label for="city">
                      Ville
                  </label>
                  <input type="text" name="Ville" id="city" class="form-control" required />
              </div>
          </div>
          <div class="form-group col-md-8 mt-3">
              <label for="commentaire">
                  Commentaire
              </label><textarea id="commentaire" class="form-control" rows="4" cols="50" name="Commentaire" required></textarea>
          </div>
      </div>
      <!--====================PAIEMENT======================-->
      <div class="col-12 col-md-4 mt-5 p-3">
          <form class="payment-info">
              <h3 class="d-flex justify-content-between align-items-center">Paiement</h3>
              <div class="row">
                  <div class="col">
                      <span class="type d-block mt-3 mb-1">Type de Carte</span><label class="radio"> <input type="radio" name="card" value="payment" checked> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
                      <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png" /></span></label>
                      <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span></label>
                      <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png" /></span></label>
                  </div>
              </div>
              <div><label class="credit-card-label">Porteur de la Carte</label><input class="form-control credit-inputs" type="text" placeholder="Antoine de Pertat"></div>
              <div><label class="credit-card-label">Numéro de la Carte</label><input class="form-control credit-inputs" type="text" pattern="[0-9]*" inputmode="numeric" maxlength="16" placeholder="0000 0000 0000 0000"></div>
              <div class="row">
                 <div class="col-md-6"><label class="credit-card-label">Expiration</label><input class="form-control credit-inputs" type="text" pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" title="Enter a date in this format MM/YY" maxlength="5" placeholder="12/24"></div>
                  <div class="col-md-6"><label class="credit-card-label">CVV</label><input class="form-control credit-inputs" type="text" pattern="[0-9]*" inputmode="numeric" maxlength="3" placeholder="342"></div>
              </div>
              <hr class="line">
              <div class="d-flex justify-content-between"><span>Total(HT)</span><span id="total-ht"></span></div>
              <div class="d-flex justify-content-between"><span>TVA</span><span id="TVA"></span></div>
              <div class="d-flex justify-content-between mt-2"><span>Total(TTC)</span><span id="total-ttc"></span></div>
              <a href="#" id="confirmPurchase" class="btn btn-primary btn mt-3" type="button"><span>Valider</span></a>
          </form>
      </div>
      </div>`;

        // Total cost adapted and displayed after CC form
        const totalTTC = document.querySelector('#total-ttc');
        let TVA = 1.2;
        const TVAContainer = document.querySelector('#TVA');
        const totalHT = document.querySelector('#total-ht');
        totalHT.innerHTML += `<em>${Cart.getTotalPrice() / TVA}€</em>`;
        TVAContainer.innerHTML += `<em>${Cart.getTotalPrice() - (Cart.getTotalPrice() / TVA)}€</em>`;
        totalTTC.innerHTML += `<strong>${Cart.getTotalPrice()}€</strong>`;

        const footer = document.querySelector('#footer');
        footer.style.display = "none";
        let newFooter = document.querySelector('#newFooter');
        newFooter.innerHTML = `
      <footer class="container-fluid mt-5 position-absolute bottom-0 my-auto bg-light">
          <div class="row">
              <div class="col">
                  <ul class="list-inline text-center my-auto p-3">
                      <!--links to adapt-->
                      <li class="list-inline-item"><a href="#" class="text-decoration-none text-body">À propos de nous</a></li>
                      <li class="list-inline-item">&middot;</li>
                      <li class="list-inline-item"><a href="#" class="text-decoration-none text-body">Confidentialité</a></li>
                      <li class="list-inline-item">&middot;</li>
                      <li class="list-inline-item"><a href="#" class="text-decoration-none text-body">Conditions Générales</a></li>
                  </ul>
              </div>
          </div>
      </footer>`;
    };

    // Display Blocks after click on "Commander"
    let orderBtn = document.querySelector('#order-button');
    orderBtn.addEventListener('click', displayCheckout());
}

function addEventListeners() {
    // Purchase button
    document.getElementById('confirmPurchase').onclick = (e) => {
        e.preventDefault()
        sendOrder()
    }

    // Input validity
    watchValidity(document.getElementById('firstname'), (e) => e.target.value.length > 1)
    watchValidity(document.getElementById('lastname'), (e) => e.target.value.length > 1)
    watchValidity(document.getElementById('email'), (e) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return emailRegex.test(e.target.value)
    })
    watchValidity(document.getElementById('address'), (e) => e.target.value.length > 6)
    watchValidity(document.getElementById('zipcode'), (e) => {
        const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/
        return zipcodeRegex.test(e.target.value)
    })
    watchValidity(document.getElementById('city'), (e) => e.target.value.length > 1)
}

function watchValidity(elt, condition) {
    elt.oninput = (e) => {
        if (condition(e)) {
            validInputElt(e.target)
        } else {
            neutralInputElt(e.target)
        }
    }

    elt.onblur = (e) => {
        if (!condition(e)) {
            invalidInputElt(e.target)
        }
    }
}

function validInputElt(elt) {
    elt.style.border = 'solid 1px green'
    elt.style.boxShadow = '#00800066 0px 0px 4px'
}

function invalidInputElt(elt) {
    elt.style.border = 'solid 1px red'
    elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
}

function neutralInputElt(elt) {
    elt.style.border = ''
    elt.style.boxShadow = ''
}

function sendOrder() {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const adress = document.getElementById('address').value
    const zipcode = document.getElementById('zipcode').value
    const email = document.getElementById('email').value
    const city = document.getElementById('city').value

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/

    if (!(
            firstname.length > 1 &&
            lastname.length > 1 &&
            emailRegex.test(email) &&
            address.length > 6 &&
            zipcodeRegex.test(zipcode) &&
            city.length > 1
        )) {
        alert("Veuillez remplir les champs correctements avant de procéder au paiement")
        return
    }

    const products = Object.values(Cart.products).map((product) => {
        return product._id
    })

    const order = {
        contact: {
            firstName: firstname,
            lastName: lastname,
            address: address + ' ' + zipcode,
            city: city,
            email: email,
        },
        products: products,
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }

    fetch(`${apiUrl}/api/cameras/order`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            localStorage.removeItem('shoppingCart')
            window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`
        })
        .catch(() => {
            alert(error)
        })
}