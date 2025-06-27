window.sendOTP = async () => {
  const phoneNumber = "+91" + document.getElementById("phone").value;
  
  // Validate phone number
  if (!/^\+91\d{10}$/.test(phoneNumber)) {
    showError("Invalid Indian phone number (10 digits required)");
    return;
  }

  try {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });
    
    const confirmation = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
    window.confirmationResult = confirmation;
    
    // UI updates
    document.getElementById("otp-section").style.display = "block";
    showSuccess("OTP sent successfully!");
    
  } catch (error) {
    handleAuthError(error);
  }
};

function handleAuthError(error) {
  const errorMap = {
    "auth/invalid-phone-number": "Invalid phone number format",
    "auth/too-many-requests": "Too many attempts. Try again later",
    "auth/quota-exceeded": "SMS quota exceeded. Contact support"
  };
  
  showError(errorMap[error.code] || "Authentication failed. Please try again.");
}

// UI Helper Functions
function showError(message) {
  const errorEl = document.getElementById("error-message");
  errorEl.textContent = message;
  errorEl.style.color = "red";
}

function showSuccess(message) {
  const successEl = document.getElementById("success-message");
  successEl.textContent = message;
  successEl.style.color = "green";
}