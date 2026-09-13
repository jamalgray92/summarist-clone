import {
  Link,
  useNavigate,
} from "react-router-dom";

function Premium() {
  const navigate = useNavigate();

  function activatePremium() {
    localStorage.setItem("premium", "true");
    navigate("/for-you");
  }

  return (
    <main className="premium-page">
      <div className="premium-page__content">
        <Link
          to="/for-you"
          className="premium-page__back"
        >
          ← Back
        </Link>

        <div className="premium-page__hero">
          <span className="premium-page__eyebrow">
            Summarist Premium
          </span>

          <h1>
            Get unlimited access to every summary
          </h1>

          <p>
            Read and listen to premium book summaries,
            unlock more content, and get the full
            Summarist experience.
          </p>
        </div>

        <div className="premium-page__plans">
          <div className="premium-plan premium-plan--featured">
            <div className="premium-plan__badge">
              Most Popular
            </div>

            <h2>Yearly</h2>

            <div className="premium-plan__price">
              $99.99
              <span>/year</span>
            </div>

            <p className="premium-plan__subtext">
              About $8.33 per month
            </p>

            <ul>
              <li>Unlimited reading</li>
              <li>Unlimited listening</li>
              <li>Access to premium books</li>
              <li>Save books to your library</li>
              <li>Save highlights and notes</li>
            </ul>

            <button
              type="button"
              className="premium-plan__button"
              onClick={activatePremium}
            >
              Start Premium
            </button>
          </div>

          <div className="premium-plan">
            <h2>Monthly</h2>

            <div className="premium-plan__price">
              $12.99
              <span>/month</span>
            </div>

            <p className="premium-plan__subtext">
              Cancel anytime
            </p>

            <ul>
              <li>Unlimited reading</li>
              <li>Unlimited listening</li>
              <li>Access to premium books</li>
              <li>Save books to your library</li>
              <li>Save highlights and notes</li>
            </ul>

            <button
              type="button"
              className="premium-plan__button"
              onClick={activatePremium}
            >
              Choose Monthly
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Premium;