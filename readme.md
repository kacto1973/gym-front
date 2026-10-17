# Gym Membership Manager

A clean, full-stack web application designed to help gym owners efficiently manage their clients' memberships, track expiration dates, and maintain essential emergency contact information.

## 🎯 Goal
Create an intuitive, easy-to-use platform that allows a gym owner to properly manage and organize client gym memberships without unnecessary complexity.

## 🚀 Tech Stack
**Frontend:**
* React
* Tailwind CSS

**Backend:**
* Node.js
* Express.js
* MongoDB

## ✨ Core Features
* **Client Dashboard:** Visual grid of client cards displaying essential membership information.
* **Smart Search:** Filter entries by Client ID or Name to quickly verify membership status.
* **Membership Management:** Quick-action buttons inside a modal to easily extend a client's term by +1 Month, +3 Months, or +1 Year.
* **Status Badges:** Visual labels to instantly recognize membership standing:
  * 🟢 **Active:** Currently running membership.
  * 🟡 **Expiring Soon:** Less than 7 days left on the term.
  * 🔴 **Expired:** Term has concluded.
* **Detailed Profiles:** Store and access critical client information, including emergency contacts and basic medical notes (e.g., "Asthma - carries inhaler").

## 🗄️ Database Design
The application runs on a single main MongoDB collection for simplicity and performance. 

**Client Schema:**
```javascript
{
  name: String,
  phoneNumber: String,
  emergencyContact: String,
  notes: String,
  startOfTerm: Date,
  endOfTerm: Date,
  active: Boolean
}