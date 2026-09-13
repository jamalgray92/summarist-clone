import { Link, useParams } from "react-router-dom";
import { books } from "./books";

function ListenBook() {
  const { id } = useParams();

  const book = books.find(
    (book) => book.id === Number(id)
  );

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
          src={book.image}
          alt={book.title}
          className="listener__image"
        />

        <div className="listener__info">
          <span>{book.category}</span>

          <h1>{book.title}</h1>

          <h3>{book.author}</h3>

          <p>{book.description}</p>

          <audio
            className="listener__audio"
            controls
          >
            <source
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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