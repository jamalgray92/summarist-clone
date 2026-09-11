import { useState } from "react";
import { books } from "./books";

function Highlights() {
  const [highlights, setHighlights] = useState(() => {
    const storedHighlights = localStorage.getItem("highlights");

    return storedHighlights
      ? JSON.parse(storedHighlights)
      : [];
  });

  function removeHighlight(id) {
    const updatedHighlights = highlights.filter(
      (highlight) => highlight.id !== id
    );

    setHighlights(updatedHighlights);

    localStorage.setItem(
      "highlights",
      JSON.stringify(updatedHighlights)
    );
  }

  return (
    <main className="dashboard__main">
      <h1>Highlights</h1>

      <section className="dashboard__section">
        <h2>Your highlights</h2>

        {highlights.length === 0 ? (
          <p>You haven't saved any highlights yet.</p>
        ) : (
          <div className="highlight__grid">
            {highlights.map((highlight) => {
              const book = books.find(
                (book) => book.id === highlight.bookId
              );

              return (
                <div
                  className="highlight__card"
                  key={highlight.id}
                >
                  {book?.image && (
                    <img
                      src={book.image}
                      alt={highlight.bookTitle}
                      className="highlight__image"
                    />
                  )}

                  <div className="highlight__content">
                    <h3>{highlight.bookTitle}</h3>

                    <p className="highlight__text">
                      “{highlight.text}”
                    </p>

                    {highlight.note && (
                      <p className="highlight__note">
                        <strong>Note:</strong>{" "}
                        {highlight.note}
                      </p>
                    )}

                    <button
                      className="book__save"
                      onClick={() =>
                        removeHighlight(highlight.id)
                      }
                    >
                      Remove Highlight
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Highlights;