import React, { useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState(["Tech", "Lifestyle", "News"]);
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New category"
          className="border rounded p-2 w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>{cat}</span>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
