// Main function, auto executed at load time
;(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  hydratePage(productData)
})()

function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
  return fetch(`${apiUrl}/api/teddies/${productId}`)
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
  document.getElementById('productColors').style.gridTemplateColumns = `repeat(${product.colors.length}, 1fr)`

  // Add event listeners on button
  document.getElementById('addToCart').onclick = (event) => {
    event.preventDefault()
    Cart.addProduct(product)
    redirectToShoppingCart(product.name)
  }

  // Get parent element
  const colorsElt = document.getElementById('productColors')

  // Display all colors
  product.colors.forEach((color) => {
    // Get & clone template for one color
    const templateElt = document.getElementById('productColor')
    const cloneElt = document.importNode(templateElt.content, true)

    // Hydrate color clone
    cloneElt.querySelector('div').style.backgroundColor = color

    // Display a new color
    colorsElt.appendChild(cloneElt)
  })
}

function redirectToShoppingCart(productName) {
  window.location.href = `${window.location.origin}/cart.html?lastAddedProductName=${productName}`
}
