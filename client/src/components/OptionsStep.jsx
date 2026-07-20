export default function OptionsStep({
  formData,
  setFormData,
}) {
  return (
    <div className="optionGrid">

      <select
        value={formData.difficulty}
        onChange={(e) =>
          setFormData({ ...formData, difficulty: e.target.value })
        }
      >
        <option value="" disabled hidden>Difficulty</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <select
        value={formData.duration}
        onChange={(e) =>
          setFormData({ ...formData, duration: e.target.value })
        }
      >
        <option value="" disabled hidden>Duration</option>
        <option value="1 Month">1 Month</option>
        <option value="2 Months">2 Months</option>
      </select>

      <select
        value={formData.video}
        onChange={(e) =>
          setFormData({ ...formData, video: e.target.value })
        }
      >
        <option value="" disabled hidden>Add Video</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

    </div>
  );
}