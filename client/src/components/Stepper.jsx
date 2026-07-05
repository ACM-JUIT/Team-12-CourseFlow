import { Shapes, Lightbulb, SlidersHorizontal } from "lucide-react";

const steps = [
  { label: "Category", Icon: Shapes },
  { label: "Topic", Icon: Lightbulb },
  { label: "Options", Icon: SlidersHorizontal },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="stepper-container">
      {steps.map(({ label, Icon }, index) => (
        <div
          className={`step-item ${
            currentStep > index + 1 ? "line-active" : ""
          }`}
          key={index}
        >
          <div
            className={`step-circle ${
              currentStep >= index + 1 ? "active" : ""
            }`}
          >
            <Icon size={24} strokeWidth={2} />
          </div>
          <span className="step-label">{label}</span>
          <span className="step-substep">Step {index + 1}</span>
        </div>
      ))}
    </div>
  );
}