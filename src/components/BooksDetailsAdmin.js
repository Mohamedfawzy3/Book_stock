import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "../App.css";
function BooksDetails() {
  const [book, setbook] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://subjects-proj-data.onrender.com/books/${id}`)
      .then((res) => setbook(res.data))
      .then ((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <Container>
      <div className="main_content">
        <div className="bg_img">
          <img src={book.cover_image} alt="img" />
        </div>
        <div className="bg_gradient"></div>
        <div className="card_details" key={book.id}>
          <Row className="d-flex justify-around">
            <Col sm={12} md={2}>
              <img
                src={book.cover_image}
                alt={book.title}
                className="img_details"
              />
            </Col>
            <Col sm={12} md={9}>
              <h2>{book.title}</h2>
              <h5>{book.subTitle}</h5>
              <h6>Professor : {book.professor}</h6>
              <h6>Code : {book.code}</h6>
              <p>{book.description}</p>
              <Link className="btn bg-warning" to={"/admin"}>
                Back Home
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default BooksDetails;
