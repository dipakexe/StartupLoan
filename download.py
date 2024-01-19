"""
This script will download the pre-trained model file from github.
"""

import os
import requests
from tqdm import tqdm

model_url = "https://github.com/dipakexe/smart_loan_approval_models/raw/main/smart_loan_approval.pkl"

model_dest_path = "models/smart_loan_approval.pkl"


def download_file(url, dest_path):
    if os.path.exists(dest_path):
        print(f"{dest_path} already exists. Skipping download.")
        return
    else:
        print(f"Downloading the file to {dest_path}.")

    # Request for the file from the url
    with requests.get(url, stream=True) as response:
        total_size = int(response.headers.get("content-length", 0))

        # Open a file to save the byte stream if the file is found
        with open(dest_path, "wb") as file, tqdm(
            desc=dest_path,
            total=total_size,
            unit="B",
            unit_scale=True,
            unit_divisor=1024,
        ) as bar:
            for data in response.iter_content(chunk_size=1024):
                bar.update(len(data))
                file.write(data)


def download_model(model_url, model_dest_path):
    if not os.path.exists("models"):
        os.makedirs("models/", exist_ok=True)

    # Download the pre-trained model file
    download_file(model_url, model_dest_path)


if __name__ == "__main__":
    download_model(model_url, model_dest_path)
