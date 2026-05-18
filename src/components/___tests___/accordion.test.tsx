import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accordion from "../accordion/Accordion";

const mockItems = [
  { title: "Вопрос 1", content: "Ответ на вопрос 1" },
  { title: "Вопрос 2", content: "Ответ на вопрос 2" },
  { title: "Вопрос 3", content: "Ответ на вопрос 3" },
];

const mockItemsWithDisabled = [
  { title: "Вопрос 1", content: "Ответ 1" },
  { title: "Вопрос 2 (disabled)", content: "Ответ 2", disabled: true },
  { title: "Вопрос 3", content: "Ответ 3" },
];

describe("Accordion Component", () => {
  describe("Рендер компонента", () => {
    test("отображает все заголовки", () => {
      render(<Accordion items={mockItems} />);

      expect(screen.getByText("Вопрос 1")).toBeInTheDocument();
      expect(screen.getByText("Вопрос 2")).toBeInTheDocument();
      expect(screen.getByText("Вопрос 3")).toBeInTheDocument();
    });

    test("изначально все элементы закрыты", () => {
      render(<Accordion items={mockItems} />);

      expect(screen.queryByText("Ответ на вопрос 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Ответ на вопрос 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Ответ на вопрос 3")).not.toBeInTheDocument();
    });

    test("отображает SVG иконку у каждого элемента", () => {
      render(<Accordion items={mockItems} />);

      const svgs = document.querySelectorAll("svg");
      expect(svgs.length).toBe(mockItems.length);
    });
  });

  describe("Открытие/закрытие аккордеона", () => {
    test("при клике на заголовок открывается содержимое", () => {
      render(<Accordion items={mockItems} />);

      const header = screen.getByText("Вопрос 1");
      fireEvent.click(header);

      expect(screen.getByText("Ответ на вопрос 1")).toBeInTheDocument();
    });

    test("при повторном клике на заголовок содержимое закрывается", () => {
      render(<Accordion items={mockItems} />);

      const header = screen.getByText("Вопрос 1");
      fireEvent.click(header);
      expect(screen.getByText("Ответ на вопрос 1")).toBeInTheDocument();

      fireEvent.click(header);
      expect(screen.queryByText("Ответ на вопрос 1")).not.toBeInTheDocument();
    });

    test("открытие одного элемента не открывает другие", () => {
      render(<Accordion items={mockItems} />);

      fireEvent.click(screen.getByText("Вопрос 1"));

      expect(screen.getByText("Ответ на вопрос 1")).toBeInTheDocument();
      expect(screen.queryByText("Ответ на вопрос 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Ответ на вопрос 3")).not.toBeInTheDocument();
    });
  });

  describe("Режим allowMultiple", () => {
    test("при allowMultiple=false открывается только один элемент", () => {
      render(<Accordion items={mockItems} allowMultiple={false} />);

      fireEvent.click(screen.getByText("Вопрос 1"));
      fireEvent.click(screen.getByText("Вопрос 2"));

      expect(screen.getByText("Ответ на вопрос 2")).toBeInTheDocument();
      expect(screen.queryByText("Ответ на вопрос 1")).not.toBeInTheDocument();
    });

    test("при allowMultiple=true можно открыть несколько элементов", () => {
      render(<Accordion items={mockItems} allowMultiple={true} />);

      fireEvent.click(screen.getByText("Вопрос 1"));
      fireEvent.click(screen.getByText("Вопрос 2"));

      expect(screen.getByText("Ответ на вопрос 1")).toBeInTheDocument();
      expect(screen.getByText("Ответ на вопрос 2")).toBeInTheDocument();
    });

    test("при allowMultiple=true повторный клик закрывает элемент", () => {
      render(<Accordion items={mockItems} allowMultiple={true} />);

      fireEvent.click(screen.getByText("Вопрос 1"));
      expect(screen.getByText("Ответ на вопрос 1")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Вопрос 1"));
      expect(screen.queryByText("Ответ на вопрос 1")).not.toBeInTheDocument();
    });
  });

  describe("Default open indexes", () => {
    test("открывает элементы по умолчанию согласно defaultOpenIndexes", () => {
      render(<Accordion items={mockItems} defaultOpenIndexes={[0, 2]} />);

      expect(screen.getByText("Ответ на вопрос 1")).toBeInTheDocument();
      expect(screen.queryByText("Ответ на вопрос 2")).not.toBeInTheDocument();
      expect(screen.getByText("Ответ на вопрос 3")).toBeInTheDocument();
    });

    test("при allowMultiple=false defaultOpenIndexes открывает только последний", () => {
      render(
        <Accordion
          items={mockItems}
          defaultOpenIndexes={[0, 2]}
          allowMultiple={false}
        />,
      );

      // Должен открыться только последний указанный
      expect(screen.queryByText("Ответ на вопрос 1")).not.toBeInTheDocument();
      expect(screen.getByText("Ответ на вопрос 3")).toBeInTheDocument();
    });
  });

  describe("Disabled элемент", () => {
    test("disabled элемент не открывается при клике", () => {
      render(<Accordion items={mockItemsWithDisabled} />);

      const disabledHeader = screen.getByText("Вопрос 2 (disabled)");
      fireEvent.click(disabledHeader);

      expect(screen.queryByText("Ответ 2")).not.toBeInTheDocument();
    });

    test("disabled элемент имеет класс disabled", () => {
      render(<Accordion items={mockItemsWithDisabled} />);

      const disabledItem = screen
        .getByText("Вопрос 2 (disabled)")
        .closest(".accordion-item");
      expect(disabledItem).toHaveClass("disabled");
    });

    test("обычные элементы работают при наличии disabled соседа", () => {
      render(<Accordion items={mockItemsWithDisabled} />);

      fireEvent.click(screen.getByText("Вопрос 1"));
      expect(screen.getByText("Ответ 1")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Вопрос 3"));
      expect(screen.getByText("Ответ 3")).toBeInTheDocument();
    });
  });

  describe("Анимация и иконка", () => {
    test("стрелка смотрит вниз когда элемент закрыт", () => {
      render(<Accordion items={mockItems} />);

      const svg = document.querySelector("svg");
      expect(svg).toHaveStyle("transform: rotate(180deg)");
    });

    test("стрелка смотрит вверх когда элемент открыт", () => {
      render(<Accordion items={mockItems} />);

      fireEvent.click(screen.getByText("Вопрос 1"));

      const svg = document.querySelector("svg");
      expect(svg).toHaveStyle("transform: rotate(0deg)");
    });
  });

  describe("CSS классы", () => {
    test("открытый элемент имеет класс open", () => {
      render(<Accordion items={mockItems} />);

      fireEvent.click(screen.getByText("Вопрос 1"));

      const openItem = screen.getByText("Вопрос 1").closest(".accordion-item");
      expect(openItem).toHaveClass("open");
    });

    test("закрытый элемент не имеет класса open", () => {
      render(<Accordion items={mockItems} />);

      const closedItem = screen
        .getByText("Вопрос 1")
        .closest(".accordion-item");
      expect(closedItem).not.toHaveClass("open");
    });
  });
});
