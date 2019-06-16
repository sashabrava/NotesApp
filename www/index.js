var notes;
function onLoad() {
    notes = new Notes();
	notes.getEntries(fillInList);
}

function newNote() {
    //Event listener for pushing "Add note" button
    window.location = "add-or-edit.html";
}

function fillInList(resultDB) {
    //Function for adding Notes from database on the page
    var list = document.getElementById("list");
    list.innerHTML = "";
    for (var i = 0; i < resultDB.length; i++) {
        var index = resultDB[i].id;
		//filling in note data
        var elementDiv = document.createElement("div");
		var textDiv = document.createElement("div");
		var titleDiv = document.createElement("div");
		var bodyDiv = document.createElement("div");
		elementDiv.className = "col-xs-12";
		titleDiv.className = "noteTitleDiv col-xs-12";
		bodyDiv.className = "noteBodyDiv col-xs-12";
		var textTitle = "" + (i+1) + ".) " + resultDB[i].title ;
		var textBody = resultDB[i].body;
		titleDiv.textContent = textTitle;
		bodyDiv.textContent = textBody; 
		textDiv.appendChild(titleDiv);
		textDiv.appendChild(bodyDiv);
		//adding buttons
        var buttonDelete = document.createElement("button");
		elementDiv.appendChild(textDiv);
        buttonDelete.setAttribute("data-DB", index);
        buttonDelete.textContent = "Delete";
		buttonDelete.className = "btn btn-danger col-xs-5";
        buttonDelete.onclick = function () {
            remove(parseInt(this.getAttribute("data-db")));
        };
        var buttonsDiv = document.createElement("div");
        buttonsDiv.appendChild(buttonDelete);
		var divider = document.createElement("div");
		divider.className = "col-xs-2";
		buttonsDiv.appendChild(divider);
        var buttonEdit = document.createElement("button");
        buttonEdit.setAttribute("data-DB", index);
        buttonEdit.textContent = "Edit";
		buttonEdit.className = "btn btn-info col-xs-5";
        buttonEdit.onclick = function () {
            edit(parseInt(this.getAttribute("data-db")));
        };
        buttonsDiv.appendChild(buttonEdit);
		elementDiv.appendChild(buttonsDiv);
        list.appendChild(elementDiv);
    }
}
function edit(id) {
	//Event listener for "Edit" button
    window.location = "add-or-edit.html?edited=" + id;
}

function remove(id) {
	//Event listener for "Remove" button
    notes.remove(id);
	notes.getEntries(fillInList);
}