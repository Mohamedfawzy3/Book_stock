import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddBooks() {
  const Navigate = useNavigate();
  let changePath = () => {
    Navigate("/admin");
  };

  const [books, setbooks] = useState({
    title: "Chemical Engineering Vocabulary: Bilingual",
    professor: " Maximilian Lackner",
    code: "21q98",
    cover_image:
      "https://bookboon.com/thumbnail/380/73daa634-324a-43cf-8f43-a2d900ca8d67/e1844707-cd3b-4aa6-aa43-a56a00a58a79/chemical-engineering-vocabulary.jpg",
  });
  let handleSubmit = (e) => {
    const { name, value } = e.target;
    setbooks((old) => ({
      ...old,
      [name]: value,
    }));
  };

  let addProduct = (e) => {
    e.preventDefault();
    axios
      .post("https://subjects-proj-data.onrender.com/books", books)
      .then((res) => {
        console.log(res.data);
        setbooks(res.data);
      })
      .catch((err) => console.log(err));
    Navigate("/admin");
  };

  return (
    <Container>
      <div className="form_add-content">
        <form action="" onSubmit={addProduct}>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Title"
              value={books.title}
              name="name"
              onChange={handleSubmit}
            />
            <label for="floatingInput">Book Title</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Price"
              value={books.professor}
              name="price"
              onChange={handleSubmit}
            />
            <label for="floatingInput">Product Professor</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Quantity"
              value={books.code}
              name="quantity"
              onChange={handleSubmit}
            />
            <label for="floatingInput">Product Code</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Image"
              value={books.cover_image}
              name="imgUrl"
              onChange={handleSubmit}
            />
            <label for="floatingInput">Book Image</label>
          </div>
          <button className="btn btn-dark">submit</button>
        </form>
        <button onClick={changePath} className="btn bg-warning back_form">
          Back Home
        </button>
      </div>
    </Container>
  );
}

export default AddBooks;
