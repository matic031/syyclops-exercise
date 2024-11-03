import { useState, useEffect } from "react";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { fetchUsers } from "./services/userService";

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarUsers, setSidebarUsers] = useState([]);

  const handleUserSelect = (user) => setActiveUser(user);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const refreshSidebar = async () => {
    const users = await fetchUsers();
    setSidebarUsers(users);
  };

  useEffect(() => {
    refreshSidebar();
  }, []);

  const updateUserList = (updatedUser) => {
    setActiveUser(updatedUser);
    refreshSidebar();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="flex flex-1 overflow-hidden pt-16">
        <div className="md:block hidden max-h-full">
          <Sidebar
            onUserSelect={handleUserSelect}
            closeSidebar={toggleSidebar}
            isFullScreen={false}
            users={sidebarUsers}
          />
        </div>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-10 md:hidden">
            <Sidebar
              onUserSelect={handleUserSelect}
              closeSidebar={toggleSidebar}
              isFullScreen={true}
              users={sidebarUsers}
            />
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <MainContent
            user={activeUser}
            toggleSidebar={toggleSidebar}
            onSave={updateUserList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
