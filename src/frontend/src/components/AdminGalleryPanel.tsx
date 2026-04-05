import { Loader2, Settings, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, GalleryCategory } from "../backend";
import {
  useAddImage,
  useDeleteImage,
  useGetAllImages,
} from "../hooks/useQueries";

const CATEGORY_OPTIONS = [
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

export function AdminGalleryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(
    GalleryCategory.ratanjee,
  );
  const [imageLabel, setImageLabel] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: allImages, isLoading: imagesLoading } = useGetAllImages();
  const addImageMutation = useAddImage();
  const deleteImageMutation = useDeleteImage();

  const filteredImages = allImages
    ? allImages.filter((img) => img.category === selectedCategory)
    : [];

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (!imageLabel.trim()) {
      toast.error("Please enter an image label.");
      return;
    }
    try {
      setUploadProgress(0);
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const id = `img_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      await addImageMutation.mutateAsync({
        id,
        blob,
        imageLabel: imageLabel.trim(),
        category: selectedCategory,
        orderIndex: BigInt(Date.now()),
      });
      toast.success("Image uploaded successfully!");
      setImageLabel("");
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast.error("Failed to upload image.");
      setUploadProgress(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteImageMutation.mutateAsync(id);
      toast.success("Image deleted.");
    } catch {
      toast.error("Failed to delete image.");
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-ocid="gallery.open_modal_button"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 200,
          background: "#141414",
          border: "1.5px solid #c9a227",
          color: "#e8c84a",
          padding: "0.6rem 1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          boxShadow: "0 4px 20px rgba(201,162,39,0.2)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#1e1e0e";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#141414";
        }}
      >
        <Settings size={14} />
        Manage Gallery
      </button>

      {/* Admin Panel Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          data-ocid="gallery.dialog"
        >
          <div
            style={{
              background: "#141414",
              border: "1px solid #c9a227",
              width: "100%",
              maxWidth: 700,
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.5rem 1.75rem",
                borderBottom: "1px solid #2a2a1a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                background: "#141414",
                zIndex: 1,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#e8c84a",
                  margin: 0,
                }}
              >
                ⚙ Manage Gallery
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                data-ocid="gallery.close.button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  padding: "0.25rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#e8c84a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#666";
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "1.75rem" }}>
              {/* Category Selector */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="admin-category-select"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#c9a227",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Category
                </label>
                <select
                  id="admin-category-select"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as GalleryCategory)
                  }
                  data-ocid="gallery.select"
                  style={{
                    width: "100%",
                    background: "#0f0f0f",
                    border: "1px solid #2a2a1a",
                    color: "#f2f2f2",
                    padding: "0.6rem 0.75rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.82rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Form */}
              <div
                style={{
                  border: "1px solid #2a2a1a",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                  background: "#0f0f0f",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#888",
                    marginBottom: "1rem",
                  }}
                >
                  Upload New Image
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    htmlFor="admin-image-label"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.08em",
                      color: "#666",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Image Label
                  </label>
                  <input
                    id="admin-image-label"
                    type="text"
                    value={imageLabel}
                    onChange={(e) => setImageLabel(e.target.value)}
                    placeholder="e.g. Final Match Day"
                    data-ocid="gallery.upload.input"
                    style={{
                      width: "100%",
                      background: "#141414",
                      border: "1px solid #2a2a1a",
                      color: "#f2f2f2",
                      padding: "0.55rem 0.75rem",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.82rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="button"
                  style={{
                    border: "1.5px dashed #2a2a1a",
                    padding: "1.5rem",
                    textAlign: "center" as const,
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                    transition: "border-color 0.2s",
                    background: "transparent",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  data-ocid="gallery.dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#c9a227";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#2a2a1a";
                  }}
                >
                  <Upload size={24} color="#444" />
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.75rem",
                      color: "#555",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Click to select an image
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    data-ocid="gallery.upload_button"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </button>

                {uploadProgress !== null && (
                  <div
                    data-ocid="gallery.loading_state"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    <div
                      style={{
                        height: 3,
                        background: "#1a1a1a",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${uploadProgress}%`,
                          background: "#c9a227",
                          transition: "width 0.2s",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.68rem",
                        color: "#555",
                        marginTop: "0.3rem",
                      }}
                    >
                      Uploading... {uploadProgress}%
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={addImageMutation.isPending}
                  data-ocid="gallery.upload.submit_button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "#c9a227",
                    color: "#0a0a0a",
                    border: "none",
                    padding: "0.6rem 1.25rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: addImageMutation.isPending
                      ? "not-allowed"
                      : "pointer",
                    opacity: addImageMutation.isPending ? 0.7 : 1,
                  }}
                >
                  {addImageMutation.isPending ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />{" "}
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={12} /> Add Image
                    </>
                  )}
                </button>
              </div>

              {/* Existing Images */}
              <div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#888",
                    marginBottom: "1rem",
                  }}
                >
                  {CATEGORY_LABELS[selectedCategory]} — {filteredImages.length}{" "}
                  Images
                </div>

                {imagesLoading ? (
                  <div
                    style={{
                      color: "#444",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.8rem",
                    }}
                  >
                    Loading...
                  </div>
                ) : filteredImages.length === 0 ? (
                  <div
                    data-ocid="gallery.empty_state"
                    style={{
                      color: "#444",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.8rem",
                      padding: "1rem 0",
                    }}
                  >
                    No images in this category.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {filteredImages.map((img, i) => (
                      <div
                        key={img.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          background: "#0f0f0f",
                          padding: "0.6rem 0.75rem",
                          border: "1px solid #1a1a1a",
                        }}
                        data-ocid={`gallery.admin.item.${i + 1}`}
                      >
                        <img
                          src={img.blob.getDirectURL()}
                          alt={img.imageLabel}
                          style={{
                            width: 48,
                            height: 48,
                            objectFit: "cover",
                            border: "1px solid #2a2a1a",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            flex: 1,
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "0.78rem",
                            color: "#9c9c9c",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {img.imageLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(img.id)}
                          disabled={deleteImageMutation.isPending}
                          data-ocid={`gallery.admin.delete_button.${i + 1}`}
                          style={{
                            background: "none",
                            border: "1px solid #3a1a1a",
                            color: "#aa4444",
                            padding: "0.35rem 0.6rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.08em",
                            flexShrink: 0,
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "#1a0a0a";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "none";
                          }}
                        >
                          {deleteImageMutation.isPending ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <>
                              <Trash2 size={12} /> Delete
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
