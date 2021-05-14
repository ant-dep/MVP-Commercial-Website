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
        displayButton.disabled = true;

        // L'ajout de contenu vient agrandir le viewport et fixe le footer au milieu de la nouvelle page
        // A cause de la position absolue du footer, on le supprime et on en rajoute un nouveau en bas
        const footer = document.querySelector('#footer');
        footer.classList = "d-none";
        let newFooter = document.querySelector('#newFooter');
        newFooter.innerHTML = `
        <footer class="container-fluid mt-5 position-absolute bottom-0 my-auto bg-light">
        <div class="row">
            <div class="col">
                <div class="text-center my-auto p-3">
                    <!--links to adapt-->
                    <a href="#" class="text-decoration-none text-body">À propos de nous</a>
                    <span class="mx-2">&middot;</span>
                    <a href="#" class="text-decoration-none text-body">Confidentialité</a>
                    <span class="mx-2">&middot;</span>
                    <a href="#" class="text-decoration-none text-body">Conditions Générales</a>
                </div>
            </div>
        </div>
        </footer>`;
    })
}