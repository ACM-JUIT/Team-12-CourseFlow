const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const app = express()
const PORT = 5000
const JWT_SECRET = "courseflow_secret_change_in_production"

const GMAIL_USER = "nandinigarg2602@gmail.com"
const GMAIL_APP_PASSWORD = "gqkwitfjnvkkzdmy"

app.use(cors({ origin: function(origin, callback) { callback(null, true) }, credentials: true }))
app.use(express.json())

const users = []
const otpStore = {}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
})

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ message: "Email is required" })

    const existing = users.find((u) => u.email === email.toLowerCase())
    if (existing) return res.status(409).json({ message: "An account with this email already exists" })

    const otp = generateOTP()
    otpStore[email.toLowerCase()] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    }

    await transporter.sendMail({
      from: `"CourseFlow Team" <${GMAIL_USER}>`,
      to: email,
      subject: "Your verification code is " + otp,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-bottom: 8px;">Verify your email</h2>
          <p style="color: #475569; margin-bottom: 24px;">Enter this code to complete your CourseFlow signup. It expires in 10 minutes.</p>
          <div style="background: #1e293b; color: #f1f5f9; font-size: 32px; font-weight: 700; letter-spacing: 8px; text-align: center; padding: 20px; border-radius: 10px;">
            ${otp}
          </div>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    })

    res.json({ message: "OTP sent successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to send OTP. Check your Gmail config." })
  }
})

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, otp } = req.body

    if (!name || !email || !password || !otp)
      return res.status(400).json({ message: "All fields are required" })

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" })

    const stored = otpStore[email.toLowerCase()]
    if (!stored) return res.status(400).json({ message: "OTP not found. Please request a new one." })
    if (Date.now() > stored.expiresAt) {
      delete otpStore[email.toLowerCase()]
      return res.status(400).json({ message: "OTP has expired. Please request a new one." })
    }
    if (stored.otp !== otp) return res.status(400).json({ message: "Incorrect OTP" })

    delete otpStore[email.toLowerCase()]

    const existing = users.find((u) => u.email === email.toLowerCase())
    if (existing) return res.status(409).json({ message: "An account with this email already exists" })

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
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" })

    const user = users.find((u) => u.email === email.toLowerCase().trim())
    if (!user) return res.status(401).json({ message: "No account found with this email" })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ message: "Incorrect password" })

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