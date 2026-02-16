import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0] ?? "";
    if (pokemonName === "") {
        throw new Error("Usage: catch <pokemon_name>");
    }

    const pokemonDetails = await state.pokeAPI.fetchPokemon(pokemonName);
    
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    if (catchSucessful(pokemonDetails.base_experience)) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemonDetails;
    }
    else {
        console.log(`${pokemonName} escaped!`)
    }
}

function catchSucessful(baseExperience: number): boolean {
    const chanceToCatch = (Math.random() * 1000)
    return chanceToCatch > baseExperience;
}