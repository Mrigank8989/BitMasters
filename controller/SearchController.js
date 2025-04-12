const { searchUsers } = require("../module/search/index");

const SearchController = async (req, res) => {
    const { searchTerm } = req.query;  // Retrieve search term from query string
    try {
      if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required.' });
      }
  
      const results = await SearchService.search(searchTerm); // Assuming you have a search function that searches users or projects etc.
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No results found.' });
      }
  
      return res.json(results);  // Send the search results back to the client
    } catch (error) {
      console.error('Error in SearchController:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

module.exports = { SearchController };


