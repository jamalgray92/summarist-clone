import { Link } from "react-router-dom";

function Library({
  savedBooks,
  toggleSavedBook,
}) {
  return (
    <main className="dashboard__main">
      <h1>My Library</h1>

      {savedBooks.length === 0 ? (
        <section className="dashboard__section">
          <h2>Your library is empty</h2>
          <p>Save a book from For You or Search.</p>
        </section>
      ) : (
        <div className="book__grid">
          {savedBooks.map((book) => (
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
                Remove from Library
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Library;