// src/services/authService.js
const { User } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10; // or 12 [cite: 44]
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_change_me';

// Helper to generate JWT tokens
const generateTokens = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' // short expiry [cite: 49]
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || '30d' // longer expiry [cite: 50]
    });

    // In a real app, you would save the refresh token to the DB/secure store [cite: 50]

    return { accessToken, refreshToken };
};

// Register a new user
exports.registerUser = async (name, email, password, role) => {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('Email already in use.');
    error.message = 'E_DUPLICATE_EMAIL'; // Custom error code
    throw error;
  }

  // Hash password with bcrypt [cite: 44]
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user record [cite: 45]
  const newUser = await User.create({ name, email, password_hash, role });
  
  // NOTE: Send verification email logic (optional) [cite: 45] goes here

  return newUser;
};

// Login and issue tokens
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials: User not found.');
  }

  // Compare hashed password [cite: 47]
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid credentials: Incorrect password.');
  }

  // Issue tokens [cite: 47]
  const { accessToken, refreshToken } = generateTokens(user);

  return { user, accessToken, refreshToken };
};
