import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { books } from "./books";

function Search({
  savedBooks,
  toggleSavedBook,
}) {
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [apiBooks, setApiBooks] = useState([]);

  useEffect(() => {
  Promise.all([
    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    ).then((response) => response.json()),

    fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    ).then((response) => response.json()),
  ])
    .then(([recommended, suggested]) => {
      setApiBooks([...recommended, ...suggested]);
    })
    .catch((error) => {
      console.error("Error fetching search books:", error);
    });
}, []);

 useEffect(() => {
  const urlQuery = searchParams.get("q") || "";
  setQuery(urlQuery);
}, [searchParams]);

  const filteredBooks = apiBooks.filter((book) =>
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
        ))}
      </div>
    </main>
  );
}

export default Search;