export default function Stepper({ currentStep }) {
  const steps = ["Category", "Topic", "Options"];

  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
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
            {index + 1}
          </div>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}