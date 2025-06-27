# Secure-doc-share
using HTML, CSS, Javascript and firebase
# Secure & Share Govt Documents

A digital platform for citizens to store and share important government documents linked to their Aadhaar numbers.

## Features

- Phone number + OTP authentication
- Document upload (PAN, Passport, Marksheets, etc.)
- Secure document storage
- Share documents with family members
- Profile management

## Technologies

- Frontend: HTML, CSS, JavaScript
- Backend: Firebase (Authentication, Firestore, Storage)
- Hosting: Firebase Hosting

## Setup

1. Clone the repository
2. Add your Firebase config in `public/js/firebase-config.js`
3. Open `index.html` in a browser

## Workflow

1. User registers with phone number (OTP verification)
2. User uploads documents
3. User adds family members
4. User can share documents with family members
5. Family members can access shared documents
