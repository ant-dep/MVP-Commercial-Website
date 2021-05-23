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
        <div class="col-12 text-center mt-5">
            <span class="h3">Votre panier est vide !</span>
            <div class="col-12">
            <img class="img-fluid" src="../images/empty_cart.png" alt="logo panier vide">
            </div>
            <hr class="line my-5">
        </div>
        <div class="col-8 col-md-4 mx-auto mt-3">
            <a class="btn btn-dark w-100" href="../index.html"><span>Continuer mon shopping</span></a>
        </div>`
        document.getElementById('main').innerHTML = blocOfMyShoppingCart

    } else { //Sinon

        // Je créé une boucle qui va permettre de
        for (const product of myShoppingCart) {

            // Créer un nouveau bloc html pour chaque article blocOfMyShoppingCart  (avec les valeurs de mon panier)
            blocOfMyShoppingCart +=
                `<div class="col-12 col-md-7 mx-auto">
                    <div class="row shadow-sm py-2 mb-3 bg-body rounded-3">
                            <div class="col-3">
                                <img class="img-fluid rounded p-0" src="${product.imageUrl}" alt="${product.name}" />
                            </div>
                            <div class="col-3 my-auto">
                                <p class="text-center my-auto" onClick="redirectToProductPage('${product._id}')">${product.name}</p>
                            </div>
                            <div class="col-6 d-flex justify-content-around my-auto">
                                <select id="select-${product._id}" class="border border-dark rounded-3 text-center pl-3 pr-10 py-1 z-10 name="quantityOfProduct">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <p id="totalProduct-${product._id}" class="fw-bold text-center p-0 my-auto">${(product.price * product.quantity).toFixed(2)}€</p>
                                <span class="btn text-center p-0 my-auto" onclick="removeProduct('${product._id}')"><i class="fas fa-trash-alt"></i></span>
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
        checkout.classList = ("d-block")

        document.getElementById("confirmPurchase").classList = "d-block row";
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
    };
}

const beforeCreateOrder = (e) => {
    console.log(e)
    e.preventDefault()
    document.getElementById('form-error').innerHTML = ""
    const contact = getUserData();
    const errors = []
    console.log('contact', contact)
    const alphaRegExp = /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]+$/

    document.getElementById('firstName').classList.remove('good', 'error')
    document.getElementById('lastName').classList.remove('good', 'error')
    document.getElementById('address').classList.remove('good', 'error')
    document.getElementById('city').classList.remove('good', 'error')
    document.getElementById('email').classList.remove('good', 'error')

    // Test firstName
    let firstNameValid = true
    if (!alphaRegExp.test(contact.firstName)) {
        errors.push.alert(('Le prénom doit uniquement contenir des lettres'))
        firstNameValid = false
    }
    document.getElementById('firstName').classList.add(firstNameValid ? 'good' : 'error')

    // Test lastname
    let lastNameValid = true
    if (!alphaRegExp.test(contact.lastName)) {
        errors.push.alert(('Le nom doit uniquement contenir des lettres'))
        lastNameValid = false
    }
    document.getElementById('lastName').classList.add(lastNameValid ? 'good' : 'error')

    // Test city
    let cityValid = true
    if (!alphaRegExp.test(contact.city)) {
        errors.push(alert('La ville doit uniquement contenir des lettres'))
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