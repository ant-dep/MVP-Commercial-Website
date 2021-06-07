// Reusable class for each products
class Api {

    constructor() {
        this.apiUrl = 'http://localhost:3000/api/cameras' // 'https://oc-p5-orinoco.herokuapp.com/api/cameras/'
    }

    getAll() {

        const result = fetch(this.apiUrl, { //fetch method that calls the server
                method: 'GET',
            })
            .then(response => response.text())
            .then(result => {
                //JSON.parse() = transforms text JSON into JS object
                const data = JSON.parse(result)
                    //Divide prices by 100 to match full price instead of cents with map() function
                data.map(e => e.price = e.price / 100)
                return data
            })
            .catch(error => {
                console.log('error', error);
                alert("La connexion au serveur n'a pas pu être effectué. Cela est certainement lié au COVID-19, veuillez attendre quelques secondes le temps qu'il mette son masque puis réesayez");
            });

        console.log(result)
        return result
    }

    getById(id) {

        const result = fetch(`${this.apiUrl}/${id}`, { // Fetching the specific id within the Api
                method: 'GET',
            })
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                data.price = data.price / 100
                return data
            })
            .catch(error => console.log('error', error));

        return result
    }

    createOrder(contact, products) {
        // Specify with argument match which object
        const data = {
            "contact": contact,
            "products": products
        }
        console.log(data)
        const result = fetch(`${this.apiUrl}/order`, { // Fetch but POST this time
                method: 'POST',
                body: JSON.stringify(data), // JSON.stringify() transforms JS object to JSON
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .catch(error => console.log('error', error));

        return result
    }
}