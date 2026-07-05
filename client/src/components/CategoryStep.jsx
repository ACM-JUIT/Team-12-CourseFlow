const categories = [
  { name: "Coding", icon: "💻" },
  { name: "Health", icon: "🩺" },
  { name: "Creative", icon: "🎨" },
  { name: "Business", icon: "📊" },
];

export default function CategoryStep({
  formData,
  setFormData,
}) {
  return (
    <>
      <h2>Select Course Category</h2>

      <div className="grid">

        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`box ${
              formData.category === cat.name
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setFormData({
                ...formData,
                category: cat.name,
              })
            }
          >
            <div className="box-icon">{cat.icon}</div>
            <div className="box-label">{cat.name}</div>
          </div>
        ))}

      </div>
    </>
  );
}