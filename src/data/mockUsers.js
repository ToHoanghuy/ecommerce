// Mock Users Database
let mockUsers = [
  {
    id: 1,
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=667eea&color=fff',
    joinDate: '2024-01-15',
    lastLogin: '2024-07-08'
  },
  {
    id: 2,
    name: 'Le Thi B',
    email: 'lethib@example.com',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Le+Thi+B&background=764ba2&color=fff',
    joinDate: '2024-02-20',
    lastLogin: '2024-07-07'
  }
];

// Load users from localStorage if exists
const loadUsers = () => {
  try {
    const savedUsers = localStorage.getItem('mockUsers');
    if (savedUsers) {
      mockUsers = JSON.parse(savedUsers);
    }
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
  }
  return mockUsers;
};

// Save users to localStorage
const saveUsers = (users) => {
  try {
    localStorage.setItem('mockUsers', JSON.stringify(users));
    mockUsers = users;
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

// Get all users
export const getAllUsers = () => {
  return loadUsers();
};

// Find user by email
export const findUserByEmail = (email) => {
  const users = loadUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Find user by email and password
export const authenticateUser = (email, password) => {
  const users = loadUsers();
  return users.find(user => 
    user.email.toLowerCase() === email.toLowerCase() && 
    user.password === password
  );
};

// Check if email already exists
export const emailExists = (email) => {
  const users = loadUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Register new user
export const registerUser = (userData) => {
  const users = loadUsers();
  
  // Check if email already exists
  if (emailExists(userData.email)) {
    throw new Error('Email đã được sử dụng');
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: userData.password,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=667eea&color=fff`,
    joinDate: new Date().toISOString().split('T')[0],
    lastLogin: null
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);
  
  return newUser;
};

// Update user last login
export const updateLastLogin = (userId) => {
  const users = loadUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString().split('T')[0];
    saveUsers(users);
  }
};

// Initialize users data on first load
loadUsers();
