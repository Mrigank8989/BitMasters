import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, MessageSquare } from 'lucide-react';
import img from './image.png';

export function Layout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Store the search query
  const [searchResults, setSearchResults] = useState([]); // Store the search results
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  // Fetch search results from the server
  const handleSearch = async (query: string) => {
    if (query.trim().length === 0) {
      setSearchResults([]); // If no query, clear results
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/search?searchTerm=${query}`); // Call the backend search endpoint
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data); // Assuming the API returns a list of results
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // Handle the error case gracefully
    }
  };

  // Handle input changes and trigger search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value); // Trigger search on input change
  };

  const navLinkClass = (path: string) =>
    `relative pb-1 font-medium transition-colors duration-300 ${
      location.pathname === path ? 'text-black after:scale-x-100' : 'text-gray-700'
    } hover:text-black
    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
    after:bg-black after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 space-x-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={img} alt="Learn Loop Logo" className="h-14 w-14" />
              <span className="text-2xl font-semibold text-black">Learn Loop</span>
            </Link>

            {/* Search Box */}
            <div className="flex-grow mx-4 hidden md:block">
              <div className="relative w-full max-w-md mx-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search projects, mentors, teams..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
                />
                <span className="absolute right-4 top-2.5 text-gray-400 hover:text-indigo-500 transition duration-200 cursor-pointer">
                  🔍
                </span>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {searchResults.map((result) => (
                      <li key={result.user_id} className="p-2 hover:bg-gray-100 cursor-pointer">
                        <Link to={`/profile/${result.user_id}`} className="text-sm text-gray-700">
                          {result.name} - {result.role}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/projects" className={navLinkClass('/projects')}>
                Project
              </Link>
              <Link to="/mentorship" className={navLinkClass('/mentorship')}>
                Mentorship
              </Link>
              <Link to="/teams" className={navLinkClass('/teams')}>
                Teams
              </Link>
              <Link to="/pricing" className={navLinkClass('/pricing')}>
                Pricing
              </Link>
            </div>

            {/* Avatar */}
            {token && (
              <Link to="/profile" className="ml-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}&background=random&color=fff&size=128`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-indigo-500"
                />
              </Link>
            )}
          </div>

          {/* Sign Up / Log In */}
          {!token && (
            <div className="flex items-center justify-end space-x-4 mt-2">
              <Link to="/signup" className="text-black font-medium">Sign Up</Link>
              <Link to="/signin" className="px-4 py-2 bg-[#3E3EFF] text-white rounded-md font-medium hover:bg-[#2f2fee]">
                Log In
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/projects">Discover Project</Link></li>
              <li><Link to="/mentorship">Connect With Mentors</Link></li>
              <li><Link to="/teams">Team Up & Collaborate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Learn</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/learning-hub">Learning Hub</Link></li>
              <li><Link to="/guides">How-To-Guides</Link></li>
              <li><Link to="/help">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">About Us</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/careers">Join Our Team</Link></li>
              <li><Link to="/contact">Get In Touch</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms Of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
