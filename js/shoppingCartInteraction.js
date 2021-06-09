// Function that add a product to the localStorage
// Use of Json.parse() and Json.stringify to translate data received and sent to the server
const addToShoppingCart = async(productId) => {
    const product = await api.getById(productId);
    const myShoppingCart = localStorage.myShoppingCart ?
        JSON.parse(localStorage.myShoppingCart) : [];
    const checkProduct = myShoppingCart.find((e) => e._id === productId);
    if (checkProduct) {
        checkProduct.quantity++;
    } else {
        product.quantity = 1;
        myShoppingCart.push(product);
    }
    localStorage.setItem("myShoppingCart", JSON.stringify(myShoppingCart));
    // Display the pop-up
    let overlay = document.getElementById("overlay");
    overlay.classList = "d-block";
};

// Number of items in cart loaded in the navbar
function cartNumbers() {
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : []
        // If there are some product in the localStorage
    if (myShoppingCart.length > 0) {
        // Load the number of items in cart in the navbar
        let products = [];
        // For each product in the localStorage
        for (const product of myShoppingCart) {
            // and for each quantity of these products
            for (let i = 0; i < product.quantity; i++) {
                // add 1 and the array
                products.push(1);
            }
        }
        console.log(products.length);
        // then display the total of the array in the navbar
        document.querySelector('#cart').textContent = products.length;

        if (products.length > 9) {
            document.querySelector('#cart').classList = ('position-absolute start-0 mx-3 my-1')
            document.querySelector('#cart').textContent = '9+'
        }
    }
}

// Function that remove a product in cart
const removeProduct = (productId) => {
    // Get the cart in the localStorage
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart);
    // Look for the productId in the array
    const findIndex = myShoppingCart.findIndex((e) => e._id === productId);
    // If it exists, remove it by using findIndex and splice functions
    if (findIndex > -1) {
        myShoppingCart.splice(findIndex, 1);
    }
    // Update the localStorage
    localStorage.setItem("myShoppingCart", JSON.stringify(myShoppingCart));
    location.reload();
};

// Function to remove the cart
const removeShoppingCart = () => {
    localStorage.removeItem("myShoppingCart");
    location.reload();
};

const getTotalProduct = (productId) => {
    const myShoppingCart = localStorage.myShoppingCart ?
        JSON.parse(localStorage.myShoppingCart) : [];
    const findProduct = myShoppingCart.find((e) => e._id === productId);
    return findProduct.price * findProduct.quantity;
};

const getCartTotalPrice = () => {
    // Get the products in the localStorage + and check a cart exists
    const myShoppingCart = localStorage.myShoppingCart ? JSON.parse(localStorage.myShoppingCart) : [];
    // If there's a cart, loop for each product to get price and quantity
    let sumTotal = 0;
    for (let product of myShoppingCart) {
        sumTotal += product.price * product.quantity;
    }
    return sumTotal.toFixed(2);
    // Update the total cost by multiplying price and quantity of each products to sumTotal
    // toFixed() reduces the number of decimals
};

const setQtyProduct = (productId, productQuantity) => {
    // Get the cart in the localStorge
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart);
    // Look for the productId and the array
    const findProduct = myShoppingCart.find((e) => e._id === productId);
    // If it exists, set the product quantity
    findProduct.quantity = productQuantity;
    // Update the localStorage
    localStorage.setItem("myShoppingCart", JSON.stringify(myShoppingCart));
};

// Get the values of inputs wihtin the contact form
const getUserData = () => {
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        zipcode: document.getElementById("zipcode").value,
        city: document.getElementById("city").value,
        message: document.getElementById("message").value,
    };
    return contact;
};

// After checking inputs, an order can be created
const createOrder = async() => {
    // Using the api model in api.js
    const api = new Api();
    // use contact info as parameter
    const contact = getUserData();
    // use the products id's array as parameter
    const products = [];
    const myShoppingCart = JSON.parse(localStorage.myShoppingCart)
        // For each product in the localStorage
    for (const product of myShoppingCart) {
        // and for each quantity per product
        for (let i = 0; i < product.quantity; i++) {
            // push the product id in the array
            products.push(product._id);
        }
    }
    // wait for the result of the Api creation (api.js) and then Post request
    const result = await api.createOrder(contact, products);
    // create and order in the localStorage to get a confirmation number
    localStorage.setItem("createdOrder", JSON.stringify(result));
    // finaly redirect to confirmation page
    document.location.href = "../html/confirmation.html";
    return result;
};


/* AFFICHER LE NOMBRE DE PRODUITS DANS LE PANIER DANS LA NAVIGATION

let carts = document.querySelectorAll("#btnAddTo");

// action on click on button "Ajouter au panier"
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers([i]);
    })
}

// keeping cart saved after page reload
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('myShoppingCart');

    if (productNumbers) {
        document.querySelector('#cart span').textContent = productNumbers;
        document.querySelector('#cart span').classList.add('text-danger');
    }
}
// Increment cart numbers
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('myShoppingCart');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('myShoppingCart', productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('myShoppingCart', 1);
        document.querySelector('#cart span').textContent = 1
    }

    setItems(product);
}

onLoadCartNumbers(); */