// Função para extrair parâmetros da URL
function getParameterFromUrl(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const weightHtml = document.getElementById('weight')
const abilitiesHtml = document.getElementById('abilities')
// Acessar os valores dos parâmetros
const idPokemon = getParameterFromUrl('idPokemon');
const photoUrl = getParameterFromUrl('photoUrl'); // URL da foto
const numberHtml = document.getElementById('number')
const name = decodeURIComponent(getParameterFromUrl('name')); // Nome do Pokémon (decodificado)
const typesUrl = getParameterFromUrl('pokemonTypes'); // Tipos do Pokémon
const speciesHtml = document.getElementById('species')
// Acessar os elementos do DOM
const photo = document.getElementById('photo'); // Elemento <img>
const nameHtml = document.getElementById('namePokemon'); // Elemento para o nome
const types = document.getElementById('types'); // Elemento para os tipos
const heightHtml = document.getElementById('height')

// Verificar se os elementos e parâmetros existem
if (photo && photoUrl) {
    photo.src = photoUrl; // Atualizar o atributo src da imagem
    photo.alt = `Imagem do ${name}`; // Atualizar o atributo alt da imagem
} else {
    console.error('Elemento "photo" ou parâmetro "photoUrl" não encontrado.');
}

if (nameHtml && name) {
    nameHtml.innerHTML = name; // Atualizar o nome do Pokémon
} else {
    console.error('Elemento "namePokemon" ou parâmetro "name" não encontrado.');
}

// Verifica se os elementos e parâmetros existem
if (types && typesUrl) {
    // Separar os tipos (se houver mais de um)
    const typesArray = typesUrl.split(',');

    // Aplicar a cor do primeiro tipo ao body
    const firstType = typesArray[0].toLowerCase(); // Pega o primeiro tipo
    document.body.classList.add(firstType); // Adiciona a classe ao body

    // Criar os elementos <span> para cada tipo e aplicar a classe correspondente
    types.innerHTML = typesArray.map(type => {
        type = type.toLowerCase(); // Garantir que o tipo esteja em minúsculas
        return `<span class="type ${type}">${type}</span>`; // Aplicar a classe do tipo
    }).join('');
} else {
    console.error('Elemento "types" ou parâmetro "pokemonTypes" não encontrado.');
    // Adicionar uma mensagem de erro na interface, se necessário
    if (!types) {
        document.body.innerHTML += '<p>Erro: Elemento "types" não encontrado.</p>';
    }
    if (!typesUrl) {
        document.body.innerHTML += '<p>Erro: Parâmetro "pokemonTypes" não encontrado.</p>';
    }
}

// Verificar se o parâmetro foi encontrado
if (idPokemon) {
    console.log(`O ID do Pokémon é: ${idPokemon}`);
    // Aqui você pode usar o idPokemon para buscar detalhes do Pokémon, etc.
    numberHtml.innerHTML = idPokemon
} else {
    console.log('ID do Pokémon não encontrado na URL.');
}
fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro ao buscar Pokémon: ${response.status}`);
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then((jsonBody) => {
        // Retorna a URL da espécie do Pokémon
        return fetch(jsonBody.species.url);
    })
    .then((speciesResponse) => {
        if (!speciesResponse.ok) {
            throw new Error(`Erro ao buscar espécie do Pokémon: ${speciesResponse.status}`);
        }
        return speciesResponse.json(); // Converte a resposta da espécie para JSON
    })
    .then((speciesData) => {
        // Encontra o gênero (genus) em inglês
        const genusEntry = speciesData.genera.find((entry) => entry.language.name === 'en');
        const genus = genusEntry ? genusEntry.genus : 'Gênero não encontrado';
        speciesHtml.innerHTML = genus
    })
    .catch((error) => {
        console.error(error); // Exibe erros no console
        return []; // Retorna uma lista vazia em caso de erro
    });





    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro ao buscar Pokémon: ${response.status}`);
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then((jsonBody) => {
        // Extrai os dados necessários do JSON
        const heightAPI = jsonBody.height; // Altura
        const weightAPI = jsonBody.weight; // Peso
        const abilitiesAPI = jsonBody.abilities; // Habilidades

        // Verifica se os dados existem antes de manipulá-los
        if (heightAPI === undefined || weightAPI === undefined || !Array.isArray(abilitiesAPI)) {
            throw new Error('Dados do Pokémon incompletos ou inválidos.');
        }

        // Formata a altura (convertendo decímetros para metros)
        const heightInMeters = (heightAPI / 10).toFixed(2); // Converte para metros com 2 casas decimais

        // Formata o peso (convertendo hectogramas para quilogramas)
        const weightInKg = (weightAPI / 10).toFixed(1); // Converte para quilogramas com 1 casa decimal

        // Formata as habilidades (extrai os nomes das habilidades)
        const abilitiesList = abilitiesAPI
            .map(ability => ability.ability.name) // Extrai os nomes das habilidades
            .join(', '); // Junta os nomes em uma única string separada por vírgulas

        // Verifica se os elementos HTML existem antes de atualizá-los
        if (heightHtml && weightHtml && abilitiesHtml) {
            heightHtml.innerHTML = `${heightInMeters} m`; // Exibe a altura
            weightHtml.innerHTML = `${weightInKg} kg`; // Exibe o peso
            abilitiesHtml.innerHTML = abilitiesList; // Exibe as habilidades
        } else {
            console.error('Elementos HTML não encontrados.');
        }
    })
    .catch((error) => {
        console.error(error); // Exibe erros no console
        return []; // Retorna uma lista vazia em caso de erro
    });


    // Seleciona o elemento do coração
const heartIcon = document.querySelector('.heart i');

// Adiciona um evento de clique ao ícone
heartIcon.addEventListener('click', () => {
    // Alterna entre as classes "bi-heart" e "bi-heart-fill"
    heartIcon.classList.toggle('bi-heart');
    heartIcon.classList.toggle('bi-heart-fill');
});