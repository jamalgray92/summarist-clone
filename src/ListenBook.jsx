import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { books } from "./books";

function ListenBook() {
  const { id } = useParams();
  const [apiBook, setApiBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
  setApiBook(data);
  setLoading(false);
})
    .catch((error) => {
  console.error("Error fetching book:", error);
  setLoading(false);
});
      
}, [id]);

const localBook = books.find(
  (book) => String(book.id) === String(id)
);

const book = apiBook || localBook;`   `

if (loading) {
  return <div className="page-message">Loading book...</div>;
}

  if (!book) {
    return (
      <main className="dashboard__main">
        <h1>Book not found</h1>

        <Link to="/for-you">
          Back to For You
        </Link>
      </main>
    );
  }

  const isPremiumUser =
    localStorage.getItem("premium") === "true";

  if (book.isPremium && !isPremiumUser) {
    return (
      <main className="dashboard__main">
        <h1>Premium required</h1>

        <p>
          Upgrade to Premium to listen to this summary.
        </p>

        <Link
          to="/premium"
          className="premium__button"
        >
          Upgrade to Premium
        </Link>
      </main>
    );
  }

  return (
    <main className="listener">
      <div className="listener__topbar">
        <Link
          to={`/book/${book.id}`}
          className="listener__back"
        >
          ← Back
        </Link>

        <div>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      </div>

      <div className="listener__card">
        <img
          src={book.imageLink || book.image}
          alt={book.title}
          className="listener__image"
        />

        <div className="listener__info">
          <span>{book.category}</span>

          <h1>{book.title}</h1>

          <h3>{book.author}</h3>

          <p>{book.description}</p>

          <audio
           key={apiBook?.audioLink}
           className="listener__audio"
           controls
          >
            <source
              src={apiBook?.audioLink}
              type="audio/mpeg"
          />
            Your browser does not support audio playback.
          </audio>
        </div>
      </div>
    </main>
  );
}

export default ListenBook;