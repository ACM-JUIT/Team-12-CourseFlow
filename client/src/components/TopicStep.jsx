export default function TopicStep({
  formData,
  setFormData,
}) {
  return (
    <div>

      <input
        type="text"
        placeholder="Topic"
        value={formData.topic}
        onChange={(e) =>
          setFormData({
            ...formData,
            topic: e.target.value,
          })
        }
      />

      <textarea
        rows="5"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

    </div>
  );
}