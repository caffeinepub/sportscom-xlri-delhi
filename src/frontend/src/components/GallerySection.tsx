import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useState } from "react";
import { GalleryCategory } from "../backend";
import { useGetAllImages } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type FilterCategory = "all" | GalleryCategory;

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  {
    label: "Captains Announcement",
    value: GalleryCategory.captainsAnnouncement,
  },
  { label: "Ratanjee", value: GalleryCategory.ratanjee },
  { label: "Northern Brawl", value: GalleryCategory.northernBrawl },
  { label: "XPL", value: GalleryCategory.xpl },
];

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  [GalleryCategory.captainsAnnouncement]: "Captains Announcement",
  [GalleryCategory.ratanjee]: "Ratanjee",
  [GalleryCategory.northernBrawl]: "Northern Brawl",
  [GalleryCategory.xpl]: "XPL",
};

const PLACEHOLDER_COUNTS: Record<FilterCategory, number> = {
  all: 8,
  [GalleryCategory.captainsAnnouncement]: 6,
  [GalleryCategory.ratanjee]: 6,
  [GalleryCategory.northernBrawl]: 4,
  [GalleryCategory.xpl]: 4,
};

// Stable placeholder keys based on position
const PLACEHOLDER_KEYS = [
  "ph-a",
  "ph-b",
  "ph-c",
  "ph-d",
  "ph-e",
  "ph-f",
  "ph-g",
  "ph-h",
];

const LOADING_KEYS = ["ld-a", "ld-b", "ld-c", "ld-d", "ld-e", "ld-f"];

interface LightboxState {
  images: { src: string; label: string }[];
  index: number;
}

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
    threshold: 0.1,
  });
  const { data: allImages, isLoading } = useGetAllImages();

  const filteredImages = allImages
    ? activeFilter === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeFilter)
    : [];

  const hasRealImages = filteredImages.length > 0;
  const placeholderCount = PLACEHOLDER_COUNTS[activeFilter] || 6;

  const openLightbox = useCallback(
    (images: { src: string; label: string }[], index: number) => {
      setLightbox({ images, index });
      document.body.style.overflow = "hidden";
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox) return;
      const newIndex =
        (lightbox.index + dir + lightbox.images.length) %
        lightbox.images.length;
      setLightbox((prev) => (prev ? { ...prev, index: newIndex } : null));
    },
    [lightbox],
  );

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
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
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div
            style={{
              width: 48,
              height: 3,
              background: "#c9a227",
              margin: "0 auto 1.25rem",
            }}
          />
          <h2 className="section-heading">Gallery</h2>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
          data-ocid="gallery.filter.tab"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              data-ocid={`gallery.${tab.value}.tab`}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.45rem 1.1rem",
                cursor: "pointer",
                transition: "all 0.2s",
                border: "none",
                outline: "none",
              }}
              className={
                activeFilter === tab.value
                  ? "filter-pill-active"
                  : "filter-pill-inactive"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "0.75rem",
          }}
          data-ocid="gallery.list"
        >
          {isLoading
            ? LOADING_KEYS.map((key) => (
                <div
                  key={key}
                  style={{
                    aspectRatio: "4/3",
                    background: "#141414",
                    animation: "pulse 1.5s infinite",
                  }}
                  data-ocid="gallery.loading_state"
                />
              ))
            : hasRealImages
              ? (() => {
                  const imageList = filteredImages.map((img) => ({
                    src: img.blob.getDirectURL(),
                    label: img.imageLabel,
                  }));
                  return filteredImages.map((img, i) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => openLightbox(imageList, i)}
                      data-ocid={`gallery.item.${i + 1}`}
                      style={{
                        aspectRatio: "4/3",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: "none",
                        padding: 0,
                        background: "#141414",
                        display: "block",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <img
                        src={img.blob.getDirectURL()}
                        alt={img.imageLabel}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s",
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
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                          padding: "0.5rem 0.75rem",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          color: "#f2f2f2",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {img.imageLabel}
                      </div>
                    </button>
                  ));
                })()
              : // Placeholder grid - use stable non-index keys
                PLACEHOLDER_KEYS.slice(0, placeholderCount).map((key, i) => {
                  const catLabel =
                    activeFilter === "all"
                      ? "Gallery Photo"
                      : CATEGORY_LABELS[activeFilter as GalleryCategory] ||
                        "Gallery Photo";
                  return (
                    <div
                      key={`${activeFilter}-${key}`}
                      className={`placeholder-image anim-fade-up stagger-${Math.min(i + 1, 7)} ${gridVisible ? "visible" : ""}`}
                      style={{ aspectRatio: "4/3" }}
                      data-ocid={`gallery.item.${i + 1}`}
                    >
                      <span className="label">{catLabel}</span>
                      <span
                        style={{
                          color: "#2a2a2a",
                          fontSize: "0.6rem",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        Upload photos to display
                      </span>
                    </div>
                  );
                })}
        </div>

        {/* Empty state */}
        {!isLoading &&
          !hasRealImages &&
          filteredImages.length === 0 &&
          allImages &&
          allImages.length > 0 && (
            <div
              data-ocid="gallery.empty_state"
              style={{ textAlign: "center", padding: "3rem", color: "#555" }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.85rem",
                }}
              >
                No images in this category yet.
              </p>
            </div>
          )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <dialog
          open
          className="lightbox-backdrop"
          onClose={closeLightbox}
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "ArrowRight") navigate(1);
          }}
          data-ocid="gallery.modal"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            maxWidth: "100vw",
            maxHeight: "100vh",
            width: "100vw",
            height: "100vh",
            padding: 0,
            margin: 0,
          }}
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            data-ocid="gallery.pagination_prev"
            style={{
              position: "fixed",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid #c9a227",
              color: "#e8c84a",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1001,
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="presentation"
            style={{
              maxWidth: "85vw",
              maxHeight: "85vh",
              position: "relative",
            }}
          >
            <img
              src={lightbox.images[lightbox.index].src}
              alt={lightbox.images[lightbox.index].label}
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                border: "1px solid #2a2a1a",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-2rem",
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                color: "#888",
                letterSpacing: "0.08em",
              }}
            >
              {lightbox.images[lightbox.index].label} · {lightbox.index + 1} /{" "}
              {lightbox.images.length}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            data-ocid="gallery.pagination_next"
            style={{
              position: "fixed",
              right: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid #c9a227",
              color: "#e8c84a",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1001,
            }}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>

          <button
            type="button"
            onClick={closeLightbox}
            data-ocid="gallery.close.button"
            style={{
              position: "fixed",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid #c9a227",
              color: "#e8c84a",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1001,
            }}
            aria-label="Close lightbox"
          >
            <X size={18} />
          </button>
        </dialog>
      )}
    </section>
  );
}
