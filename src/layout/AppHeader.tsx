import { useEffect, useRef, useState } from "react";

import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { User2Icon, Warehouse } from "lucide-react";
import ChangePassword from "../components/UserProfile/ChangePassword";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const openPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };
  return (
    <>
      <header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
        <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6">
          {/* Left Section: Sidebar toggle + Logo */}
          <div className="flex items-center gap-2">
            <button
              className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg dark:border-gray-800 lg:h-11 lg:w-11 lg:border"
              onClick={handleToggle}
              aria-label="Toggle Sidebar"
            >
              {isMobileOpen ? (
                // Close icon
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.22 7.28C5.93 6.99 5.93 6.51 6.22 6.22C6.51 5.93 6.99 5.93 7.28 6.22L12 10.94L16.72 6.22C17.01 5.93 17.49 5.93 17.78 6.22C18.07 6.51 18.07 6.99 17.78 7.28L13.06 12L17.78 16.72C18.07 17.01 18.07 17.49 17.78 17.78C17.49 18.07 17.01 18.07 16.72 17.78L12 13.06L7.28 17.78C6.99 18.07 6.51 18.07 6.22 17.78C5.93 17.49 5.93 17.01 6.22 16.72L10.94 12L6.22 7.28Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.583 1C0.583 0.586 0.919 0.25 1.333 0.25H14.667C15.081 0.25 15.417 0.586 15.417 1C15.417 1.414 15.081 1.75 14.667 1.75L1.333 1.75C0.919 1.75 0.583 1.414 0.583 1ZM0.583 11C0.583 10.586 0.919 10.25 1.333 10.25L14.667 10.25C15.081 10.25 15.417 10.586 15.417 11C15.417 11.414 15.081 11.75 14.667 11.75L1.333 11.75C0.919 11.75 0.583 11.414 0.583 11ZM1.333 5.25C0.919 5.25 0.583 5.586 0.583 6C0.583 6.414 0.919 6.75 1.333 6.75L7.999 6.75C8.414 6.75 8.75 6.414 8.75 6C8.75 5.586 8.414 5.25 7.999 5.25L1.333 5.25Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex lg:hidden items-center gap-2 text-primary font-bold text-xl"
            >
              <Warehouse className="h-6 w-6 text-[#7C0902]" />
              <span className="tracking-wide text-[#7C0902]">
                To-Let India Admin
              </span>
            </Link>
          </div>

          {/* Right Section: User Icon (always visible) */}
          <div className="flex items-center gap-2">
            <div
              onClick={openPasswordModal}
              className="bg-red-900 hover:bg-red-800 text-white p-2 rounded-full cursor-pointer transition-all"
            >
              <User2Icon className="w-5 h-5" />
            </div>
          </div>
        </div>

        <ChangePassword
          isPasswordModalVisible={isPasswordModalVisible}
          setIsPasswordModalVisible={setIsPasswordModalVisible}
        />
      </header>
    </>
  );
};

export default AppHeader;
