

const pokeList$$ = document.querySelector("#pokedex");
const pokeListFavorites$$ = document.querySelector("#pokedex2");



let arrayPoke = [];
let mappedPokeCharacters = [];
let arrayFavorites = [];
let pokeFavs = [];


//Peticion async await a la ApiPoke con la informacion sobre los 150 pokemons
const getPokeCharacters = async () => {

for(let i=1; i<=150; i++){

  
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
  const resp = await response.json();
  arrayPoke.push(resp);


};

return arrayPoke;

};

//Función que recibe un array y lo mapea para quedarme solo con la informacion que requiero para mi HTML
const mapPokeCharacters = (array) => {
  //   console.log(charactersSinMapear);
  return array.map((element) => ({
    name: element.name,
    image: element.sprites['front_default'],
    type: element.types.map((type) => type.type.name).join(', '),
    id: element.id,
  }));
};

//Función manejadora del evento Click sobre la lista de los 150 pokemons
const handlerClick1 = (ev) => {
 
  let a;
  let identity = ev.target.id;
  console.log(identity);

  let heart = document.getElementsByClassName("heartDiv");
  console.log(heart);
  for(const element of heart){
    if(element.id == identity){
      element.classList.remove("heartDiv");
      element.classList.add("core");

    };
  };
  
  let character = mappedPokeCharacters[identity - 1];


  if(arrayFavorites.length === 0){
    console.log("he entrado en el primer if");
    arrayFavorites.push(character);
    renderFavorites(arrayFavorites);
  }else{
    for(let element of arrayFavorites){
      console.log("he entrado en el for");
  
      if(element.id == character.id){
        console.log("he entrado en el if");
        a = true;
        alert(element.name + " ya se encuentra en su lista de favoritos. No es posible añadirlo dos veces.");
        
      }
    };

    if(!a && arrayFavorites.length >=5){
      alert("No es posible tener más de cinco pokemons favoritos.");
     
    }

    if(!a && arrayFavorites.length<=4){
      console.log(arrayFavorites.length);
    arrayFavorites.push(character);
    
    console.log(arrayFavorites.length);
    renderFavorites(arrayFavorites);
    }
 
  };

  localStorage.setItem("misFavs", JSON.stringify(arrayFavorites));

};

//Función manejadora del event Click sobre la lista de los pokemons favoritos del usuario
const handlerClick2 = (ev) => {

  let identity = ev.target.id;
  

  let heart = document.getElementsByClassName("core");

  
  for(const element of heart){
    if(element.id == identity){
      console.log(element.id);
      element.classList.remove("core")
      element.classList.add("heartDiv");
    };
  };


  for(let i= 0 ; i<arrayFavorites.length; i++){
   
    if(identity == arrayFavorites[i].id){
      
      arrayFavorites.splice(i,1);
      renderFavorites(arrayFavorites);
      
    };
  };



  localStorage.setItem("misFavs", JSON.stringify(arrayFavorites)); 
};

//Funcion que pinta en el HTML la lista de los pokemons favoritos de usuario
const renderFavorites = (array) => {

  pokeListFavorites$$.innerHTML = "";

  for (const character of array) {

    let li$$ = document.createElement("li");
    li$$.classList.add("pokeClass");
    pokeListFavorites$$.appendChild(li$$);

    let div$$ = document.createElement("div");
    div$$.classList.add("core");
    div$$.setAttribute("id", character.id);
    div$$.addEventListener("click", handlerClick2);
    li$$.appendChild(div$$);

    let H2$$ = document.createElement("h2");
    H2$$.textContent=character.name;
    li$$.appendChild(H2$$);

    let image$$ = document.createElement("img");
    image$$.setAttribute("src", character.image);
    image$$.setAttribute("alt", character.name);
    li$$.appendChild(image$$);

    let characterType$$ = document.createElement("p");
    characterType$$.textContent= character.type;
    li$$.appendChild(characterType$$);


};


};

//Funcion que pinta en el HTML la lista de los 150 pokemons, con las caracteriscas que devolvio la funcion mapPokeCharacters
const render = (array) => {

  pokeList$$.innerHTML = "";
  
  
  for (const character of array) {

      let li$$ = document.createElement("li");
      li$$.classList.add("pokeClass");
      pokeList$$.appendChild(li$$);

      let div$$ = document.createElement("div");
      div$$.setAttribute("id", character.id);
      div$$.classList.add("heartDiv");
      div$$.addEventListener("click", handlerClick1);
      li$$.appendChild(div$$);
      

      let H2$$ = document.createElement("h2");
      H2$$.textContent=character.name;
      li$$.appendChild(H2$$);

      let image$$ = document.createElement("img");
      image$$.setAttribute("src", character.image);
      image$$.setAttribute("alt", character.name);
      li$$.appendChild(image$$);

      let characterType$$ = document.createElement("p");
      characterType$$.textContent= character.type;
      li$$.appendChild(characterType$$);


  }
};

//Funcion manejadora del evento input que llama a la funcion searchPokemons para filtrar al pokemon filtrado
const drawInput = (pokemons) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () =>
  searchPokemons(pokemons, input$$.value)
  );
};

//Función que realiza la busqueda de los pokemons que contienen los caracteres del input
const searchPokemons = (pokemons, character) => {
  let filteredPokemon = pokemons.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(character.toLowerCase())
  );
  render(filteredPokemon);

};


//Funcion que inicializa el programa
const init = async () => {

  const pokeCharacters = await getPokeCharacters();
  
  mappedPokeCharacters = mapPokeCharacters(pokeCharacters);

  pokeFavs = JSON.parse(localStorage.getItem("misFavs"));

  render(mappedPokeCharacters);

  

  renderFavorites(pokeFavs);
  arrayFavorites = [...pokeFavs];

  drawInput(mappedPokeCharacters);

};

init();










 

 
 










