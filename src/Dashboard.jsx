import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Library from "./Library";
import Highlights from "./Highlights";
import Search from "./Search";
import BookDetails from "./BookDetails";
import ReadBook from "./ReadBook";
import ListenBook from "./ListenBook";
import Premium from "./Premium";
import Settings from "./Settings";
import PaymentSuccess from "./PaymentSuccess";
function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
const [topSearch, setTopSearch] = useState("");

function handleTopSearch(event) {
  event.preventDefault();

  if (!topSearch.trim()) return;

  navigate(`/search?q=${encodeURIComponent(topSearch.trim())}`);
}
    const [savedBooks, setSavedBooks] = useState(() => {
        const storedBooks = localStorage.getItem("savedBooks");

        return storedBooks ? JSON.parse(storedBooks) : [];
    });

    useEffect(() => {
        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    }, [savedBooks]);

    function toggleSavedBook(book) {
        const alreadySaved = savedBooks.some(
            (savedBook) => savedBook.id === book.id
        );

        if (alreadySaved) {
            setSavedBooks(
                savedBooks.filter((savedBook) => savedBook.id !== book.id)
            );
        } else {
            setSavedBooks([...savedBooks, book]);
        }
    }

    return (
        <div className="dashboard">
            <Sidebar onLogout={onLogout} />

            <div className="dashboard__content">
              <form
  className="dashboard-search"
  onSubmit={handleTopSearch}
>
  <input
    type="text"
    placeholder="Search for books"
    value={topSearch}
    onChange={(event) => setTopSearch(event.target.value)}
  />

  <button type="submit">
    Search
  </button>
</form>

<Routes>
  <Route
    path="/for-you"
    element={
      <DashboardHome
        user={user}
        savedBooks={savedBooks}
        toggleSavedBook={toggleSavedBook}
      />
    }
  />

  <Route
    path="/library"
    element={
      <Library
        savedBooks={savedBooks}
        toggleSavedBook={toggleSavedBook}
      />
    }
  />

  <Route
    path="/highlights"
    element={<Highlights />}
  />

  <Route
    path="/search"
    element={
      <Search
        savedBooks={savedBooks}
        toggleSavedBook={toggleSavedBook}
      />
    }
  />

<Route
  path="/book/:id"
  element={
    <BookDetails
      savedBooks={savedBooks}
      toggleSavedBook={toggleSavedBook}
    />
  }
/>

<Route
  path="/book/:id/read"
  element={<ReadBook />}
/>

<Route
  path="/book/:id/listen"
  element={<ListenBook />}
/>
<Route
  path="/premium"
  element={<Premium />}
/>
<Route
  path="/settings"
  element={<Settings user={user} />}
/>
<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

  <Route
    path="*"
    element={<Navigate to="/for-you" replace />}
  />
                </Routes>
 
            </div>
        </div>
    );
}

export default Dashboard;
