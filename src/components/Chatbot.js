import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { coursesAPI } from '../services/api';
import './Chatbot.css';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là AI tư vấn của EduMart. Tôi có thể giúp bạn tìm kiếm khóa học phù hợp. Bạn muốn học gì?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Simulate AI thinking time
    setIsTyping(true);
    
    setTimeout(async () => {
      let response = "";
      let suggestedCourses = [];

      try {
        if (input.includes('javascript') || input.includes('js')) {
          response = "Tuyệt vời! JavaScript là ngôn ngữ rất phổ biến. Tôi khuyên bạn nên học JavaScript cơ bản trước!";
          const allCourses = await coursesAPI.getAllCourses();
          suggestedCourses = allCourses.filter(course => 
            course.name.toLowerCase().includes('javascript')
          ).slice(0, 3);
        } else if (input.includes('tiếng anh') || input.includes('english')) {
          response = "Học tiếng Anh là lựa chọn tuyệt vời! Dưới đây là những khóa học phù hợp:";
          const allCourses = await coursesAPI.getAllCourses();
          suggestedCourses = allCourses.filter(course => 
            course.category === 'Ngoại ngữ'
          ).slice(0, 3);
        } else if (input.includes('lập trình') || input.includes('programming')) {
          response = "Lập trình mở ra nhiều cơ hội nghề nghiệp! Những khóa học này sẽ phù hợp:";
          const allCourses = await coursesAPI.getAllCourses();
          suggestedCourses = allCourses.filter(course => 
            course.category === 'Lập trình'
          ).slice(0, 3);
        } else if (input.includes('giá') || input.includes('rẻ') || input.includes('tiết kiệm')) {
          response = "Tôi hiểu bạn muốn tìm khóa học với giá hợp lý. Đây là những lựa chọn tốt:";
          const allCourses = await coursesAPI.getAllCourses();
          suggestedCourses = allCourses.filter(course => course.price < 500000).slice(0, 3);
        } else {
          response = "Tôi hiểu bạn đang tìm kiếm khóa học. Đây là một số gợi ý phổ biến:";
          const allCourses = await coursesAPI.getAllCourses();
          suggestedCourses = allCourses.slice(0, 3);
        }
      } catch (error) {
        response = "Xin lỗi, tôi đang gặp sự cố khi tìm kiếm khóa học. Vui lòng thử lại sau.";
        suggestedCourses = [];
      }

      const newMessage = {
        id: Date.now(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        suggestedCourses: suggestedCourses.slice(0, 3)
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    mockAIResponse(inputText);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <Bot className="chatbot-icon" />
            <div>
              <h3>AI Tư vấn EduMart</h3>
              <span className="chatbot-status">● Trực tuyến</span>
            </div>
          </div>
          <button className="chatbot-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
              <div className="message-avatar">
                {message.isBot ? <Bot /> : <User />}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                {message.suggestedCourses && message.suggestedCourses.length > 0 && (
                  <div className="suggested-courses">
                    {message.suggestedCourses.map(course => (
                      <div key={course.id} className="suggested-course">
                        <img src={course.image} alt={course.name} className="course-thumb" />
                        <div className="course-info">
                          <h4>{course.name}</h4>
                          <p>{course.shortDescription}</p>
                          <div className="course-price">{formatPrice(course.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="message-avatar">
                <Bot />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <div className="input-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              className="message-input"
              rows="1"
            />
            <button 
              onClick={handleSendMessage}
              className="send-button"
              disabled={!inputText.trim()}
            >
              <Send />
            </button>
          </div>
          
          <div className="quick-questions">
            <span>Gợi ý câu hỏi:</span>
            <button onClick={() => setInputText("Tôi muốn học JavaScript")}>
              JavaScript
            </button>
            <button onClick={() => setInputText("Khóa học tiếng Anh nào tốt?")}>
              Tiếng Anh
            </button>
            <button onClick={() => setInputText("Học thiết kế UI/UX")}>
              UI/UX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
