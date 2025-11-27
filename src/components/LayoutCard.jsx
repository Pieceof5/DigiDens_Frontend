import React from "react";
import { styles as base } from "../styles/commonStyles";

function LayoutCard({
  header,
  children,
  footer,
  cardStyle,
  headerStyle,
  dividerStyle,
  contentStyle,
  footerStyle,
}) {
  return (
    <div style={{ ...base.card, ...(cardStyle || {}) }}>
      <div style={{ ...base.header, ...(headerStyle || {}) }}>{header}</div>
      <div style={{ ...base.divider, ...(dividerStyle || {}) }}></div>
      <div style={{ ...base.content, ...(contentStyle || {}) }}>{children}</div>
      {footer && (
        <div style={{ ...base.footer, ...(footerStyle || {}) }}>{footer}</div>
      )}
    </div>
  );
}

export default LayoutCard;
