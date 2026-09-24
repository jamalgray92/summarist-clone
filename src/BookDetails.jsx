import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { books } from "./books";

function BookDetails({
  savedBooks,
  toggleSavedBook,
}) {
  const { id } = useParams();

 const [apiBook, setApiBook] = useState(null);

const localBook = books.find(
  (book) => String(book.id) === String(id)
);

const book = apiBook || localBook;

useEffect(() => {
  fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      setApiBook(data);
    })
    .catch((error) => {
      console.error("Error fetching book:", error);
    });
}, [id]);


  const [highlightText, setHighlightText] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

 if (!book && !apiBook) {
    return (
      <main className="dashboard__main">
        <h1>Book not found</h1>

        <Link to="/for-you">
          Back to For You
        </Link>
      </main>
    );
  }

  const isSaved = savedBooks.some(
    (savedBook) => savedBook.id === book.id
  );

  const isPremiumUser =
    localStorage.getItem("premium") === "true";

  function saveHighlight() {
    if (!highlightText.trim()) {
      setMessage("Enter a highlight first.");
      return;
    }

    const storedHighlights =
      localStorage.getItem("highlights");

    const highlights = storedHighlights
      ? JSON.parse(storedHighlights)
      : [];

    const newHighlight = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      text: highlightText.trim(),
      note: note.trim(),
    };

    const updatedHighlights = [
      ...highlights,
      newHighlight,
    ];

    localStorage.setItem(
      "highlights",
      JSON.stringify(updatedHighlights)
    );

    setHighlightText("");
    setNote("");
    setMessage("Highlight saved!");
  }

  return (
    <main className="dashboard__main">
      <Link
        to="/for-you"
        className="book__back"
      >
        ← Back
      </Link>

      <div className="book-details">
        <div className="book-details__image-wrapper">
          <img
           src={book.imageLink || book.image}
            alt={book.title}
            className="book-details__image"
          />
        </div>

        <div className="book-details__info">
          <span className="book-details__category">
            {book.category}
          </span>

          {book.isPremium && (
            <div className="premium__badge">
              Premium
            </div>
          )}

          <h1>{book.title}</h1>

          <h3>{book.author}</h3>

          <p className="book-details__description">
            {book.bookDescription || book.description}
          </p>

          <button
            className="book__save"
            onClick={() => toggleSavedBook(book)}
          >
            {isSaved
              ? "Remove from Library"
              : "Save to Library"}
          </button>

          {book.isPremium && !isPremiumUser ? (
            <div className="premium__locked">
              <div className="premium__badge">
                Premium
              </div>

              <p className="premium__message">
                Unlock this summary with Summarist Premium.
              </p>

              <Link
                to="/premium"
                className="premium__button"
              >
                Upgrade to Premium
              </Link>
            </div>
          ) : (
            <div className="book__actions">
              <Link
                to={`/book/${book.id}/read`}
                className="book__read"
              >
                Read
              </Link>

              <Link
                to={`/book/${book.id}/listen`}
                className="book__listen"
              >
                Listen
              </Link>
            </div>
          )}

          
        </div>
      </div>
    </main>
  );
}

export default BookDetails;