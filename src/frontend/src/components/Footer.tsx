import { ArrowUp, Film, Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative mt-20 pt-16 pb-8 px-4 md:px-8"
      style={{
        borderTop: "1px solid oklch(0.26 0.03 252 / 0.5)",
        background: "oklch(0.11 0.013 252)",
      }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.14 210), oklch(0.65 0.22 300))",
                }}
              >
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-brand">Njh-said</span>
                <span className="text-foreground ml-1">movie</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Découvrez les meilleurs films du monde entier. Streaming illimité,
              recommandations personnalisées.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                "À propos",
                "Contact",
                "Mentions légales",
                "Confidentialité",
                "CGU",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Suivez-nous
            </h4>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                  style={{
                    background: "oklch(0.18 0.022 252)",
                    border: "1px solid oklch(0.26 0.03 252)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.22 0.02 252 / 0.5)" }}
        >
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              style={{ color: "oklch(0.82 0.14 210)" }}
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Données fournies par{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              style={{ color: "oklch(0.82 0.14 210)" }}
            >
              TMDB
            </a>
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.57 0.19 260), oklch(0.52 0.22 290))",
        }}
        aria-label="Retour en haut"
        data-ocid="footer.button"
      >
        <ArrowUp className="w-4 h-4 text-white" />
      </button>
    </footer>
  );
}
