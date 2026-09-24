import { books } from "./books";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";



function DashboardHome({
  user,
  savedBooks,
  toggleSavedBook,
}) {
  const recommendedRef = useRef(null);
const suggestedRef = useRef(null);

const [recommendedBooks, setRecommendedBooks] = useState([]);
const [suggestedBooks, setSuggestedBooks] = useState([]);

useEffect(() => {
  fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
  )
    .then((response) => response.json())
    .then((data) => {
      setRecommendedBooks(data);
    });

  fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
  )
    .then((response) => response.json())
    .then((data) => {
      setSuggestedBooks(data);
    });
}, []);

function scrollCarousel(ref, direction) {
  if (!ref.current) return;

  ref.current.scrollBy({
    left: direction === "right" ? 420 : -420,
    behavior: "smooth",
  });
}

  function isSaved(book) {
    return savedBooks.some(
      (savedBook) => savedBook.id === book.id
    );
  }

  function renderBook(book) {
  return (
    <div className="book__card" key={book.id}>
      <Link
        to={`/book/${book.id}`}
        className="book__link"
      >
        <img
          src={book.imageLink || book.image}
          alt={book.title}
          className="book__image"
        />
<h3>{book.title}</h3>
<p>{book.author}</p>
<span>{book.category}</span>

{book.isPremium && (
  <div className="book__premium-badge">
    Premium
  </div>
)}
      </Link>

      <button
        className="book__save"
        onClick={() => toggleSavedBook(book)}
      >
        {isSaved(book)
          ? "Remove from Library"
          : "Save to Library"}
      </button>
    </div>
  );
}
  return (
    <main className="dashboard__main">
      <h1>For You</h1>

      <p className="dashboard__welcome">
        {user?.isAnonymous
          ? "Welcome, Guest"
          : `Welcome, ${user?.email}`}
      </p>

      <section className="dashboard__section">
  <div className="carousel__header">
    <h2>Recommended for you</h2>

    <div className="carousel__buttons">
      <button
        type="button"
        onClick={() =>
          scrollCarousel(recommendedRef, "left")
        }
      >
        ←
      </button>

      <button
        type="button"
        onClick={() =>
          scrollCarousel(recommendedRef, "right")
        }
      >
        →
      </button>
    </div>
  </div>

  <div
    className="book__carousel"
    ref={recommendedRef}
  >
    {recommendedBooks.map(renderBook)}
  </div>
</section>
      <section className="dashboard__section">
  <div className="carousel__header">
    <h2>Suggested books</h2>

    <div className="carousel__buttons">
      <button
        type="button"
        onClick={() =>
          scrollCarousel(suggestedRef, "left")
        }
      >
        ←
      </button>

      <button
        type="button"
        onClick={() =>
          scrollCarousel(suggestedRef, "right")
        }
      >
        →
      </button>
    </div>
  </div>

  <div
    className="book__carousel"
    ref={suggestedRef}
  >
  {suggestedBooks.map(renderBook)}
  </div>
</section>
    </main>
  );
}

export default DashboardHome;