# Pokedex REPL

This repository was created as part of the [Boot.dev](https://www.) TypeScript project on the Typescript backend path. The project implements a REPL-based Pokedex. The REPL queries a remote API to fetch Pokémon data and caches results locally.

### Key points
- Project type: Boot.dev TypeScript exercise
- Purpose: REPL Pokedex that accesses a remote API and caches responses
- Entry points / relevant files: `repl.ts`, `pokeapi.ts`, `pokecache.ts`, `main.ts`

### Commands
- `help` — show available commands and usage (implemented in `command_help.ts`)
- `exit` — exit the REPL (implemented in `command_exit.ts`)
- `catch` — attempt to catch a Pokémon (implemented in `command_catch.ts`)
- `explore` — explore the environment / move around (implemented in `command_explore.ts`)
- `inspect` — inspect a Pokémon's details (implemented in `command_inspect.ts`)
- `map` — show the current map view (implemented in `command_map.ts`)
- `mapBack` — move back on the map / undo movement (implemented in `command_mapBack.ts`)
- `pokedex` — view/search your Pokédex (implemented in `command_pokedex.ts`)

### Quick start
1. Install dependencies:

```bash
npm install
```

2. Run the development REPL:

```bash
npm run dev
```
