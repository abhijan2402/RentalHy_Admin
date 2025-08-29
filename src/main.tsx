import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "./components/CustomToastContainer/CustomToastContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Provider store={store}>
          <AppWrapper>
            <CustomToastContainer />
            <App />
          </AppWrapper>
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
