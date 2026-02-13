import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapBack.js";
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