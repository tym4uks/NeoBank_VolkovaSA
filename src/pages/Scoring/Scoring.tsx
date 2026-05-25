import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApplicationSent, setLoading } from "../../store/loanSlice";
import "./Scoring.css";

interface ScoringFormData {
  gender: string;
  maritalStatus: string;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: string;
  employerINN: string;
  salary: number;
  position: string;
  workExperienceTotal: number;
  workExperienceCurrent: number;
}

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const maritalStatusOptions = [
  { value: "MARRIED", label: "Married" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "SINGLE", label: "Single" },
  { value: "WIDOW_WIDOWER", label: "Widow/Widower" },
];

const employmentStatusOptions = [
  { value: "UNEMPLOYED", label: "Unemployed" },
  { value: "SELF_EMPLOYED", label: "Self Employed" },
  { value: "EMPLOYED", label: "Employed" },
  { value: "BUSINESS_OWNER", label: "Business Owner" },
];

const positionOptions = [
  { value: "WORKER", label: "Worker" },
  { value: "MID_MANAGER", label: "Mid Manager" },
  { value: "TOP_MANAGER", label: "Top Manager" },
  { value: "OWNER", label: "Owner" },
];

function Scoring() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
    watch,
  } = useForm<ScoringFormData>({
    mode: "onChange",
  });

  const formatPassportBranch = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}`;
  };

  const handlePassportBranchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formatted = formatPassportBranch(e.target.value);
    e.target.value = formatted;
    return e;
  };

  const onSubmit = async (data: ScoringFormData) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch(
        `/application/registration/${applicationId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            employerINN: Number(data.employerINN),
          }),
        },
      );

      if (response.ok) {
        dispatch(setApplicationSent(true));
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Scoring submission error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate(`/loan/:applicationId/document`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, applicationId, navigate]);

  if (isSubmitted) {
    return (
      <div className="scoring__success">
        <div className="success-card">
          <h2>Wait for a decision on the application</h2>
          <p>The answer will come to your mail within 10 minutes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scoring">
      <div className="scoring__container">
        <div className="scoring__header">
          <h2>Continuation of the application</h2>
          <p className="scoring__step">Step 2 of 5</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="scoring__section">
            <div className="scoring__grid">
              <div className="form-group">
                <label>What's your gender *</label>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  onFocus={() => setFocusedField("genderOptions")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("gender");
                  }}
                  className={`${errors.gender ? "error" : ""} ${focusedField === "genderOptions" ? "focused" : ""}`}
                >
                  <option value="">Select your gender</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <div className="error-message">{errors.gender.message}</div>
                )}
              </div>

              <div className="form-group">
                <label>Your marital status *</label>
                <select
                  {...register("maritalStatus", {
                    required: "Marital status is required",
                  })}
                  onFocus={() => setFocusedField("maritalStatusOptions")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("maritalStatus");
                  }}
                  className={`${errors.maritalStatus ? "error" : ""} ${focusedField === "maritalStatusOptions" ? "focused" : ""}`}
                >
                  <option value="">Select your marital status</option>
                  {maritalStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {errors.maritalStatus && (
                  <div className="error-message">
                    {errors.maritalStatus.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Your number of dependents *</label>
                <input
                  type="number"
                  placeholder="0"
                  {...register("dependentAmount", {
                    required: "Number of dependents is required",
                    min: { value: 0, message: "Must be 0 or more" },
                  })}
                  onFocus={() => setFocusedField("dependentAmount")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("dependentAmount");
                  }}
                  className={`${errors.dependentAmount ? "error" : ""} ${focusedField === "dependentAmount" ? "focused" : ""}`}
                />
                {errors.dependentAmount && (
                  <div className="error-message">
                    {errors.dependentAmount.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Date of issue of the passport *</label>
                <input
                  type="date"
                  {...register("passportIssueDate", {
                    required: "Passport issue date is required",
                    validate: {
                      notFuture: (value) =>
                        new Date(value) <= new Date() ||
                        "Date cannot be in the future",
                    },
                  })}
                  onFocus={() => setFocusedField("passportIssueDate")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("passportIssueDate");
                  }}
                  className={`${errors.passportIssueDate ? "error" : ""} ${focusedField === "passportIssueDate" ? "focused" : ""}`}
                />
                {errors.passportIssueDate && (
                  <div className="error-message">
                    {errors.passportIssueDate.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Division code *</label>
                <input
                  type="text"
                  placeholder="123-456"
                  maxLength={7}
                  {...register("passportIssueBranch", {
                    required: "Division code is required",
                    pattern: {
                      value: /^\d{3}-\d{3}$/,
                      message: "Must be in format 123-456",
                    },
                  })}
                  onChange={(e) => {
                    const formatted = formatPassportBranch(e.target.value);
                    e.target.value = formatted;
                    register("passportIssueBranch").onChange(e);
                  }}
                  onFocus={() => setFocusedField("passportIssueBranch")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("passportIssueBranch");
                  }}
                  className={`${errors.passportIssueBranch ? "error" : ""} ${focusedField === "passportIssueBranch" ? "focused" : ""}`}
                />
                {errors.passportIssueBranch && (
                  <div className="error-message">
                    {errors.passportIssueBranch.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="scoring__section">
            <h3 className="scoring__section-title">Employment</h3>
            <div className="scoring__grid">
              <div className="form-group">
                <label>Your employment status *</label>
                <select
                  {...register("employmentStatus", {
                    required: "Employment status is required",
                  })}
                  onFocus={() => setFocusedField("employmentStatus")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("employmentStatus");
                  }}
                  className={`${errors.employmentStatus ? "error" : ""} ${focusedField === "employmentStatus" ? "focused" : ""}`}
                >
                  <option value="">Select status</option>
                  {employmentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.employmentStatus && (
                  <div className="error-message">
                    {errors.employmentStatus.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Your employer INN *</label>
                <input
                  type="text"
                  placeholder="123456789012"
                  maxLength={12}
                  {...register("employerINN", {
                    required: "INN is required",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "INN must be 12 digits",
                    },
                  })}
                  onFocus={() => setFocusedField("employerINN")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("employerINN");
                  }}
                  className={`${errors.employerINN ? "error" : ""} ${focusedField === "employerINN" ? "focused" : ""}`}
                />
                {errors.employerINN && (
                  <div className="error-message">
                    {errors.employerINN.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Your salary *</label>
                <input
                  type="number"
                  placeholder="For example 100 000"
                  {...register("salary", {
                    required: "Salary is required",
                    min: { value: 0, message: "Salary must be positive" },
                  })}
                  onFocus={() => setFocusedField("salary")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("salary");
                  }}
                  className={`${errors.salary ? "error" : ""} ${focusedField === "salary" ? "focused" : ""}`}
                />
                {errors.salary && (
                  <div className="error-message">{errors.salary.message}</div>
                )}
              </div>

              <div className="form-group">
                <label>Your position *</label>
                <select
                  {...register("position", {
                    required: "Position is required",
                  })}
                  onFocus={() => setFocusedField("position")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("position");
                  }}
                  className={`${errors.position ? "error" : ""} ${focusedField === "position" ? "focused" : ""}`}
                >
                  <option value="">Select position</option>
                  {positionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <div className="error-message">{errors.position.message}</div>
                )}
              </div>

              <div className="form-group">
                <label>Your work experience total *</label>
                <input
                  type="number"
                  placeholder="For example 5"
                  maxLength={2}
                  {...register("workExperienceTotal", {
                    required: "Total work experience is required",
                    min: { value: 0, message: "Must be 0 or more" },
                    max: { value: 99, message: "Max 99 years" },
                  })}
                  onFocus={() => setFocusedField("workExperienceTotal")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("workExperienceTotal");
                  }}
                  className={`${errors.workExperienceTotal ? "error" : ""} ${focusedField === "workExperienceTotal" ? "focused" : ""}`}
                />
                {errors.workExperienceTotal && (
                  <div className="error-message">
                    {errors.workExperienceTotal.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Your work experience current *</label>
                <input
                  type="number"
                  placeholder="For example 2"
                  maxLength={2}
                  {...register("workExperienceCurrent", {
                    required: "Current work experience is required",
                    min: { value: 0, message: "Must be 0 or more" },
                    max: { value: 99, message: "Max 99 years" },
                    validate: {
                      lessThanTotal: (value, formValues) =>
                        value <= (formValues.workExperienceTotal || 0) ||
                        "Current experience cannot exceed total experience",
                    },
                  })}
                  onFocus={() => setFocusedField("workExperienceCurrent")}
                  onBlur={() => {
                    setFocusedField(null);
                    trigger("workExperienceCurrent");
                  }}
                  className={`${errors.workExperienceCurrent ? "error" : ""} ${focusedField === "workExperienceCurrent" ? "focused" : ""}`}
                />
                {errors.workExperienceCurrent && (
                  <div className="error-message">
                    {errors.workExperienceCurrent.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="scoring__button"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? <span className="loader"></span> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Scoring;
