import React, { useState } from 'react';
import { Users, UserPlus, Search, BookOpen, Target, Brain } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  description: string;
  members: number;
  topics: string[];
  image: string;
}

function FormTeam() {
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  
  const teams: Team[] = [
    {
      id: 1,
      name: "Machine Learning Enthusiasts",
      description: "Exploring AI and ML concepts together",
      members: 4,
      topics: ["AI", "Python", "Data Science"],
      image: "https://images.unsplash.com/photo-1520583457224-aee11bad5112?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Web Development Squad",
      description: "Building modern web applications",
      members: 3,
      topics: ["React", "Node.js", "JavaScript"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      name: "Design Thinking Group",
      description: "UX/UI design and research",
      members: 5,
      topics: ["UI/UX", "Design", "Research"],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Form Your Learning Team</h1>
          <p className="text-xl opacity-90">Connect, collaborate, and learn together with passionate peers</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">     
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium ${
              activeTab === 'browse'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('browse')}
          >
            <Search className="inline-block h-5 w-5 mr-2" />
            Browse Teams
          </button>
          <button
            className={`py-4 px-6 font-medium ${
              activeTab === 'create'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('create')}
          >
            <UserPlus className="inline-block h-5 w-5 mr-2" />
            Create Team
          </button>
        </div>

        {/* Content */}
        {activeTab === 'browse' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div key={team.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src={team.image} alt={team.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                  <p className="text-gray-600 mb-4">{team.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <Users className="inline-block h-4 w-4 mr-1" />
                      {team.members} members
                    </span>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Join Team
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Create a New Team</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  rows={4}
                  placeholder="Describe your team's goals and focus areas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Add topics (comma separated)"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create Team
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormTeam;