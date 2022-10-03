// let index = 1
const myUrl = 'https://jsonplaceholder.typicode.com/posts'
const table = document.querySelector('#table-body')
// const nextBtn = document.querySelector('.next')
// const prevBtn = document.querySelector('.prev')
let myData = []
const pageSize = 10
let curPage = 1

async function display(page = 1) {
    if (page == 1) {
        prevBtn.style.visibility = "hidden"
    } else {
        prevBtn.style.visibility = "visible"
    }

    if (page == numPages()) {
        nextBtn.style.visibility = "hidden";
    } else {
        nextBtn.style.visibility = "visible";
    }
    // var newUrl = myUrl + index
    await fetch(myUrl)
        .then((response) => response.json())
        .then(data => {
            myData = data
            let generatedHTML = ''
            myData.filter((row, index) => {
                let start = (curPage - 1) * pageSize;
                let end = curPage * pageSize;
                if (index >= start && index < end) return true;
            }).forEach((posts) => {
                generatedHTML +=
                    `<tr>
                    <td>${posts.id}</td>
                    <td>${posts.title}</td>
                    <td>${posts.body}</td>
                    <td><a href="index1.html?userId=${posts.id}" class="text-dark btn">Edit</a></td>
                    <td><a class="btn" onClick="onDelete(this)">Delete</a></td>
                    </tr>`
            })
            table.innerHTML = generatedHTML
        })
        .catch(err => console.error(err))
}

display()
function numPages() {
    return Math.ceil(myData.length / pageSize);
}
function prevFunc() {
    if (curPage > 1) {
        curPage--;
        display(curPage);
    }
}
function nextFunc() {
    if ((curPage * pageSize) < myData.length) {
        curPage++;
        display(curPage);
    }
}
function onDelete(td) {
    let selectedRow = td.parentElement.parentElement;
    let deleteID = selectedRow.cells[0].innerHTML
    fetch(`${myUrl}${deleteID}`, {
        method: 'DELETE',
    })
    table.removeChild(selectedRow)
}
document.querySelector('.next').addEventListener('click', nextFunc());
document.querySelector('.prev').addEventListener('click', prevFunc());

// display()