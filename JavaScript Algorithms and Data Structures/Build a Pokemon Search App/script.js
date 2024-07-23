const inputElement = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonImageContainer = document.getElementById("pokemon-info-image");

class Pokemon {
  name;
  id;
  weight;
  height;
  types;
  stats;
  sprites;

  constructor (data) {
    this.name = data.name || "";
    this.id = data.id || null;
    this.weight = data.weight || 0;
    this.height = data.height || 0;
    this.types = data.types || [];
    this.stats = data.stats || [];
    this.sprites = data.sprites || {};
  }
}

const formatSearchString = (inputString) => {
  if (inputString.includes("♀")) {
    return inputString.toLowerCase().replace(/[^a-z0-9-\s]/g, '').trim().replace(/\s+/g, '-').concat("-f");
  } else if (inputString.includes("♂")) {
    return inputString.toLowerCase().replace(/[^a-z0-9-\s]/g, '').trim().replace(/\s+/g, '-').concat("-m");
  } else {
    return inputString.toLowerCase().replace(/[^a-z0-9-\s]/g, '').trim().replace(/\s+/g, '-');
  }
}

const updateUI = (newPokemon) => {
  resetUI();

  pokemonName.innerHTML = `${newPokemon.name.toUpperCase()}`;
  pokemonId.innerHTML = `#${newPokemon.id}`;
  pokemonWeight.innerHTML = `Weight: ${newPokemon.weight}`;
  pokemonHeight.innerHTML = `Height: ${newPokemon.height}`;

  pokemonImageContainer.innerHTML = `<img id="sprite" src="${newPokemon.sprites.front_default}"/>`
  
  newPokemon.types.forEach((type) => {
    pokemonTypes.innerHTML += `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`
  });

  newPokemon.stats.forEach((stat) => {
    document.getElementById(stat.stat.name).innerHTML = stat.base_stat;
  });
}

const resetUI = () => {
  pokemonName.innerHTML = "";
  pokemonId.innerHTML = "";
  pokemonWeight.innerHTML = "";
  pokemonHeight.innerHTML = "";

  pokemonImageContainer.innerHTML = "";

  pokemonTypes.innerHTML = "";

  pokemonHp.innerHTML = "";
  pokemonAttack.innerHTML = "";
  pokemonDefense.innerHTML = "";
  pokemonSpecialAttack.innerHTML = "";
  pokemonSpecialDefense.innerHTML = "";
  pokemonSpeed.innerHTML = "";

}

const getPokemon = async (searchString) => {
  const response = await fetch(
    `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchString}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

searchButton.addEventListener("click", (event) => {
  if (!inputElement.value) {
    alert("Please enter a valid name");
    return;
  }

  const promise = getPokemon(formatSearchString(inputElement.value));
  promise
    .then((data) => {
      const pokemon = new Pokemon(data);
      if (pokemon.id) {
        updateUI(pokemon);
      } else {
        alert("There was a problem getting the pokemon");
      }
    })
    .catch((error) => {
      if(error.message.includes("404")) {
        alert("Pokémon not found");
        resetUI();
      }
    })
});