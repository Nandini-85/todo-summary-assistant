import React from 'react';
import '../styles/Summary.css';

function Summary({ summary, onGenerateSummary, isLoading }) {
  return (
    <div className="summary-container">
      <h2>Todo Summary</h2>
      <button 
        onClick={onGenerateSummary} 
        className="generate-btn"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate & Send to Slack'}
      </button>
      
      <div className="summary-content">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : summary ? (
          <div className="summary-text">
            <h3>Generated Summary:</h3>
            <div className="summary-body">
              {summary.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="slack-status">
              <span className="slack-icon">✓</span> Sent to Slack
            </div>
          </div>
        ) : (
          <p className="no-summary">
            Click the button above to generate a summary of your pending todos and send it to Slack.
          </p>
        )}
      </div>
    </div>
  );
}

export default Summary;
