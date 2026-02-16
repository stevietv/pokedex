import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapBack.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        map: {
            name: "map",
            description: "display the next 20 map locations",
            callback: commandMap,
        },
        mapb: {
            name: "map back",
            description: "display the previous 20 map locations",
            callback: commandMapBack,
        },
        explore: {
            name: "explore <location>",
            description: "Provide an area name to explore the area and list the pokemon found",
            callback: commandExplore,
        },
        catch: {
            name: "catch <pokemon name>",
            description: "try to catch the named pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect <pokemon name>",
            description: "inspect a pokemon in your pokedex",
            callback: commandInspect,
        },
        help: {
            name: "help",
            description: "lists all commands",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "exits the pokedex",
            callback: commandExit,
        },
    };
}