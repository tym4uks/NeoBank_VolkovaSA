import React, { useState } from "react";
import "./Accordion.css";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
}

function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIndexes = [],
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndexes);

  const toggleItem = (index: number) => {
    if (items[index].disabled) return;

    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${openIndexes.includes(index) ? "open" : ""} ${item.disabled ? "disabled" : ""}`}
        >
          <button
            className="accordion-header"
            onClick={() => toggleItem(index)}
            disabled={item.disabled}
          >
            <span className="accordion-title">{item.title}</span>
            <span className="accordion-icon">
              {openIndexes.includes(index) ? "˄" : "˅"}
            </span>
          </button>
          {openIndexes.includes(index) && (
            <div className="accordion-body">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
