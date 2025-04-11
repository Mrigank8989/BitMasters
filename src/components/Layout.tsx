import React,{useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, MessageSquare } from 'lucide-react';
import img from './image.png';
export function Layout({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState(null);

  const location = useLocation();
  const token = localStorage.getItem('accessToken'); // Authentication check

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={img} alt="Learn Loop Logo" className="h-14 w-14" />
              <span className="text-2xl font-semibold text-black">Learn Loop</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/projects" className={`${location.pathname === '/projects' ? 'text-black' : 'text-gray-700'} hover:text-black font-medium`}>
                Project
              </Link>
              <Link to="/mentorship" className={`${location.pathname === '/mentorship' ? 'text-black' : 'text-gray-700'} hover:text-black font-medium`}>
                Mentorship
              </Link>
              <Link to="/teams" className={`${location.pathname === '/teams' ? 'text-black' : 'text-gray-700'} hover:text-black font-medium`}>
                Teams
              </Link>
              <Link to="/pricing" className={`${location.pathname === '/pricing' ? 'text-black' : 'text-gray-700'} hover:text-black font-medium`}>
                Pricing
              </Link>

              {/* Avatar shown if logged in */}
              {token && (
                <Link to="/profile" className="ml-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "s")}&background=random&color=fff&size=128`}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-indigo-500"
                  />
                </Link>
              )}
            </div>

            {/* Sign Up / Log In buttons - Shown only if NOT logged in */}
            {!token && (
              <div className="flex items-center space-x-4">
                <Link to="/signup" className="text-black font-medium">Sign Up</Link>
                <Link to="/signin" className="px-4 py-2 bg-[#3E3EFF] text-white rounded-md font-medium hover:bg-[#2f2fee]">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {children}

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

        <div className="flex justify-center space-x-6 my-6">
          <MessageSquare className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          <Rocket className="w-6 h-6 text-gray-400 hover:text-gray-600" />
        </div>

        <div className="text-center pb-6 text-sm text-gray-400">
          &copy; 2025 Learn Loop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
