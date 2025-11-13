// API Routes for User Management
// TODO: Add API versioning
// TODO: Add rate limiting middleware
// TODO: Add request validation middleware
// TODO: Add API documentation (Swagger)

const express = require('express');
const UserManager = require('./user-manager');

const router = express.Router();
const userManager = new UserManager();

// TODO: Add authentication middleware

/**
 * Create user endpoint
 * POST /api/users
 */
router.post('/users', async (req, res) => {
  // BUG: No request body validation
  const { username, password, email } = req.body;

  try {
    const result = await userManager.createUser(username, password, email);

    // BUG: Sends back too much information
    res.json({ success: true, data: result });
  } catch (error) {
    // BUG: Exposes internal error details to client
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

/**
 * Login endpoint
 * POST /api/login
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // TODO: Add CSRF protection
  // TODO: Add captcha for failed attempts

  const result = await userManager.login(username, password);

  if (result.success) {
    // BUG: No session management
    // BUG: No JWT token generation
    res.json(result);
  } else {
    // BUG: Reveals whether username exists
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

/**
 * Get user endpoint
 * GET /api/users/:id
 */
router.get('/users/:id', async (req, res) => {
  // BUG: No authorization check - anyone can view any user
  // BUG: No input sanitization
  const userId = req.params.id;

  const user = await userManager.getUserById(userId);

  // BUG: Returns undefined without proper error handling
  res.json(user);
});

/**
 * Update user endpoint
 * PUT /api/users/:id
 */
router.put('/users/:id', async (req, res) => {
  // BUG: No authorization - any user can update any other user
  const userId = req.params.id;

  // TODO: Validate request body
  const data = req.body;

  await userManager.updateUser(userId, data);

  // TODO: Return updated user data
  res.json({ success: true });
});

/**
 * Delete user endpoint
 * DELETE /api/users/:id
 */
router.delete('/users/:id', async (req, res) => {
  // BUG: No authorization check
  // TODO: Add confirmation requirement

  await userManager.deleteUser(req.params.id);

  res.json({ success: true });
});

/**
 * Search users endpoint
 * GET /api/users/search
 */
router.get('/users/search', async (req, res) => {
  const { q } = req.query;

  // BUG: No input validation
  // BUG: No minimum search length requirement

  const results = await userManager.searchUsers(q);

  // BUG: Returns sensitive data
  res.json(results);
});

/**
 * Admin endpoint - get all users
 * GET /api/admin/users
 */
router.get('/admin/users', async (req, res) => {
  // TODO: Add admin authentication check
  // BUG: Anyone can access admin endpoint

  const users = await userManager.getAllUsers();

  res.json(users);
});

// TODO: Add error handling middleware
// TODO: Add request logging
// TODO: Add CORS configuration

module.exports = router;
