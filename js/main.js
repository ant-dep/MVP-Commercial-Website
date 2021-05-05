let carts = document.querySelectorAll("#addToCartBtn");


/* action on click on button "Ajouter au panier" */
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        alert("Ajouté à votre panier!");
    })
}

/* keeping cart saved after page reload */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('#cart span').textContent = productNumbers;
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

/* working on LocalStorage */
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        /* be able to add diferents products */
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        /* and increment each others */
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

/* Calculate total cost of the cart */
function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        // convert string into number
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector("#products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        // for each item in cart do :
        Object.values(cartItems).map(item => {
            // Cart items details
            productContainer.innerHTML += `
            <div class="col-12 mt-5">
                <div class="d-flex justify-content-start">
                    <h2 class="mr-3">Panier</h2>
                </div>
            </div>
            <div class="row shadow-sm py-2 mb-3 bg-body rounded-3">
                <div class="col-3">
                    <img src="images/${item.name}.jpg" alt="${item.name}" class="img-fluid rounded p-0"/>
                </div>
                <div class="col-4 text-center my-auto">
                <a href="./html/${item.tag}.html" class="link-dark"><span>${item.name}</span></a>
                </div>
                <div class="col-2 my-auto">
                    <i class="fas fa-caret-left"></i>
                    <span>${item.inCart}</span>
                    <i class="fas fa-caret-right"></i>
                </div>
                <div class="col-2 my-auto">
                        <p class="my-auto"><strong>${item.inCart * item.price}€</strong></p>
                </div>
                <div class="col-1 my-auto">
                        <i class="fas fa-trash-alt"></i>
                </div>
            </div>
            `;
            // Cart Total
            productContainer.innerHTML += `
            <hr class="line  mt-5">
            <div class="d-flex justify-content-end align-items-center totalPrice p-2">
                <h4 class="my-auto"><strong>Total</strong></h4>
                <p class="my-auto"><strong class="px-5">${cartCost}€</strong></p>
            </div>
            `;
            // Buttons "Continuer mon shopping" and "Commander"
            productContainer.innerHTML += `
            <div class="row mt-5 position-sticky bottom-0">
                <div class="col-6">
                    <a class="btn btn-primary w-100" type="button" href="index.html"><span>Continuer mon shopping</span></a>
                </div>
                <div class="col-6">
                    <a id="order-button" class="btn btn-primary w-100" href="#down"><span>Commander</span></a>
                </div>
            </div>
            `;
        });
    } else {
        // if nothing in cart display
        productContainer.innerHTML = `
        <div class="col-12 text-center">
            <span>Votre panier est vide !</span>
            <hr class="line my-5">
        </div>
        <div class="col-6 mx-auto mt-3">
            <a class="btn btn-primary w-100" type="button" href="index.html"><span>Continuer mon shopping</span></a>
        </div>`;
    }
    // Display both blocks for 3Contact / Adresse" and "Paiement"
    function displayCheckout() {
        let checkout = document.querySelector('#checkout');
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
                                <label for="prenom">
                                    Prénom
                                </label>
                                <input type="text" name="Prénom" id="prenom" class="form-control" required />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="nom">
                                    Nom
                                </label>
                                <input type="text" name="Nom" id="nom" class="form-control" required />
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
                <label for="adresse">
                    Rue
                </label>
                <input id="adresse" name="Adresse" class="form-control" type="address" required />
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <label for="codePostal">
                        Code Postal
                    </label>
                    <input type="number" name="Code Postal" id="codePostal" class="form-control" required />
                </div>
                <div class="form-group col-md-4">
                    <label for="ville">
                        Ville
                    </label>
                    <input type="text" name="Ville" id="ville" class="form-control" required />
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
                <a href="confirmation.html" class="btn btn-primary btn mt-3" type="button"><span>Valider</span></a>
            </form>
        </div>
    </div>`;
        // Total cost adapted and displayed after CC form
        const totalTTC = document.querySelector('#total-ttc');
        let TVA = 1.2;
        const TVAContainer = document.querySelector('#TVA');
        const totalHT = document.querySelector('#total-ht');
        totalHT.innerHTML += `<em>${cartCost / TVA}€</em>`;
        TVAContainer.innerHTML += `<em>${cartCost - (cartCost / TVA)}€</em>`;
        totalTTC.innerHTML += `<strong>${cartCost}€</strong>`;

        let footer = document.querySelector('#footer');
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
    orderBtn.addEventListener('click', displayCheckout);

}
onLoadCartNumbers();
displayCart();