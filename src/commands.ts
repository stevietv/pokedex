import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
    return {
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