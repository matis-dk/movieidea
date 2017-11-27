/*

SEARCH MODULE ON SECTION HOME

*/


(function () {
    let mhsInput    = document.getElementById('mhs-input');
    let mhsSearch   = document.getElementById('mhs-search');

    mhsInput.addEventListener('keyup', searchGuard);
    mhsSearch.addEventListener('click', searchGuard);

    function searchGuard (e) {
        if (e.type == "click" || e.keyCode == 13) {
            search(mhsInput.value);
            mhsInput.value = "";
            return;
        }
    }

    function search(searchInput) {
        console.log(searchInput)
    }

})();
