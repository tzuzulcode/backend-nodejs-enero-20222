const socket = io.connect("http://localhost:4000");

const activeUsers = document.getElementById("active-users")

const newUserConnected = (user) => {
  socket.emit("new user", user)
  const p = document.createElement("p")
  p.innerText = user
  activeUsers.appendChild(p)
}

newUserConnected("tzuzulcode")