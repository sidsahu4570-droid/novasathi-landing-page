import express from 'express';

const router = express.Router();

/**
 * POST /api/admin/login
 * Validates admin credentials and returns a token.
 * Token is: base64(username:secret)
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = Buffer.from(
    `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_SECRET}`
  ).toString('base64');

  res.json({ token, message: 'Login successful' });
});

/**
 * POST /api/admin/logout (client-side only but kept for convention)
 */
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
