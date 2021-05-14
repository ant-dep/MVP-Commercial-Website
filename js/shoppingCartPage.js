const showCartContent = () => {

    // Variables :
    // - Pour stocker le panier que récupère : const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
    // - Pour stocker le block html que je vais créer a chaque article : let blocOfMyShoppingCart = ``
    // - Pour stocker le montant total et l'initialisé a 0 : let SumTotal = 0

    //     Etape 1 : Récupérer les articles de mon panier (verifie que myShoppingCart existe dans mon localStorage)
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
    let blocOfMyShoppingCart = ''
        // - Etape 2 : Afficher les articles
        //  Si panier vide j'affiche "panier vide" // blocOfMyShoppingCart (avec "Panier Vide")
    if (!myShoppingCart.length) {
        blocOfMyShoppingCart =
            `
        <div class="col-12 text-center">
            <span>Votre panier est vide !</span>
            <hr class="line my-5">
        </div>
        <div class="col-6 mx-auto mt-3">
            <a class="btn btn-dark w-100" href="../index.html"><span>Continuer mon shopping</span></a>
        </div>`
        document.getElementById('products').innerHTML = blocOfMyShoppingCart

    } else { //Sinon

        // Je créé une boucle qui va permettre de
        for (const product of myShoppingCart) {

            // Créer un nouveau bloc html pour chaque article blocOfMyShoppingCart  (avec les valeurs de mon panier)
            blocOfMyShoppingCart +=
                `<div class="col-12 col-md-10 mx-auto">
                        <div class="row shadow-sm py-2 mb-3 bg-body rounded-3">
                            <div class="col-3">
                                <img class="img-fluid rounded p-0" src="${product.imageUrl}" alt="${product.name}" />
                            </div>
                            <div class="col-2 text-center my-auto">
                                <p class="text-center my-auto" onClick="redirectToProductPage('${product._id}')">${product.name}</p>
                            </div>
                            <div class="col-2 my-auto text-center my-auto">
                                <select id="select-${product._id}" class="border border-dark rounded-3 text-center pl-3 pr-10 py-1 z-10 name="quantityOfProduct">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="col-2 my-auto">
                                <p id="productPrice" class="text-center p-0 my-auto">${product.price}€</p>
                            </div>
                            <div class="col-2 my-auto">
                                <p id="totalProduct-${product._id}" class="fw-bold text-center p-0 my-auto">${(product.price * product.quantity).toFixed(2)}€</p>
                            </div>
                            <div class="col-1 my-auto">
                                <i class="fas fa-trash-alt" onclick="removeProduct('${product._id}')"></i>
                            </div>
                        </div>
                    </div>`
        }

        document.getElementById('products').innerHTML = blocOfMyShoppingCart
        document.getElementById('sumTotal').innerHTML = `<span class="fw-bolder fst-italic">Total : ${getCartTotalPrice()}€</span>`

        for (let product of myShoppingCart) {
            const selectQuantity = document.getElementById(`select-${product._id}`)
            const totalProduct = document.getElementById(`totalProduct-${product._id}`)
            console.log(totalProduct)
                // selectQuantity = tableau, -1 car index commence a 0
            selectQuantity.selectedIndex = product.quantity - 1
            selectQuantity.addEventListener('change', () => {
                console.log('totalProduct', totalProduct, product)
                setQtyProduct(product._id, selectQuantity.value)
                totalProduct.innerHTML = `${getTotalProduct(product._id)} €`
                const totalPriceOfCart = getCartTotalPrice()
                document.getElementById('sumTotal').innerHTML = `<span> Total : </span> <span> ${totalPriceOfCart} € </span> `
            })
        }
    }
    // Display both blocks for "Contact / Adresse" and "Paiement"
    const orderBtn = document.getElementById("orderBtn");
    orderBtn.addEventListener("click", displayCheckout);

    function displayCheckout() {
        // désactive le button après le clic
        orderBtn.removeEventListener('click', displayCheckout);

        const checkout = document.querySelector('#checkout');
        checkout.innerHTML += `
        <div id="down" class="row pb-5">
            <div class="col-12 col-md-8">
                <!--====================CONTACT======================-->
                <div class="row">
                    <div class="col mt-5 p-3">
                        <h3 class="d-flex justify-content-between align-items-center">Contact</h3>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="firstName">
                                        Prénom
                                    </label>
                                    <input id="firstName" type="text" class="form-control" name="Prénom" required>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="lastName">
                                        Nom
                                    </label>
                                    <input id="lastName" type="text" class="form-control" name="Nom" required>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="email">
                                    Adresse email
                                </label>
                                <input id="email" class="form-control" type="email" name="Email" required>
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="phone">
                                    Téléphone
                                </label>
                                <input id="phone" name="Téléphone" class="form-control" type="phone" required />
                            </div>
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
                        <input type="text" name="Code Postal" id="zipcode" class="form-control" pattern="[0-9]*" inputmode="numeric" maxlength="5" required />
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
                    </label><textarea id="commentaire" class="form-control" rows="4" cols="50" name="Commentaire"></textarea>
                </div>
            </div>
            <!--====================PAIEMENT======================-->
            <div class="col-12 col-md-4 mt-5 p-3">
                <div class="payment-info" onsubmit="return beforeCreateOrder(event)">
                    <h3 class="d-flex justify-content-between align-items-center">Paiement</h3>
                    <div class="row">
                        <div class="col">
                            <span class="type d-block mt-3 mb-1">Type de Carte</span><label class="radio"> <input type="radio" name="card" value="payment" checked> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
                            <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png" /></span></label>
                            <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span></label>
                            <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png" /></span></label>
                        </div>
                    </div>
                    <div><label class="credit-card-label">Porteur de la Carte</label><input class="form-control credit-inputs" type="text"></div>
                    <div><label class="credit-card-label">Numéro de la Carte</label><input class="form-control credit-inputs" type="text" pattern="[0-9]*" inputmode="numeric" maxlength="16" placeholder="0000 0000 0000 0000"></div>
                    <div class="row">
                    <div class="col-md-6"><label class="credit-card-label">Expiration</label><input class="form-control credit-inputs" type="text" pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" title="Enter a date in this format MM/YY" maxlength="5" placeholder="mm/yy"></div>
                        <div class="col-md-6"><label class="credit-card-label">CVV</label><input class="form-control credit-inputs" type="text" pattern="[0-9]*" inputmode="numeric" maxlength="3" placeholder="000"></div>
                    </div>
                    <hr class="line">
                    <div class="d-flex justify-content-between"><span>Total(HT)</span><span id="total-ht"></span></div>
                    <div class="d-flex justify-content-between"><span>TVA</span><span id="TVA"></span></div>
                    <div class="d-flex justify-content-between mt-2"><span>Total(TTC)</span><span id="total-ttc"></span></div>
                </div>
            </div>
        </div>`;

        document.getElementById("confirmPurchase").classList = "d-block";
        // On ajoute la TVA et le calcul HT et on réaffiche le TTC
        const totalTTC = document.querySelector('#total-ttc');
        const totalPriceOfCart = getCartTotalPrice()
        let TVA = 1.2;
        const TVAContainer = document.querySelector('#TVA');
        const totalHT = document.querySelector('#total-ht');
        totalHT.innerHTML += `<em>${(totalPriceOfCart / TVA).toFixed(2)}€</em>`;
        // toFixed() est utilisée pour reduire le nombre de décimales du total nombre de (2)
        TVAContainer.innerHTML += `<em>${(totalPriceOfCart - (totalPriceOfCart / TVA)).toFixed(2)}€</em>`;
        totalTTC.innerHTML += `<span class="fw-bolder fst-italic">${totalPriceOfCart}€</span>`;

        // L'ajout de contenu vient agrandir le viewport et fixe le footer au milieu de la nouvelle page
        // A cause de la position absolue du footer, on le supprime et on en rajoute un nouveau en bas
        const footer = document.querySelector('#footer');
        footer.classList = "d-none";
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
}

const beforeCreateOrder = (e) => {
    console.log(e)
    e.preventDefault()
    document.getElementById('form-error').innerHTML = ""
    const contact = getUserData();
    const errors = []
    console.log('contact', contact)
    const alphaRegExp = /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/

    document.getElementById('firstName').classList.remove('good', 'error')
    document.getElementById('lastName').classList.remove('good', 'error')
    document.getElementById('address').classList.remove('good', 'error')
    document.getElementById('city').classList.remove('good', 'error')
    document.getElementById('email').classList.remove('good', 'error')

    // Test firstName
    let firstNameValid = true
    if (!alphaRegExp.test(contact.firstName)) {
        errors.push('Le prénom doit uniquement contenir des lettres')
        firstNameValid = false
    }
    document.getElementById('firstName').classList.add(firstNameValid ? 'good' : 'error')

    // Test lastname
    let lastNameValid = true
    if (!alphaRegExp.test(contact.lastName)) {
        errors.push('Le nom doit uniquement contenir des lettres')
        lastNameValid = false
    }
    document.getElementById('lastName').classList.add(lastNameValid ? 'good' : 'error')

    // Test city
    let cityValid = true
    if (!alphaRegExp.test(contact.city)) {
        errors.push('La ville doit uniquement contenir des lettres')
        cityValid = false
    }
    document.getElementById('city').classList.add(cityValid ? 'good' : 'error')


    // Test address
    let addressValid = true
    document.getElementById('address').classList.add(addressValid ? 'good' : 'error')


    // Test email
    let emailValid = true
    document.getElementById('email').classList.add(emailValid ? 'good' : 'error')

    if (!errors.length) {
        createOrder()
        console.log("order created")
    } else {
        let htmlError = ''
        for (const error of errors) {
            htmlError += `${error} <br/>`
        }
        document.getElementById('form-error').innerHTML = htmlError
    }
}