import React, { useRef, useState } from "react";
import ProcessingLoanLabel from "./ProcessingLoan";

const ApplicationForm = () => {
  const applicationFormRef = useRef(null);
  const [loanStatus, setLoanStatus] = useState("");

  const handleApplication = (e) => {
    e.preventDefault();

    const formValidity = applicationFormRef.current.reportValidity();

    if (formValidity) {
      setLoanStatus("processing");
      const formData = new FormData(applicationFormRef.current);
      fetch("/apply", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(({ loan_application_status }) => {
          setTimeout(() => {
            setLoanStatus(loan_application_status);
          }, 3000);
        });
    }
  };

  return (
    <form ref={applicationFormRef} onSubmit={(e) => e.preventDefault()}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.2em",
          marginBottom: "30px",
          color: "#333",
        }}
      >
        Secure a Business Loan by Filling the application form
      </h1>
      <div>
        <label htmlFor="required_amount">
          Enter the required amount (in USD)
        </label>
        <input
          min={"5000"}
          max={"2000000"}
          name={"required_amount"}
          step={"1000"}
          type={"number"}
          required={true}
        />
      </div>
      <div>
        <label htmlFor="sba_guaranteed_amount">
          Enter the SBA guaranteed amount (in USD)
        </label>
        <input
          min={"500"}
          max={"50000"}
          name={"sba_guaranteed_amount"}
          step={"500"}
          type={"number"}
          required={true}
        />
      </div>{" "}
      <div>
        <label htmlFor="charged_off_amount">
          Enter the perviously charged-off amount (in USD)
        </label>
        <input
          min={"0"}
          max={"100000"}
          name={"charged_off_amount"}
          step={"1"}
          type={"number"}
          required={true}
        />
      </div>{" "}
      <div>
        <label htmlFor="approved_amount">
          Enter the expected amount approved by bank (in USD)
        </label>
        <input
          min={"1000"}
          max={"90000"}
          name={"approved_amount"}
          step={"500"}
          type={"number"}
          required={true}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="jobs_created">
          Enter the number of persons employed
        </label>
        <select name="jobs_created">
          {["No jobs created", 1, 2, 3, 4, 5].map((persons, index) => (
            <option
              value={persons === "No jobs created" ? 0 : persons}
              key={index}
            >
              {persons}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="jobs_retained">Enter the number of jobs retained</label>
        <select name="jobs_retained">
          {["No jobs retained", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (persons, index) => (
              <option
                value={persons === "No jobs retained" ? 0 : persons}
                key={index}
              >
                {persons}
              </option>
            )
          )}
        </select>
      </div>{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="num_employees">Enter the number of employees</label>
        <select name="num_employees">
          {["Self-employed", 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (persons, index) => (
              <option
                value={persons === "No jobs retained" ? 1 : persons}
                key={index}
              >
                {persons}
              </option>
            )
          )}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="business_type">Enter the business type</label>
        <select name="business_type">
          {["Existing Business", "New Business"].map((business_type, index) => (
            <option
              value={business_type === "Existing Business" ? 1 : 2}
              key={index}
            >
              {business_type}
            </option>
          ))}
        </select>
      </div>{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="urban_rural">Enter the area type</label>
        <select name="urban_rural">
          {["Urban Area", "Rural Area"].map((area_type, index) => (
            <option value={area_type === "Urban Area" ? 1 : 2} key={index}>
              {area_type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="loan_term_months">
          Enter the loan term (in Months)
        </label>
        <input
          min={"0"}
          max={"120"}
          name={"loan_term_months"}
          step={"1"}
          type={"number"}
          required={true}
        />
      </div>
      <section>
        {loanStatus === "" && <span>It is fully automated. Apply now.</span>}
        {loanStatus === "processing" && (
          <div style={{ color: "black" }}>
            <ProcessingLoanLabel />
          </div>
        )}
        {loanStatus === "Charge-off" && (
          <span style={{ color: "red" }}>Loan application rejected.</span>
        )}
        {loanStatus === "Paid in Full" && (
          <span style={{ color: "green" }}>Loan application approved.</span>
        )}
      </section>
      <section
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <button onClick={handleApplication}>Apply</button>
        <button type="reset" onClick={() => setLoanStatus("")}>
          reset
        </button>
      </section>
    </form>
  );
};

export default ApplicationForm;
