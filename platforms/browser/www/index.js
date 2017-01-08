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
        var li = document.createElement("div");
		li.className = "body col-xs-12";
		 var textDiv = document.createElement("div");
		 var titleDiv = document.createElement("div");
		 var bodyDiv = document.createElement("div");
		 titleDiv.className = "titleDiv col-xs-12";
		 bodyDiv.className = "bodyDiv col-xs-12";
		  var textTitle = "" + (i+1) + ".) " + resultDB[i].title ;
		 titleDiv.textContent = textTitle;
		 
        var textBody = resultDB[i].body;
		bodyDiv.textContent = textBody; 
		textDiv.appendChild(titleDiv);
		textDiv.appendChild(bodyDiv);
        var buttonDelete = document.createElement("button");
		
		li.appendChild(textDiv);
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
		li.appendChild(buttonsDiv);
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