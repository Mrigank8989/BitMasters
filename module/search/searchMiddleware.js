const searchMiddleware = (req, res, next) => {
    // Log the request query
    console.log('Search Query:', req.query.searchTerm);
  
    // Ensure searchTerm is provided
    if (!req.query.searchTerm) {
      return res.status(400).json({ message: 'searchTerm is required' });
    }
  
    // Proceed to the next middleware or route handler
    next();
  };
  
  module.exports = searchMiddleware;
  