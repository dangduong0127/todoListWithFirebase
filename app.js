const inputAdd = document.querySelector("#input-add");
const btnAdd = document.querySelector(".btn-add");
const ulListEl = document.querySelector("#ul-list");

renderTodoList();
async function renderTodoList() {
  try {
    const querySnapshot = await db.collection("Todos").get();
    const todos = [];

    querySnapshot.forEach((doc) => {
      todos.push({ uid: doc.id, ...doc.data() });
    });
    ulListEl.innerHTML = null;
    todos.forEach((item) => {
      ulListEl.innerHTML += `
      <li>
        <p class="${item.complete === false ? "" : "done"}">${item.task} </p>
        <div class="btn-item">
            <input type="checkbox" ${
              item.complete === true ? "checked" : ""
            } id="${item.uid}" value="${item.task}" onchange="btnCheck(this, '${
        item.uid
      }')"> 
            <span onclick="btnDelete('${item.uid}')">Delete</span>
        </div>
     </li>
        `;
    });
  } catch (err) {
    console.log(err);
  }
}

btnAdd.addEventListener("click", function (event) {
  event.preventDefault();
  if (inputAdd.value.trim() === "") {
    alert("input value null ❌");
    return;
  } else {
    addTodo();
    async function addTodo() {
      try {
        await db.collection("Todos").add({
          displayName: "userName",
          task: inputAdd.value,
          complete: false,
        });

        inputAdd.value = "";
      } catch (err) {
        console.log(err);
      }
    }
    renderTodoList();
  }
});

function btnDelete(uid) {
  const docRef = db.collection("Todos").doc(uid);
  const cfm = confirm("Bạn có chắc chắn muốn xoá task này?");
  if (cfm) {
    docRef.delete().then(() => {
      console.log("Task đã được xoá thành công");
    });

    renderTodoList();
  }
}

async function btnCheck(checkbox, uid) {
  try {
    if (checkbox.checked === true) {
      await db.collection("Todos").doc(uid).set({
        displayName: "userName",
        task: checkbox.value,
        complete: true,
      });
      renderTodoList();
    } else {
      await db.collection("Todos").doc(uid).set({
        displayName: "userName",
        task: checkbox.value,
        complete: false,
      });
      renderTodoList();
    }
  } catch (err) {
    console.log(err);
  }
}
