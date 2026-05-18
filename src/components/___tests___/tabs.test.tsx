import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tabs from "../tabs/Tabs";

const mockTabs = [
  { id: 1, label: "Вкладка 1", content: <div>Содержимое вкладки 1</div> },
  { id: 2, label: "Вкладка 2", content: <div>Содержимое вкладки 2</div> },
  { id: 3, label: "Вкладка 3", content: <div>Содержимое вкладки 3</div> },
];

describe("Tabs Component", () => {
  describe("Рендер компонента", () => {
    test("отображает все заголовки вкладок", () => {
      render(<Tabs tabs={mockTabs} />);

      expect(screen.getByText("Вкладка 1")).toBeInTheDocument();
      expect(screen.getByText("Вкладка 2")).toBeInTheDocument();
      expect(screen.getByText("Вкладка 3")).toBeInTheDocument();
    });

    test("отображает содержимое активной вкладки по умолчанию", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      expect(screen.getByText("Содержимое вкладки 1")).toBeInTheDocument();
    });

    test("не отображает содержимое неактивных вкладок", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      expect(
        screen.queryByText("Содержимое вкладки 2"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Содержимое вкладки 3"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Активная вкладка", () => {
    test("при клике на вкладку отображается её содержимое", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      fireEvent.click(screen.getByText("Вкладка 2"));

      expect(screen.getByText("Содержимое вкладки 2")).toBeInTheDocument();
      expect(
        screen.queryByText("Содержимое вкладки 1"),
      ).not.toBeInTheDocument();
    });

    test("активная вкладка имеет класс active", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      const activeButton = screen.getByText("Вкладка 1");
      expect(activeButton).toHaveClass("active");
    });

    test("неактивные вкладки не имеют класс active", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      const inactiveButton = screen.getByText("Вкладка 2");
      expect(inactiveButton).not.toHaveClass("active");
    });
  });

  describe("defaultActiveTab", () => {
    test("отображает первую вкладку по умолчанию если defaultActiveTab не указан", () => {
      render(<Tabs tabs={mockTabs} />);

      // По умолчанию открывается первая вкладка (id=1)
      expect(screen.getByText("Содержимое вкладки 1")).toBeInTheDocument();
    });

    test("отображает указанную вкладку при defaultActiveTab", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={2} />);

      expect(screen.getByText("Содержимое вкладки 2")).toBeInTheDocument();
    });
  });

  describe("onChange callback", () => {
    test("вызывает onChange при клике на вкладку", () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={mockTabs} onChange={handleChange} />);

      fireEvent.click(screen.getByText("Вкладка 2"));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(2);
    });

    test("не вызывает onChange если он не передан", () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={mockTabs} />);

      fireEvent.click(screen.getByText("Вкладка 2"));

      expect(handleChange).not.toHaveBeenCalled();
    });

    test("onChange вызывается с правильным id вкладки", () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={mockTabs} onChange={handleChange} />);

      fireEvent.click(screen.getByText("Вкладка 3"));

      expect(handleChange).toHaveBeenCalledWith(3);
    });
  });

  describe("Переключение вкладок", () => {
    test("при клике на другую вкладку старая теряет класс active", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      const firstTab = screen.getByText("Вкладка 1");
      const secondTab = screen.getByText("Вкладка 2");

      expect(firstTab).toHaveClass("active");
      expect(secondTab).not.toHaveClass("active");

      fireEvent.click(secondTab);

      expect(firstTab).not.toHaveClass("active");
      expect(secondTab).toHaveClass("active");
    });

    test("повторный клик на активную вкладку не меняет содержимое", () => {
      render(<Tabs tabs={mockTabs} defaultActiveTab={1} />);

      const firstTab = screen.getByText("Вкладка 1");

      fireEvent.click(firstTab);

      expect(screen.getByText("Содержимое вкладки 1")).toBeInTheDocument();
      expect(
        screen.queryByText("Содержимое вкладки 2"),
      ).not.toBeInTheDocument();
    });
  });

  describe("CSS классы", () => {
    test("контейнер имеет класс tabs-container", () => {
      const { container } = render(<Tabs tabs={mockTabs} />);

      const tabsContainer = container.querySelector(".tabs-container");
      expect(tabsContainer).toBeInTheDocument();
    });

    test("заголовки имеют класс tab-btn", () => {
      render(<Tabs tabs={mockTabs} />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("tab-btn");
      });
    });

    test("контент вкладки имеет класс tabs-content", () => {
      const { container } = render(<Tabs tabs={mockTabs} />);

      const content = container.querySelector(".tabs-content");
      expect(content).toBeInTheDocument();
    });
  });

  describe("Пустые данные", () => {
    test("не отображает ничего при пустом массиве tabs", () => {
      const { container } = render(<Tabs tabs={[]} />);

      const buttons = screen.queryAllByRole("button");
      expect(buttons.length).toBe(0);

      const content = container.querySelector(".tabs-content");
      expect(content).toBeInTheDocument();
      expect(content).toBeEmptyDOMElement();
    });
  });
});
