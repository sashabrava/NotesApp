var notes;
function onLoad() {
    notes = new Notes();
	showAll();
}

function newNote() {
    console.log("button_clicked");
    window.location = "add.html";
}

function showAll() {
    notes.getEntries(fillInList);
}

function fillInList(resultDB) {
    console.log("get db entries");
    var list = document.getElementById("result");
    list.innerHTML = "";
    for (var i = 0; i < resultDB.length; i++) {
        var index = resultDB[i].id;
        var li = document.createElement("li");
        var text = "" + resultDB[i].id + ".) " + resultDB[i].title + ". " + resultDB[i].body;
        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("data-DB", index);
        buttonDelete.textContent = "Delete";
        buttonDelete.onclick = function () {
            remove(parseInt(this.getAttribute("data-db")));
        }; //(result[i].id);
        li.textContent = text;
        li.appendChild(document.createElement("div"));
        li.appendChild(buttonDelete);
        var buttonEdit = document.createElement("button");
        buttonEdit.setAttribute("data-DB", index);
        buttonEdit.textContent = "Edit";
        buttonEdit.onclick = function () {
            edit(parseInt(this.getAttribute("data-db")));
        };
        li.appendChild(buttonEdit);
        list.appendChild(li);
        li.appendChild(document.createElement("p"));
    }
}
function edit(id) {
    window.location = "add.html?new=" + id;
}

function remove(id) {
    notes.remove(id);
	showAll();
}