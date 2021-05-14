// Fonction qui récupère les données du serveur par leur ID 

const loadDataById = async() => {
    const camera = await api.getById(localStorage.getItem("productId"))
    document.getElementById("containerOfProduct").innerHTML =
        `<div class="row h-100">
            <div class="col-12 col-lg-6 bg-dark d-flex align-items-center p-0 p-lg-5">
                <div class="col-12 col-lg-8 mx-auto">
                    <img id="productImage" class="img-fluid rounded p-0" src="${camera.imageUrl}" alt="${camera.name}" />
                </div>
            </div>
            <div class="col-10 col-lg-4 d-flex flex-column justify-content-center mt-5 mx-auto px-5">
                <h1 id="productName" class="pb-5">${camera.name}</h1>
                <p><strong>Description du produit</strong></p>
                <p id="productDescription">${camera.description}</p>
                <label for="lense" class="my-3"><strong>Choisissez la couleur de lentille <em>(optionnel)</em></strong>
                    <select class="form-control border border-gray">
                        <option id="lense" class="text-center border border-gray py-2"></option>
                        <option class="text-center">Aucune</option>
                    </select>
                </label>
                <button id="btnAddTo" class="btn btn-dark my-5" onclick="addToShoppingCart('${camera._id}')">Ajouter au panier <span id="productPrice">${camera.price}€</span></button>
            </div>
        </div>`


    camera.lenses.forEach((lense) => {
        document.getElementById("lense").innerHTML += lense
    })
}