import { SiInstagram } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      data-ocid="footer.panel"
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #c9a227",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Main Footer Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#e8c84a",
                marginBottom: "0.5rem",
              }}
            >
              Sportscom XLRI Delhi
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.78rem",
                color: "#555",
                letterSpacing: "0.06em",
                lineHeight: 1.6,
              }}
            >
              Sports Committee, XLRI Delhi-NCR Campus
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                color: "#444",
                marginTop: "0.75rem",
                lineHeight: 1.5,
              }}
            >
              Fostering teamwork, competition, and athletic excellence.
            </div>
          </div>

          {/* Social Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#555",
                marginBottom: "0.25rem",
              }}
            >
              Follow Us
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://www.instagram.com/sportscomdelhi.xlri"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram.link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  border: "1px solid #2a2a1a",
                  color: "#666",
                  transition: "border-color 0.2s, color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#c9a227";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#e8c84a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#2a2a1a";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#666";
                }}
                aria-label="Instagram"
              >
                <SiInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.72rem",
              color: "#444",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            &copy; {year} Sportscom XLRI Delhi. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.68rem",
              color: "#333",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#555", textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#c9a227";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#555";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
