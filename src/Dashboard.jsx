import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Library from "./Library";
import Highlights from "./Highlights";
import Search from "./Search";
import BookDetails from "./BookDetails";
function Dashboard({ user, onLogout }) {
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
    path="*"
    element={<Navigate to="/for-you" replace />}
  />
</Routes>
 
            </div>
        </div>
    );
}

export default Dashboard;
