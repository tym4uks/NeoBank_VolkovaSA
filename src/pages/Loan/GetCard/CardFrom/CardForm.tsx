import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SuccessIcon from "../../../../components/icons/SuccessIcon";
import ErrorIcon from "../../../../components/icons/ErrorIcon";
import FormField from "../../../../components/FormField/FormField";
import "./CardForm.css";

interface FormData {
  amount: number;
  term: string;
  lastName: string;
  firstName: string;
  patronymic?: string;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
}

const termOptions = [
  { value: "6", label: "6 month" },
  { value: "12", label: "12 month" },
  { value: "18", label: "18 month" },
  { value: "24", label: "24 month" },
];

function CardForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [amountValue, setAmountValue] = useState(150000);
  const [inputValue, setInputValue] = useState("");
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {},
  );
  const markTouched = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const formatDisplayValue = (value: number): string => {
    return `${value.toLocaleString("ru-RU")} ₽`;
  };
  useEffect(() => {
    if (focusedField !== "amount") {
      setInputValue(formatDisplayValue(amountValue));
    }
  }, [amountValue, focusedField]);

  const handleAmountFocus = () => {
    setInputValue(amountValue.toString());
    setFocusedField("amount");
  };

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numbersOnly = rawValue.replace(/[^\d]/g, "");
    setInputValue(numbersOnly);
  };
  const handleAmountBlur = () => {
    let numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) {
      numValue = 15000;
    }
    numValue = Math.min(600000, Math.max(15000, numValue));

    setAmountValue(numValue);
    setValue("amount", numValue, { shouldValidate: true });
    setInputValue(formatDisplayValue(numValue)); // форматируем для отображения
    setFocusedField(null);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAmountBlur();
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmountValue(value);
    setValue("amount", value, { shouldValidate: true });
    if (focusedField !== "amount") {
      setInputValue(formatDisplayValue(value));
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  const isValidDate = (date: string) => {
    return !isNaN(Date.parse(date));
  };

  const isAge18Plus = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  };

  return (
    <div className="CardForm_section">
      <h2>How to get a card</h2>

      <div className="steps-list">
        <div className="step-item">
          <div className="step-top-row">
            <div className="step-number">1</div>
            <div className="step-divider"></div>
          </div>
          <div className="step-description">
            Fill out an online application - you do not need to visit the bank
          </div>
        </div>

        <div className="step-item">
          <div className="step-top-row">
            <div className="step-number">2</div>
            <div className="step-divider"></div>
          </div>
          <div className="step-description">
            Find out the bank's decision immediately after filling out the
            application
          </div>
        </div>

        <div className="step-item">
          <div className="step-top-row">
            <div className="step-number">3</div>
            <div className="step-divider"></div>
          </div>
          <div className="step-description">
            The bank will deliver the card free of charge, wherever convenient,
            to your city
          </div>
        </div>
      </div>

      <div className="customize_block">
        <div className="customize-UpBlock">
          <div className="customize-leftBlock">
            <div className="customize-title">
              <h3 className="customize-h3">Customize your card</h3>
              <p className="step-value">Step 1 of 5</p>
            </div>

            <div className="CardForm_AmountBlock">
              <div className="amount-slider-block">
                <label>Select amount</label>
                <div className="amount-value">
                  {amountValue.toLocaleString()}
                </div>
                <input
                  type="range"
                  min="15000"
                  max="600000"
                  step="1000"
                  value={amountValue}
                  onChange={handleSliderChange}
                  className="amount-slider"
                />
                <div className="amount-limits">
                  <span>15 000</span>
                  <span>600 000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="customize-rightBlock">
            <div className="amount-input-block">
              <label>You have chosen the amount</label>
              <div className="amount-input-wrapper">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleAmountInputChange}
                  onFocus={handleAmountFocus}
                  onBlur={handleAmountBlur}
                  onKeyDown={handleKeyDown}
                  className="amount-input"
                  placeholder="0 ₽"
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className="customize-title">Contact Information</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-row">
            <FormField
              label="Your last name"
              error={errors.lastName}
              focusedField={focusedField}
              name="lastName"
              isTouched={touchedFields.lastName}
              required
            >
              <input
                type="text"
                placeholder="For Example Doe"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Latin letters only",
                  },
                  setValueAs: (value) => value?.trim() || "",
                })}
                onFocus={() => {
                  setFocusedField("lastName");
                  markTouched("lastName");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("lastName");
                }}
                className={`${errors.lastName ? "error" : ""} ${focusedField === "lastName" ? "focused" : ""}`}
              />
            </FormField>

            <FormField
              label="Your first name"
              error={errors.firstName}
              focusedField={focusedField}
              name="firstName"
              isTouched={touchedFields.firstName}
              required
            >
              <input
                type="text"
                placeholder="For Example John"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Latin letters only",
                  },
                  setValueAs: (value) => value?.trim() || "",
                })}
                onFocus={() => {
                  setFocusedField("firstName");
                  markTouched("firstName");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("firstName");
                }}
                className={`${errors.firstName ? "error" : ""} ${focusedField === "firstName" ? "focused" : ""}`}
              />
            </FormField>

            <FormField
              label="Your patronymic"
              error={errors.patronymic}
              focusedField={focusedField}
              name="patronymic"
              isTouched={touchedFields.patronymic}
            >
              <input
                type="text"
                placeholder="For Example Victorovich"
                {...register("patronymic", {
                  setValueAs: (value) => value?.trim() || null,
                })}
                onFocus={() => {
                  setFocusedField("patronymic");
                  markTouched("patronymic");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("patronymic");
                }}
                className={focusedField === "patronymic" ? "focused" : ""}
              />
            </FormField>

            <FormField
              label="Select term"
              error={errors.term}
              focusedField={focusedField}
              name="term"
              required
              showIcon={false}
            >
              <select
                {...register("term", { required: "Term is required" })}
                defaultValue="6"
                className={errors.term ? "error" : ""}
              >
                {termOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Ряд 2 */}
          <div className="form-row">
            <FormField
              label="Your email"
              error={errors.email}
              focusedField={focusedField}
              name="email"
              isTouched={touchedFields.email}
              required
            >
              <input
                type="email"
                placeholder="test@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email",
                  },
                  setValueAs: (value) => value?.trim() || "",
                })}
                onFocus={() => {
                  setFocusedField("email");
                  markTouched("email");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("email");
                }}
                className={`${errors.email ? "error" : ""} ${focusedField === "email" ? "focused" : ""}`}
              />
            </FormField>

            <FormField
              label="Your date of birth"
              error={errors.birthdate}
              focusedField={focusedField}
              name="birthdate"
              isTouched={touchedFields.birthdate}
              required
            >
              <input
                type="date"
                {...register("birthdate", {
                  required: "Date of birth is required",
                  validate: {
                    validDate: (value) => isValidDate(value) || "Invalid date",
                    age18plus: (value) =>
                      isAge18Plus(value) || "Must be 18+ years old",
                  },
                })}
                onFocus={() => {
                  setFocusedField("birthdate");
                  markTouched("birthdate");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("birthdate");
                }}
                className={`${errors.birthdate ? "error" : ""} ${focusedField === "birthdate" ? "focused" : ""}`}
              />
            </FormField>

            <FormField
              label="Your passport series"
              error={errors.passportSeries}
              focusedField={focusedField}
              name="passportSeries"
              isTouched={touchedFields.passportSeries}
              required
            >
              <input
                type="text"
                placeholder="0000"
                maxLength={4}
                {...register("passportSeries", {
                  required: "Passport series is required",
                  pattern: { value: /^\d{4}$/, message: "Must be 4 digits" },
                  setValueAs: (value) => value?.trim() || "",
                })}
                onFocus={() => {
                  setFocusedField("passportSeries");
                  markTouched("passportSeries");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("passportSeries");
                }}
                className={`${errors.passportSeries ? "error" : ""} ${focusedField === "passportSeries" ? "focused" : ""}`}
              />
            </FormField>

            <FormField
              label="Your passport number"
              error={errors.passportNumber}
              focusedField={focusedField}
              name="passportNumber"
              isTouched={touchedFields.passportNumber}
              required
            >
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                {...register("passportNumber", {
                  required: "Passport number is required",
                  pattern: { value: /^\d{6}$/, message: "Must be 6 digits" },
                  setValueAs: (value) => value?.trim() || "",
                })}
                onFocus={() => {
                  setFocusedField("passportNumber");
                  markTouched("passportNumber");
                }}
                onBlur={() => {
                  setFocusedField(null);
                  trigger("passportNumber");
                }}
                className={`${errors.passportNumber ? "error" : ""} ${focusedField === "passportNumber" ? "focused" : ""}`}
              />
            </FormField>
          </div>
          <div className="submit-button">
            <button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? <span className="loader"></span> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
