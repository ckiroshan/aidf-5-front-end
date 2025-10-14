import { Button } from "@/components/ui/button";
import { Menu, Globe, X, ScreenShare, Home, Building, LogIn, UserPlus, UserRoundPlus, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="z-50 bg-primary backdrop-blur-md flex items-center justify-between px-4 sm:px-6 text-white py-2 rounded-full mx-4 my-3 relative">
      <div className="flex items-center">
        <div className="mr-8 rounded-lg py-1.5 px-2 bg-white text-primary">
          <Link to={`/`} className="text-xl">
            <div className="flex items-center tracking-wide">
              <ScreenShare className="mr-3" />
              <span className="font-extrabold">Hori</span>zone
            </div>
          </Link>
        </div>
        <div className="hidden md:flex p-2 hover:bg-blue-50 hover:text-black/70 rounded-lg mr-2">
          <Link to={`/`}>
            <span className="flex items-center">
              <Home className="mr-1" />
              Home
            </span>
          </Link>
        </div>
        <div className="hidden md:flex p-2 hover:bg-blue-50 hover:text-black/70 rounded-lg mr-4">
          <Link to={`/hotels`}>
            <span className="flex items-center ">
              <Building className="mr-1" />
              Hotels
            </span>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex p-2 rounded-lg mr-4">
          <span className="flex items-center ">
            <Globe className="h-4 w-4 mr-2" /> EN
          </span>
        </div>
        <SignedOut>
          <div className="hidden md:flex p-2 hover:bg-blue-50 hover:text-black/70 rounded-lg mr-4">
            <Link to="/sign-in">
              <span className="flex items-center ">
                <LogIn className="mr-1" />
                Log In
              </span>
            </Link>
          </div>
          <div className="hidden md:flex p-2 hover:bg-blue-50 hover:text-black/70 rounded-lg mr-4">
            <Link to="/sign-up">
              <span className="flex items-center ">
                <UserRoundPlus className="mr-1" />
                Sign Up
              </span>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
            <div className="hidden md:flex p-2 hover:bg-blue-50 hover:text-black/70 rounded-lg mr-2">
              <Link to="/my-account">
                <span className="flex items-center ">
                  My Account <SlidersHorizontal className="ml-2 h-5 w-5" />
                </span>
              </Link>
          </div>
        </SignedIn>

        {/* Mobile Menu Button */}
        <div className="relative lg:hidden">
          <Button variant="ghost" size="icon" className="relative z-20" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          </Button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-primary text-white shadow-lg py-3 px-2 z-50 border-blue-900 border-1">
              <div className="flex flex-col space-y-1">
                <Link to="/" className="flex items-center p-2 rounded-lg hover:bg-blue-50 hover:text-black/70" onClick={() => setIsMenuOpen(false)}>
                  <Home className="h-4 w-4 mr-2" /> Home
                </Link>

                <Link to="/hotels" className="flex items-center p-2 rounded-lg hover:bg-blue-50 hover:text-black/70" onClick={() => setIsMenuOpen(false)}>
                  <Building className="h-4 w-4 mr-2" /> Hotels
                </Link>

                {user?.publicMetadata?.role === "admin" && (
                  <Link to="/hotels/create" className="flex items-center p-2 rounded-lg hover:bg-blue-50 hover:text-black/70" onClick={() => setIsMenuOpen(false)}>
                    <Building className="h-4 w-4 mr-2" /> Create Hotel
                  </Link>
                )}

                <div className="h-px bg-white/20 my-2"></div>

                <SignedOut>
                  <Link to="/sign-in" className="flex items-center p-2 rounded-lg hover:bg-blue-50 hover:text-black/70" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="h-4 w-4 mr-2" /> Log In
                  </Link>

                  <Link to="/sign-up" className="flex items-center p-2 rounded-lg bg-white text-black hover:bg-gray-200 justify-center mt-2" onClick={() => setIsMenuOpen(false)}>
                    <UserRoundPlus className="h-4 w-4 mr-2" /> Sign Up
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link to="/my-account" className="flex items-center p-2 rounded-lg hover:bg-blue-50 hover:text-black/70" onClick={() => setIsMenuOpen(false)}>
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> My Account
                  </Link>
                </SignedIn>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
