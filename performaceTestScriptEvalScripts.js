import "./BP/declaration/index";
import "./BP/declaration/Global";
srun(() => {
    const search = {caseSensitive: false, value: "a"}
    let t1 = Date.now();
    let savedPlayers = modules.playersave.savedPlayer.getSavedPlayersAlphabeticalOrder();
    let t2 = Date.now();
    savedPlayers.filter((p) => !p.isBanned);
    let t3 = Date.now();
    savedPlayers.filter((p) => !!search
        ? search.caseSensitive == true
            ? p.name.includes(search.value)
            : p.name.toLowerCase().includes(search.value.toLowerCase())
        : true
    );
    let t4 = Date.now();
    dcsend({ getPlayers: t2 - t1, findNonBanned: t3 - t2, findMatchingSearchFilter: t4 - t3 });
});
