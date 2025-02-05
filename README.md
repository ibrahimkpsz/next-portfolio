# Next Portfolio

Next Portfolio is a portfolio website with an integrated management panel. It allows users to showcase their work while providing an admin dashboard for managing content efficiently.

![screenshot](https://media.licdn.com/dms/image/v2/D4D22AQEeo5OQ__Qyow/feedshare-shrink_2048_1536/B4DZRXworpHUAo-/0/1736639155917?e=1740009600&v=beta&t=qw2azWyrcTg2xBV01wtmvZ-udkNjAX8F5YCGscPty28)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Frontend Overview](#frontend-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Next Portfolio is designed to provide a seamless experience for developers, freelancers, and agencies to create and manage professional portfolios. With its powerful admin panel, users can easily add, edit, and organize their projects, skills, and other portfolio elements.

### Key Motivations

- Simplify the process of creating a dynamic portfolio website.
- Provide a user-friendly admin dashboard for managing portfolio content.
- Leverage modern web technologies for performance and scalability.

## Features

- **Portfolio Showcase**: Display projects with images, descriptions, and links.
- **Admin Dashboard**: Manage projects, skills, experiences, and more through a dedicated panel.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic Content Management**: Update content without needing to touch code.
- **Customizable**: Easily adaptable to various use cases and personal branding.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB etc.
- **Frontend**: Next.js (React framework).
- **Styling**: Tailwind CSS, ShadcnUI.
- **Other Libraries**: Axios, Mongoose, and more for enhanced functionality.
- **Environment Management**: dotenv for handling environment variables.

## Frontend Overview

The frontend of this project ensures a responsive and interactive user experience. Key details include:

- **Framework**: Next.js for server-side rendering and static site generation.
- **Styling**: Tailwind CSS for a highly customizable and efficient styling approach.
- **State Management**: Redux for managing application-level state.
- **Build Tools**: Webpack and Babel, integrated via Next.js.


## Installation

Step-by-step guide to setting up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/ibrahimkpsz/next-portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd client && cd server
   ```
3. Create a `.env` file in the `server` directory and add the following environment variables:
   ```env
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Admin Dashboard

1. Log in to the admin panel at `/login` using your credentials.
2. Once logged in, you'll be redirected to `/dashboard`, where you can add or edit your projects, skills, experiences, and education.
3. Preview changes in real-time on the portfolio page.

### Portfolio Page

1. Navigate to the portfolio URL.
2. Browse projects, skills, and other sections.
3. Use contact links to reach out to the portfolio owner.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

