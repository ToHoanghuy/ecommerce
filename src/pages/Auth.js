import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, ShieldCheck, Zap, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authenticateUser, registerUser, emailExists } from '../data/mockUsers';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoggedIn } = useAuth();
  const initialMode = searchParams.get('mode') || 'login';
  const redirectPath = searchParams.get('redirect') || '';
  
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      if (redirectPath) {
        navigate(`/${redirectPath}`);
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, navigate, redirectPath]);

  useEffect(() => {
    setMode(initialMode);
    setRegisterSuccess(false);
    setErrors({});
  }, [initialMode]);

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (mode === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mode === 'login') {
        // Authenticate user
        const authenticatedUser = authenticateUser(formData.email, formData.password);
        
        if (authenticatedUser) {
          // Create user data without password for context
          const userForContext = {
            id: authenticatedUser.id,
            name: authenticatedUser.name,
            email: authenticatedUser.email,
            avatar: authenticatedUser.avatar
          };
          
          login(userForContext);
          
          // Navigate based on redirect parameter
          if (redirectPath) {
            navigate(`/${redirectPath}`);
          } else {
            navigate('/');
          }
        } else {
          throw new Error('Email hoặc mật khẩu không đúng');
        }
      } else {
        // Register new user
        try {
          const newUser = registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password
          });

          // Show success message and switch to login mode
          setRegisterSuccess(true);
          setFormData({
            email: formData.email, // Keep email for convenience
            password: '',
            name: '',
            confirmPassword: ''
          });
          
          // Switch to login mode after a short delay
          setTimeout(() => {
            setMode('login');
            setRegisterSuccess(false);
          }, 2000);
          
        } catch (registerError) {
          throw registerError;
        }
      }
      
    } catch (error) {
      setErrors({ submit: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    // Try to go back in history, fallback to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Back Button */}
        <button onClick={handleBackClick} className="back-btn">
          <ArrowLeft />
          Quay lại
        </button>

        <div className="auth-content">
          {/* Left Side - Form */}
          <div className="auth-form-section">
            <div className="auth-header">
              <h1>{mode === 'login' ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}</h1>
              <p>
                {mode === 'login' 
                  ? 'Đăng nhập để tiếp tục hành trình học tập của bạn'
                  : 'Đăng ký để khám phá hàng nghìn khóa học chất lượng'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'register' && (
                <div className="form-group">
                  <label htmlFor="name">Họ và tên</label>
                  <div className="input-container">
                    <User className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên đầy đủ"
                      className={errors.name ? 'error' : ''}
                    />
                  </div>
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ email"
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {mode === 'register' && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                  <div className="input-container">
                    <Lock className="input-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập lại mật khẩu"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              )}

              {errors.submit && (
                <div className="submit-error">
                  {errors.submit}
                </div>
              )}

              {registerSuccess && (
                <div className="register-success">
                  <CheckCircle className="success-icon" />
                  <div>
                    <strong>Đăng ký thành công!</strong>
                    <p>Tài khoản của bạn đã được tạo. Đang chuyển sang trang đăng nhập...</p>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                    <ArrowLeft style={{ transform: 'rotate(180deg)' }} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-switch">
              <p>
                {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button 
                  type="button"
                  className="switch-mode-btn"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="auth-benefits-section">
            <div className="benefits-content">
              <h2>🚀 Khám phá sức mạnh AI</h2>
              <p>Đăng nhập để trải nghiệm những tính năng độc quyền!</p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Zap />
                  </div>
                  <div className="benefit-content">
                    <h3>AI Gợi ý thông minh</h3>
                    <p>Nhận gợi ý khóa học phù hợp với sở thích và mục tiêu của bạn</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Star />
                  </div>
                  <div className="benefit-content">
                    <h3>Danh sách yêu thích</h3>
                    <p>Lưu và quản lý những khóa học bạn quan tâm</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <ShieldCheck />
                  </div>
                  <div className="benefit-content">
                    <h3>Tiến độ học tập</h3>
                    <p>Theo dõi lịch sử học tập và tiến độ cá nhân</p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <blockquote>
                  "AI gợi ý khóa học đã giúp tôi tìm được đúng những gì mình cần. 
                  Rất thông minh và chính xác!"
                </blockquote>
                <cite>- Người dùng hài lòng</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
