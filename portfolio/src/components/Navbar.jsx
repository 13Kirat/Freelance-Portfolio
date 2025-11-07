import { ModeToggle } from "./mode-toggle";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

const Navbar = () => {
  return (
    <header className="shadow-sm sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Portfolio
        </Link>
        <nav className="hidden md:flex gap-6">
          <HashLink to="/#home" className="font-medium flex items-center text-sm transition-colors hover:underline">
            Home
          </HashLink>
          <HashLink to="/#about" className="font-medium flex items-center text-sm transition-colors hover:underline">
            About
          </HashLink>
          <HashLink to="/#skills" className="font-medium flex items-center text-sm transition-colors hover:underline">
            Skills
          </HashLink>
          <HashLink to="/#projects" className="font-medium flex items-center text-sm transition-colors hover:underline">
            Portfolio
          </HashLink>
          <HashLink to="/#timeline" className="font-medium flex items-center text-sm transition-colors hover:underline">
            Timeline
          </HashLink>
          <Link to="/tips" className="font-medium flex items-center text-sm transition-colors hover:underline">
            Tips
          </Link>
          <HashLink to="/#contact" className="font-medium flex items-center text-sm transition-colors hover:underline">
            Contact
          </HashLink>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          {/* <ModeToggle /> */}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <HashLink
                to="/#home"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Home
              </HashLink>
              <HashLink
                to="/#about"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                About
              </HashLink>
              <HashLink
                to="/#skills"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Skills
              </HashLink>
              <HashLink
                to="/#portfolio"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Portfolio
              </HashLink>
              <HashLink
                to="/#timeline"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Timeline
              </HashLink>
              <Link
                to="/tips"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Tips
              </Link>
              <HashLink
                to="/#contact"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Contact
              </HashLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
