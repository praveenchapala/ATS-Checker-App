import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FiUpload, FiFile, FiAlertCircle } from 'react-icons/fi';
import './App.css';

interface ATSAnalysis {
  score: number;
  status: string;
  statusColor: string;
  feedback: string[];
  suggestions: string[];
}

interface UploadResponse {
  success: boolean;
  analysis: ATSAnalysis;
  originalName: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(null);
      setAnalysis(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post<UploadResponse>('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setAnalysis(response.data.analysis);
      } else {
        setError('Failed to analyze resume');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good resume':
        return 'status-badge good';
      case 'average resume':
        return 'status-badge average';
      case 'needs improvement':
        return 'status-badge needs-improvement';
      default:
        return 'status-badge';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  return (
    <div className="App">
      <div className="container">
        <header className="card">
          <h1>🎯 ATS Checker App</h1>
          <p>Upload your resume to check its ATS (Applicant Tracking System) compatibility</p>
        </header>

        <div className="card">
          <h2>Upload Resume</h2>
          <p>Supported formats: PDF, JPG, JPEG (Max size: 10MB)</p>
          
          <div
            {...getRootProps()}
            className={`upload-area ${isDragActive ? 'dragover' : ''}`}
          >
            <input {...getInputProps()} />
            <FiUpload size={48} color="#667eea" />
            <p>
              {isDragActive
                ? 'Drop the resume here...'
                : 'Drag & drop a resume here, or click to select'}
            </p>
          </div>

          {file && (
            <div className="file-info">
              <FiFile size={20} />
              <span>{file.name}</span>
              <button className="btn" onClick={handleUpload} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          )}

          {error && (
            <div className="error">
              <FiAlertCircle size={20} />
              {error}
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing your resume...</p>
            </div>
          )}
        </div>

        {analysis && (
          <div className="card">
            <h2>ATS Analysis Results</h2>
            
            <div className="analysis-header">
              <div 
                className="score-circle"
                style={{ 
                  '--score': analysis.score,
                  background: getScoreColor(analysis.score)
                } as React.CSSProperties}
              >
                {analysis.score}%
              </div>
              
              <div className="status-section">
                <h3>Overall Status</h3>
                <span className={getStatusBadgeClass(analysis.status)}>
                  {analysis.status}
                </span>
              </div>
            </div>

            {analysis.feedback.length > 0 && (
              <div className="feedback-section">
                <h3>✅ Positive Elements Found</h3>
                <ul className="feedback-list">
                  {analysis.feedback.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.suggestions.length > 0 && (
              <div className="suggestions-section">
                <h3>💡 Suggestions for Improvement</h3>
                <ul className="suggestions-list">
                  {analysis.suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-buttons">
              <button 
                className="btn" 
                onClick={() => {
                  setFile(null);
                  setAnalysis(null);
                  setError(null);
                }}
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 