import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import SuccessIcon from "../icons/SuccessIcon";
import ErrorIcon from "../icons/ErrorIcon";

interface FormFieldProps {
  label: string;
  error?: FieldError;
  focusedField: string | null;
  name: string;
  children: ReactNode;
  isTouched?: boolean;
  required?: boolean;
  showIcon?: boolean;
}

function FormField({
  label,
  error,
  focusedField,
  name,
  children,
  isTouched,
  required = false,
  showIcon = true,
}: FormFieldProps) {
  const isFocused = focusedField === name;
  const showValidationIcon = showIcon && !isFocused && isTouched;

  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="input-wrapper">
        {children}
        {showValidationIcon && (
          <span className="field-icon">
            {error ? <ErrorIcon size={18} /> : <SuccessIcon size={18} />}
          </span>
        )}
      </div>
      {error && <div className="error-message">{error.message}</div>}
    </div>
  );
}

export default FormField;
