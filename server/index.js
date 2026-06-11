const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()
const PORT = 5000
const JWT_SECRET = "courseflow_secret_change_in_production"

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true)
  },
  credentials: true
}))
app.use(express.json())

const users = []

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" })
    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    const existing = users.find((u) => u.email === email.toLowerCase())
    if (existing)
      return res.status(409).json({ message: "An account with this email already exists" })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    }
    users.push(user)
    const token = generateToken(user)
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error. Please try again." })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" })
    const user = users.find((u) => u.email === email.toLowerCase().trim())
    if (!user)
      return res.status(401).json({ message: "No account found with this email" })
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid)
      return res.status(401).json({ message: "Incorrect password" })
    const token = generateToken(user)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error. Please try again." })
  }
})

app.get("/api/auth/me", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "No token provided" })
    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ user: decoded })
  } catch {
    res.status(401).json({ message: "Invalid or expired token" })
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))