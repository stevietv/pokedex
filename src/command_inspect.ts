import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0] ?? "";

    if (pokemonName === "") {
        throw new Error("Usage: 'inspect <pokemon_name>'");
    }

    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
        throw new Error(`you have not caught a ${pokemonName}`);
    }

    outputPokemonDetails(pokemon);
}

function outputPokemonDetails(pokemon: Pokemon) {
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);

    console.log(`Stats:`);
    for (let stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log(`Types:`);
    for (let type of pokemon.types) {
        console.log(`  - ${type.type.name}`);
    }
}