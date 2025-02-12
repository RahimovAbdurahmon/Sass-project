let box = document.querySelector(".box")

let modalInfo = document.querySelector(".modalInfo")
let nameInfo = document.querySelector(".nameInfo")
let statusInfo = document.querySelector(".statusInfo")

// add
let btnAddNew = document.querySelector(".btnAddNew")
let modalAdd = document.querySelector(".modalAdd")
let modalAddContent = document.querySelector(".modalAddContent")
let formAdd = document.querySelector(".formAdd")

// edit
let modalEdit = document.querySelector(".modalEdit")
let modalEditContent = document.querySelector(".modalEditContent")
let formEdit = document.querySelector(".formEdit")

let data = [
    {
        id: 1,
        avatar: "avatar.avif",
        name: "John",
        status: true
    },
    {
        id: 2,
        avatar: "avatar.avif",
        name: "Smith",
        status: false
    },
    {
        id: 3,
        avatar: "avatar.avif",
        name: "Bekson",
        status: false
    }
]

// info
modalInfo.onclick = () => {
    modalInfo.close();
}
const infoUser = (id) => {
    modalInfo.showModal();
    const user = data.find((elem) => elem.id === id);
    nameInfo.innerHTML = user.name;
    statusInfo.innerHTML = user.status ? "Active" : "Inactive"
    user.status ? statusInfo.classList.add("activeStatusInfo") : statusInfo.classList.add("inactiveStatusInfo")
}

// add
btnAddNew.onclick = () => {
    modalAdd.showModal();
}
formAdd.onsubmit = (e) => {
    e.preventDefault();
    let newUser = {
        id: Date.now(),
        avatar: "avatar.avif",
        name: formAdd["name"].value,
        status: formAdd["status"].value == "active" ? true : false
    }
    data.push(newUser)
    formAdd.reset();
    getData(data);
    modalAdd.close();
}

// edit
let idx = null;
const modalEditOpen = (id) => {
    modalEdit.showModal();
    const user = data.find((e) => e.id === id)
    formEdit["name"].value = user.name
    formEdit["status"].value = user.status ? "active" : "inactive"
    idx = user.id;
}
formEdit.onsubmit = (event) => {
    event.preventDefault();
    const newUpdatedTodos = {
        id: idx,
        avatar: "avatar.avif",
        name: event.target.name.value,
        status: formEdit["status"].value == "active" ? true : false
    }
    data = data.map((elem) => {
        return elem.id == idx ? elem = newUpdatedTodos : elem
    })
    getData(data)
    modalEdit.close();
}

// delete
const deleteTodos = (id) => {
    console.log(id);
    data = data.filter((elem) => elem.id !== id)
    getData(data)
}

const getData = (data) => {
    box.innerHTML = ""
    data.forEach((elem) => {
        let card = document.createElement("div")
        card.classList.add("card")

        let name = document.createElement("h1")
        name.classList.add("name")
        name.innerHTML = elem.name;

        let status = document.createElement("p");
        status.innerHTML = elem.status ? "Active" : "Inactive"
        elem.status == true ? status.classList.add("activeStatusInfo") : status.classList.add("inactiveStatusInfo")

        let avatar = document.createElement("img")
        avatar.classList.add("avatar")
        avatar.src = elem.avatar

        let btnDelete = document.createElement("button")
        btnDelete.classList.add("btnDelete")
        btnDelete.innerHTML = "Delete"
        btnDelete.onclick = () => {
            deleteTodos(elem.id);
        }

        let btnEdit = document.createElement("button")
        btnEdit.classList.add("btnEdit")
        btnEdit.innerHTML = "Edit"
        btnEdit.onclick = () => {
            modalEditOpen(elem.id);
        }

        let btnInfo = document.createElement("button")
        btnInfo.classList.add("btnInfo")
        btnInfo.innerHTML = "Info"
        btnInfo.onclick = () => {
            infoUser(elem.id);
        }

        let profile = document.createElement("div")
        profile.classList.add("actions")
        
        let nameContent = document.createElement("div")
        nameContent.append(name, status)
        
        let actions = document.createElement("div")
        actions.classList.add("actions")
        profile.append(avatar, nameContent)
        actions.append(btnDelete, btnEdit, btnInfo)
        card.append(profile, actions);
        box.appendChild(card);
    })
}

getData(data);