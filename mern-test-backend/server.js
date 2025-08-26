import express from "express";

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Harshad" },
  { id: 2, name: "Amit" }
];

// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST new user
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
