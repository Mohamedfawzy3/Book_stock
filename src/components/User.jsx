import axios from "axios";
import { useEffect,  useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../App.css";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from 'react-icons/io5';

function Books() {
  const [books, setbooks] = useState([]);
  let Data = () => {axios.get("https://subjects-proj-data.onrender.com/books").then((res) => setbooks(res.data))};
  useEffect(() => {
    if (books.length === 0) {
      Data();
    }
  }, [books]);

  let handleEvent = () => {
    books.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
    });
    setbooks([...books]);
  }
  return (
    <section className="get_books">
      <Container>
        <div className="d-flex justify-content-end ">
          <button className="btn sort-btn" onClick={handleEvent}>Sort by Title</button>
          <Link className="setting" to='/setting'><IoSettingsOutline/></Link>
        </div>
        <div className="boxes">
          {books.map((book) => (
            <Card key={book.id} className="card">
              <Card.Img variant="top" src={book.cover_image} className="img" />
              <Card.Body className="card-body">
                <Card.Title className="header">{book.title}</Card.Title>
              </Card.Body>
              <Card.Body className="card-body">
                <Link  className="btn bg-warning"  to={`./book/${book.id}`}>Details</Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Books;
