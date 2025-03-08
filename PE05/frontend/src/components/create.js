import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
 });
 const navigate = useNavigate();
 const backendUrl = "http://localhost:5050";
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
  e.preventDefault();

  // When a post request is sent to the create url, we'll add a new recipe to the database.
  const newRecipe = { ...form };

  await fetch(`${backendUrl}/record`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  })
  .catch(error => {
    window.alert(error);
    return;
  });

  setForm({ title: "", ingredients: "", instructions: "", servings: "" });
  navigate("/home");
}

 
return (
  <div>
    <h3>Create New Recipe</h3>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <input
          type="text"
          className="form-control"
          id="ingredients"
          value={form.ingredients}
          onChange={(e) => updateForm({ ingredients: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="instructions">Instructions</label>
        <input
          type="text"
          className="form-control"
          id="instructions"
          value={form.instructions}
          onChange={(e) => updateForm({ instructions: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="servings">Servings</label>
        <input
          type="number"
          className="form-control"
          id="servings"
          value={form.servings}
          onChange={(e) => updateForm({ servings: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Create recipe"
          className="btn btn-primary"
        />
      </div>
    </form>
  </div>
);

}