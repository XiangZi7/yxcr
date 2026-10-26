import { ImageResponse } from "next/og";
export const alt = "Interview OS — Learn. Practice. Grow. by XiangZi7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "62px 72px",
        color: "#1c2b43",
        background: "linear-gradient(120deg, #f2f6ff, #e4eeff)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 12,
            color: "white",
            background: "#4d8bf3",
            fontSize: 28,
          }}
        >
          I
        </span>
        Interview OS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          Learn. Practice. Grow.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#748aa9" }}>
          Build your knowledge. Find your confidence.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["FRONTEND", "BACKEND", "AI / LLM"].map((label) => (
            <span
              style={{
                display: "flex",
                padding: "10px 17px",
                borderRadius: 8,
                border: "1px solid #cfddf4",
                background: "#f8fbff",
                fontSize: 16,
                color: "#5d7eaa",
              }}
              key={label}
            >
              {label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#6581a9" }}>
          yxcr.top · XiangZi7
        </div>
      </div>
    </div>,
    size,
  );
}
