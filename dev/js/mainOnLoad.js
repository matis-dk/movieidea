
window.onload = function () {

    setLastSettings();

    let con = {
        task: "discover",
        loadState: "loadDefault",
        settings: lastSettings
    }

    loadController(con);

}
