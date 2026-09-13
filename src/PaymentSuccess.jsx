import { useEffect } from "react";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  useEffect(() => {
    localStorage.setItem("premium", "true");
  }, []);

  return (
    <main className="payment-success">
      <div className="payment-success__card">
        <div className="payment-success__check">✓</div>

        <h1>Welcome to Summarist Premium!</h1>

        <p>
          Your payment was successful. You now have access
          to all Premium books.
        </p>

        <Link
          to="/for-you"
          className="premium-plan__button"
        >
          Start Reading
        </Link>
      </div>
    </main>
  );
}

export default PaymentSuccess;