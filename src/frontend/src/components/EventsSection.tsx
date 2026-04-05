import { useScrollAnimation } from "../hooks/useScrollAnimation";

const EVENTS = [
  {
    name: "Ratanjee 2026",
    description:
      "Ratanjee 2026 will continue to build on its legacy as the premier intra-college sporting showdown between senior and junior batches. With participation across multiple sports, the event will focus on deeper engagement, stronger competition, and enhanced talent scouting to prepare teams for upcoming inter-college tournaments.",
    label: "Ratanjee",
    tag: "Intra-College Showdown",
    image:
      "/assets/ratanjee_placeholder-019d5f39-e845-7692-9534-829ca754aecc.jpg",
  },
  {
    name: "Northern Brawl 2026",
    description:
      "Northern Brawl 2026 will return bigger and more competitive, bringing together top business schools from across the country. With an expanded scale, improved formats, and higher participation, the event aims to further establish itself as one of the most anticipated inter-collegiate sports tournaments in the circuit.",
    label: "Northern Brawl",
    tag: "Flagship Inter-College Tournament",
    image:
      "/assets/northern_brawl_placeholder-019d5f39-dac3-71dc-bbf5-e9a1721ffd29.jpg",
  },
  {
    name: "XPL 2027",
    description:
      "XPL 2027 will continue to serve as the grand conclusion to the sporting calendar, combining competition with celebration. With its unique auction-based format and emphasis on inclusivity, the event will aim to deliver an even more engaging and high-energy experience for participants and spectators alike.",
    label: "XPL",
    tag: "Grand Sporting Finale",
    image:
      "/assets/xpl_2027_place_holder-019d5f04-b027-714e-af13-f3af6b402210.jpeg",
  },
];

export function EventsSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section
      id="events"
      data-ocid="events.section"
      style={{
        padding: "7rem 1.5rem",
        background: "#080808",
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
          <h2 className="section-heading">Upcoming Events</h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "2rem",
          }}
          data-ocid="events.list"
        >
          {EVENTS.map((event, i) => (
            <div
              key={event.name}
              className={`card-dark anim-fade-up stagger-${i + 1} ${gridVisible ? "visible" : ""}`}
              style={{ overflow: "hidden" }}
              data-ocid={`events.item.${i + 1}`}
            >
              {/* Event Image or Placeholder */}
              {event.image ? (
                <div
                  style={{
                    height: 200,
                    borderBottom: "1px solid #2a2a1a",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.transform =
                        "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.transform =
                        "scale(1)";
                    }}
                  />
                </div>
              ) : (
                <div
                  className="placeholder-image"
                  style={{
                    height: 200,
                    borderBottom: "1px solid #2a2a1a",
                  }}
                >
                  <span className="label">{event.label}</span>
                  <span
                    style={{
                      color: "#333",
                      fontSize: "0.6rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    Event Photo
                  </span>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#c9a227",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {event.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#f2f2f2",
                    marginBottom: "0.75rem",
                  }}
                >
                  {event.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.75,
                    color: "#777",
                    marginBottom: 0,
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
