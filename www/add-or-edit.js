var notes;
var noteObject;
var noteTitle;
var noteBody;
function onLoad() {
    notes = new Notes();
    noteObject = parseInt(window.location.search.split('edited=')[1]);
    var confirmButton = document.createElement("button");
    if (isNaN(noteObject)) {
        confirmButton.textContent = "Create";
        confirmButton.onclick = create;
		

    } else {
        confirmButton.textContent = "Update";
		document.getElementById("mainText").innerHTML = "Editing existing note";
        confirmButton.onclick = update;
        fillIn();
    }
	confirmButton.className = "btn btn-success col-xs-4 col-xs-offset-4";
    document.getElementById("button-row").appendChild(confirmButton);

}
function fillIn() {
	//Paste values of existing Note
    notes.getEntry({
        "id": noteObject
    }, function (data) {
        document.getElementById("noteTitle").value = data[0].title;
        document.getElementById("noteBody").value = data[0].body;
        console.log(data);
    })
}

function update() {
	//Even listener for "Update" button
    noteTitle = document.getElementById("noteTitle").value;
    noteBody = document.getElementById("noteBody").value;
    var data = {
        "title": noteTitle,
        "body": noteBody,
        "id": noteObject
    };
    notes.update(data);
    history.back();
}

function create() {
	//Even listener for "Create" button
    noteTitle = document.getElementById("noteTitle").value;
    noteBody = document.getElementById("noteBody").value;
    var data = {
        "title": noteTitle,
        "body": noteBody
    };
    notes.add(data, function () {
        history.back();
    });
}
