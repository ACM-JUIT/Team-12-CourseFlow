const categories = [
  "Coding",
  "Health",
  "Creative",
  "Business",
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
            key={cat}
            className={`box ${
              formData.category === cat
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setFormData({
                ...formData,
                category: cat,
              })
            }
          >
            {cat}
          </div>
        ))}

      </div>
    </>
  );
}