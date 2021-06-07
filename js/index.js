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
            <div class="col-12 col-lg-4 mx-auto">
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

        // Then scroll the page to new displayed elements
        const element = document.querySelector('#containerOfProductList')
        const topPos = element.getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({
                top: topPos, // scroll so that the element is at the top of the view
                behavior: 'smooth' // smooth scroll
            })
            // Disable the button after the click to avoid displaying multiple times
        const displayButton = document.getElementById("displayButton")
        displayButton.disabled = true;
        displayButton.style.display = "none"
    })

    // Load the number of items in cart in the navbar
    cartNumbers()
}