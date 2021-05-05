# Orinoco

Cinquième projet du parcours développeur web chez OpenClassrooms.

L'objectif principale consiste en la création du front-end d'un site e-commerce en vanilla Javascript par la consommation d'un API préalablement fourni ( [JWDP5](https://github.com/OpenClassrooms-Student-Center/JWDP5) ).

Il ne s'agit là que d'un MVP, aucune réelle gestion des transaction n'est effectué.

Aucune maquette n'est donnée. Il est demandé d'improviser l'interface utilisateur.

## Cahier des charges

### TODO

- [x] Vérifier que les inputs sont corrects avant l'envoi au back-end
- [x] Terminer plan de test
### Général

- [x] Création d'une page présentant tous les produits
- [x] Création d'une page présentant les détails d'un produit et la possibilité de l'ajouter au panier.
- [x] Création d'une page panier contenant la liste des produits présents ainsi qu'un formulaire pour effectuer l'achat
- [x] Création d'une page de remerciement après achat
- [x] Les pages devront être créés en HTML, CSS (frameworks de votre choix acceptés) et vanilla javascript (sans framework)

### Qualité de code

- [x] Le code devra être indenté
- [x] Le code devra contenir des commentaires
- [x] Les promesses devront être utilisées lors des appels ajax
- [x] Le code devra être accompagné d'un document planifiant de futurs test unitaires

### Expérience utilisateur

- [x] Les inputs du formulaire d'achat devront être validés avant l'envoi à l'API.

## Tester l'application web

https://oc-p5-orinoco.herokuapp.com/

### Tester le site en local

#### Prérequis

- Node.js
- NPM

#### Installation

```cmd
npm install
```

#### Compilation tailwind -> css

```cmd
npm run compile-css
```

#### Lancement de l'application

Ouvrez simplement le fichier index.html, aucun serveur n'est requis.

Pour le développement, il est conseillé d'utiliser l'extension "Live Server" de Visual Studio Code

## Documents

Pour en savoir plus, veuillez consulter le document complet disponible [ici](<https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/P5_Spe%CC%81cifications%20fonctionnelles%20Orinoco%20(2).pdf>)
