import React, { useState } from 'react';
import { Search, Filter, Briefcase, Book, Code, Star, Mail, Users, UserPlus, Layers } from 'lucide-react';

interface Collaborator {
  id: number;
  name: string;
  role: string;
  skills: string[];
  interests: string[];
  image: string;
  experience: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  members: Collaborator[];
  projectType: string;
  status: 'active' | 'forming';
}

const initialCollaborators: Collaborator[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Educational Technology Developer",
    skills: ["React", "Python", "Learning Design"],
    interests: ["Adaptive Learning", "Gamification"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200",
    experience: "5+ years"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Curriculum Designer",
    skills: ["Instructional Design", "Content Development", "UX Research"],
    interests: ["Interactive Learning", "Assessment Tools"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    experience: "3+ years"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Learning Experience Designer",
    skills: ["UI/UX Design", "JavaScript", "E-learning"],
    interests: ["Mobile Learning", "AR/VR in Education"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    experience: "4+ years"
  }
];

const initialTeams: Team[] = [
  {
    id: 1,
    name: "Adaptive Learning Platform",
    description: "Developing an AI-powered adaptive learning platform for K-12 education",
    members: [initialCollaborators[0], initialCollaborators[2]],
    projectType: "Platform Development",
    status: 'active'
  },
  {
    id: 2,
    name: "Interactive Science Curriculum",
    description: "Creating an interactive science curriculum with AR experiences",
    members: [initialCollaborators[1]],
    projectType: "Curriculum Development",
    status: 'forming'
  }
];

const skillOptions = ["React", "Python", "JavaScript", "Learning Design", "Instructional Design", "UI/UX Design", "Content Development"];

function Collaborator() {
  const [view, setView] = useState<'collaborators' | 'teams'>('collaborators');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState(initialCollaborators);
  const [teams, setTeams] = useState(initialTeams);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (view === 'collaborators') {
      filterCollaborators(value, selectedSkills);
    } else {
      filterTeams(value);
    }
  };

  const handleSkillFilter = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);
    filterCollaborators(searchTerm, updatedSkills);
  };

  const filterCollaborators = (search: string, skills: string[]) => {
    let filtered = initialCollaborators;

    if (search) {
      filtered = filtered.filter(collaborator =>
        collaborator.name.toLowerCase().includes(search.toLowerCase()) ||
        collaborator.role.toLowerCase().includes(search.toLowerCase()) ||
        collaborator.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (skills.length > 0) {
      filtered = filtered.filter(collaborator =>
        skills.every(skill => collaborator.skills.includes(skill))
      );
    }

    setCollaborators(filtered);
  };

  const filterTeams = (search: string) => {
    if (!search) {
      setTeams(initialTeams);
      return;
    }

    const filtered = initialTeams.filter(team =>
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.description.toLowerCase().includes(search.toLowerCase()) ||
      team.projectType.toLowerCase().includes(search.toLowerCase()) ||
      team.members.some(member => 
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
      )
    );

    setTeams(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Find Education Technology Collaborators</h1>
          <p className="text-lg text-gray-600">Connect with talented professionals in the EdTech space</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                view === 'collaborators' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setView('collaborators')}
            >
              <div className="flex items-center gap-2">
                <UserPlus size={20} />
                <span>Find Collaborators</span>
              </div>
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                view === 'teams' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setView('teams')}
            >
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>View Teams</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={view === 'collaborators' ? "Search by name, role, or skills..." : "Search teams by name, description, or project type..."}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {view === 'collaborators' && (
              <div className="relative">
                <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  onChange={(e) => handleSkillFilter(e.target.value)}
                  value="">
                  <option value="" disabled>Filter by skills</option>
                  {skillOptions.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {view === 'collaborators' && selectedSkills.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedSkills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center gap-2"
                  onClick={() => handleSkillFilter(skill)}
                >
                  {skill}
                  <button className="text-indigo-600 hover:text-indigo-800">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {view === 'collaborators' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborators.map(collaborator => (
              <div key={collaborator.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={collaborator.image}
                      alt={collaborator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{collaborator.name}</h3>
                      <p className="text-gray-600">{collaborator.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} className="text-indigo-600" />
                      <span className="text-gray-600">{collaborator.experience}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code size={18} className="text-indigo-600" />
                        <span className="font-medium text-gray-700">Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {collaborator.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={18} className="text-indigo-600" />
                        <span className="font-medium text-gray-700">Interests</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {collaborator.interests.map(interest => (
                          <span key={interest} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    <Mail size={18} />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map(team => (
              <div key={team.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      team.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {team.status === 'active' ? 'Active' : 'Forming'}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{team.description}</p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Layers size={18} className="text-indigo-600" />
                      <span className="text-gray-600">{team.projectType}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users size={18} className="text-indigo-600" />
                        <span className="font-medium text-gray-700">Team Members</span>
                      </div>
                      <div className="space-y-3">
                        {team.members.map(member => (
                          <div key={member.id} className="flex items-center gap-3">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-800">{member.name}</p>
                              <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    <UserPlus size={18} />
                    {team.status === 'active' ? 'Request to Join' : 'Join Team'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collaborator;