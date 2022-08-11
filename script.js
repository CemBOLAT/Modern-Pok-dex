const cardContainer = document.querySelector("#card-container")
const nameSearchBTN = document.querySelector(".nameSearch")
const typeSearchBTN = document.querySelector(".typeSearch")
const textName = document.querySelector(".textName")
const textType = document.querySelector(".textType")
let checker
const colors = {
    FIRE: `#FDDFDF`,
    GRASS: `#DEFDE0`,
    ELECTRIC: `#FCF7DE`,
    WATER: `#DEF3FD`,
    GROUND: `#F4E7DA`,
    ROCK: `#D5D5D4`,
    FAIRY: `#FCEAFF`,
    POISON: `#D6B3E6`,
    BUG: `#F8D5A3`,
    DRAGON: `#97B3E6`,
    PSYCHIC: `#EAEDA1`,
    FLYING: `#00eeff`,
    FIGHTING: `#E6E0D4`,
    NORMAL: `#F5F5F5`,
    ICE: `#E0F5FF`,
    GHOST: "grey"
}
nameSearchBTN.addEventListener(("click"),pokemonFetchName)
typeSearchBTN.addEventListener(("click"),pokemonFetchType)

textName.addEventListener("input",pokemonFetchName)
textType.addEventListener("input",pokemonFetchType)

function pokemonFetchName (){
    checker = "name"
    URLFetch()
}
function pokemonFetchType(){
    checker = "type"
    URLFetch()
}
function URLFetch(){
    let URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151"
    fetch(URL)
    .then(response => response.json())
    .then(pokemonFetch)
}
function pokemonFetch(result){
    cardContainer.innerHTML = ``

    let resultArr = result["results"]
    resultArr.forEach((pokeInfo)=>{
        fetch(pokeInfo.url)
        .then(response => response.json())
        .then(cardCreator)
    })
}
function cardCreator(result){
    if(checker == "name" && result["name"].match(textName.value.toLowerCase())){
        cardInit(result)
    }
    else if(checker == "type" && result["types"][0]["type"]["name"].match(textName.value.toLowerCase())){
        cardInit(result)
    }
    else if(result["name"].match(textName.value) && result["types"][0]["type"]["name"].match(textName.value.toLowerCase())){
        cardInit(result)
    }
}
function cardInit(result){
    let id = result["id"].toString().padStart(3,"0")
    let html = ""
    html = `
        <div style="background-color: ${colors[result["types"][0]["type"]["name"].toUpperCase()]}"  class="card">
            <div class="card-title">${result["name"].toUpperCase()}</div>
            <div class="card-img">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
            </div>
            <div class="poke-type">Type: ${result["types"][0]["type"]["name"].toUpperCase()}</div>
            <div class="poke-id">ID: #${id}</div>
            <div class="poke-weight">Weight: ${result["weight"]}</div>
            <div class="poke-weight">Height: ${result["height"]}</div>
            <div class="poke-baseExperience">Base Experience: ${result["base_experience"]}</div>
        </div>
    `
    cardContainer.innerHTML += html
}
