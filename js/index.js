// Class Api used as a class to call it easily
const api = new Api()

// Function that get infos from server and display them
const loadData = async() => {
    const productList = await api.getAll() // refers to api.js
    let containerOfProductCarousel = ""
    let containerOfProductList = ""
    for (const product of productList) {
        document.getElementById("containerOfProductCarousel").innerHTML += `
        <div class="carousel-item" data-bs-interval="3000">
                <img src="${product.imageUrl}" class="d-block w-100" alt="${product.name}">
        </div>`
    }
    // When the button is clicked, display every products as cards within HTML
    const displayButton = document.getElementById("displayButton")
    displayButton.addEventListener('click', () => {
        for (const product of productList) {
            document.getElementById("containerOfProductList").innerHTML += `
            <div class="col-12 col-lg-4">
                <div class="card img-thumbnail my-3">
                    <img id="productImage" class="card-img-top img-fluid rounded-top p-2" src="${product.imageUrl}" alt="${product.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h2 id="productName" class="card-title">${product.name}</h2>
                            <p id="productPrice" class="card-text"><strong>${product.price}€</strong></p>
                        </div>
                    </div>
                    <a href="#" class="stretched-link" onClick="redirectToProductPage('${product._id}')"></a>
                </div>
            </div>
        `
        }

        // hide the carousel
        document.getElementById('carousel').style.display = "none"

        const element = document.querySelector('#containerOfProductList')
            // Disable the button after the click to avoid displaying multiple times
        const displayButton = document.getElementById("displayButton")
        displayButton.disabled = true;
        displayButton.style.display = "none"
    })

    // Load the number of items in cart in the navbar
    cartNumbers()
}