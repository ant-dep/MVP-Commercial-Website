// Main function, auto executed at load time
;
(async() => {
    const productId = getProductId()
    const productData = await getProductData(productId)
    hydratePage(productData)
})()

function getProductId() {
    return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
    return fetch(`${apiUrl}/api/Camera/${productId}`)
        .catch((error) => {
            console.log(error)
        })
        .then((httpBodyResponse) => httpBodyResponse.json())
        .then((productData) => productData)
}

function hydratePage(product) {
    // Hydrate page with data
    document.getElementById('productImage').src = product.imageUrl
    document.getElementById('productName').textContent = product.name
    document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
    document.getElementById('productDescription').textContent = product.description
    document.getElementById('productLenses').textContent = product.lenses

    // Add event listeners on button
    document.getElementById('addToCart').onclick = (event) => {
        event.preventDefault()
        Cart.addProduct(product)
    }

    // Get parent element
    const lensesElt = document.getElementById('productLenses')

    // Display all lenses
    product.lenses.forEach((lense) => {
        // Get & clone template for one lense
        const templateElt = document.getElementById('productLense')
        const cloneElt = document.importNode(templateElt.content, true)

        // Hydrate lense clone
        cloneElt.querySelector('a').textContent = lense

        // Display a new lense
        lensesElt.appendChild(cloneElt)
    })
}