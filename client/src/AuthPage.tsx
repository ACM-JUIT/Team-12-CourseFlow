import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignIn from "./signin"
import SignUp from "./signup"

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const navigate = useNavigate()

  const handleSuccess = (token: string) => {
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