let carts = document.querySelectorAll("#addToCart");

/* action on click on button "Ajouter au panier" */
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
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

onLoadCartNumbers();