const box = document.querySelector(".box");
const search = document.querySelector("#search");
const add = document.querySelector(".add");
const adddialog = document.querySelector(".adddialog");
const close = document.querySelector(".noneadd");
const close2 = document.querySelector("#noneadd");
const addform = document.querySelector(".editform");
const editdialog = document.querySelector(".editdialog");
const close3 = document.querySelector(".noneedit");
const close4 = document.querySelector("#noneedit");
const editform = document.querySelector(".editform");
const sort = document.querySelector("#sort");
const select = search.querySelector(".select")
let idx = null;
const api = "http://localhost:3000/api/data";

async function data() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.error(error);
  }
}
data();

add.onclick = () => {
  adddialog.showModal();
};

close2.onclick = () => {
  adddialog.close();
};

close.onclick = () => {
  adddialog.close();
};

async function addUser(user) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    data();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}


addform.onsubmit = (event) => {
  event.preventDefault();
  let user = {
    id: new Date(),
    img: addform["inp1"].value,
    name: addform["inp2"].value,
    line: addform["inp3"].value,
    isComplite: false,
  };
  addUser(user);
  adddialog.close();
  addform.reset();
};

async function editUser(id, user) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    data();
  } catch (error) {
    console.error(error);
  }
}

close3.onclick = () => {
  editdialog.close();
};

close4.onclick = () => {
  editdialog.close();
};

async function deleteUser(id) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  data();
}

search.oninput = async () => {
  try {
    const response = await fetch(`${api}?q=${search.value}`);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.error(error);
  }
};


function get(dat) {
  box.innerHTML = "";
  dat.forEach((e) => {
    let tbody = document.createElement("tbody");

    let tr = document.createElement("tr");
    let tdImg = document.createElement("td");
    let tdava = document.createElement("img");
    tdava.classList = "ava";
    tdava.src = e.img;

    let tdName = document.createElement("td");
    tdName.classList = "tdName";
    tdName.classList = "name";
    tdName.innerHTML = e.name;



    let isComplite = document.createElement("td");
    isComplite.classList = "isComplite";
    isComplite.innerHTML = e.isComplite;

    if (isComplite.innerHTML == "true") {
      isComplite.style.color = "green";
    } else if (isComplite.innerHTML == "false") {
      isComplite.style.color = "red";
    }
    let tdsol = document.createElement("td");
    tdsol.innerHTML = e.line;


    let tdFunction = document.createElement("td");
    tdFunction.classList = "tdFunction";

    let editbutton = document.createElement("p");
    editbutton.classList = "editbutton";
    editbutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" color="green" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>`;

    let deletbutton = document.createElement("p");
    deletbutton.classList = "deletbutton";
    deletbutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" color="red" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>`;


    tdFunction.append(editbutton, deletbutton);
    tdImg.append(tdava);
    tr.append(tdImg, tdName,isComplite, tdsol, tdFunction);
    tbody.append(tr);
    box.append(tbody);

    isComplite.onclick = () => {
      if (isComplite.innerHTML == "true") {
        isComplite.style.color = "red";
        isComplite.innerHTML = "false";
      } else if (isComplite.innerHTML == "false") {
        isComplite.innerHTML = "true";
        isComplite.style.color = "green";
      }
    };

    deletbutton.onclick = () => {
      deleteUser(e.id);
    };
    editbutton.onclick = () => {
      idx = e.id;
      editdialog.showModal();
      editform["inp4"].value = e.img;
      editform["inp5"].value = e.name;
      editform["inp6"].value = e.line;
    };
    editform.onsubmit = (event) => {
      event.preventDefault();
      let user = {
        id: new Date(),
        img: editform["inp4"].value,
        name: editform["inp5"].value,
        line: editform["inp6"].value,
        isComplite: false,
      };
      editUser(idx, user);
      editdialog.close();
      editform.reset();
    };
  });
}
