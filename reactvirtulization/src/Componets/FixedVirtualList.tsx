import { useState } from "react";

interface FixedVirtualListProps {
  height: number;
  itemHeight: number;
  total: number;
  renderItem: (index: number) => React.ReactNode;
  overScan?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FixedVirtualList({
  height,
  itemHeight,
  total,
  renderItem,
  overScan = 5,
  className = "",
  style = {},
}: FixedVirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overScan);

  const endIndex = Math.min(
    total - 1,
    Math.floor((scrollTop + height) / itemHeight) + overScan
  );

  const totalHeight = total * itemHeight;
  const topOffset = startIndex * itemHeight;

  console.log("ScrollTop:", scrollTop);
  console.log("StartIndex:", startIndex);
  console.log("EndIndex:", endIndex);
  console.log("TotalHeight:", totalHeight);
  console.log("TopOffset:", topOffset);

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const isEven = i % 2 === 0;
    items.push(
      <div
        key={i}
        className={`rv-item ${isEven ? "rv-item-even" : "rv-item-odd"}`}
        style={{
          height: itemHeight,
          backgroundColor: isEven ? "#fef3c7" : "#e0f2fe", 
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="rv-item-index" style={{ color: "#555" }}>
          #{i}
        </div>
        <div className="rv-item-content" style={{ color: "#333" }}>
          {renderItem(i)}
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        height,
        overflowY: "auto",
        position: "relative",
        backgroundColor: "rgba(255, 182, 193, 0.4)", 
        border: "2px solid hotpink",
        ...style,
      }}
      onScroll={onScroll}
    >
      <div
        style={{
          height: totalHeight,
          position: "relative",
          backgroundColor: "rgba(8, 245, 8, 0.3)",
        }}
      >
        <div
          style={{
            position: "absolute",
            transform: `translateY(${topOffset}px)`,
            left: 0,
            right: 0,
            backgroundColor: "rgba(173, 216, 230, 0.4)",
            border: "1px dashed orange",
          }}
        >
          {items}
        </div>
      </div>
    </div>
  );
}
