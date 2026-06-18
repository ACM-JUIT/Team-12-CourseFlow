export default function Stepper({ currentStep }) {
  const steps = ["Category", "Topic", "Options"];

  return (
    <div className="stepper-container">
      <div className="progress-line"></div>

      <div
        className="progress-active"
        style={{
          width:
            currentStep === 1
              ? "0%"
              : currentStep === 2
              ? "50%"
              : "100%",
        }}
      ></div>

      {steps.map((step, index) => (
        <div className="step-item" key={index}>
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