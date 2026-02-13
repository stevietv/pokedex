import { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
    if (state.prevLocationsURL === "") {
        console.log("you're on the first page");
        return;
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    for (let location of locations.results) {
        console.log(location.name);
    }

    state.nextLocationsURL = locations.next ?? "";
    state.prevLocationsURL = locations.previous ?? "";
}