const myUrl = 'https://jsonplaceholder.typicode.com/users/'
const edit = document.querySelector('#table1-body')
const submit = document.querySelector('.submit')
const table = document.querySelector('#table-body')
const postForm = document.getElementById('addPostForm')

async function JSONplaceholder() {

    await fetch(myUrl, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
            let generatedHTML = ''

            data.map((posts) => {
                generatedHTML +=
                    `<tr>
                    <td>${posts.id}</td>
                    <td>${posts.name}</td>
                    <td>${posts.username}</td>
                    <td>${posts.email}</td>
                    <td>${posts.phone}</td>
                    <td>${posts.website}</td>
                    <td><a href="index1.html?userId=${posts.id}" class="text-dark btn">Edit</a></td>
                    <td><a class="btn" onClick="onDelete(this)">Delete</a></td>
                    </tr>`
            })
            table.innerHTML = generatedHTML
        })
        .catch(err => console.error(err))

}
JSONplaceholder()

postForm ? postForm.addEventListener('submit', addPost) : false
function addPost(event) {
    // alert("check console")
    event.preventDefault();

    var name = document.getElementById('name')
    var username = document.getElementById('username')
    var email = document.getElementById('email')
    var phone = document.getElementById('phone')
    var website = document.getElementById('website')


    const myPost = {
        name: name.value,
        username: username.value,
        email: email.value,
        phone: phone.value,
        website: website.value
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(myPost),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    fetch(myUrl, fetchData)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })
        .then((data) => {
            // console.log(data)
            const { id, email, username, name, phone, website } = data
            updatedHTML = ''
            updatedHTML += `<tr>
            <td>${id}</td>
                    <td>${name}</td>
                    <td>${username}</td>
                    <td>${email}</td>
                    <td>${phone}</td>
                    <td>${website}</td>
                    <td><a href="index1.html?userId=${id}" class="text-dark btn">Edit</a></td>
                    <td><a class="btn" onClick="onDelete(this)">Delete</a></td>
            </tr>`
            table.innerHTML += updatedHTML
        })
        .catch(err => console.log('Error message:', err.statusText))
    name.value = ''
    username.value = ''
    email.value = ''
    phone.value = ''
    website.value = ''
}
function onDelete(td) {
    let selectedRow = td.parentElement.parentElement;
    let deleteID = selectedRow.cells[0].innerHTML
    fetch(`${myUrl}${deleteID}`, {
        method: 'DELETE',
    })
    table.removeChild(selectedRow)
    // console.log(selectedRow)
}


