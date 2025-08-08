# Quick Start Guide

## Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation Steps

### Option 1: Automated Installation (Recommended)

**Windows (PowerShell):**
```powershell
# Run the PowerShell script
.\install.ps1

# Or run the batch file
.\install.bat
```

**Unix/Mac:**
```bash
chmod +x install.sh
./install.sh
```

### Option 2: Manual Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install server dependencies:**
   ```bash
   # Windows PowerShell
   cd server
   npm install
   cd ..
   
   # Unix/Mac
   cd server && npm install && cd ..
   ```

3. **Install client dependencies:**
   ```bash
   # Windows PowerShell
   cd client
   npm install
   cd ..
   
   # Unix/Mac
   cd client && npm install && cd ..
   ```

## Starting the Application

1. **Start both frontend and backend:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend development server on `http://localhost:3000`

2. **Open your browser** and navigate to `http://localhost:3000`

## Testing the Application

1. **Prepare a test resume** in PDF or JPG format
2. **Upload the resume** by dragging and dropping or clicking the upload area
3. **Click "Analyze Resume"** to process the file
4. **Review the results** including:
   - ATS compatibility score (percentage)
   - Overall status (Good/Average/Needs Improvement)
   - Detailed feedback
   - Improvement suggestions

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Backend: Change port in `server/index.js` (line 8)
   - Frontend: React will automatically suggest an alternative port

2. **File upload fails:**
   - Ensure file is PDF or JPG/JPEG format
   - Check file size (max 10MB)
   - Verify server is running on port 5000

3. **Dependencies not found:**
   - Run `npm install` in the respective directories
   - Clear npm cache: `npm cache clean --force`

4. **PowerShell execution policy error:**
   - Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
   - Then try running the PowerShell script again

### Development Commands

- **Frontend only:** `npm run client`
- **Backend only:** `npm run server`
- **Build for production:** `npm run build`

## File Structure

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
├── uploads/               # Temporary file storage (auto-created)
├── package.json           # Root dependencies
├── install.ps1           # PowerShell installation script
├── install.bat           # Windows batch installation script
├── install.sh            # Unix/Mac installation script
└── README.md             # Full documentation
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the ATS analysis criteria in `server/index.js`
- Modify the UI styling in `client/src/App.css`
- Add additional file format support if needed 