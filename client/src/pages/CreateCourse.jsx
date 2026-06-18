import { useState } from "react";
import Stepper from "../components/Stepper";
import CategoryStep from "../components/CategoryStep";
import TopicStep from "../components/TopicStep";
import OptionsStep from "../components/OptionsStep";
import "../App.css";

export default function CreateCourse() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    category: "",
    topic: "",
    description: "",
    difficulty: "",
    duration: "",
    chapters: "",
    video: "",
  });

  return (
    <div className="container">
      <div className="card">

        <h1>Create Course</h1>

        <Stepper currentStep={step} />

        {step === 1 && (
          <CategoryStep
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 2 && (
          <TopicStep
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {step === 3 && (
          <OptionsStep
            formData={formData}
            setFormData={setFormData}
          />
        )}

        <div className="btns">

          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          ) : (
            <button>
              Generate Course
            </button>
          )}

        </div>

      </div>
    </div>
  );
}