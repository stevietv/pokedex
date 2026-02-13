import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
    let output = input
    .toLowerCase()
    .trim()
    .split(/\s+/);
    output = output.filter((item) => item.length > 0);
    return output;
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const inputArray = cleanInput(input);
        if (inputArray.length === 0) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${inputArray[0]}`);
        rl.prompt();y
      }
    )
}