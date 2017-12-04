
window.onload = function () {

    window.lastSettings = getArrangerSettings();

    let con = {
        task: "discover",
        settings: lastSettings
    }

    loadController(con);

}
