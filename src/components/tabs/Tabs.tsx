import React, { useState } from "react";
import "./Tabs.css";

interface Tab {
  id: number;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: number;
  onChange?: (tabId: number) => void;
}

function Tabs({ tabs, defaultActiveTab = 0, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">{activeTabContent}</div>
    </div>
  );
}

export default Tabs;
