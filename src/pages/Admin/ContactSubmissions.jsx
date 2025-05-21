import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    setError(null);
    try {
      const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert('Invalid submission ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this submission?')) {
      setDeleting(true);
      setError(null);
      try {
        const docRef = doc(db, 'contacts', id);
        
        // Check if document exists before deleting
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error('Document does not exist');
        }
        
        await deleteDoc(docRef);
        setSubmissions(prev => prev.filter(submission => submission.id !== id));
        alert('Submission deleted successfully');
      } catch (error) {
        console.error('Error deleting submission:', error);
        if (error.code === 'permission-denied') {
          setError('You do not have permission to delete this submission. Please check your login status.');
        } else {
          setError(`Failed to delete submission: ${error.message}`);
        }
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubmissions.length === 0) {
      alert('Please select submissions to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedSubmissions.length} submissions?`)) {
      setDeleting(true);
      setError(null);
      try {
        const deletePromises = selectedSubmissions.map(async id => {
          const docRef = doc(db, 'contacts', id);
          // Check if document exists before deleting
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            throw new Error(`Document ${id} does not exist`);
          }
          return deleteDoc(docRef);
        });

        await Promise.all(deletePromises);
        setSubmissions(prev => prev.filter(submission => !selectedSubmissions.includes(submission.id)));
        setSelectedSubmissions([]);
        alert('Selected submissions deleted successfully');
      } catch (error) {
        console.error('Error deleting submissions:', error);
        if (error.code === 'permission-denied') {
          setError('You do not have permission to delete submissions. Please check your login status.');
        } else {
          setError(`Failed to delete submissions: ${error.message}`);
        }
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubmissions(submissions.map(s => s.id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const handleSelectSubmission = (id) => {
    setSelectedSubmissions(prev => {
      if (prev.includes(id)) {
        return prev.filter(submissionId => submissionId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  if (loading) {
    return <div className="p-4">Loading submissions...</div>;
  }

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Contact Form Submissions</h2>
        {submissions.length > 0 && (
          <div className="flex gap-4">
            <button
              onClick={fetchSubmissions}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={loading || deleting}
            >
              Refresh
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={deleting || selectedSubmissions.length === 0}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {deleting ? 'Deleting...' : 'Delete Selected'}
            </button>
          </div>
        )}
      </div>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedSubmissions.length === submissions.length}
                  />
                </th>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Phone</th>
                <th className="px-4 py-2 border-b text-left">Subject</th>
                <th className="px-4 py-2 border-b text-left">Message</th>
                <th className="px-4 py-2 border-b text-left">Date</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.includes(submission.id)}
                      onChange={() => handleSelectSubmission(submission.id)}
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{submission.name}</td>
                  <td className="px-4 py-2 border-b">{submission.email}</td>
                  <td className="px-4 py-2 border-b">{submission.phone}</td>
                  <td className="px-4 py-2 border-b">{submission.subject}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {submission.message}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(submission.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(submission.id)}
                      disabled={deleting}
                      className="text-red-600 hover:text-red-800 disabled:text-red-300 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions;