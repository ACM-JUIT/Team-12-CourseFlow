import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import AuthPage from './AuthPage'
import CoursePage from './components/CoursePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TermsAndConditions from './pages/TermsAndConditions'
import CourseContent from './pages/CourseContent'
import './index.css'

function TermsPage() {
  return (
    <>
      <Navbar />
      <TermsAndConditions />
      <Footer />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/course-content" element={<CourseContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)