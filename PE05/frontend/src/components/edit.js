import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
  title: "",
  ingredients: "",
  instructions: "",
  servings: "",
 });

 const params = useParams();
 const navigate = useNavigate();
 const backendUrl = "http://localhost:5050"
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${backendUrl}/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
  console.log(value)
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     title: form.title,
     ingredients: form.ingredients,
     instructions: form.instructions,
     servings: form.servings,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`${backendUrl}/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="title">Title: </label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="ingredients">Ingredients: </label>
         <input
           type="text"
           className="form-control"
           id="ingredients"
           value={form.ingredients}
           onChange={(e) => updateForm({ ingredients: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="instructions">Instructions: </label>
         <input
           type="text"
           className="form-control"
           id="instructions"
           value={form.instructions}
           onChange={(e) => updateForm({ instructions: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="servings">servings: </label>
         <input
           type="text"
           className="form-control"
           id="servings"
           value={form.servings}
           onChange={(e) => updateForm({ servings: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}