import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUsers = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
      })
      .catch((err) => console.error(err));
    console.log(user);

    event.target.reset();
  };

  return (
    <div className="App">
      <h1>Total Users: {users.length}</h1>

      <form onSubmit={handleUsers}>
        <input name="name" type="text" placeholder="name" />
        <br />
        <input name="email" type="email" placeholder="email" />
        <br />
        <button type="submit">Add User</button>
      </form>
      {users.map((user) => (
        <p key={user._id}>{user.email}</p>
      ))}
    </div>
  );
}

export default App;
