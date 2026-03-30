# Electric Vehicle Recharge Bunk

EV Charging Slot Booking System - A web application for finding and booking EV charging stations.

## Overview

Electric Vehicle Recharge Bunk is a full-stack web application that allows EV owners to discover nearby charging stations and book charging slots. Administrators can manage charging stations (bunks) and their available time slots.

## Features

### Admin Module
- Admin Registration & Authentication
- Add/Manage EV Charging Bunks with Mapbox location
- Add/Remove Recharge Time Slots
- Real-time slot management

### User Module
- User Registration & Authentication
- View nearby EV charging stations on interactive map
- Search and view bunk details (address, contact)
- View real-time slot availability
- Book available charging slots
- View booking history

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Authentication + Firestore)
- **Maps**: Mapbox GL JS
- **Hosting**: Firebase Hosting

## Project Structure

```
ev-recharge-bunk/
├── index.html              # Main entry point
├── config/
│   └── firebase.js         # Firebase configuration
├── shared/
│   ├── styles.css          # Global styles
│   └── utils.js            # Shared utilities & logger
├── admin/
│   ├── login.html          # Admin login
│   ├── register.html       # Admin registration
│   └── dashboard.html      # Admin dashboard
├── user/
│   ├── login.html          # User login
│   ├── register.html      # User registration
│   └── dashboard.html     # User dashboard
└── docs/                   # Documentation
```

## Setup Instructions

### Prerequisites
- Node.js (optional, for local development)
- Firebase Account
- Mapbox Account

### Step 1: Clone the Repository
```bash
git clone https://github.com/siuuuvam/ev-recharge-bunk.git
cd ev-recharge-bunk
```

### Step 2: Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password provider)
4. Enable **Firestore Database**
5. Copy your Firebase config
6. Update `shared/utils.js` with your Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 3: Configure Mapbox
1. Go to [Mapbox](https://www.mapbox.com/)
2. Create an account and get your access token
3. Replace `YOUR_MAPBOX_ACCESS_TOKEN` in:
   - `admin/dashboard.html`
   - `user/dashboard.html`

### Step 4: Set Up Firestore Security Rules
In Firebase Console > Firestore > Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Bunks - everyone can read, only admins can write
    match /bunks/{bunkId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.adminIds;
    }
    
    // Slots - read all, write for admins
    match /slots/{slotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings - users can read/write their own
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Step 5: Run Locally
Simply open `index.html` in a browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then navigate to `http://localhost:8000`

## Usage Guide

### As Admin:
1. Register at `/admin/register.html`
2. Login at `/admin/login.html`
3. Add EV charging bunks by clicking on the map
4. Add time slots for each bunk

### As User:
1. Register at `/user/register.html`
2. Login at `/user/login.html`
3. View nearby charging stations on the map
4. Click on a bunk to view details
5. Book an available slot

## Logging

The application includes comprehensive logging for all actions:
- User login/register events
- Bunk CRUD operations
- Slot booking/cancellation
- Errors and exceptions

Logs are available in the browser console.

## Deployment

### Deploy to Firebase Hosting:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## License

MIT License

## Author

- GitHub: [siuuuvam](https://github.com/siuuuvam)
