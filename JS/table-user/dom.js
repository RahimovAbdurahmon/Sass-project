import { deleteUser } from "./api.js";

let tableBody = document.querySelector(".tableBody");

const popover = document.getElementById("popover");
const btnInfo = document.querySelector(".btnInfo");
const btnDelete = document.querySelector(".btnDelete");
const btnEdit = document.querySelector(".btnEdit");

// delete
btnDelete.onclick = () => {
  //   Swal.fire({
  //     title: "Success!",
  //     text: "User Deleted",
  //     icon: "success",
  //     timer: 10000,
  //     showConfirmButton: true,
  //   });
  Swal.fire({
    title: "Do you want to delete the User?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "", "success");
      console.log(idx);
      deleteUser(idx);
      popover.style.display = "none";
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

let idx = null;
const getData = (data) => {
  tableBody.innerHTML = "";
  data.forEach((elem) => {
    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let tdName = document.createElement("td");
    tdName.classList.add("tdName");
    let nameContent = document.createElement("div");
    nameContent.classList.add("nameContent");

    let avatar = document.createElement("img");
    avatar.src = elem.avatar;
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

      idx = elem.id;

      popover.style.top = `${top}px`;
      popover.style.left = `${left}px`;
      popover.style.display =
        popover.style.display === "block" ? "none" : "block";

      document.addEventListener("click", function (event) {
        if (
          !actionIcon.contains(event.target) &&
          !popover.contains(event.target)
        ) {
          popover.style.display = "none";
        }
      });
    };

    nameContent.append(name, email);
    tdName.append(avatar, nameContent);
    tdStatus.appendChild(btnStatus);
    tdAction.appendChild(actionIcon);
    tr.append(tdName, tdCity, tdStatus, tdPhone, tdAction);
    tableBody.appendChild(tr);
  });
};

export default getData;
