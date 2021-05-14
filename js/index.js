// Class Camera Api affecté dans une variable pour l'appeler de manière plus simple
const api = new CameraApi()

// Fonction qui récupère les données du serveur et les affiches.
const loadData = async() => {
    const productList = await api.getAll()
    let containerOfProductCarousel = ""
    let containerOfProductList = ""
    for (const product of productList) {
        document.getElementById("containerOfProductCarousel").innerHTML += `
        <div class="carousel-item" data-bs-interval="3000">
                <img src="${product.imageUrl}" class="d-block w-100" alt="${product.name}">
        </div>`
    }

    const displayButton = document.getElementById("displayButton")
    displayButton.addEventListener('click', () => {
        for (const product of productList) {
            document.getElementById("containerOfProductList").innerHTML += `
        <div class="col-12 col-lg-4 mx-auto" onClick="redirectToProductPage('${product._id}')">
            <div class="card img-thumbnail my-3">
                <img id="productImage" class="card-img-top img-fluid rounded-top p-2" src="${product.imageUrl}" alt="${product.name}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 id="productName" class="card-title">${product.name}</h2>
                        <p id="productPrice" class="card-text"><strong>${product.price}€</strong></p>
                    </div>
                </div>
            </div>
        </div>
        `
        }
        // désactive le button après le clic
        displayButton.disabled = 'true';
    })
}