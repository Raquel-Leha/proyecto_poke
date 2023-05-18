

const pokeList$$ = document.querySelector("#pokedex");
const pokeListFavorites$$ = document.querySelector("#pokedex2");


let arrayPoke = [];
let mappedPokeCharacters = [];
let arrayFavorites = [];
let favs = [];




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

//Variable que recoje un valor booleano true/false. 
  let a;
//variable que recoje el id del element clikado
  let identity = ev.target.id;
//variable que guarda el elemento del array mapeado que ha sido clikado.
  let character = mappedPokeCharacters[identity - 1];


/*Guardamos en el array heart los elementos con la clase heartDiv, y si el id de alguno de estos
  elementos guardados en el array coincide con el id del elemento clicado, le cambiamos la clase*/
  let heart = document.getElementsByClassName("heartDiv")
  for(const element of heart){
    if(element.id == identity){
      element.classList.remove("heartDiv");
      element.classList.add("core");
   
    };
  };
  
  
  
  //Si la lista de favoritos esta vacia, guardamos el elemento clikado en favoritos y renderizamos
  if(arrayFavorites.length === 0){
    arrayFavorites.push(character);
    renderFavorites(arrayFavorites);
  }else{

    for(let element of arrayFavorites){
      if(element.id == character.id){
        //Si hay coincidencia es porque ya se encuentra en la lista de favoritos 
        a = true;
        alert(element.name + " ya se encuentra en su lista de favoritos. No es posible añadirlo dos veces.");
        
      }
    };
    //Si no hay coincidencia, pero la lista de favoritos(limitada a 5), ya se encuentra llena
    if(!a && arrayFavorites.length >=5){
      alert("No es posible tener más de cinco pokemons favoritos.");  
    };
    //Si no existe coincidencia, y la lista de favoritos no esta llena
    if(!a && arrayFavorites.length<=4){
    arrayFavorites.push(character);
    renderFavorites(arrayFavorites);
    };
 
  };

  localStorage.setItem("misFavs", JSON.stringify(arrayFavorites));

};

//Función manejadora del event Click sobre la lista de los pokemons favoritos del usuario
const handlerClick2 = (ev) => {

//Guardamos en esta variable el id del elemento de favoritos que ha sido clikado
  let identity = ev.target.id;
  

//Seleccionamos los elementos con la clase core(la clase de los favoritos) y los guardamos en el array heart
  let heart = document.getElementsByClassName("core");
  
//Si algun elemento del array heart tiene el mismo id que el elemento clikado, entonces le cambiamos la clase
  for(const element of heart){

    if(element.id == identity){
      element.classList.remove("core")
      element.classList.add("heartDiv");
    };
  };

//Eliminamos del array de favoritos, el elemento clikado.
  for(let i= 0 ; i<arrayFavorites.length; i++){
   
    if(identity == arrayFavorites[i].id){
      arrayFavorites.splice(i,1);
      renderFavorites(arrayFavorites);  
    };
  };


//Recogemos en la variable misFavs el cambio que se ha producido en favoritos.
  localStorage.setItem("misFavs", JSON.stringify(arrayFavorites)); 
};

//Funcion que pinta en el HTML la lista de los pokemons favoritos del usuario
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

//Con este for verificamos si el pokemon se encuentra en favoritos, y si es así, le cambiamos la clase
      for(const element of arrayFavorites){
        if(character.id === element.id){
          div$$.classList.remove("heartDiv");
          div$$.classList.add("core");
      };
    };
      
      

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


  };

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

//Este array nos guarda todos los datos que nos devuelve la API sin filtrar
  const pokeCharacters = await getPokeCharacters();
//Este array guarda los datos de la API que nos interesan
  mappedPokeCharacters = mapPokeCharacters(pokeCharacters);
//En el array favs se guardan los favoritos almacenados localmente 
  const favs = JSON.parse(localStorage.getItem("misFavs"));

//y si favs no está vacio, llamamos a la funcion renderFavorites para que nos los pinte en la pagina
  if(favs){
    arrayFavorites = favs;
    renderFavorites(arrayFavorites);
  }
//también llamamos a la función render para que nos pinte en pantalla los 150 pokemons
  render(mappedPokeCharacters);
//Con esta función escuchamos el evento input y filtramos al pokemon seleccionado
  drawInput(mappedPokeCharacters);

};

//Inicializamos el programa
init();