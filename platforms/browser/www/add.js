var notes;
var newObject;
var noteTitle;
var noteBody;
function onLoad() {
    console.log("load");
    notes = new Notes();
    newObject = parseInt(window.location.search.split('new=')[1]);
    var button = document.createElement("button");
    if (isNaN(newObject)) {
        button.textContent = "Create";
        button.onclick = create;

    } else {
        button.textContent = "Save";

        button.onclick = update;
        fillIn();
    }
    document.body.appendChild(button);

}
function fillIn() {
    notes.getEntry({
        "id": newObject
    }, function (data) {
        document.getElementById("noteTitle").value = data[0].title;
        document.getElementById("noteBody").value = data[0].body;
        console.log(data);
    })
}

function update() {
    noteTitle = document.getElementById("noteTitle").value;
    noteBody = document.getElementById("noteBody").value;
    var data = {
        "title": noteTitle,
        "body": noteBody,
        "id": newObject
    };
    notes.update(data);
    home();
}

function home() {
    console.log("button_home");
    history.back();
}
function create() {
    noteTitle = document.getElementById("noteTitle").value;
    noteBody = document.getElementById("noteBody").value;
    var data = {
        "title": noteTitle,
        "body": noteBody
    };
    notes.add(data, function () {
        home();
    });
}
