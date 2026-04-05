import { useScrollAnimation } from "../hooks/useScrollAnimation";

const EVENTS = [
  {
    name: "Ratanjee 2026",
    description:
      "XLRI Delhi's flagship inter-college sports festival bringing together top athletes from across institutions for a weekend of intense competition and camaraderie.",
    label: "Ratanjee",
    tag: "Inter-College Festival",
  },
  {
    name: "Northern Brawl 2026",
    description:
      "A high-energy inter-college sports tournament that pits the best northern region college teams against each other across multiple sports disciplines.",
    label: "Northern Brawl",
    tag: "Inter-College Tournament",
  },
  {
    name: "XPL 2027",
    description:
      "The XLRI Premier League, an intra-college sports league that runs over several weeks, featuring team-based competitions in cricket, football, and more.",
    label: "XPL",
    tag: "Intra-College League",
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
              {/* Image Placeholder */}
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
                  Event Photo Placeholder
                </span>
              </div>

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
                    marginBottom: "1.5rem",
                  }}
                >
                  {event.description}
                </p>
                <button
                  type="button"
                  className="btn-gold-outline"
                  data-ocid={`events.item.${i + 1}.button`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
