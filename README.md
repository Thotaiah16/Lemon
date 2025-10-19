# 🍋 Little Lemon Restaurant - Table Booking System

A modern, responsive table booking application built with **React** for the Little Lemon restaurant. This project is part of the **Meta Frontend Developer Capstone** course on Coursera.

![Little Lemon Logo](public/assets/Logo.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Testing](#testing)
- [Styling](#styling)
- [Development Journey](#development-journey)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Little Lemon Table Booking System is a fully functional web application that allows customers to:
- Browse the restaurant's information and menu
- Select a date and time for their reservation
- Specify the number of guests and occasion
- Submit their booking through an external API
- Receive booking confirmation

This project demonstrates proficiency in **React**, **React Router**, **State Management with useReducer**, **API Integration**, **Form Validation**, and **Unit Testing**.

---

## ✨ Features

### 🎨 User Interface
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Custom Calendar** - Interactive date picker with past date prevention
- **Custom Dropdowns** - Enhanced UX for time and occasion selection
- **Brand-Consistent Styling** - Little Lemon color scheme (#495e57, #f4ce14)

### 🔧 Functionality
- **Dynamic Date Selection** - Calendar with disabled past dates
- **Real-time Time Availability** - Times fetched from external API based on selected date
- **Form Validation** - HTML5 validation with custom error messages
- **Booking Confirmation** - Success page with navigation back to home
- **Smooth Navigation** - React Router with 4 routes (Home, Booking, Confirmed, Specials)

### 🚀 Technical Features
- **External API Integration** - fetchAPI() and submitAPI() from remote source
- **State Management** - useReducer with custom reducer logic
- **Optimistic Updates** - Local state updates for immediate feedback
- **Error Handling** - Graceful fallbacks and user-friendly error messages
- **100% Test Coverage** - All 9 unit tests passing

---

## 🛠️ Technology Stack

### Core Technologies
- **React** 18.2.0 - UI library
- **React Router** 6.30.1 - Client-side routing
- **JavaScript (ES6+)** - Modern JavaScript features

### State Management
- **useReducer** - Complex state logic
- **Custom Reducer** - Date-based time availability

### Testing
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **Mock Functions** - API mocking for isolated tests

### Development Tools
- **Create React App** - Build tooling
- **npm** - Package management
- **Git** - Version control

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/Thotaiah16/Lemon.git
cd Lemon
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🚀 Usage

### Running the Application

**Development Mode:**
```bash
npm start
```
- Runs the app in development mode
- Opens [http://localhost:3000](http://localhost:3000)
- Hot reload enabled

**Production Build:**
```bash
npm run build
```
- Creates optimized production build in `/build` folder
- Minified and ready for deployment

**Run Tests:**
```bash
npm test
```
- Launches test runner in interactive watch mode
- Press `a` to run all tests
- Press `q` to quit

### Making a Reservation

1. Navigate to the **Booking** page (click "Reserve a Table")
2. Select a **date** from the calendar (past dates are disabled)
3. Choose a **time slot** from available options
4. Enter **number of guests** (1-10)
5. Select an **occasion** (Birthday, Anniversary, etc.)
6. Click **"Make Your reservation"**
7. View confirmation page and return to home

---

## 📁 Project Structure

```
Lemons/
├── public/
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO robots file
│   └── assets/                 # Images and icons
│       ├── Logo.svg
│       ├── restauranfood.jpg
│       ├── greek salad.jpg
│       └── ...
│
├── src/
│   ├── index.js                # App entry point
│   ├── index.css               # Global styles
│   ├── App.js                  # Root component with routing
│   ├── App.css                 # App-level styles
│   ├── App.test.js             # App component tests
│   ├── setupTests.js           # Test configuration
│   ├── reportWebVitals.js      # Performance monitoring
│   │
│   ├── components/             # React components
│   │   ├── Main.js             # Main layout with API loader & routing
│   │   ├── Header.js           # Site header with navigation
│   │   ├── Nav.js              # Navigation component
│   │   ├── Hero.js             # Hero section (home page)
│   │   ├── Hero.css            # Hero styles
│   │   ├── Specials.js         # Weekly specials section
│   │   ├── Testimonials.js     # Customer testimonials
│   │   ├── Testimonials.css    # Testimonial styles
│   │   ├── Chicago.js          # About section
│   │   ├── Chicago.css         # About styles
│   │   ├── Footer.js           # Site footer
│   │   ├── Footer.css          # Footer styles
│   │   ├── BookingPage.js      # Booking page wrapper
│   │   ├── BookingForm.js      # Booking form with validation
│   │   ├── BookingForm.css     # Booking form styles
│   │   └── ConfirmedBooking.js # Confirmation page
│   │
│   ├── state/                  # State management
│   │   └── bookingTimes.js     # Reducer for booking times
│   │
│   ├── __tests__/              # Unit tests
│   │   ├── bookingTimes.test.js # Reducer tests (4 tests)
│   │   ├── BookingForm.test.js  # Form interaction tests (2 tests)
│   │   └── submitFlow.test.js   # Submission flow tests (2 tests)
│   │
│   └── assets/                 # Source images
│       └── restauranfood.jpg
│
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
├── FINAL_CHECKLIST.md          # Pre-submission verification
├── PROJECT_CLEAN.md            # Cleanup documentation
└── CLEANUP_REPORT.md           # Before/after cleanup report
```

---

## 🔌 API Integration

### External Booking API

This application integrates with an external booking API provided by Coursera:

**API URL:** `https://raw.githubusercontent.com/courseraap/capstone/main/api.js`

### API Functions

#### `fetchAPI(date)`
- **Purpose:** Retrieve available booking times for a given date
- **Parameter:** `date` - JavaScript Date object
- **Returns:** Array of time strings (e.g., `['17:00', '18:00', '19:00']`)
- **Usage:** Called when user selects a date or on initial page load

#### `submitAPI(formData)`
- **Purpose:** Submit booking reservation
- **Parameter:** `formData` - Object containing `{date, time, guests, occasion}`
- **Returns:** Boolean - `true` if successful, `false` otherwise
- **Usage:** Called when user submits the booking form

### Implementation Details

The API is loaded dynamically via a **fetch-first approach**:

1. Fetch the API script as text from the external URL
2. Create a new script element
3. Set the script content and execute inline
4. This bypasses CORS and MIME type restrictions

```javascript
// Simplified example from Main.js
const response = await fetch(API_URL);
const scriptText = await response.text();
const script = document.createElement('script');
script.textContent = scriptText;
document.head.appendChild(script);
```

**Why not use `<script src="...">`?**  
The external URL serves the file with `text/plain` MIME type, which browsers block. Fetching as text and executing inline solves this issue.

---

## 🎮 State Management

### useReducer Implementation

The application uses React's `useReducer` hook for managing booking time state.

**Reducer File:** `src/state/bookingTimes.js`

### Reducer Actions

#### `initializeTimes()`
- **Purpose:** Initialize available times on component mount
- **Logic:** Calls `window.fetchAPI(new Date())` to get today's times
- **Returns:** Array of time strings

#### `updateTimes(state, action)`
- **Purpose:** Update times based on user actions
- **Actions:**
  - `date-changed` - User selects new date, fetch new times
  - `book-time` - User books a time, remove from available times
  - Default - Return unchanged state

### Usage Example

```javascript
// In Main.js
const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

// When date changes
dispatch({ type: 'date-changed', date: selectedDate });

// When booking confirmed
dispatch({ type: 'book-time', date, time });
```

---

## 🧪 Testing

### Test Coverage: 100% ✅

**Test Suites:** 4 passed  
**Tests:** 9 passed  
**Snapshots:** 0

### Test Files

#### `bookingTimes.test.js` (4 tests)
- ✅ `initializeTimes` returns non-empty array from fetchAPI
- ✅ `updateTimes` with `date-changed` calls fetchAPI with new date
- ✅ `updateTimes` with `book-time` removes time from array
- ✅ `updateTimes` with unknown action returns same state

#### `BookingForm.test.js` (2 tests)
- ✅ Dispatch called with `date-changed` on date select
- ✅ Dispatch called with `book-time` on successful submit
- ✅ Renders static label correctly

#### `submitFlow.test.js` (2 tests)
- ✅ Dispatches `book-time` after successful submitAPI
- ✅ Does NOT dispatch `book-time` when submitAPI fails

#### `App.test.js` (1 test)
- ✅ Renders app header

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test bookingTimes.test.js
```

### Test Mocking

Tests use Jest mocks for the external API:

```javascript
beforeEach(() => {
  global.window = global.window || {};
  global.window.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00']);
});
```

---

## 🎨 Styling

### Design System

**Color Palette:**
- **Primary Green:** `#495e57` - Headers, navigation, buttons
- **Primary Yellow:** `#f4ce14` - Accents, highlights, CTAs
- **Secondary Peach:** `#ee9972` - Secondary elements
- **Highlight Light:** `#edefee` - Backgrounds
- **Highlight Dark:** `#333333` - Text

**Typography:**
- **Headers:** Markazi Text (Google Fonts)
- **Body:** Karla (Google Fonts)

### Responsive Design

- **Desktop:** > 1024px - Full layout with sidebars
- **Tablet:** 768px - 1024px - Adjusted spacing and columns
- **Mobile:** < 768px - Single column, stacked layout

### Custom Styling

- **Custom Calendar:** Styled date picker with disabled past dates
- **Custom Dropdowns:** Enhanced select elements with icons
- **Smooth Transitions:** Hover effects and animations
- **Accessibility:** Focus states and ARIA labels

Global styles are in `src/index.css` and component-specific styles are in individual `.css` files (e.g., `BookingForm.css`).

---

## 🚧 Development Journey

### Phase 1: Initial Setup
- ✅ Create React App initialization
- ✅ Project structure setup
- ✅ Basic routing with React Router
- ✅ Home page components (Hero, Specials, Testimonials)

### Phase 2: Booking Form
- ✅ BookingForm component with validation
- ✅ Custom calendar date picker
- ✅ Custom time/occasion dropdowns
- ✅ Form state management

### Phase 3: API Integration
- ✅ External API loading strategy (fetch-first approach)
- ✅ fetchAPI integration for dynamic times
- ✅ submitAPI integration for booking submission
- ✅ Error handling and fallbacks

### Phase 4: State Management
- ✅ Implement useReducer for booking times
- ✅ Create custom reducer with actions
- ✅ Connect reducer to BookingForm
- ✅ Optimistic updates for better UX

### Phase 5: Confirmation Flow
- ✅ ConfirmedBooking component
- ✅ Navigation after successful submission
- ✅ Success message and return button
- ✅ Route protection

### Phase 6: UX Enhancements
- ✅ Disable past dates in calendar
- ✅ Remove API status messages from UI
- ✅ Smooth transitions and animations
- ✅ Responsive design improvements

### Phase 7: Testing
- ✅ Unit tests for reducer functions
- ✅ Unit tests for form interactions
- ✅ Unit tests for submission flow
- ✅ Mock API functions for isolated tests
- ✅ 100% test pass rate (9/9 tests)

### Phase 8: Production Cleanup
- ✅ Remove unnecessary files
- ✅ Delete debug scripts
- ✅ Clean documentation
- ✅ Professional project structure

---

## 📚 Key Learnings

### React Concepts Mastered
- ✅ Functional components with hooks
- ✅ useReducer for complex state management
- ✅ useEffect for side effects and API calls
- ✅ Custom hooks patterns
- ✅ React Router for navigation

### API Integration
- ✅ Fetch API for HTTP requests
- ✅ Async/await patterns
- ✅ CORS workarounds
- ✅ Error handling and fallbacks

### Testing Best Practices
- ✅ Jest test framework
- ✅ React Testing Library
- ✅ Mock functions and API stubs
- ✅ Test isolation with beforeEach/afterEach

### Production Readiness
- ✅ Clean code structure
- ✅ Professional documentation
- ✅ Error handling
- ✅ Performance optimization

---

## 🤝 Contributing

This is a capstone project for educational purposes. However, if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is part of the Meta Frontend Developer Professional Certificate on Coursera and is for educational purposes.

---

## 👨‍💻 Author

**Thotaiah16**  
- GitHub: [@Thotaiah16](https://github.com/Thotaiah16)
- Repository: [Lemon](https://github.com/Thotaiah16/Lemon)

---






