let box = document.querySelector(".box")

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

const getData = (data) => {
    box.innerHTML = ""
    data.forEach((elem) => {
        let card = document.createElement("div")
        card.classList.add("card")

        let name = document.createElement("h1")
        name.classList.add("name")
        name.innerHTML = elem.name;

        let avatar = document.createElement("img")
        avatar.classList.add("avatar")
        avatar.src = elem.avatar

        let btnDelete = document.createElement("button")
        btnDelete.classList.add("btnDelete")
        btnDelete.innerHTML = "Delete"

        let btnEdit = document.createElement("button")
        btnEdit.classList.add("btnEdit")
        btnEdit.innerHTML = "Edit"

        let btnInfo = document.createElement("button")
        btnInfo.classList.add("btnInfo")
        btnInfo.innerHTML = "Info"

        let profile = document.createElement("div")
        profile.classList.add("actions")
        profile.append(avatar, name)

        let actions = document.createElement("div")
        actions.classList.add("actions")
        actions.append(btnDelete, btnEdit, btnInfo)
        card.append(profile, actions);
        box.appendChild(card);
    })
}

getData(data);