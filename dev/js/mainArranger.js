let mgArranger         = document.getElementById('mg-arranger-container');
let mgToggle           = document.getElementById('mg-toggle');

 mgToggle.addEventListener('click', toggleOpen);

 function toggleOpen (e) {
    if (mgArranger.getAttribute("data-open") == "false") {
        mgArranger.setAttribute("data-open", "true");
        return;
    }

    mgArranger.setAttribute("data-open", "false");
 }
