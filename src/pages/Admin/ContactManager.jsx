import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import Input from '../../components/Input';


const ContactManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  const [contactContent, setContactContent] = useState({
    hero: {
      title: 'Contact Us',
      subtitle: 'Get in touch with Dr. KVGS Murthy and KALAGA Herbal Research Labs'
    },
    contactInfo: {
      address: {
        street: '16-4-17/9, M.G. Road',
        city: 'PALAKOL – 534 260',
        state: 'W.G.Dt., Andhra Pradesh',
        country: 'India'
      },
      phone: '+91-7382-322-942',
      email: 'technical@kalagaherbal.com'
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'contact');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContactContent(docSnap.data());
        }
      } catch (error) {
        setNotification({
          message: 'Error fetching content: ' + error.message,
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!auth.currentUser) {
        throw new Error('You must be logged in to save changes');
      }

      const docRef = doc(db, 'content', 'contact');
      await setDoc(docRef, contactContent);
      setNotification({
        message: 'Content updated successfully!',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: 'Error saving content: ' + error.message,
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Page Manager</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#2F5A3D] text-white px-4 py-2 rounded-lg hover:bg-[#2F5A3D]/90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {notification.message && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <Input
              label="Title"
              value={contactContent.hero.title}
              onChange={(e) =>
                setContactContent({
                  ...contactContent,
                  hero: { ...contactContent.hero, title: e.target.value }
                })
              }
            />
            <Input
              label="Subtitle"
              value={contactContent.hero.subtitle}
              onChange={(e) =>
                setContactContent({
                  ...contactContent,
                  hero: { ...contactContent.hero, subtitle: e.target.value }
                })
              }
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Address</h3>
              <Input
                label="Street"
                value={contactContent.contactInfo.address.street}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    contactInfo: {
                      ...contactContent.contactInfo,
                      address: {
                        ...contactContent.contactInfo.address,
                        street: e.target.value
                      }
                    }
                  })
                }
              />
              <Input
                label="City"
                value={contactContent.contactInfo.address.city}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    contactInfo: {
                      ...contactContent.contactInfo,
                      address: {
                        ...contactContent.contactInfo.address,
                        city: e.target.value
                      }
                    }
                  })
                }
              />
              <Input
                label="State"
                value={contactContent.contactInfo.address.state}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    contactInfo: {
                      ...contactContent.contactInfo,
                      address: {
                        ...contactContent.contactInfo.address,
                        state: e.target.value
                      }
                    }
                  })
                }
              />
              <Input
                label="Country"
                value={contactContent.contactInfo.address.country}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    contactInfo: {
                      ...contactContent.contactInfo,
                      address: {
                        ...contactContent.contactInfo.address,
                        country: e.target.value
                      }
                    }
                  })
                }
              />
            </div>

            <Input
              label="Phone Number"
              value={contactContent.contactInfo.phone}
              onChange={(e) =>
                setContactContent({
                  ...contactContent,
                  contactInfo: {
                    ...contactContent.contactInfo,
                    phone: e.target.value
                  }
                })
              }
            />

            <Input
              label="Email"
              type="email"
              value={contactContent.contactInfo.email}
              onChange={(e) =>
                setContactContent({
                  ...contactContent,
                  contactInfo: {
                    ...contactContent.contactInfo,
                    email: e.target.value
                  }
                })
              }
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContactManager;