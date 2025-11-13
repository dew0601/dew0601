// Sample JavaScript code for testing AI code review

/**
 * Calculate the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Fetch user data from API
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User data
 */
async function fetchUser(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
}

/**
 * Process user data
 * @param {Array} users - Array of user objects
 * @returns {Array} Filtered and processed users
 */
function processUsers(users) {
  return users
    .filter(user => user.active === true)
    .map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));
}

module.exports = {
  add,
  fetchUser,
  processUsers
};
