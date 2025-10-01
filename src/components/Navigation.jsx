import { Button } from "@/components/ui/button";
import { Menu, Globe, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const count = useSelector((state) => state.counter);
  
  return (
    <nav className="z-50 bg-primary backdrop-blur-md flex items-center justify-between px-4 sm:px-6 text-white py-3 rounded-full mx-4 my-3 relative">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold">Horizone</Link>
        <div className="hidden md:flex space-x-6">
          <Link to={`/`} className="transition-colors text-sm">Home</Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-xs hidden md:flex">
          <Globe className="h-4 w-4 mr-2" /> EN
        </Button>
        <SignedOut>
          <Button variant="ghost" size="sm" asChild className="text-xs hidden md:flex">
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button size="sm" asChild className="bg-white text-black hover:bg-gray-200 text-xs hidden md:flex">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Button size="sm" asChild className="bg-white text-black hover:bg-gray-200 text-xs hidden md:flex">
            <Link to="/account">My Account</Link>
          </Button>
        </SignedIn>

        {/* Mobile Menu Button */}
        <div className="relative md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="relative z-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          </Button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-56 rounded-xl bg-black border border-gray-800 shadow-lg py-2 px-3 animate-in fade-in slide-in-from-top-5 duration-200 z-50" style={{ top: "calc(100% + 8px)" }}>
              <div className="flex flex-col space-y-3 py-2">
                <Link to="/" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                {user?.publicMetadata?.role === "admin" && (
                  <Link to="/hotels/create" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Create Hotel
                  </Link>
                )}
                <div className="h-px bg-white/20 my-1"></div>
                <Button variant="ghost" size="sm" className="justify-start h-8 px-2">
                  <Globe className="h-4 w-4 mr-2" />
                  EN
                </Button>
                <Link to="/sign-in" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
                <Button size="sm" className="bg-white text-black hover:bg-gray-200 w-full mt-2" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
