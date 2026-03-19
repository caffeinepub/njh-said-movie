import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, Film, Search, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header
      data-ocid="header.panel"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "oklch(0.12 0.015 252 / 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.26 0.03 252 / 0.4)",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="header.link"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.82 0.14 210), oklch(0.65 0.22 300))",
            }}
          >
            <Film className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold hidden sm:block">
            <span className="gradient-brand">Njh-said</span>
            <span className="text-foreground ml-1">movie</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          <Link
            to="/"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            data-ocid="nav.link"
          >
            Films
          </Link>
          <a
            href="#new-releases"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            data-ocid="nav.link"
          >
            Nouveautés
          </a>
          <button
            type="button"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            data-ocid="nav.link"
          >
            Ma Liste
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          {searchOpen ? (
            <Input
              data-ocid="header.search_input"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setSearchOpen(false)}
              placeholder="Rechercher un film..."
              className="w-48 md:w-64 h-9 text-sm bg-white/5 border-white/20 placeholder:text-muted-foreground focus:border-white/40"
            />
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              data-ocid="header.button"
            >
              <Search className="w-4 h-4" />
            </Button>
          )}
        </form>

        {/* User area */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hidden sm:flex"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1.5 cursor-pointer group hidden sm:flex">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.57 0.19 260), oklch(0.52 0.22 290))",
              }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <Button
            type="button"
            size="sm"
            className="h-8 px-3 text-xs font-semibold text-white gradient-cta border-0 hover:opacity-90"
            data-ocid="header.primary_button"
            onClick={() => navigate({ to: "/" })}
          >
            Get Premium
          </Button>
        </div>
      </div>
    </header>
  );
}
