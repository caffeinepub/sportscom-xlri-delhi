import { useScrollAnimation } from "../hooks/useScrollAnimation";

const EVENTS = [
  {
    id: "captains-announcement",
    title: "Captains' Announcement",
    description:
      "The Captains' Announcement marks the beginning of the sporting calendar, introducing the student leaders who guide various sports teams throughout the year. This event celebrates leadership and responsibility, setting the tone for discipline, teamwork, and competitive excellence.",
    image:
      "/assets/captain_announce_4_new-019d5f35-b0e4-7727-8491-c01a926a8a00.jpg",
    driveLink:
      "https://drive.google.com/drive/folders/13DJWtPSemIxO9U2ngouIhzDBvubDLC8b?usp=drive_link",
    flagship: false,
  },
  {
    id: "ratanjee",
    title: "Ratanjee",
    description:
      "Ratanjee is a three-day intra-college sporting event featuring an exciting face-off between senior and junior batches across 12+ sports. It serves as a platform for talent scouting, team building, and fostering camaraderie, while strengthening the institute's internal sporting culture.",
    image:
      "/assets/ratanjee_2026_placeholder-019d5f42-fc84-761d-a5af-bafbc30892d6.jpg",
    driveLink:
      "https://drive.google.com/drive/folders/1X30zUNLR18JKh8xjx3V-8Zv1Ql4PhmNX?usp=drive_link",
    flagship: false,
  },
  {
    id: "northern-brawl",
    title: "Northern Brawl",
    subtitle: "Flagship Event",
    description:
      "Northern Brawl is the flagship inter-collegiate sports tournament hosted by SportsCom. Spanning three days and featuring 10+ sports, it brings together top institutions like FMS Delhi, MDI Gurgaon, IIFT Delhi, and IIM Rohtak. With 400+ participants, it promotes high-level competition, sportsmanship, and inter-college collaboration.",
    image:
      "/assets/northern_brawl_2026_placeholder-019d5f42-e9e3-77f2-a2fb-5f3afc54ff86.jpg",
    driveLink:
      "https://drive.google.com/drive/folders/1rm5s58OIiaI--OV5mY7u8bRm0SOihrJb?usp=drive_link",
    flagship: true,
  },
  {
    id: "external-visits",
    title: "External Visits & Tournaments",
    description:
      "SportsCom actively facilitates participation in external tournaments and sports festivals such as IIM Lucknow Sports Meet and KON (MDI Gurgaon). These visits provide students with exposure to competitive environments and have resulted in multiple achievements, including championships and runner-up finishes across sports.",
    image:
      "/assets/external_tour_placeholder-019d5f20-0759-73b8-9139-1735d4a1f734.jpeg",
    driveLink: null,
    flagship: false,
  },
  {
    id: "xpl",
    title: "XPL",
    subtitle: "XLRI Premier League",
    description:
      "XPL is the grand finale of the sporting calendar, blending competition with celebration. Featuring Box Cricket and Dodgeball, the event includes an auction-based team format and ensures inclusivity with mandatory female participation. It is a high-energy, community-driven event that reflects the spirit of sportsmanship and fun.",
    image: "/assets/xpl_placeholder-019d5f20-0776-74dd-a9b3-bed9eb2ec7c3.jpeg",
    driveLink: null,
    flagship: false,
  },
];

export function EventsThisYearSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation();

  return (
    <section
      id="events-this-year"
      data-ocid="events_this_year.section"
      style={{
        padding: "7rem 1.5rem",
        background: "#0d0d0d",
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
          <h2 className="section-heading">Events This Year</h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "1rem",
              letterSpacing: "0.08em",
            }}
          >
            A year full of competition, camaraderie, and sporting excellence
          </p>
        </div>

        {/* Events Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
          data-ocid="events_this_year.list"
        >
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
}: {
  event: (typeof EVENTS)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const imageContent = (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        position: "relative",
        background: "#141414",
        flexShrink: 0,
      }}
    >
      <img
        src={event.image}
        alt={event.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.4s ease",
          display: "block",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
        }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.style.display = "flex";
            parent.style.alignItems = "center";
            parent.style.justifyContent = "center";
            const fallback = document.createElement("span");
            fallback.innerText = event.title;
            fallback.style.cssText =
              "color:#444;font-size:0.7rem;font-family:'Montserrat',sans-serif;letter-spacing:0.1em;text-transform:uppercase;padding:1rem;text-align:center;";
            parent.appendChild(fallback);
          }
        }}
      />
      {event.driveLink && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.0)",
            transition: "background 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(0,0,0,0.4)";
            const child = e.currentTarget.querySelector(
              ".view-btn",
            ) as HTMLElement;
            if (child) child.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(0,0,0,0.0)";
            const child = e.currentTarget.querySelector(
              ".view-btn",
            ) as HTMLElement;
            if (child) child.style.opacity = "0";
          }}
        >
          <span
            className="view-btn"
            style={{
              opacity: 0,
              transition: "opacity 0.3s",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#e8c84a",
              border: "1px solid #c9a227",
              padding: "0.4rem 1rem",
              background: "rgba(10,10,10,0.85)",
              pointerEvents: "none",
            }}
          >
            View Photos
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`card-dark anim-fade-up stagger-${Math.min(index + 1, 7)} ${isVisible ? "visible" : ""}`}
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      data-ocid={`events_this_year.item.${index + 1}`}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(201,162,39,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.5)";
      }}
    >
      {/* Image - clickable if drive link exists */}
      {event.driveLink ? (
        <a
          href={event.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", textDecoration: "none" }}
          aria-label={`View ${event.title} photos`}
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}

      {/* Content */}
      <div style={{ padding: "1.5rem", flex: 1 }}>
        {/* Flagship badge */}
        {event.flagship && (
          <div
            style={{
              display: "inline-block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              background: "#c9a227",
              padding: "0.2rem 0.6rem",
              marginBottom: "0.75rem",
            }}
          >
            Flagship Event
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#e8c84a",
            marginBottom: event.subtitle ? "0.2rem" : "0.75rem",
            margin: 0,
          }}
        >
          {event.title}
        </h3>

        {/* Subtitle */}
        {event.subtitle && (
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: "0.75rem",
              marginTop: "0.2rem",
            }}
          >
            {event.subtitle}
          </div>
        )}

        {!event.subtitle && <div style={{ height: "0.75rem" }} />}

        {/* Description */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.8,
            color: "#9c9c9c",
            margin: 0,
          }}
        >
          {event.description}
        </p>

        {/* Drive Link */}
        {event.driveLink && (
          <a
            href={event.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "1.25rem",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c9a227",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor =
                "#c9a227";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor =
                "transparent";
            }}
          >
            View Photos &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
