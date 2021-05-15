class CameraApi {

    constructor() {
        this.apiUrl = location.hostname === 'localhost' || location.hostname === '127.0.0.1' ?
            "http://localhost:3000/api/cameras" :
            'https://oc-p5-orinoco.herokuapp.com/api/cameras'
    }

    getAll() {

        const result = fetch(this.apiUrl, { //fetch méthode qui fait un appel au serveur
                method: 'GET',
            })
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                    //Divise le prix / 100 pour correspondre aux euros au lieu des centimes avec la fonction map()
                data.map(e => e.price = e.price / 100)
                return data
            }) //JSON.parse() = transforme du text en JSON
            .catch(error => {
                console.log('error', error);
                alert("La connexion au serveur n'a pas pu être effectué. Cela est certainement lié au COVID-19, veuillez attendre quelques secondes le temps qu'il mette son masque puis réesayez");
            });

        console.log(result)
        return result
    }

    getById(id) {

        const result = fetch(`${this.apiUrl}/${id}`, { //fetch méthode qui fait un appel au serveur
                method: 'GET',
            })
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                    //Divise le prix / 100 pour correspondre aux euros au lieu des centimes avec la fonction map()
                data.price = data.price / 100
                return data
            }) //JSON.parse() = transforme du texte en JSON
            .catch(error => console.log('error', error));

        return result
    }

    createOrder(contact, products) {

        const data = {
            "contact": contact,
            "products": products
        }
        console.log(data)
        const result = fetch(`${this.apiUrl}/order`, { //fetch méthode qui fait un appel au serveur
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
            .catch(error => console.log('error', error));

        return result
    }
}