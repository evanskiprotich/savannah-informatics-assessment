# Savannah Informatics Frontend Engineer Assessment

A photo gallery application that consumes data from the JSONPlaceholder API. This application allows users to explore users, albums, and photos, with features such as user authentication, responsive design, and photo title editing.

## Features

- **User Authentication**: Simulated login using email or OAuth providers (Google, Facebook, GitHub).
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **User Management**:
  - View users with their album counts.
  - View user details and their albums.
- **Album Management**:
  - View album details and associated photos.
- **Photo Management**:
  - View photo details.
  - Edit photo titles.
- **CI/CD Pipelines**:
  - Automated testing and deployment using GitHub Actions.
- **Unit Testing**: Comprehensive unit tests using Vitest and Testing Library.
- **Proper Documentation**: Detailed documentation for setup and usage.

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - React Router
  - Axios
  - React Toastify
- **Testing**:
  - Vitest
  - @testing-library/react
  - @testing-library/jest-dom
- **CI/CD**:
  - GitHub Actions
  - Vercel (for deployment)
- **OAuth**:
  - Google OAuth

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/evanskiprotich/savannah-informatics-assessment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd savannah-informatics-assessment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`.

### Running Tests

To run unit tests:

```bash
npm test
```

To generate a coverage report:

```bash
npm run coverage
```

### Linting and Formatting

To lint the code:

```bash
npm run lint
```

To format the code:

```bash
npm run format
```

### Deployment

The application is deployed to Vercel. To deploy manually:

1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Vercel.

## Project Structure

```
src/
├── api/                # API service files for JSONPlaceholder
├── components/         # Reusable React components
├── contexts/           # Context providers (e.g., AuthContext)
├── pages/              # Page components for routing
├── services/           # OAuth-related services
├── App.jsx             # Main application component
├── main.jsx            # Entry point for the React app
├── index.css           # Global styles
└── setupTests.js       # Test setup file
```

## Environment Variables

The following environment variables are required for OAuth and deployment:

- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth Client ID.
- `VERCEL_TOKEN`: Vercel deployment token.
- `VERCEL_ORG_ID`: Vercel organization ID.
- `VERCEL_PROJECT_ID`: Vercel project ID.

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The pipeline includes:

1. **Testing**:
   - Runs unit tests.
   - Lints and formats the code.
2. **Deployment**:
   - Automatically deploys to Vercel on pushes to the `master` branch.

### Workflow Files

- **CI Workflow**: `.github/workflows/ci.yml`
- **CD Workflow**: `.github/workflows/cd.yml`

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Developed by [Evans Kiprotich](https://github.com/evanskiprotich).
