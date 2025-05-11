import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

const SubmitGrievance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const removeFile = () => {
    setPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priority', formData.priority);
      if (photo) {
        formDataToSend.append('photo', photo);
      }

      const response = await fetch('http://localhost:8080/api/grievances', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Grievance submitted successfully!');
        navigate('/dashboard', { state: { refresh: true } });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit grievance');
      }
    } catch (err) {
      setError('An error occurred while submitting the grievance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-zinc-900">
              Submit New Grievance
            </h3>
            <div className="mt-2 max-w-xl text-sm text-zinc-500">
              <p>Fill out the form below to submit your grievance.</p>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-zinc-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-zinc-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  required
                  className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700">
                  Photo Attachment
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-zinc-400" />
                    <div className="flex text-sm text-zinc-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload photo</span>
                        <input
                          id="file-upload"
                          name="photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-zinc-500">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {photo && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-zinc-700">Selected Photo:</h4>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-zinc-500">{photo.name}</span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="bg-white py-2 px-4 border border-zinc-300 rounded-md shadow-sm text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {loading ? 'Submitting...' : 'Submit Grievance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitGrievance; 