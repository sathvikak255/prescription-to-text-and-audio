document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded ✅");

  const form = document.getElementById("uploadForm");
  const resultBox = document.getElementById("result");
  const medicineNames = document.getElementById("medicineNames");
  const audioPlayer = document.getElementById("audioPlayer");
  const uploadBtn = document.getElementById("uploadBtn");
  const loadingStatus = document.getElementById("loadingStatus");

  uploadBtn.addEventListener("click", function () {
    this.style.backgroundColor = "#6c757d";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted 📤");

    loadingStatus.textContent = "Loading...";

    uploadBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        medicineNames.textContent = error.error || "Something went wrong!";
        resultBox.style.display = "block";
        audioPlayer.style.display = "none";
        loadingStatus.textContent = "";
        uploadBtn.style.backgroundColor = "#dc3545";
        uploadBtn.disabled = false;
        console.error("Upload failed ❌", error);
        return;
      }

      const data = await response.json();
      console.log("Upload successful ✅", data);

      medicineNames.textContent = data.medicines;
      audioPlayer.src = data.audio_url;
      audioPlayer.style.display = "block";
      resultBox.style.display = "block";

      loadingStatus.textContent = "Done!";
      uploadBtn.style.backgroundColor = "#28a745";
    }
    catch (err) {
      console.error("Error occurred 🚨", err);
      medicineNames.textContent = "An error occurred during upload.";
      resultBox.style.display = "block";
      audioPlayer.style.display = "none";
      loadingStatus.textContent = "";
      uploadBtn.style.backgroundColor = "#dc3545";
    }

    uploadBtn.disabled = false;
  });
});
