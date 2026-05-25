import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "../checkbox/Checkbox";

describe("Checkbox Component", () => {
  describe("Рендер компонента", () => {
    test("отображает чекбокс с label", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="Согласен с условиями"
        />,
      );

      expect(screen.getByText("Согласен с условиями")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    test("отображает чекбокс без label", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.queryByRole("checkbox-text")).not.toBeInTheDocument();
    });

    test("чекбокс отображается как отмеченный при checked=true", () => {
      render(<Checkbox checked={true} onChange={() => {}} />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    test("чекбокс отображается как неотмеченный при checked=false", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  describe("Обработка кликов", () => {
    test("вызывает onChange с true при клике на неотмеченный чекбокс", () => {
      const handleChange = jest.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    test("вызывает onChange с false при клике на отмеченный чекбокс", () => {
      const handleChange = jest.fn();
      render(<Checkbox checked={true} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    test("клик по label также переключает чекбокс", () => {
      const handleChange = jest.fn();
      render(
        <Checkbox
          checked={false}
          onChange={handleChange}
          label="Нажми на меня"
        />,
      );

      const label = screen.getByText("Нажми на меня");
      fireEvent.click(label);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Disabled состояние", () => {
    test("чекбокс disabled не реагирует на клик", () => {
      const handleChange = jest.fn();
      render(
        <Checkbox checked={false} onChange={handleChange} disabled={true} />,
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);

      fireEvent.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    test("disabled чекбокс имеет соответствующий класс", () => {
      render(<Checkbox checked={false} onChange={() => {}} disabled={true} />);

      const label = screen.getByRole("checkbox").closest("label");
      expect(label).toHaveClass("disabled");
    });

    test("disabled чекбокс не переключается программно", () => {
      const handleChange = jest.fn();
      render(
        <Checkbox checked={false} onChange={handleChange} disabled={true} />,
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      // Клик не должен изменить состояние
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });

  describe("CSS классы", () => {
    test("имеет класс checkbox-label", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);

      const label = screen.getByRole("checkbox").closest("label");
      expect(label).toHaveClass("checkbox-label");
    });

    test("не имеет класс disabled при disabled=false", () => {
      render(<Checkbox checked={false} onChange={() => {}} disabled={false} />);

      const label = screen.getByRole("checkbox").closest("label");
      expect(label).not.toHaveClass("disabled");
    });

    test("содержит span с классом checkbox-custom", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);

      const customSpan = document.querySelector(".checkbox-custom");
      expect(customSpan).toBeInTheDocument();
    });

    test("содержит span с классом checkbox-text при наличии label", () => {
      render(<Checkbox checked={false} onChange={() => {}} label="Текст" />);

      const textSpan = document.querySelector(".checkbox-text");
      expect(textSpan).toBeInTheDocument();
      expect(textSpan).toHaveTextContent("Текст");
    });
  });
});
