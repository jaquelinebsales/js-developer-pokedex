let offset = 0;
const maxRecord = 151;
let limit = 10;
const loadMoreButton = document.getElementById('ver-mais');

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <a href="detail-pokemon.html?idPokemon=${pokemon.number}&name=${encodeURIComponent(pokemon.name)}&pokemonTypes=${pokemon.types.map((type) => encodeURIComponent(type)).join(',')}&photoUrl=${pokemon.photo}">
<div class="name-number">
    
                    <span class="name">${pokemon.name}</span>
                    <span class="number">${pokemon.number}</span>
</div>
                <div class="detail">
                    <ol class="types" id="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="imagem do ${pokemon.name}">
                </div></a>
        </li>
        `;
}

const pokemonList = document.getElementById('pokemons');

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHTML; // Adiciona os novos Pokémon à lista existente
    });
}

// Carrega os primeiros Pokémon ao carregar a página
loadPokemonsItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit; // Atualiza o offset para o próximo lote de Pokémon

    // Verifica se a próxima requisição ultrapassará o maxRecord
    if (offset + limit >= maxRecord) {
        const newLimit = maxRecord - offset; // Calcula o limite restante
        loadPokemonsItens(offset, newLimit); // Carrega apenas os Pokémon restantes

        // Remove o botão "ver mais" após carregar todos os Pokémon
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonsItens(offset, limit); // Carrega os próximos Pokémon
    }
});