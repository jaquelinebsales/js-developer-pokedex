const pokeApi = {};

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id; // Corrigido: use `id` em vez de `order`
    pokemon.name = pokeDetail.name;

    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0]; // Define o primeiro tipo como o tipo principal

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar detalhes do Pokémon: ${response.status}`);
            }
            return response.json();
        })
        .then(convertPokeApiDetailPokemon)
        .catch((error) => {
            console.error(error);
            return null; // Retorna null em caso de erro
        });
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar lista de Pokémon: ${response.status}`);
            }
            return response.json();
        })
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails.filter((pokemon) => pokemon !== null)) // Filtra Pokémon nulos (erros)
        .catch((error) => {
            console.error(error);
            return []; // Retorna uma lista vazia em caso de erro
        });
};