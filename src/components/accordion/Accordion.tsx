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
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={index}
            className={`accordion-item ${isOpen ? "open" : ""} ${item.disabled ? "disabled" : ""}`}
          >
            <button
              className="accordion-header"
              onClick={() => toggleItem(index)}
              disabled={item.disabled}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 10"
                  fill="none"
                  style={{
                    transition: "transform 0.2s ease",
                    transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                >
                  <path
                    d="M 12.707 7.41422 L 6.70703 1.41421 L 0.707031 7.41421"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen && <div className="accordion-body">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
