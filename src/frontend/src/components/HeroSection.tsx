import { useEffect, useRef } from "react";

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 600,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-20% 0 -20% 0",
          backgroundImage:
            "url('/assets/whatsapp_image_2026-04-05_at_5.15.09_pm-019d5d76-c09e-71b0-999d-f27c4d402f03.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: 900,
        }}
      >
        <div
          className="hero-title"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            lineHeight: 1.05,
            color: "#e8c84a",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            marginBottom: "1.25rem",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          Sportscom
          <br />
          <span style={{ color: "#f2f2f2" }}>XLRI Delhi</span>
        </div>

        <div
          className="hero-subtitle"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            letterSpacing: "0.2em",
            color: "rgba(242,242,242,0.85)",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          Sports Committee · XLRI Delhi-NCR Campus
        </div>

        <div
          className="hero-stats"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
          data-ocid="hero.stats.panel"
        >
          {["10+ Events", "100+ Athletes", "12+ Sports"].map((stat, i) => (
            <span key={stat}>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                  letterSpacing: "0.08em",
                  color: "#f2f2f2",
                  textTransform: "uppercase",
                }}
              >
                {stat}
              </span>
              {i < 2 && (
                <span
                  style={{
                    color: "#c9a227",
                    margin: "0 0.5rem",
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          animation: "heroFadeIn 1s ease 1.5s both",
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(201,162,39,0.6)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1.5,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(201,162,39,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}
