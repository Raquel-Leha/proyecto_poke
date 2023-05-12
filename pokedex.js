

const pokeList$$ = document.querySelector("#pokedex");
const pokeListFavorites$$ = document.querySelector("#pokedex2");



let arrayPoke = [];
let mappedPokeCharacters = [];
let arrayFavorites = [];



const getPokeCharacters = async () => {

for(let i=1; i<=5; i++){

  
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
  const resp = await response.json();
  arrayPoke.push(resp);


};

return arrayPoke;

};

const mapPokeCharacters = (array) => {
  //   console.log(charactersSinMapear);
  return array.map((element) => ({
    name: element.name,
    image: element.sprites['front_default'],
    type: element.types.map((type) => type.type.name).join(', '),
    id: element.id,
  }));
};

const handlerClick1 = (ev) => {
 
  let a;
  let identity = ev.target.id;

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

    if(!a && arrayFavorites.length >=3){
      alert("No es posible tener más de cinco pokemons favoritos.");
     
    }

    if(!a && arrayFavorites.length<=2){
      console.log(arrayFavorites.length);
    arrayFavorites.push(character);
    console.log(arrayFavorites.length);
    renderFavorites(arrayFavorites);
    }
 
    

  };
};

const handlerClick2 = (ev) => {

  let identity = ev.target.id;

  let heart = document.getElementsByClassName("core");
  console.log(heart);
  for(const element of heart){
    if(element.id == identity){
      element.classList.remove("core");
      element.classList.add("heartDiv");

    };
  };


  for(const element of arrayFavorites){
    if(element.id == identity){
      arrayFavorites.splice(element,1);
      renderFavorites(arrayFavorites);

    };
  };
  
}

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

const render = (array) => {

  pokeList$$.innerHTML = "";
  
  
  for (const character of array) {

      let li$$ = document.createElement("li");
      li$$.classList.add("pokeClass");
      pokeList$$.appendChild(li$$);

      let div$$ = document.createElement("div");
      div$$.classList.add("heartDiv");
      div$$.setAttribute("id", character.id);
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

const drawInput = (pokemons) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () =>
  searchPokemons(pokemons, input$$.value)
  );
};

const searchPokemons = (pokemons, character) => {
  let filteredPokemon = pokemons.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(character.toLowerCase())
  );
  render(filteredPokemon);

};

const init = async () => {


  const pokeCharacters = await getPokeCharacters();
  
  mappedPokeCharacters = mapPokeCharacters(pokeCharacters);
  console.log(mappedPokeCharacters);

  render(mappedPokeCharacters);

  drawInput(mappedPokeCharacters);

};
init();










 

 
 










