import { useState } from "react";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserSelect = (user) => setActiveUser(user);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      <div className="flex flex-1 pt-36">
        <div className="md:block hidden">
          <Sidebar onUserSelect={handleUserSelect} closeSidebar={toggleSidebar} isFullScreen={false} />
        </div>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-10 md:hidden">
            <Sidebar onUserSelect={handleUserSelect} closeSidebar={toggleSidebar} isFullScreen={true} />
          </div>
        )}
        <MainContent user={activeUser} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}

export default App;
