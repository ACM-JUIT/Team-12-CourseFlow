import { useState } from "react";
import Stepper from "../components/Stepper";
import CategoryStep from "../components/CategoryStep";
import TopicStep from "../components/TopicStep";
import OptionsStep from "../components/OptionsStep";
import { createCourse, updateCourse, publishCourse } from "../api/courseApi";
import "./CreateCourse.css";

export default function CreateCourse({ setCurrentPage, setSelectedCourseId }) {
  const [step, setStep] = useState(1);
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    topic: "",
    description: "",
    difficulty: "",
    duration: "",
    chapters: "",
    video: "",
    modules: [],
    videos: [],
  });

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleNext = async () => {
    setError("");

    // Step 1 -> 2: category must be picked, creates the course in the DB
    if (step === 1) {
      if (!formData.category) {
        setError("Please select a category");
        return;
      }
      try {
        setLoading(true);
        const course = await createCourse(formData.category);
        setCourseId(course._id);
        setStep(2);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Step 2 -> 3: save topic/description/AI-generated content onto the existing course
    if (step === 2) {
      try {
        setLoading(true);
        await updateCourse(courseId, {
          topic: formData.topic,
          description: formData.description,
          modules: formData.modules,
          videos: formData.videos,
        });
        setStep(3);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  const handleGenerate = async () => {
    setError("");
    try {
      setLoading(true);
      await publishCourse(courseId, {
        difficulty: formData.difficulty,
        duration: formData.duration,
        chapters: formData.chapters,
        video: formData.video,
      });
      // Redirect straight to the newly created course
      setSelectedCourseId(courseId);
      setCurrentPage("course-page");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-page">
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="btns">

          {step > 1 && (
            <button onClick={handleBack} disabled={loading}>
              Back
            </button>
          )}

          {step < 3 ? (
            <button onClick={handleNext} disabled={loading}>
              {loading ? "Please wait..." : "Next"}
            </button>
          ) : (
            <button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate Course"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}