import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Journal from "./components/Journal";
import FundingHistory from "./components/FundingHistory";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Research from "./components/Research";
import Consultancy from "./components/Consultancy";
import Mentorship from "./components/Mentorship";
import Publications from "./components/Publications";
import NewsAndEvents from "./components/NewsAndEvents";
import NewsAndEvent from "./components/NewsAndEvent";
import { checkAuth } from "./redux/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { fetchVisitors, addVisitor } from "./redux/admin/visitor-slice";

const App = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { count } = useSelector((state) => state.visitor);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(checkAuth(token));
    }

    const now = Date.now(); // current timestamp in milliseconds
    const lastVisited = localStorage.getItem("lastVisited");

    if (!lastVisited || now - parseInt(lastVisited) > 60 * 60 * 1000) {
      dispatch(addVisitor()).then(() => {
        localStorage.setItem("lastVisited", now.toString());
      });
    }

    dispatch(fetchVisitors());
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center h-full w-screen">
        <Triangle
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/working-paper" element={<Journal />} />
            <Route path="/policy" element={<Journal />} />
            <Route path="/fundinghistory" element={<FundingHistory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/news-events" element={<NewsAndEvents />} />
            <Route path="/news-events/:id" element={<NewsAndEvent />} />
            <Route path="/mentoring" element={<Mentorship />} />
            <Route path="/publications" element={<Publications />} />

            {/* Admin Login Route */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <footer className="text-center bg-indigo-950 text-white py-2 flex flex-col sm:flex-row justify-between lg:px-24 px-4">
          <span>
            © {new Date().getFullYear()} <Link to="/login">Mahbub Ul Alam</Link>
            . All rights reserved.
          </span>
          <span className="ml-2">This website has been visited {count} times</span>
        </footer>
      </Router>
    </div>
  );
};

export default App;
