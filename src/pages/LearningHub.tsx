import React, { useState } from 'react';
import { Book, Video, Users, Star, ArrowLeft, Search, BookOpen, Bookmark, Clock } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  type: 'course' | 'article' | 'webinar';
  author: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  description: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Introduction to Educational Technology",
    type: "course",
    author: "Dr. Emily Watson",
    duration: "6 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
    description: "Learn the fundamentals of educational technology and its impact on modern learning.",
    tags: ["EdTech", "Fundamentals", "Digital Learning"]
  },
  {
    id: 2,
    title: "Designing Effective Online Assessments",
    type: "webinar",
    author: "Prof. Michael Brown",
    duration: "1.5 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
    description: "Master the art of creating engaging and effective online assessments.",
    tags: ["Assessment", "Online Learning", "Course Design"]
  },
  {
    id: 3,
    title: "AI in Education: Current Trends",
    type: "article",
    author: "Sarah Chen",
    duration: "15 min read",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
    description: "Explore the latest trends and applications of AI in educational technology.",
    tags: ["AI", "EdTech", "Innovation"]
  }
];

const LearningHub: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      case 'webinar':
        return <Video className="w-5 h-5" />;
      case 'article':
        return <Book className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-indigo-900 mb-4">Learning Hub</h1>
            <p className="text-xl text-gray-600">Discover resources to enhance your EdTech skills</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('course')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'course' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setSelectedType('webinar')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'webinar' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Webinars
              </button>
              <button
                onClick={() => setSelectedType('article')}
                className={`px-4 py-2 rounded-lg ${
                  selectedType === 'article' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Articles
              </button>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(resource.type)}
                  <span className="text-sm font-medium text-indigo-600 uppercase">{resource.type}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} />
                    <span>{resource.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star size={18} />
                    <span>{resource.level}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <Bookmark size={18} />
                  Save for Later
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;