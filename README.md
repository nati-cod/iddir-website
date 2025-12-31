# Iddir Management System

A modern, feature-rich web application for managing Iddirs (traditional Ethiopian community associations). Built with vanilla JavaScript, HTML5, and CSS3, featuring stunning animations and a beautiful UI/UX.

## Features

### Core Functionality
- **Public & Private Iddir Search**: Search for iddirs by name, with password protection for private iddirs
- **Iddir Creation**: Create new iddirs with customizable settings
- **User Management**: Users can create one iddir and join multiple iddirs
- **Dashboard**: Comprehensive dashboard for managing your iddirs

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process required - it's a pure vanilla JavaScript application!

## File Structure

```
├── index.html          # Main HTML file
├── styles/
│   ├── main.css        # Main stylesheet
│   ├── animations.css  # Animation styles
│   └── dark-mode.css   # Dark mode styles
├── js/
│   ├── app.js          # Main application logic
│   ├── cursor.js       # Custom cursor effects
│   ├── animations.js   # Animation utilities
│   ├── dark-mode.js    # Dark mode toggle
│   ├── scroll-effects.js # Scroll and parallax effects
│   ├── form-handler.js # Form handling and validation
│   └── search.js       # Search functionality
└── README.md           # This file
```

## Usage

### Creating an Iddir
1. Click "Get Started" or navigate to the Create section
2. Fill in the form with:
   - Iddir name
   - Admin name
   - Calendar type (Gregorian/Ethiopian)
   - Monthly payment amount
   - Penalty amount
   - Visibility (Public/Private)
   - Password
3. Click "Create Iddir"

### Searching for Iddirs
1. Navigate to the Search section
2. Choose between Public or Private search
3. Enter the iddir name (and password for private iddirs)
4. View search results

### User Authentication
1. Click the "Login" button in the navigation
2. Register a new account or login with existing credentials
3. Your session is saved in localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- LocalStorage for data persistence


## Future Enhancements

- Backend API integration
- Database storage
- Real-time updates
- Member management features
- Payment tracking
- Financial reports
- Email notifications

**Non-Commercial License**

Copyright (c) 2024 Natnael Belete

This project and its source code are provided for **educational and personal use only**.

**You are permitted to:**
- View and study the code
- Test and run the application locally
- Use it as a learning resource
- Reference it for your own non-commercial projects

**You are NOT permitted to:**
- Use this project or any part of it for commercial purposes
- Sell, rent, or lease the software
- Use it in any commercial product or service
- Redistribute it commercially
- Remove or alter copyright notices

For commercial licensing inquiries, please contact the author.

All rights reserved.

## Credits

Developed with modern web technologies and best practices for a beautiful, animated user experience.

