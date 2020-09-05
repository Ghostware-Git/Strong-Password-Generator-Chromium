var lastElem;

function generatePass(max) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let out = "";
    for (let i = 0; i < max; i++) {
        out += chars[Math.floor((Math.random() * chars.length - 1) + 1)];
    }
    return out;
}

function insertPass(item) {
    lastElem.value = generatePass(15);
}

var api = chrome || browser
api.runtime.onInstalled.addListener(function() {
    api.contextMenus.create({
        id: "context-menu-insert-pass",
        title: "Insert Secure Password",
        "contexts": ["editable"]
    });
    api.contextMenus.onClicked.addListener(function(info, tab) {
        insertPass(info);
    });
});

function onMouseClick(evt) {
    console.log("click");
    var elem = document.elementFromPoint(evt.clientX, evt.clientY);
    if (elem != lastElem) {
      window.setTimeout(function(){
        lastElem = elem;
      }, 100);
    }
  };

window.addEventListener('click', onMouseClick, true);