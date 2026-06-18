export default function OptionsStep({
  formData,
  setFormData,
}) {
  return (
    <div className="optionGrid">

      <select>
        <option>Difficulty</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <select>
        <option>Duration</option>
        <option>1 Month</option>
        <option>2 Months</option>
      </select>

      <select>
        <option>Add Video</option>
        <option>Yes</option>
        <option>No</option>
      </select>

      <input
        type="number"
        placeholder="Chapters"
      />

    </div>
  );
}