import React from 'react';
import { Brain, TrendingUp, Star } from 'lucide-react';
import './AIScoreBadge.css';

const AIScoreBadge = ({ course }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'low';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <Star className="score-icon" />;
    if (score >= 80) return <TrendingUp className="score-icon" />;
    return <Brain className="score-icon" />;
  };

  const getScoreText = (score) => {
    if (score >= 90) return 'Hoàn hảo cho bạn';
    if (score >= 80) return 'Rất phù hợp';
    if (score >= 70) return 'Phù hợp';
    return 'Có thể phù hợp';
  };

  if (!course.aiScore && !course.matchPercentage) return null;

  const score = course.aiScore || course.matchPercentage || 0;
  const scoreClass = getScoreColor(score);

  return (
    <div className={`ai-score-badge ${scoreClass}`}>
      <div className="score-content">
        <div className="score-header">
          {getScoreIcon(score)}
          <span className="score-value">{score}%</span>
        </div>
        <div className="score-label">
          {getScoreText(score)}
        </div>
      </div>
      
      {course.reasons && (
        <div className="ai-reason">
          <Brain className="reason-icon" />
          <span className="reason-text">{course.reasons}</span>
        </div>
      )}

      <div className="ai-glow"></div>
    </div>
  );
};

export default AIScoreBadge;
