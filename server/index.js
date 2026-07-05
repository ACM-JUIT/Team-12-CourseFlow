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

// Middleware
app.use(cors({ origin: function(origin, callback) { callback(null, true) }, credentials: true }))
app.use(express.json())

// --- IN-MEMORY DATA ---
const users = []
const otpStore = {}

let dummyCourses = [
  { id: "1", title: "React Basics for Beginners", instructor: "Kritika Grover", createdBy: "kritika@gmail.com" },
  { id: "2", title: "Node.js & Express Advanced", instructor: "Senior Developer", createdBy: "senior@gmail.com" },
  { id: "3", title: "AI Course Generation Guide", instructor: "Kritika Grover", createdBy: "kritika@gmail.com" }
];

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

// Home Route
app.get("/", (req, res) => {
  res.send("CourseFlow Backend Running 🚀");
});

// --- AUTH ROUTES ---
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

// --- DASHBOARD / COURSE ROUTES ---
app.get("/api/dashboard/courses", (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ success: false, message: "User email is required" });
  }

  const userSpecificCourses = dummyCourses.filter(course => course.createdBy === userEmail);

  res.json({
    success: true,
    totalCourses: userSpecificCourses.length,
    courses: userSpecificCourses
  });
});

app.delete("/api/courses/delete/:id", (req, res) => {
  const courseId = req.params.id;

  dummyCourses = dummyCourses.filter(course => course.id !== courseId);

  res.json({
    success: true,
    message: `Course ${courseId} deleted successfully`,
  });
});

app.get("/api/courses/:id", (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      title: "Intermediate C++ Programming Mastery",
      description:
        "This course provides a comprehensive dive into intermediate C++ concepts for learners familiar with basics. You'll explore object-oriented programming memory management, templates, and the STL through practical examples. Hands-on exercises reinforce key techniques for efficient coding. By the end, you'll be equipped to build robust C++ applications.",
      category: "Coding",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
      skillLevel: "Intermediate",
      duration: "2 Hours",
      chaptersCount: 4,
      videosIncluded: true,
      chapters: [
        {
          id: 1,
          title: "Object-Oriented Programming",
          description: "Learn encapsulation, inheritance, and polymorphism principles. Design classes with constructors specifiers.Implement abstract classes and interfaces for modular code. Apply OOF and access concepts to solve real-world problems efficiently.",
          duration: "25 mins"
        },
        {
          id: 2,
          title: "Memory Management and Pointers",
          description: "Master dynamic memory allocation using new and deleteUnderstand pointer arithmetic and reference variables. Explore smar pointers to prevent memory leaks. Practice safe memory handling techniques through coding scenarios",
          duration: "35 mins"
        },
        {
          id: 3,
          title: "Templates and Generic Programming",
          description: "Create reusable code with function and class templates. Implement template specialization for edge cases Understand type deduction and variadic templates- Apply generic programming to build flexible algorithms.",
          duration: "30 mins"
        },
        {
          id: 4,
          title: "STL and Practical Projects",
          description: "Apply all the concepts learned by building a complete C++ application. Learn debugging techniques, code optimization, and industry-standard coding practices for writing clean and maintainable programs.",
          duration: "40 mins"
        }
      ]
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});