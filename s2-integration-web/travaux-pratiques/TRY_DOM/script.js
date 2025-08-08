const button = document.querySelector(".button")
const textArea = document.querySelector(".inputNoteUser")


button.addEventListener("click",alertMe)
textArea.addEventListener("input",updateLengthText)


function alertMe(evt)
{
    alert("t'as cliqué sur le buton "+evt.target.textContent)
}

function updateLengthText(evt)
{
    const labelText = document.querySelector(".textLengthLabel")
    labelText.textContent = "("+labelText.dataset.title+" :"+evt.target.value.length+")"
}