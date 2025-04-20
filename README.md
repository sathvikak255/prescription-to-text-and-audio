Prescription to Text and Audio
📖 About the Project
This project is an extension of the ScanPlus system, which is designed to convert handwritten doctor's prescriptions into machine-readable text. It uses Optical Character Recognition (OCR) and Named Entity Recognition (NER) models to extract information like medicine names, dosages, and schedules. My version builds on this core functionality and adds a Text-to-Speech (TTS) feature to enhance accessibility, especially for people with disabilities such as visual impairments or reading difficulties.

Key Features:
OCR Integration: Uses OCR techniques to convert handwritten prescriptions into machine-readable text.

NER Model: Classifies the extracted text to identify relevant categories such as medicine names and dosages. The NER model is the same one used in the original ScanPlus project, which leverages BERT Embedding, CHAR CNN-BiLSTM, and CRF techniques.

Text-to-Speech (TTS): Converts the processed prescription text (medicine names, dosages, and instructions) into audio, making it easier for patients with disabilities to access the information.

Email Alert System (Optional): Sends an email alert with the prescription details (medicines, doses, schedules) to the registered patient’s email address. This feature is based on the original ScanPlus project and can be optionally included.

⚙️ Approach
This project enhances the ScanPlus pipeline by focusing on improving accessibility for patients, especially those with visual or cognitive impairments.

The workflow:

OCR (Optical Character Recognition) converts handwritten prescriptions into machine-readable text.

NER (Named Entity Recognition): The extracted text is processed by the same NER model from ScanPlus, which identifies medicine names, dosages, and schedules.

Text-to-Speech (TTS): The extracted information is converted into speech, making the prescription information accessible for visually impaired patients.

(Optional) Email Alerts: A notification containing the prescription information is sent to the patient's registered email address.

🛠️ Technologies Used
Python

Tesseract OCR for text extraction

BERT and BiLSTM-CRF for NER (Named Entity Recognition)

Text-to-Speech (TTS): For making prescriptions accessible through speech

Flask: For web interface (if applicable)

Cron Jobs: For scheduling tasks (if included)

AWS (optional): For cloud deployment of the model and services (only if applicable)

👩‍💻 Installation
Clone this repository:

bash
Copy
Edit
git clone https://github.com/sathvikak255/prescription-to-text-and-audio.git
cd prescription-to-text-and-audio
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the application (if applicable):

bash
Copy
Edit
python app.py
Use the TTS feature by uploading a prescription image, and the app will generate both text and speech output.

🎓 About ScanPlus
ScanPlus is a powerful system that aims to digitize handwritten prescriptions and categorize them automatically. Here’s a quick overview of what ScanPlus does:

AWS Textract: Extracts text from handwritten prescriptions.

NER (Named Entity Recognition): Classifies extracted text into categories like medicine names and dosages.

Alert System: Sends an email with prescription details to the patient's registered email.

For more information, check out the original ScanPlus repository.

📝 License
This project is licensed under the MIT License – see the LICENSE file for details.

🎯 Additional Notes
This project highlights the importance of making healthcare information accessible to everyone, especially patients with disabilities. By converting prescription details into speech, we aim to reduce the barriers faced by people with visual impairments and help them better manage their health.

