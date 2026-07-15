import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignIn from "./signin"
import SignUp from "./signup"

function AuthPage() {
  const [mode, setMode] = useState("signin")
  const navigate = useNavigate()

  const handleSuccess = (token) => {
    localStorage.setItem("token", token)
    navigate("/dashboard")
  }

  return mode === "signin" ? (
    <SignIn onSwitch={() => setMode("signup")} onSuccess={handleSuccess} />
  ) : (
    <SignUp onSwitch={() => setMode("signin")} onSuccess={handleSuccess} />
  )
}

export default AuthPage