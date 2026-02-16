import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string
    prevLocationsURL: string;
    pokedex: Record<string, Pokemon>;
}

export function initState(cacheTimeout: number): State {
    let state: State = {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheTimeout),
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {},
    }

    return state;
}