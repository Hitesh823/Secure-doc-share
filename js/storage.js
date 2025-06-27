window.handleUpload = async () => {
  const file = document.getElementById("docUpload").files[0];
  
  // Validate file
  if (!file) {
    showError("No file selected");
    return;
  }

  // Validate file type
  const validTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    showError("Only PDF, JPG, and PNG files allowed");
    return;
  }

  try {
    // Show preview
    if (file.type.startsWith("image/")) {
      showImagePreview(file);
    } else {
      showPDFPreview(file);
    }

    // Upload to Firebase
    const userId = auth.currentUser.uid;
    const docType = document.getElementById("doc-type").value;
    const storageRef = storage.ref(`users/${userId}/${docType}/${file.name}`);
    
    const uploadTask = storageRef.put(file);
    
    uploadTask.on("state_changed",
      (snapshot) => {
        // Progress tracking
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("upload-progress").value = progress;
      },
      (error) => {
        handleUploadError(error);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        saveDocumentMetadata(userId, file.name, url, docType);
        showSuccess("Upload complete!");
      }
    );
    
  } catch (error) {
    handleUploadError(error);
  }
};

// Preview Functions
function showImagePreview(file) {
  const preview = document.getElementById("preview-container");
  preview.innerHTML = `<img src="${URL.createObjectURL(file)}" class="preview-image">`;
}

function showPDFPreview(file) {
  const preview = document.getElementById("preview-container");
  preview.innerHTML = `
    <div class="pdf-preview">
      <i class="fas fa-file-pdf"></i>
      <p>${file.name}</p>
    </div>
  `;
}