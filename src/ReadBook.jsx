import { Link, useParams } from "react-router-dom";
import { books } from "./books";

function ReadBook() {
  const { id } = useParams();

  const book = books.find(
    (book) => book.id === Number(id)
  );

  if (book.isPremium && !isPremiumUser) {
  return (
    <main className="dashboard__main">
      <h1>Premium required</h1>
      <p>Upgrade to Premium to read this summary.</p>

      <Link to="/premium" className="premium__button">
        Upgrade to Premium
      </Link>
    </main>
  );
}

  if (!book) {
    return (
      <main className="dashboard__main">
        <h1>Book not found</h1>
        <Link to="/for-you">Back to For You</Link>
      </main>
    );
  }

  return (
    <main className="reader">
      <div className="reader__topbar">
        <Link
          to={`/book/${book.id}`}
          className="reader__back"
        >
          ← Back
        </Link>

        <div>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      </div>

      <article className="reader__content">
        <h1>{book.title}</h1>

        <p className="reader__author">
          By {book.author}
        </p>

        <h2>Overview</h2>

        <p>
          {book.description}
        </p>

        <h2>Key ideas</h2>

        <p>
          This summary focuses on the central lessons,
          concepts, and practical takeaways from {book.title}.
          The goal is to help you understand the main ideas
          quickly while still giving you enough context to
          apply them in everyday life.
        </p>

        <h2>Why it matters</h2>

        <p>
          The ideas in this book are useful because they give
          readers a practical framework for thinking about
          {` ${book.category.toLowerCase()}`} and personal growth.
          Small changes in thinking and behavior can compound
          over time into meaningful results.
        </p>

        <h2>Final takeaway</h2>

        <p>
          The most important lesson is to focus on consistent,
          intentional improvement instead of expecting instant
          transformation. Progress becomes easier when good
          decisions are repeated over time.
        </p>
      </article>
    </main>
  );
}

export default ReadBook;