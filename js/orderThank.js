const getCreatedOrder = () => {
    const myCreatedOrder = JSON.parse(localStorage.createdOrder)
    let blockOfMyCreatedOrder =
        `
        <div class="col-12 px-5 pt-5">
            <p class="h3 mb-5"> Merci pour votre achat ${myCreatedOrder.contact.firstName}! </p>
            <p class="mb-4"> Montant total de la transaction : <span class="fw-bold">${getCartTotalPrice()}€ </span></p>
            <p class="mb-4"> Numéro de commande :</br><span class="fw-bold">${myCreatedOrder.orderId} </span></p>
            <p class="mb-4">Félicitation, votre commande est validée !</p>
        </div>
        <div class="col-12 px-5 py-5">
        <a href="../index.html" class="bg-dark py-2 px-4 rounded-3 text-white">Retourner à l'accueil</a>
        </div>
        `

    document.getElementById('orderTicket').innerHTML = blockOfMyCreatedOrder
    localStorage.removeItem('myShoppingCart', 'createdOrder')
}