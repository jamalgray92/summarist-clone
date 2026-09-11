import { books } from "./books";
import { Link } from "react-router-dom";

function DashboardHome({
  user,
  savedBooks,
  toggleSavedBook,
}) {
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
        <h2>Recommended for you</h2>

        <div className="book__grid">
          {books.slice(0, 3).map(renderBook)}
        </div>
      </section>

      <section className="dashboard__section">
        <h2>Suggested books</h2>

        <div className="book__grid">
          {books.slice(3).map(renderBook)}
        </div>
      </section>
    </main>
  );
}

export default DashboardHome;