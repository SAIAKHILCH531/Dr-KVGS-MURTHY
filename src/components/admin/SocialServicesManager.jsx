import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from './AdminLayout';

const SocialServicesManager = () => {
  const [loading, setLoading] = useState(false); // Changed to false for immediate render
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  const [content, setContent] = useState({
    hero: {
      title: 'Social Services',
      subtitle: 'Making a Difference in Our Community'
    },
    intro: {
      title: 'Our Social Initiatives',
      description: 'Dedicated to community welfare and healthcare accessibility'
    },
    genome: {
      title: 'GENOME Foundation',
      description: 'Advancing healthcare through research and community service',
      about: 'Committed to healthcare innovation and accessibility',
      contribution: 'Making healthcare accessible to all',
      activities: [
        { title: 'Healthcare Outreach', description: 'Community health programs', impact: 'Improved healthcare access' },
        { title: 'Health Education', description: 'Public health awareness', impact: 'Enhanced health literacy' },
        { title: 'Research Collaboration', description: 'Medical research partnerships', impact: 'Advanced treatment options' }
      ]
    },
    temple: {
      title: 'Temple Charity Services',
      description: 'Serving the community through traditional healing',
      quote: 'Healing through tradition, serving with compassion',
      initiatives: [
        { title: 'Free Ayurvedic Clinics', description: 'Free healthcare services', impact: 'Community wellness' },
        { title: 'Elderly Care Program', description: 'Supporting senior citizens', impact: 'Enhanced elderly care' },
        { title: 'Community Wellness Initiatives', description: 'Holistic health programs', impact: 'Improved community health' }
      ],
      volunteer: 'Join us in our mission to serve the community'
    },
    events: [
      { title: 'Health Camp', date: 'Upcoming', location: 'Local Community Center', description: 'Free health checkups' },
      { title: 'Wellness Workshop', date: 'Monthly', location: 'Temple Premises', description: 'Health education' },
      { title: 'Community Service', date: 'Weekly', location: 'Various Locations', description: 'Outreach programs' }
    ]
  }); // Added default values

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const docRef = doc(db, 'social_services', 'content');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      showNotification('Failed to load content', 'error');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'social_services', 'content');
      await updateDoc(docRef, content);
      showNotification('Content updated successfully', 'success');
    } catch (error) {
      console.error('Error saving content:', error);
      showNotification('Failed to save content', 'error');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  const addActivity = () => {
    setContent(prev => ({
      ...prev,
      genome: {
        ...prev.genome,
        activities: [
          ...prev.genome.activities,
          { title: '', description: '', impact: '' }
        ]
      }
    }));
  };

  const addInitiative = () => {
    setContent(prev => ({
      ...prev,
      temple: {
        ...prev.temple,
        initiatives: [
          ...prev.temple.initiatives,
          { title: '', description: '', impact: '' }
        ]
      }
    }));
  };

  const addEvent = () => {
    setContent(prev => ({
      ...prev,
      events: [
        ...prev.events,
        { title: '', date: '', location: '', description: '' }
      ]
    }));
  };

  const removeActivity = (index) => {
    setContent(prev => ({
      ...prev,
      genome: {
        ...prev.genome,
        activities: prev.genome.activities.filter((_, i) => i !== index)
      }
    }));
  };

  const removeInitiative = (index) => {
    setContent(prev => ({
      ...prev,
      temple: {
        ...prev.temple,
        initiatives: prev.temple.initiatives.filter((_, i) => i !== index)
      }
    }));
  };

  const removeEvent = (index) => {
    setContent(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };

  return (
    <AdminLayout >
        <main className="flex-1 bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-semibold text-[#2F5A3D]">Social Services Management</h1>
          <br />
          
          {/* Notification */}
          {notification.message && (
            <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {notification.message}
            </div>
          )}
          
          {/* Hero Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
  
          {/* GENOME Foundation Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">GENOME Foundation</h3>
              <button
                onClick={addActivity}
                className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730]"
              >
                Add Activity
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={content.genome.description}
                  onChange={(e) => setContent({
                    ...content,
                    genome: { ...content.genome, description: e.target.value }
                  })}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">About</label>
                <textarea
                  value={content.genome.about}
                  onChange={(e) => setContent({
                    ...content,
                    genome: { ...content.genome, about: e.target.value }
                  })}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contribution</label>
                <textarea
                  value={content.genome.contribution}
                  onChange={(e) => setContent({
                    ...content,
                    genome: { ...content.genome, contribution: e.target.value }
                  })}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              {/* Activities */}
              <div>
                <h4 className="font-medium mb-2">Activities</h4>
                {content.genome.activities.map((activity, index) => (
                  <div key={index} className="mb-4 p-4 border rounded relative">
                    <button
                      onClick={() => removeActivity(index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                    <input
                      type="text"
                      value={activity.title}
                      onChange={(e) => {
                        const newActivities = [...content.genome.activities];
                        newActivities[index] = { ...activity, title: e.target.value };
                        setContent({
                          ...content,
                          genome: { ...content.genome, activities: newActivities }
                        });
                      }}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Activity Title"
                    />
                    <textarea
                      value={activity.description}
                      onChange={(e) => {
                        const newActivities = [...content.genome.activities];
                        newActivities[index] = { ...activity, description: e.target.value };
                        setContent({
                          ...content,
                          genome: { ...content.genome, activities: newActivities }
                        });
                      }}
                      className="w-full p-2 border rounded mb-2 h-20"
                      placeholder="Activity Description"
                    />
                    <input
                      type="text"
                      value={activity.impact}
                      onChange={(e) => {
                        const newActivities = [...content.genome.activities];
                        newActivities[index] = { ...activity, impact: e.target.value };
                        setContent({
                          ...content,
                          genome: { ...content.genome, activities: newActivities }
                        });
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Activity Impact"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Temple Charity Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Temple Charity Services</h3>
              <button
                onClick={addInitiative}
                className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730]"
              >
                Add Initiative
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={content.temple.description}
                  onChange={(e) => setContent({
                    ...content,
                    temple: { ...content.temple, description: e.target.value }
                  })}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quote</label>
                <textarea
                  value={content.temple.quote}
                  onChange={(e) => setContent({
                    ...content,
                    temple: { ...content.temple, quote: e.target.value }
                  })}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              {/* Initiatives */}
              <div>
                <h4 className="font-medium mb-2">Initiatives</h4>
                {content.temple.initiatives.map((initiative, index) => (
                  <div key={index} className="mb-4 p-4 border rounded relative">
                    <button
                      onClick={() => removeInitiative(index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                    <input
                      type="text"
                      value={initiative.title}
                      onChange={(e) => {
                        const newInitiatives = [...content.temple.initiatives];
                        newInitiatives[index] = { ...initiative, title: e.target.value };
                        setContent({
                          ...content,
                          temple: { ...content.temple, initiatives: newInitiatives }
                        });
                      }}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Initiative Title"
                    />
                    <textarea
                      value={initiative.description}
                      onChange={(e) => {
                        const newInitiatives = [...content.temple.initiatives];
                        newInitiatives[index] = { ...initiative, description: e.target.value };
                        setContent({
                          ...content,
                          temple: { ...content.temple, initiatives: newInitiatives }
                        });
                      }}
                      className="w-full p-2 border rounded mb-2 h-20"
                      placeholder="Initiative Description"
                    />
                    <input
                      type="text"
                      value={initiative.impact}
                      onChange={(e) => {
                        const newInitiatives = [...content.temple.initiatives];
                        newInitiatives[index] = { ...initiative, impact: e.target.value };
                        setContent({
                          ...content,
                          temple: { ...content.temple, initiatives: newInitiatives }
                        });
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Initiative Impact"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Volunteer Information</label>
                <textarea
                  value={content.temple.volunteer}
                  onChange={(e) => setContent({
                    ...content,
                    temple: { ...content.temple, volunteer: e.target.value }
                  })}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
            </div>
          </div>
  
          {/* Upcoming Events Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upcoming Events</h3>
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730]"
              >
                Add Event
              </button>
            </div>
            <div className="space-y-4">
              {content.events.map((event, index) => (
                <div key={index} className="mb-4 p-4 border rounded relative">
                  <button
                    onClick={() => removeEvent(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => {
                      const newEvents = [...content.events];
                      newEvents[index] = { ...event, title: e.target.value };
                      setContent({ ...content, events: newEvents });
                    }}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Event Title"
                  />
                  <input
                    type="text"
                    value={event.date}
                    onChange={(e) => {
                      const newEvents = [...content.events];
                      newEvents[index] = { ...event, date: e.target.value };
                      setContent({ ...content, events: newEvents });
                    }}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Event Date"
                  />
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) => {
                      const newEvents = [...content.events];
                      newEvents[index] = { ...event, location: e.target.value };
                      setContent({ ...content, events: newEvents });
                    }}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Event Location"
                  />
                  <textarea
                    value={event.description}
                    onChange={(e) => {
                      const newEvents = [...content.events];
                      newEvents[index] = { ...event, description: e.target.value };
                      setContent({ ...content, events: newEvents });
                    }}
                    className="w-full p-2 border rounded h-20"
                    placeholder="Event Description"
                  />
                </div>
              ))}
            </div>
          </div>
  
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730] disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          </main>
        </AdminLayout>
      
    );
};

export default SocialServicesManager;
