const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const sharp = require('sharp');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and JPG files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// ATS Analysis function
function analyzeATS(text) {
  let score = 0;
  const analysis = {
    score: 0,
    feedback: [],
    suggestions: []
  };

  // Check for common ATS-friendly elements
  const checks = [
    {
      name: 'Contact Information',
      pattern: /(email|phone|address|linkedin|github)/i,
      points: 10,
      feedback: 'Contact information found'
    },
    {
      name: 'Professional Summary',
      pattern: /(summary|objective|profile|overview)/i,
      points: 15,
      feedback: 'Professional summary/objective found'
    },
    {
      name: 'Work Experience',
      pattern: /(experience|work|employment|job)/i,
      points: 20,
      feedback: 'Work experience section found'
    },
    {
      name: 'Education',
      pattern: /(education|degree|university|college|school)/i,
      points: 10,
      feedback: 'Education section found'
    },
    {
      name: 'Skills',
      pattern: /(skills|technologies|programming|languages)/i,
      points: 15,
      feedback: 'Skills section found'
    },
    {
      name: 'Keywords',
      pattern: /(leadership|management|project|team|develop|design|analyze|implement)/i,
      points: 10,
      feedback: 'Action keywords found'
    },
    {
      name: 'Formatting',
      pattern: /(bullet|list|section|header)/i,
      points: 10,
      feedback: 'Good formatting detected'
    },
    {
      name: 'Quantifiable Results',
      pattern: /(\d+%|\d+x|\$\d+|\d+ people|\d+ projects)/i,
      points: 10,
      feedback: 'Quantifiable results found'
    }
  ];

  checks.forEach(check => {
    if (check.pattern.test(text)) {
      score += check.points;
      analysis.feedback.push(check.feedback);
    }
  });

  // Check for potential issues
  const issues = [
    {
      pattern: /(graphics|images|tables|charts)/i,
      feedback: 'Graphics and images may not be ATS-friendly',
      suggestion: 'Consider using text-based formatting instead of graphics'
    },
    {
      pattern: /(font|color|styling)/i,
      feedback: 'Complex formatting detected',
      suggestion: 'Use simple, clean formatting for better ATS compatibility'
    }
  ];

  issues.forEach(issue => {
    if (issue.pattern.test(text)) {
      analysis.suggestions.push(issue.suggestion);
    }
  });

  analysis.score = Math.min(score, 100);
  
  // Determine if resume is good or bad
  if (analysis.score >= 80) {
    analysis.status = 'Good Resume';
    analysis.statusColor = 'green';
  } else if (analysis.score >= 60) {
    analysis.status = 'Average Resume';
    analysis.statusColor = 'orange';
  } else {
    analysis.status = 'Needs Improvement';
    analysis.statusColor = 'red';
  }

  return analysis;
}

// Routes
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let text = '';
    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    if (fileExtension === '.pdf') {
      // Parse PDF
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (['.jpg', '.jpeg'].includes(fileExtension)) {
      // Process image with OCR
      const { data: { text: ocrText } } = await Tesseract.recognize(filePath, 'eng');
      text = ocrText;
    }

    // Analyze the text for ATS compatibility
    const analysis = analyzeATS(text);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      analysis: analysis,
      originalName: req.file.originalname
    });

  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ATS Checker API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 