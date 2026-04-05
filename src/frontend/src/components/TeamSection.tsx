import { User } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TEAM_MEMBERS = [
  {
    name: "Abhishek Kumar",
    role: "Jt Secretary",
    linkedin: "https://www.linkedin.com/in/abhishek-kumar-875179197/",
    photo: "/assets/abhishek_kumar-019d5d70-fd23-77e0-ab7f-b20ba3ecb972.jpg",
  },
  {
    name: "Anamay Ghate",
    role: "Treasurer",
    linkedin: "https://www.linkedin.com/in/anamayghate/",
    photo: "/assets/anamay-019d5d70-fd36-7665-a806-6b15bcb2ba69.jpg",
  },
  {
    name: "Ishita Delish",
    role: "Senior Executive Member",
    linkedin: "https://www.linkedin.com/in/ishita-delish/",
    photo: "/assets/ishita-019d5d70-fd2c-727e-a49a-8516895e2163.jpg",
  },
  {
    name: "Yashas Tarakaram",
    role: "Senior Executive Member",
    linkedin: "https://www.linkedin.com/in/yashas-tarakaram-a6686121b/",
    photo: "/assets/yashas-019d5d70-fd6c-73e9-b3b8-f6602139e73c.jpg",
  },
  {
    name: "Pratyay Chaturvedi",
    role: "Senior Executive Member",
    linkedin: "https://www.linkedin.com/in/pratyay-chaturvedi-6944bb24b/",
    photo: "/assets/pratyay-019d5d70-fd57-71c8-84d1-33ff683cbcca.jpg",
  },
  {
    name: "Yash Kushwaha",
    role: "Senior Executive Member",
    linkedin: "https://www.linkedin.com/in/yash-kushwaha23/",
    photo:
      "/assets/sportscom_b25418_yashkushwaha-019d5d71-0559-757c-aed6-fd965304c842.jpg",
  },
  {
    name: "Joseph",
    role: "Senior Executive Member",
    linkedin: null,
    photo: "/assets/joseph-019d5f20-0b3b-7612-b34b-92db8f7bd1ae.jpeg",
  },
];

export function TeamSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section
      id="team"
      data-ocid="team.section"
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
          <h2 className="section-heading">Meet the Team</h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "1rem",
              letterSpacing: "0.08em",
            }}
          >
            Passionate student leaders driving Sportscom forward
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.75rem",
          }}
          data-ocid="team.list"
        >
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={member.name}
              className={`card-dark anim-fade-up stagger-${Math.min(i + 1, 7)} ${gridVisible ? "visible" : ""}`}
              style={{
                padding: "1.75rem 1.25rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              data-ocid={`team.item.${i + 1}`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 32px rgba(201,162,39,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.5)";
              }}
            >
              {/* Profile Photo or Placeholder */}
              {member.photo ? (
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #c9a227",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="profile-placeholder"
                  style={{ width: 90, height: 90 }}
                >
                  <User size={32} color="#3a3a3a" />
                </div>
              )}

              <div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "#f2f2f2",
                    letterSpacing: "0.04em",
                    marginBottom: "0.3rem",
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#c9a227",
                  }}
                >
                  {member.role}
                </div>
              </div>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`team.item.${i + 1}.link`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    border: "1px solid #c9a227",
                    color: "#c9a227",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#c9a227";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#0a0a0a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#c9a227";
                  }}
                  aria-label={`${member.name} LinkedIn`}
                >
                  <SiLinkedin size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
