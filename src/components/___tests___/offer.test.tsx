import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Offer from "../offer/Offer";

// Мок для иконок (правильный путь от компонента offer)
jest.mock("../icons/SuccessIcon", () => () => (
  <span data-testid="success-icon">✅</span>
));
jest.mock("../icons/ErrorIcon", () => () => (
  <span data-testid="error-icon">❌</span>
));

// Мок для PATHS
jest.mock("../../constants/paths", () => ({
  PATHS: {
    IMAGES: "/assets/images",
  },
}));

const mockOffer = {
  id: 1,
  requestedAmount: 200000,
  totalAmount: 200000,
  term: 24,
  monthlyPayment: 9697,
  rate: 15,
  insuranceIncluded: false,
  salaryClient: false,
};

const mockOfferWithInsurance = {
  ...mockOffer,
  insuranceIncluded: true,
  salaryClient: true,
  rate: 11,
  monthlyPayment: 9788,
};

describe("Offer Component", () => {
  describe("Рендер компонента", () => {
    test("отображает изображение карты", () => {
      render(<Offer offer={mockOffer} onSelect={() => {}} />);

      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining("SurpriseImage.png"),
      );
    });

    test("отображает все поля с данными", () => {
      render(<Offer offer={mockOffer} onSelect={() => {}} />);

      expect(screen.getByText("Requested amount:")).toBeInTheDocument();
      expect(screen.getByText("200 000 ₽")).toBeInTheDocument();
      expect(screen.getByText("Total amount:")).toBeInTheDocument();
      expect(screen.getByText("For 24 months")).toBeInTheDocument();
      expect(screen.getByText("Monthly payment:")).toBeInTheDocument();
      expect(screen.getByText("9 697 ₽")).toBeInTheDocument();
      expect(screen.getByText("Your rate:")).toBeInTheDocument();
      expect(screen.getByText("15%")).toBeInTheDocument();
      expect(screen.getByText("Insurance included:")).toBeInTheDocument();
      expect(screen.getByText("Salary client:")).toBeInTheDocument();
    });

    test("отображает кнопку Select", () => {
      render(<Offer offer={mockOffer} onSelect={() => {}} />);

      expect(screen.getByText("Select")).toBeInTheDocument();
    });
  });

  describe("Отображение иконок", () => {
    test("отображает иконку ошибки когда insuranceIncluded = false", () => {
      render(<Offer offer={mockOffer} onSelect={() => {}} />);

      const errorIcons = screen.getAllByTestId("error-icon");
      expect(errorIcons.length).toBeGreaterThan(0);
    });

    test("отображает иконку успеха когда insuranceIncluded = true", () => {
      render(<Offer offer={mockOfferWithInsurance} onSelect={() => {}} />);

      const successIcons = screen.getAllByTestId("success-icon");
      expect(successIcons.length).toBeGreaterThan(0);
    });

    test("отображает иконку ошибки когда salaryClient = false", () => {
      render(<Offer offer={mockOffer} onSelect={() => {}} />);

      const errorIcons = screen.getAllByTestId("error-icon");
      expect(errorIcons.length).toBeGreaterThan(0);
    });

    test("отображает иконку успеха когда salaryClient = true", () => {
      render(<Offer offer={mockOfferWithInsurance} onSelect={() => {}} />);

      const successIcons = screen.getAllByTestId("success-icon");
      expect(successIcons.length).toBeGreaterThan(0);
    });
  });

  describe("Кнопка Select", () => {
    test("отображает кнопку Select когда isSelected = false", () => {
      render(
        <Offer offer={mockOffer} onSelect={() => {}} isSelected={false} />,
      );

      expect(screen.getByText("Select")).toBeInTheDocument();
      expect(screen.queryByText("Selected")).not.toBeInTheDocument();
    });

    test("отображает кнопку Selected когда isSelected = true", () => {
      render(<Offer offer={mockOffer} onSelect={() => {}} isSelected={true} />);

      expect(screen.getByText("Selected")).toBeInTheDocument();
      expect(screen.queryByText("Select")).not.toBeInTheDocument();
    });

    test("вызывает onSelect при клике на кнопку Select", () => {
      const handleSelect = jest.fn();
      render(<Offer offer={mockOffer} onSelect={handleSelect} />);

      const button = screen.getByText("Select");
      fireEvent.click(button);

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    test("не вызывает onSelect при клике на кнопку Selected (если уже выбран)", () => {
      const handleSelect = jest.fn();
      render(
        <Offer offer={mockOffer} onSelect={handleSelect} isSelected={true} />,
      );

      const button = screen.getByText("Selected");
      fireEvent.click(button);

      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe("CSS классы", () => {
    test("имеет класс offer-card", () => {
      const { container } = render(
        <Offer offer={mockOffer} onSelect={() => {}} />,
      );

      const card = container.querySelector(".offer-card");
      expect(card).toBeInTheDocument();
    });

    test("имеет класс selected когда isSelected = true", () => {
      const { container } = render(
        <Offer offer={mockOffer} onSelect={() => {}} isSelected={true} />,
      );

      const card = container.querySelector(".offer-card");
      expect(card).toHaveClass("selected");
    });

    test("не имеет класс selected когда isSelected = false", () => {
      const { container } = render(
        <Offer offer={mockOffer} onSelect={() => {}} isSelected={false} />,
      );

      const card = container.querySelector(".offer-card");
      expect(card).not.toHaveClass("selected");
    });
  });

  describe("Форматирование чисел", () => {
    test("правильно форматирует сумму с пробелами", () => {
      const offerWithLargeAmount = {
        ...mockOffer,
        requestedAmount: 1000000,
        totalAmount: 1000000,
      };
      render(<Offer offer={offerWithLargeAmount} onSelect={() => {}} />);

      expect(screen.getByText("1 000 000 ₽")).toBeInTheDocument();
    });

    test("правильно форматирует ежемесячный платёж", () => {
      const offerWithPayment = {
        ...mockOffer,
        monthlyPayment: 12345.67,
      };
      render(<Offer offer={offerWithPayment} onSelect={() => {}} />);

      // Ищем весь текст строки Monthly payment
      const monthlyRow = screen
        .getByText("Monthly payment:")
        .closest(".offer-card__row");
      expect(monthlyRow).toHaveTextContent("12 345,67 ₽");
    });
  });
});
