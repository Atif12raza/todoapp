var firebaseConfig = {
  apiKey: "AIzaSyBtPn-MZuL3aG9IYGMm0-gaRjoIQT_Aok0",
  authDomain: "todoapp-76f1b.firebaseapp.com",
  databaseURL: "https://todoapp-76f1b-default-rtdb.firebaseio.com",
  projectId: "todoapp-76f1b",
  storageBucket: "todoapp-76f1b.firebasestorage.app",
  messagingSenderId: "458953638176",
  appId: "1:458953638176:web:bc8ecd466b69024d5f9745"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var ulElement = document.getElementById("list");

firebase.database().ref("todos").on("child_added", function(data) {
  var liElement = document.createElement("li");
  liElement.setAttribute("data-key", data.val().key);

  var liText = document.createTextNode(data.val().value);
  liElement.appendChild(liText);

  // Delete button
  var delBtnElement = document.createElement("button");
  var delBtnText = document.createTextNode("Delete");
  delBtnElement.appendChild(delBtnText);
  delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
  liElement.appendChild(delBtnElement);

  // Edit button
  var editBtnELement = document.createElement("button");
  var editBtnText = document.createTextNode("Edit");
  editBtnELement.appendChild(editBtnText);
  editBtnELement.setAttribute("onclick", "editItem(this)");
  liElement.appendChild(editBtnELement);

  ulElement.appendChild(liElement);
});

function addTodo() {
  var input = document.getElementById("todoInput");
  if (!input.value.trim()) {
      alert("Please enter a todo item.");
      return;
  }
  var key = firebase.database().ref("todos").push().key;
  var obj = {
      value: input.value,
      key: key
  };
  firebase.database().ref("todos").child(key).set(obj);
  input.value = "";
}

function deleteAllItems() {
  ulElement.innerHTML = "";
  firebase.database().ref("todos").remove();
}

function deleteSingleItem(e) {
  var key = e.parentNode.getAttribute("data-key");
  firebase.database().ref("todos").child(key).remove();
  e.parentNode.remove();
}

function editItem(e) {
  var updatedVal = prompt("Enter updated value:");
  if (updatedVal) {
      var key = e.parentNode.getAttribute("data-key");
      firebase.database().ref("todos").child(key).update({
          value: updatedVal
      });
      e.parentNode.firstChild.nodeValue = updatedVal;
  }
}
