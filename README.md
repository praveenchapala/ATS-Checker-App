# ATS Checker App

A modern web application that analyzes resumes for ATS (Applicant Tracking System) compatibility. The app allows users to upload their resumes in PDF or JPG format and provides a comprehensive analysis with a percentage score and detailed feedback.

## Features

- 📄 **File Upload**: Support for PDF and JPG/JPEG files (max 10MB)
- 🎯 **ATS Analysis**: Comprehensive analysis of resume content for ATS compatibility
- 📊 **Score Display**: Visual percentage score with color-coded results
- ✅ **Detailed Feedback**: Positive elements found in the resume
- 💡 **Suggestions**: Improvement suggestions for better ATS compatibility
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 🔒 **File Validation**: Secure file type and size validation

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **Tesseract.js** - OCR for image processing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **React Dropzone** - File upload component
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Modern styling with gradients and animations

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ats-checker-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 3000).

## Usage

1. **Open the application** in your browser at `http://localhost:3000`

2. **Upload your resume** by either:
   - Dragging and dropping a PDF or JPG file onto the upload area
   - Clicking the upload area to select a file

3. **Analyze the resume** by clicking the "Analyze Resume" button

4. **Review the results**:
   - **Score**: Percentage-based ATS compatibility score
   - **Status**: Overall assessment (Good Resume, Average Resume, or Needs Improvement)
   - **Feedback**: Positive elements found in your resume
   - **Suggestions**: Areas for improvement

## ATS Analysis Criteria

The app analyzes resumes based on the following criteria:

### Positive Elements (Score Points)
- **Contact Information** (10 points) - Email, phone, address, LinkedIn, GitHub
- **Professional Summary** (15 points) - Summary, objective, profile, overview
- **Work Experience** (20 points) - Experience, work, employment, job sections
- **Education** (10 points) - Education, degree, university, college, school
- **Skills** (15 points) - Skills, technologies, programming, languages
- **Keywords** (10 points) - Action keywords like leadership, management, project
- **Formatting** (10 points) - Bullet points, lists, sections, headers
- **Quantifiable Results** (10 points) - Numbers, percentages, metrics

### Scoring System
- **80-100%**: Good Resume (Green)
- **60-79%**: Average Resume (Orange)
- **0-59%**: Needs Improvement (Red)

## API Endpoints

### POST `/api/upload`
Upload and analyze a resume file.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `resume` (file)

**Response:**
```json
{
  "success": true,
  "analysis": {
    "score": 85,
    "status": "Good Resume",
    "statusColor": "green",
    "feedback": ["Contact information found", "Work experience section found"],
    "suggestions": []
  },
  "originalName": "resume.pdf"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "ATS Checker API is running"
}
```

## Development

### Project Structure
```
ats-checker-app/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── App.tsx        # Main component
│   │   ├── App.css        # Component styles
│   │   ├── index.tsx      # Entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── uploads/               # Temporary file storage
├── package.json           # Root dependencies
└── README.md             # Documentation
```

### Available Scripts

**Root Directory:**
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install all dependencies

**Server Directory:**
- `npm run dev` - Start server with nodemon (auto-restart on changes)
- `npm start` - Start server in production mode

**Client Directory:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository. 