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
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({
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
        ref={textRef as React.RefObject<HTMLDivElement>}
        className={`anim-fade-up ${textVisible ? "visible" : ""}`}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <div
          style={{
            width: 48,
            height: 3,
            background: "#c9a227",
            margin: "0 auto 1.5rem",
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
            marginBottom: "1.25rem",
          }}
        >
          SportsCom at XLRI Delhi-NCR is the driving force behind the
          institute&apos;s vibrant sporting culture, dedicated to fostering
          participation, leadership, and excellence in sports. Throughout the
          academic year, SportsCom curates a diverse range of events&mdash;both
          internal and inter-collegiate&mdash;that bring together students
          across batches and institutions.
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "#9c9c9c",
            marginBottom: "1.25rem",
          }}
        >
          From nurturing talent within the campus to representing XLRI on
          national platforms, SportsCom plays a pivotal role in building
          teamwork, discipline, and competitive spirit. Our initiatives are
          designed not just to promote athletic performance, but also to create
          a strong sense of community, collaboration, and inclusivity.
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "#9c9c9c",
            marginBottom: "2rem",
          }}
        >
          With flagship events, competitive tournaments, and external
          representations, SportsCom continues to strengthen the sporting
          ecosystem while encouraging students to push boundaries and strive for
          excellence both on and off the field.
        </p>

        {/* Stat Chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
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
    </section>
  );
}
