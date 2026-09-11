import { useState } from "react";
import { Link } from "react-router-dom";
import { books } from "./books";

function Search({
  savedBooks,
  toggleSavedBook,
}) {
  const [query, setQuery] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  function isSaved(book) {
    return savedBooks.some(
      (savedBook) => savedBook.id === book.id
    );
  }

  return (
    <main className="dashboard__main">
      <h1>Search</h1>

      <div className="search__wrapper">
        <input
          type="text"
          className="search__input"
          placeholder="Search for books..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="book__grid">
        {filteredBooks.map((book) => (
          <div className="book__card" key={book.id}>
            <Link
              to={`/book/${book.id}`}
              className="book__link"
            >
              <img
                src={book.image}
                alt={book.title}
                className="book__image"
              />

              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span>{book.category}</span>
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
        ))}
      </div>
    </main>
  );
}

export default Search;