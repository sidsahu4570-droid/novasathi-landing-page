/**
 * Admin Auth Middleware
 * Verifies Bearer token sent by admin panel on protected routes.
 */
export default function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — no token provided' });
  }

  const token = authHeader.slice(7);
  const validToken = Buffer.from(
    `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_SECRET}`
  ).toString('base64');

  if (token !== validToken) {
    return res.status(403).json({ error: 'Forbidden — invalid admin token' });
  }

  next();
}
