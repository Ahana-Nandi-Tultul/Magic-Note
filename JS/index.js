console.log("Welvome you to the Magic Notes");
showNotes();
//if user add notes, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (element) {
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");

    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addtxt.value = "";
    console.log(noteObj);
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    titleObj.push(addtitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addtitle.value = "";
    console.log(titleObj);

    showNotes();
})

function showNotes(element,) {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    let html = "";

    let date = new Date();
    let a = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yy = date.getFullYear()

    Array.from(noteObj).forEach(function (element, index) {
        html += `<div class="cardNotes my-3 mx-3 card" style="width: 18rem;">       
                     <div class="card-body">
                         <h5 class="card-title"> ${titleObj[index]}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" >Delete</button>
                        <p>Creating time :" ${a + "/" + mm + "/" + yy} "</p>
                        </div>
                              </div>`
        //   " ${a+"/"+mm+"/"+yy} "
    })
    let noteElm = document.getElementById("notes");
    if (noteObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `<p>There is nothing in notes! to add look on the above section</p>`
    }
}
function deleteNote(element, index) {
    // console.log("I am deleting ", index);
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    titleObj.splice(index, 1);
    localStorage.setItem("title", JSON.stringify(titleObj));
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));

    showNotes();
}
let search = document.getElementById('searchtxt');
search.addEventListener('input', function () {
    let inputVal = search.value;
    console.log("Input Event Fired", inputVal);
    let noteCard = document.getElementsByClassName("cardNotes");
    // console.log(noteCard);
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})
