import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FF8A3D, #C8571E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 92,
          fontWeight: 900,
          letterSpacing: "-0.06em",
          color: "#1A0B04",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        W&amp;
      </div>
    ),
    { ...size }
  );
}
