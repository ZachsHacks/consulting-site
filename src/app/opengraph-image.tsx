import { ImageResponse } from "next/og";

export const alt =
  "Weiss & Co. — Custom apps, built with AI, shipped in 21 days";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0B",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
          color: "#F5F2EC",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* amber glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,138,61,0.35), rgba(255,138,61,0) 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* amber glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,138,61,0.2), rgba(255,138,61,0) 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #FF8A3D, #C8571E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#1A0B04",
            }}
          >
            W&amp;
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Weiss &amp; Co.
            </div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B8B3A8",
              }}
            >
              Custom software · Brooklyn
            </div>
          </div>
        </div>

        {/* big headline */}
        <div
          style={{
            marginTop: 72,
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1.02,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                background: "#FF8A3D",
                color: "#1A0B04",
                padding: "2px 20px",
                borderRadius: 18,
                display: "inline-flex",
              }}
            >
              Custom
            </span>
            <span>apps,</span>
          </div>
          <div>
            built with <span style={{ color: "#FF8A3D" }}>AI,</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>shipped in</span>
            <span
              style={{
                border: "3px solid #F5F2EC",
                padding: "2px 20px",
                borderRadius: 18,
                display: "inline-flex",
              }}
            >
              21 days.
            </span>
          </div>
        </div>

        {/* bottom line */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            zIndex: 2,
            paddingTop: 36,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#B8B3A8",
              maxWidth: "68%",
              lineHeight: 1.4,
              letterSpacing: "-0.005em",
            }}
          >
            For owner-operated businesses stuck on spreadsheets, paper, and
            software from 2004.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                letterSpacing: "-0.05em",
                color: "#FF8A3D",
                lineHeight: 1,
              }}
            >
              $25K
            </span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#B8B3A8",
              }}
            >
              flat
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
