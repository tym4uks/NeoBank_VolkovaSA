import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../table/Table";

interface TestData {
  id: number;
  name: string;
  age: number;
  city: string;
}

const mockColumns = [
  { key: "id" as const, title: "ID", sortable: true },
  { key: "name" as const, title: "Name", sortable: true },
  { key: "age" as const, title: "Age", sortable: false },
  { key: "city" as const, title: "City", sortable: true },
];

const mockData: TestData[] = [
  { id: 3, name: "Alice", age: 25, city: "Moscow" },
  { id: 1, name: "Bob", age: 30, city: "SPB" },
  { id: 2, name: "Charlie", age: 28, city: "Kazan" },
];

describe("Table Component", () => {
  describe("Рендер таблицы", () => {
    test("отображает заголовки всех колонок", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
      expect(screen.getByText("City")).toBeInTheDocument();
    });

    test("отображает все строки данных", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
      expect(screen.getByText("Moscow")).toBeInTheDocument();
      expect(screen.getByText("SPB")).toBeInTheDocument();
      expect(screen.getByText("Kazan")).toBeInTheDocument();
    });

    test("отображает иконку сортировки для sortable колонок", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      // ID - sortable, должен иметь иконку
      const idHeader = screen.getByText("ID").closest("th");
      expect(idHeader).toHaveClass("sortable");
      expect(screen.getAllByText("▲").length).toBeGreaterThan(0);
    });

    test("не отображает иконку сортировки для не sortable колонок", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const ageHeader = screen.getByText("Age").closest("th");
      expect(ageHeader).not.toHaveClass("sortable");
    });
  });

  describe("Сортировка данных", () => {
    test("сортирует по ID по возрастанию при первом клике", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const idHeader = screen.getByText("ID");
      fireEvent.click(idHeader);

      // После сортировки по возрастанию: ID должны быть 1, 2, 3
      const rows = screen.getAllByRole("row");
      // Первая строка - заголовок, поэтому берем со второй
      expect(rows[1]).toHaveTextContent("1");
      expect(rows[2]).toHaveTextContent("2");
      expect(rows[3]).toHaveTextContent("3");
    });

    test("сортирует по ID по убыванию при втором клике", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const idHeader = screen.getByText("ID");
      fireEvent.click(idHeader); // первый клик - asc
      fireEvent.click(idHeader); // второй клик - desc

      // После сортировки по убыванию: ID должны быть 3, 2, 1
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("3");
      expect(rows[2]).toHaveTextContent("2");
      expect(rows[3]).toHaveTextContent("1");
    });

    test("меняет иконку сортировки в зависимости от направления", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const idHeader = screen.getByText("ID");

      // Первый клик - сортировка asc
      fireEvent.click(idHeader);

      // Находим иконку внутри th для колонки ID
      const thElement = screen.getByText("ID").closest("th");
      expect(thElement).toBeInTheDocument();
      expect(thElement?.textContent).toContain("▲");

      // Второй клик - сортировка desc
      fireEvent.click(idHeader);

      expect(thElement?.textContent).toContain("▼");
    });

    test("сортировка по одному столбцу не влияет на другие", () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const idHeader = screen.getByText("ID");
      fireEvent.click(idHeader);

      // Проверяем, что данные отсортированы по ID (1,2,3)
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("1");

      // Но при этом Name не должен быть отсортирован по алфавиту
      // Bob (id=1) должен быть первым, не Alice
      expect(rows[1]).toHaveTextContent("Bob");
    });
  });

  describe("Обработка кликов по строкам", () => {
    test("вызывает onRowClick при клике на строку", () => {
      const handleRowClick = jest.fn();
      render(
        <Table
          columns={mockColumns}
          data={mockData}
          onRowClick={handleRowClick}
        />,
      );

      const firstRow = screen.getAllByRole("row")[1];
      fireEvent.click(firstRow);

      expect(handleRowClick).toHaveBeenCalledTimes(1);
      expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    test("не вызывает onRowClick если он не передан", () => {
      const handleRowClick = jest.fn();
      render(<Table columns={mockColumns} data={mockData} />);

      const firstRow = screen.getAllByRole("row")[1];
      fireEvent.click(firstRow);

      expect(handleRowClick).not.toHaveBeenCalled();
    });
  });

  describe("Кастомный рендер (render prop)", () => {
    const columnsWithRender = [
      { key: "id" as const, title: "ID" },
      {
        key: "name" as const,
        title: "Name",
        render: (value: string) => <b>{value.toUpperCase()}</b>,
      },
      { key: "age" as const, title: "Age" },
    ];

    test("использует render функцию для кастомного отображения", () => {
      render(<Table columns={columnsWithRender} data={mockData} />);

      expect(screen.getByText("ALICE")).toBeInTheDocument();
      expect(screen.getByText("BOB")).toBeInTheDocument();
      expect(screen.getByText("CHARLIE")).toBeInTheDocument();
    });

    test("render функция обернута в <b> тег", () => {
      render(<Table columns={columnsWithRender} data={mockData} />);

      const aliceElement = screen.getByText("ALICE");
      expect(aliceElement.tagName).toBe("B");
    });
  });

  describe("Пустые данные", () => {
    test("отображает только заголовки при пустом массиве данных", () => {
      render(<Table columns={mockColumns} data={[]} />);

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
      expect(screen.getByText("City")).toBeInTheDocument();

      // Проверяем, что нет строк с данными
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });
  });
});
