import pickle
import pandas as pd
from flask import Flask, request, render_template, jsonify, redirect

app = Flask(__name__)


@app.before_request
def redirect_to_home():
    if (
        request.path != "/"
        and request.path != "/apply"
        and not request.path.startswith("/static")
    ):
        return redirect("/")


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/apply")
def apply():
    required_amount = request.form.get("required_amount", type=int)
    sba_guaranteed_amount = request.form.get("sba_guaranteed_amount", type=int)
    charged_off_amount = request.form.get("charged_off_amount", type=int)
    approved_amount = request.form.get("approved_amount", type=int)
    jobs_created = request.form.get("jobs_created", type=int)
    jobs_retained = request.form.get("jobs_retained", type=int)
    num_employees = request.form.get("num_employees", type=int)
    loan_term_months = request.form.get("loan_term_months", type=int)
    business_type = request.form.get("business_type", type=int)
    urban_rural = request.form.get("urban_rural", type=int)

    model = pickle.load(open("models/smart_loan_approval.pkl", "rb"))

    """
    We're looking at whether a loan gets approved or not.

    We need to check these things:
    - How much money the person wants to borrow (the requested amount).
    - How much money the bank is willing to lend (approved amount).
    - How much money the Small Business Administration (SBA) guarantees for the loan (SBA guaranteed amount).
    - The number of jobs the business will create.
    - The number of jobs the business will keep.
    - The total number of people employed by the business.
    - Whether the business is new or old.
    - Whether the business is in a city (urban) or the countryside (rural).
    """

    df = pd.DataFrame(
        {
            "jobs_created": [jobs_created],  # 0 to 5
            "jobs_retained": [jobs_retained],  # 0 to 10
            "num_employees": [num_employees],  # 0 to 11
            "loan_term_months": [loan_term_months],  # 0 to 120 months
            "disbursement_amount": [required_amount],  # 5000 to 20,00,000
            "sba_guaranteed_amount": [sba_guaranteed_amount],  # 500 to 50000
            "charged_off_amount": [charged_off_amount],  # 0 to 100,000
            "approved_amount": [approved_amount],  # 1000 to 90000
            "business_type": [business_type],  # 1=existing, 2=new business
            "urban_rural": [urban_rural],  # 1=urban, 2=rural
        }
    )

    loan_status = model.predict(df)

    return jsonify({"loan_application_status": str(loan_status[0])})


if __name__ == "__main__":
    app.run(debug=True)
