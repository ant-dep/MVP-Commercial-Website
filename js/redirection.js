// Getting the id of the product selected

const redirectToProductPage = (idProduct) => {
    localStorage.setItem("productId", idProduct);
    // and redirect to products.html
    document.location.href = "../html/products.html";
}


//PopUp - back to index.html
const returnToHome = () => {
    document.location.href = "../index.html";
}

//PopUp - go to cart.html
const goToShoppingCartPage = () => {
    document.location.href = "../html/cart.html"
}