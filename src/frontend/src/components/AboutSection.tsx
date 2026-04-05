import { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const STAT_CHIPS = [
  "12+ Sports",
  "100+ Athletes",
  "4 Major Events",
  "Annual Festivals",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation({
    threshold: 0.15,
  });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation({
    threshold: 0.15,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      data-ocid="about.section"
      style={{
        padding: "7rem 1.5rem",
        background: "#0a0a0a",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="lg:grid-cols-2"
      >
        {/* Left: Text */}
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          className={`anim-fade-left ${leftVisible ? "visible" : ""}`}
        >
          <div
            style={{
              width: 48,
              height: 3,
              background: "#c9a227",
              marginBottom: "1.5rem",
            }}
          />
          <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
            About Us
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.85,
              color: "#9c9c9c",
              marginBottom: "2rem",
              maxWidth: 580,
            }}
          >
            Sportscom XLRI Delhi is the sports committee of XLRI Delhi-NCR
            Campus. It is responsible for organizing and managing all sports
            activities on campus, fostering a spirit of teamwork, competition,
            and athletic excellence among students. Sportscom hosts major
            inter-college and intra-college sporting events throughout the
            academic year, bringing together hundreds of athletes across more
            than 12 disciplines including cricket, football, basketball,
            badminton, table tennis, volleyball, and more. The committee is
            driven by a passionate team of student leaders committed to building
            a vibrant sports culture at XLRI Delhi.
          </p>

          {/* Stat Chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
            }}
          >
            {STAT_CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#e8c84a",
                  border: "1px solid #c9a227",
                  padding: "0.35rem 0.85rem",
                  background: "rgba(201,162,39,0.07)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Image Placeholder */}
        <div
          ref={rightRef as React.RefObject<HTMLDivElement>}
          className={`anim-fade-right ${rightVisible ? "visible" : ""}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 460,
              aspectRatio: "1",
              border: "2px solid #c9a227",
              background: "#141414",
              position: "relative",
              boxShadow: "8px 8px 0px #1a1500",
            }}
            className="placeholder-image"
            data-ocid="about.image.panel"
          >
            <span className="label">About Photo</span>
            <span
              style={{
                color: "#333",
                fontSize: "0.65rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Upload a sports event photo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
