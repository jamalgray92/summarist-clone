import { useState } from "react";
import { Link } from "react-router-dom";

function Settings({ user }) {
  const [isPremium, setIsPremium] = useState(
    localStorage.getItem("premium") === "true"
  );

  function removePremium() {
    localStorage.removeItem("premium");
    setIsPremium(false);
  }

  return (
    <main className="settings-page">
      <div className="settings-page__content">
        <h1>Settings</h1>

        <section className="settings-card">
          <h2>Account</h2>

          <div className="settings-row">
            <span>Email</span>
            <strong>
              {user?.isAnonymous
                ? "Guest account"
                : user?.email || "No email available"}
            </strong>
          </div>
        </section>

        <section className="settings-card">
          <h2>Subscription</h2>

          <div className="settings-row">
            <span>Status</span>

            <strong>
              {isPremium ? "Premium" : "Basic"}
            </strong>
          </div>

          {isPremium ? (
            <button
              type="button"
              className="settings-button settings-button--danger"
              onClick={removePremium}
            >
              Cancel Premium
            </button>
          ) : (
            <Link
  to="/premium"
  className="settings-button"
>
  Upgrade to Premium
</Link>
          )}
        </section>
      </div>
    </main>
  );
}

export default Settings;