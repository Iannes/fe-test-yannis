import * as React from "react";
import ContentLoader from "react-content-loader";

export const PageSkeleton = ({ ...rest }) => (
  <ContentLoader
    height={500}
    width={1000}
    speed={2}
    backgroundColor="f3f3f3"
    backgroundOpacity={0.05}
    viewBox="0 0 250 300"
    style={{
      position: "absolute",
      left: "50%",
      top: "25%",
      transform: "translateX(-50%)",
    }}
  >
    <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
    <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="210" rx="2" ry="2" width="350" height="25" />
  </ContentLoader>
);
