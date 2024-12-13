import { Link, useLocation } from "react-router-dom";
import { Car, Plus, Home } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">
                Vehicle Manager
              </span>
            </div>
            <div className="flex items-center space-x-4">
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
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
