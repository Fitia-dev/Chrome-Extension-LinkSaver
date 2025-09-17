// chrome extension

const btnAdd = document.getElementById("btn-add");
const inputValue = document.getElementById("input-value");
const ul = document.getElementById("ulE");
const btnDeleteAll = document.getElementById("delete-all");
const message = document.getElementById("notification");
let links = [];

closeNotification();
let linkFromLocal = JSON.parse(localStorage.getItem("links"));
if (linkFromLocal) {
  links = linkFromLocal;
  show();
}

//fonction ajouter
btnAdd.addEventListener("click", () => {
  if (inputValue.value.trim() !== "") {
    const link = {
      id: Date.now(),
      linkTitle: inputValue.value.trim(),
    };
    links.push(link);
    console.log(`${inputValue.value.trim()} pushed`); //verification if pushed
    message.textContent = `${inputValue.value.trim()} added`;
    setTimeout(closeNotification, 3000);
    localStorage.setItem("links", JSON.stringify(links));
    console.log(localStorage.getItem("links"));
  } else {
    console.log(`nothing added`);
    message.textContent = `nothing added`;
    setTimeout(closeNotification, 3000);
  }
  inputValue.value = "";
  show();
  showNotification();
});

//fonction afficher
function show() {
  ul.textContent = "";
  links.forEach((link) => {
    const li = document.createElement("li");
    li.innerHTML = `<a target="_blanck" href='${link.linkTitle}'>${link.linkTitle}</a>`;
    const btnDelete = document.createElement("button");
    btnDelete.className = "btnDelete";
    btnDelete.textContent = "❌";
    li.appendChild(btnDelete);
    ul.appendChild(li);

    btnDelete.onclick = function () {
      links.find((link) => link.id === link.id);
      showNotification();
      console.log(link.id + " " + link.linkTitle + " deleted");
      message.innerHTML = link.linkTitle + " deleted !";
      links = links.filter((linkToDelete) => linkToDelete.id !== link.id);
      localStorage.setItem("links", JSON.stringify(links));
      show();
      setTimeout(closeNotification, 3000);
    };
  });
}

function closeNotification() {
  message.style.opacity = 0;
  setTimeout(() => {
    message.style.display = "none";
  }, 500);
}
function showNotification() {
  message.style.opacity = 1;
  message.style.display = "block";
}

//fonction delete
btnDeleteAll.addEventListener("click", () => {
  showNotification();
  if (links == "") {
    console.log("empty !");
    message.textContent = "Empty !";
  } else {
    links = [];
    localStorage.clear();
    show();
  }
  setTimeout(closeNotification, 3000);
});
