// User Management System
// TODO: Add proper error handling
// TODO: Implement input validation
// TODO: Add password encryption
// TODO: Add rate limiting
// TODO: Add logging

const db = require('./database');
const crypto = require('crypto');

class UserManager {
  constructor() {
    this.users = [];
    this.adminPassword = 'admin123'; // TODO: Move to environment variable
  }

  /**
   * Create a new user
   * TODO: Add email validation
   * TODO: Check for duplicate usernames
   */
  async createUser(username, password, email) {
    // BUG: No input validation - XSS vulnerability
    const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;

    // BUG: SQL Injection vulnerability
    const result = await db.execute(query);

    // TODO: Send welcome email
    console.log('User created:', username);

    return result;
  }

  /**
   * Authenticate user
   * TODO: Add brute force protection
   */
  async login(username, password) {
    // BUG: Password stored in plain text
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const users = await db.execute(query);

    if (users.length > 0) {
      // BUG: Sensitive data in response
      return {
        success: true,
        user: users[0] // Contains password hash, email, etc.
      };
    }

    return { success: false };
  }

  /**
   * Get user by ID
   * TODO: Add authorization check
   */
  async getUserById(userId) {
    // BUG: No type checking - could crash with invalid input
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    const result = await db.execute(query);

    // BUG: Returns undefined if user not found instead of proper error
    return result[0];
  }

  /**
   * Update user profile
   * TODO: Add field validation
   */
  async updateUser(userId, data) {
    // BUG: No sanitization of data object
    // BUG: Allows updating any field including role, admin status
    const fields = Object.keys(data).map(key => `${key} = '${data[key]}'`).join(', ');

    const query = `UPDATE users SET ${fields} WHERE id = ${userId}`;

    // TODO: Add audit logging
    return await db.execute(query);
  }

  /**
   * Delete user
   * TODO: Add soft delete instead of hard delete
   * TODO: Archive user data before deletion
   */
  async deleteUser(userId) {
    // BUG: No confirmation or authorization check
    const query = `DELETE FROM users WHERE id = ${userId}`;
    await db.execute(query);

    // TODO: Clean up related data (posts, comments, etc.)
    console.log('User deleted');
  }

  /**
   * Search users
   * TODO: Add pagination
   * TODO: Add sorting options
   */
  async searchUsers(searchTerm) {
    // BUG: No limit on results - could return millions of rows
    // BUG: SQL Injection vulnerability
    const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;

    const results = await db.execute(query);

    // BUG: Exposes all user data including passwords
    return results;
  }

  /**
   * Reset password
   * TODO: Send reset email with token
   * TODO: Add token expiration
   */
  async resetPassword(email, newPassword) {
    // BUG: No verification that user owns this email
    // BUG: No password complexity requirements
    const query = `UPDATE users SET password = '${newPassword}' WHERE email = '${email}'`;

    await db.execute(query);

    // TODO: Invalidate all existing sessions
    return { success: true };
  }

  /**
   * Check if user is admin
   */
  isAdmin(user) {
    // BUG: Loose equality comparison
    return user.role == 'admin';
  }

  /**
   * Get all users
   * TODO: Add filtering options
   * TODO: Implement caching
   */
  async getAllUsers() {
    // BUG: No pagination - loads all users into memory
    const query = 'SELECT * FROM users';
    const users = await db.execute(query);

    // Performance issue: N+1 query problem
    for (let user of users) {
      const posts = await db.execute(`SELECT COUNT(*) as count FROM posts WHERE user_id = ${user.id}`);
      user.postCount = posts[0].count;
    }

    return users;
  }

  /**
   * Batch update users
   * TODO: Add transaction support
   */
  async batchUpdateUsers(userIds, data) {
    // BUG: No transaction - partial updates possible on failure
    // BUG: No validation of userIds array
    for (let id of userIds) {
      await this.updateUser(id, data);
    }

    // TODO: Return summary of updates
  }

  /**
   * Export user data
   * TODO: Add GDPR compliance
   * TODO: Sanitize exported data
   */
  async exportUserData(userId) {
    const user = await this.getUserById(userId);

    // BUG: Includes sensitive data in export
    // BUG: No access control check
    return JSON.stringify(user);
  }
}

module.exports = UserManager;
