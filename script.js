//Création d'un tableau vide afin de préparer les données des différents canapés

let canapeData = [];

//Mise en place de la récéption des données de l'API

const fetchCanape = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        canapeData = promise;
    });
};

//Structuration de la carte du produit avec ses éléments

const canapeDisplay = async () => {
    await fetchCanape();

    document.getElementById("items").innerHTML = canapeData.map(
        (canape) => `
    <a class="productLink" id="${canape._id}">
    <article>
    <div id="items${canape._id}"></div>
    <h3> ${canape.name}</h3>
    <img src="${canape.imageUrl}" alt="image de canape ${canape.name}"</img>
    <p> ${canape.description}</p>
    </article>
    </a>
    `).join("");

    let a = document.querySelectorAll(".productLink");

    a.forEach((canape) => 
    canape.addEventListener("click" , () => {

        //Mise à disposition du lien du canape dans l'url
        window.location = `product.html?${canape.id}`;
    })
    )
};

canapeDisplay();