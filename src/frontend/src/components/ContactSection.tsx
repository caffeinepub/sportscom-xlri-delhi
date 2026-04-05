import { Mail, MapPin } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const CONTACTS = [
  {
    icon: <MapPin size={28} color="#c9a227" />,
    label: "Address",
    content:
      "Delhi-NCR Campus, Aurangpur Village, Dadri Toye, Untloda, Haryana 124103",
    href: null,
    id: "address",
  },
  {
    icon: <Mail size={28} color="#c9a227" />,
    label: "Email",
    content: "sportscom.delhi@xlri.ac.in",
    href: "mailto:sportscom.delhi@xlri.ac.in",
    id: "email",
  },
  {
    icon: <SiInstagram size={26} color="#c9a227" />,
    label: "Instagram",
    content: "@sportscomdelhi.xlri",
    href: "https://www.instagram.com/sportscomdelhi.xlri",
    id: "instagram",
  },
];

export function ContactSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      style={{
        padding: "7rem 1.5rem",
        background: "#0a0a0a",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`anim-fade-up ${headVisible ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div
            style={{
              width: 48,
              height: 3,
              background: "#c9a227",
              margin: "0 auto 1.25rem",
            }}
          />
          <h2 className="section-heading">Contact Us</h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "1rem",
              letterSpacing: "0.06em",
            }}
          >
            Reach out to us for queries, collaborations, or to join Sportscom
          </p>
        </div>

        {/* Contact Cards */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {CONTACTS.map((c, i) => (
            <div
              key={c.id}
              className={`card-dark anim-fade-up stagger-${i + 1} ${cardsVisible ? "visible" : ""}`}
              style={{
                padding: "2.5rem 2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                border: "1px solid #2a2a1a",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              data-ocid={`contact.${c.id}.card`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#c9a227";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 24px rgba(201,162,39,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#2a2a1a";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.5)";
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  border: "1px solid #2a2a1a",
                  background: "#0f0f0f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c9a227",
                }}
              >
                {c.label}
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  data-ocid={`contact.${c.id}.link`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.85rem",
                    color: "#9c9c9c",
                    textDecoration: "none",
                    lineHeight: 1.6,
                    textAlign: "center",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = "#e8c84a";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = "#9c9c9c";
                  }}
                >
                  {c.content}
                </a>
              ) : (
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.85rem",
                    color: "#9c9c9c",
                    lineHeight: 1.6,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {c.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
