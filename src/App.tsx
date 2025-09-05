import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import User from "./pages/Users/User";
import Property from "./pages/Property/Property";
import Ads from "./pages/Ads/Ads";
import Tickets from "./pages/Tickets/Tickets";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import ProtectedRoute from "./context/ProtectedRoute";
import Convention from "./pages/Convention/Convention";
import Charges from "./pages/Chargers/Charges";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password" element={<ForgotPassword />} />

        {/* Protected routes nested inside AppLayout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route index path="/users" element={<User />} />
          <Route index path="/property" element={<Property />} />
          <Route index path="/convention" element={<Convention />} />
          <Route index path="/ads" element={<Ads />} />
          <Route index path="/tickets" element={<Tickets />} />
          <Route index path="/charges" element={<Charges />} />

          {/* Others Page */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
