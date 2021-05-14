// Fonction qui recupère l'id du produit et redirige vers la page produit.

const redirectToProductPage = (idProduct) => {
    localStorage.setItem("productId", idProduct);
    // redirection vers la page produit
    document.location.href = "../html/products.html";
}


//PopUp - retour à la page produit
const returnToHome = () => {
    document.location.href = "../index.html";
}

//PopUp - Aller au panier
const goToShoppingCartPage = () => {
    document.location.href = "../html/cart.html"
}