import { Link, useLocation } from "react-router-dom";
import { Car, Plus, Home, Menu } from "lucide-react";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <img src="/logo.png" className="w-32 h-32" alt="logo" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Desktop Links */}
              <div className="hidden sm:flex items-center space-x-4">
                <Link
                  to="/"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/add"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/add")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vehicle
                </Link>
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle Menu"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-start p-4 space-y-4">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium w-full ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/add"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium w-full ${
                  isActive("/add")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Bottom Navigation for Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around p-2">
          <Link
            to="/"
            className={`flex flex-col items-center px-3 py-2 ${
              isActive("/") ? "text-primary" : "text-foreground"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            to="/add"
            className={`flex flex-col items-center px-3 py-2 ${
              isActive("/add") ? "text-primary" : "text-foreground"
            }`}
          >
            <Plus className="h-6 w-6" />
            <span className="text-xs">Add Vehicle</span>
          </Link>
        </div>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
