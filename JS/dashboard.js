let updates = document.querySelector(".updates");

const totalData = [
  {
    id: 1,
    title: "Total Income",
    img: "/Images/income.png",
    size: 22000,
    checked: "Last month",
    protsent: 5.1,
  },
  {
    id: 2,
    title: "Total Visitor",
    img: "/Images/visitor.jpg",
    size: 10000,
    checked: "Last week",
    protsent: 4.5,
  },
  {
    id: 3,
    title: "Total Orders",
    img: "/Images/oredr.png",
    size: 5000,
    checked: "Last month",
    protsent: 10,
  },
  {
    id: 4,
    title: "Total Sales",
    img: "/Images/sale.png",
    size: 10000,
    checked: "This week",
    protsent: 99,
  },
];

const getUpdates = () => {
  return (updates.innerHTML = totalData.map((elem) => {
    return `
        <div
          class="cardMain"
        >
          <div class="navCard">
            <h1 class="text">${elem.title}</h1>
            <img src=${elem.img} width="50px" alt="img" />
          </div>
          <h1 style="font-size"18px">${elem.size}</h1>
          <div class="navCard">
            <p class="text-green-500">
              ${elem.protsent}%
            </p>
            <p style="font-size: 16px; color: gray;">${elem.checked}</p>
          </div>
        </div>
        `;
  }));
};
getUpdates();
