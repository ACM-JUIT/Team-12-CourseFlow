import React from "react";
import "./PrivacyPolicy.css";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly when using CourseFlow, such as your name, email address, and account details. We may also collect usage data related to how you interact with the platform to improve our services.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to provide, maintain, and improve CourseFlow, personalize learning experiences, communicate important updates, and ensure platform security. We do not sell your personal data to third parties.",
  },
  {
    title: "Data Storage & Security",
    content:
      "We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. While we strive to use commercially acceptable security practices, no system can be completely secure.",
  },
  {
    title: "Cookies & Analytics",
    content:
      "CourseFlow may use cookies and similar technologies to enhance user experience, analyze platform usage, and improve performance. You can control cookie preferences through your browser settings.",
  },
  {
    title: "Third-Party Services",
    content:
      "We may use trusted third-party services for authentication, analytics, and infrastructure. These services have access only to the information necessary to perform their functions and are obligated to protect your data.",
  },
  {
    title: "Your Rights & Choices",
    content:
      "You have the right to access, update, or delete your personal information. If you have questions about your data or wish to exercise your rights, you may contact us through the platform.",
  },
];

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>

        <p className="last-updated">
          Last updated: 15/01/2026
        </p>

        <p className="intro">
          Your privacy matters to <strong>CourseFlow</strong>. This Privacy
          Policy explains how we collect, use, and protect your information
          when you use our platform.
        </p>

        {sections.map((section, index) => (
          <div key={index} className="policy-section">
            <div className="section-number">
              {index + 1}
            </div>

            <div className="section-content">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicy;