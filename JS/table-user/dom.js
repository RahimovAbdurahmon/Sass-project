import { addUser, deleteUser, editUser, searchGet, selectStatus } from "./api.js";

let tableBody = document.querySelector(".tableBody");

const popover = document.getElementById("popover");
const btnInfo = document.querySelector(".btnInfo");
const btnDelete = document.querySelector(".btnDelete");
const btnEdit = document.querySelector(".btnEdit");

// add
const btnAddNew = document.querySelector(".btnAddNew");
const modalAddUser = document.querySelector(".modalAddUser");
const formAdd = document.querySelector(".formAdd");
const btnAddCancel = document.querySelector(".btnAddCancel");

// edit
const modalEditUser = document.querySelector(".modalEditUser");
const formEdit = document.querySelector(".formEdit");
const btnEditCancel = document.querySelector(".btnEditCancel");

// filter
const inpSearch = document.querySelector(".inpSearch")
const selStatus = document.querySelector(".selStatus")

// filter search
inpSearch.oninput = () => {
  searchGet(inpSearch.value)
}

// filter select
selStatus.onclick = () => {
  selectStatus(selStatus.value)
}

// delete
function deleteUserPermission() {
  Swal.fire({
    title: "Do you want to delete the User?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "User Deleted",
        icon: "success",
        draggable: true,
        showConfirmButton: false,
        timer: 1000,
      });
      deleteUser(user.id);
      popover.style.display = "none";
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
btnDelete.onclick = () => {
  deleteUserPermission();
};

// info
function openSidebar(user) {
  Swal.fire({
    html: `
      <div class="InfoUserModal">
        <img src="${user.avatar}" class='infoAvatar' alt="avatar image">
        <h1 class="infoName">${user.name}</h1>
        <p class="infoEmail">${user.email}</p>
        <hr>
        <div>
          <aside class="left">
            <h3><i class="fa-solid fa-city"></i> City</h3>
            <h3><i class="fa-solid fa-clock"></i> Status</h3>
            <h3><i class="fa-solid fa-phone"></i> Phone</h3>
          </aside>
          <aside class="right">
            <h3 class="infoCity">${user.city}</h3>
            <h3 class=${user.isComplete ? "infoStatusActive" : "infoStatusInactive"}>
              ${user.isComplete ? "Active" : "Inactive"}
            </h3>
            <h3 class="infoPhone">${user.phone}</h3>
          </aside>
        </div>
        <hr>
        <div class="infoActions">
          <button class="Btn btnInfoDelete">Delete
          <svg class="svg svgDelete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </button>
          <button class="Btn btnInfoEdit">Edit
          <svg class="svg svgEdit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
          </button>
        </div>
      </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: "swal2-sidebar",
    },
    backdrop: true,
    didOpen: () => {
      document.querySelector(".swal2-popup").classList.add("swal2-show");

      // ✅ Add event listeners dynamically
      document.querySelector(".btnInfoDelete").addEventListener("click", () => {
        Swal.close();
        deleteUserPermission();
      });

      document.querySelector(".btnInfoEdit").addEventListener("click", () => {
        Swal.close()
        editModal()
      });
    },
  });
}
btnInfo.onclick = () => {
  openSidebar(user);
};

// add
btnAddNew.onclick = () => {
  console.log("hello");
  modalAddUser.style.display = "flex";
};
function closeModalAdd(e) {
  if (
    e.target === modalAddUser ||
    e.target == btnAddCancel ||
    e.target == formAdd
  ) {
    modalAddUser.style.display = "none";
    formAdd.reset();
  }
}
btnAddCancel.onclick = (e) => {
  closeModalAdd(e);
};
modalAddUser.onclick = (event) => {
  closeModalAdd(event);
};
formAdd.onsubmit = (event) => {
  event.preventDefault();
  const newUser = {
    id: Date.now(),
    name: formAdd["name"].value,
    email: formAdd["email"].value,
    avatar: formAdd["avatar"].value,
    city: formAdd["city"].value,
    phone: formAdd["phone"].value,
    isComplete: formAdd["status"].value == "active" ? true : false,
  };
  addUser(newUser);
  closeModalAdd(event);
  Swal.fire({
    title: "User Added",
    icon: "success",
    draggable: true,
    showConfirmButton: false,
    timer: 1000,
  });
};

// edit
function editModal() {
  modalEditUser.style.display = "flex";
  formEdit["name"].value = user.name;
  formEdit["email"].value = user.email;
  formEdit["avatar"].value = user.avatar;
  formEdit["city"].value = user.city;
  formEdit["phone"].value = user.phone;
  formEdit["status"].value = user.isComplete ? "active" : "inactive";
}
btnEdit.onclick = () => {
  editModal();
};
function closeModalEdit(e) {
  if (
    e.target === modalEditUser ||
    e.target == btnEditCancel ||
    e.target == formEdit
  ) {
    modalEditUser.style.display = "none";
    formEdit.reset();
  }
}
modalEditUser.onclick = (e) => {
  closeModalEdit(e);
};
function editUserPermissin(e) {
  e.preventDefault();   
  console.log();
  Swal.fire({
    title: "Do you want to Edit the User?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Edit",
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "User Edited",
        icon: "success",
        draggable: true,
        showConfirmButton: false,
        timer: 1000,
      });
      const newEditedUser = {
        id: Date.now(),
        name: formEdit["name"].value,
        email: formEdit["email"].value,
        avatar: formEdit["avatar"].value,
        city: formEdit["city"].value,
        phone: formEdit["phone"].value,
        isComplete: formEdit["status"].value == "active" ? true : false,
      };
      editUser(user.id, newEditedUser);
      closeModalEdit(e);
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
formEdit.onsubmit = (e) => {
  editUserPermissin(e);
};

// get
let user = null;
const getData = (data) => {
  tableBody.innerHTML = "";
  if (data.length === 0) {
    let errorText = document.createElement("h1");
    errorText.textContent = "Data is empty";
    tableBody.appendChild(errorText);
    return;
  }
  data.forEach((elem) => {
    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let tdName = document.createElement("td");
    tdName.classList.add("tdName");
    let nameContent = document.createElement("div");
    nameContent.classList.add("nameContent");

    let avatar = document.createElement("img");
    avatar.src = elem.avatar;
    avatar.alt = "avatar";
    avatar.classList.add("avatar");

    let name = document.createElement("h2");
    name.innerHTML = elem.name;
    name.classList.add("name");

    let email = document.createElement("p");
    email.innerHTML = elem.email;
    email.classList.add("email");

    let tdCity = document.createElement("td");
    tdCity.innerHTML = elem.city;
    tdCity.classList.add("tdCity");

    let tdStatus = document.createElement("td");
    tdStatus.classList.add("tdStatus");

    let btnStatus = document.createElement("button");
    btnStatus.innerHTML = elem.isComplete ? "Active" : "Inactive";
    elem.isComplete
      ? btnStatus.classList.add("btnStatusActive")
      : btnStatus.classList.add("btnStatusInactive");

    let tdPhone = document.createElement("td");
    tdPhone.innerHTML = elem.phone;
    tdPhone.classList.add("tdPhone");

    let tdAction = document.createElement("td");
    tdAction.classList.add("tdAction");

    let actionIcon = document.createElement("i");
    actionIcon.className = "fa-solid fa-ellipsis action-button";
    actionIcon.id = "actionButton";
    actionIcon.classList.add("actionIcon");
    actionIcon.onclick = () => {
      event.stopPropagation();
      const rect = actionIcon.getBoundingClientRect();
      const top = rect.bottom + window.scrollY - 20;
      const left = rect.right + window.scrollX - 170;

      user = elem;

      popover.style.top = `${top}px`;
      popover.style.left = `${left}px`;
      popover.style.display =
        popover.style.display === "block" ? "none" : "block";
    };

    nameContent.append(name, email);
    tdName.append(avatar, nameContent);
    tdStatus.appendChild(btnStatus);
    tdAction.appendChild(actionIcon);
    tr.append(tdName, tdCity, tdStatus, tdPhone, tdAction);
    tableBody.appendChild(tr);
  });
};

document.addEventListener("click", function (event) {
  if (!document.querySelector(".actionIcon").contains(event.target) && !popover.contains(event.target)) {
    popover.style.display = "none";
  }
});

export default getData;
