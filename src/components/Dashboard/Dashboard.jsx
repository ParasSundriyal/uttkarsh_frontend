import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchGrievances();
    // Check if we're coming from submit grievance page
    if (location.state?.refresh) {
      setSuccessMessage('Grievance submitted successfully!');
      // Clear the success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      // Clear the navigation state so the message doesn't show on refresh
      navigate('/dashboard', { replace: true });
      return () => clearTimeout(timer);
    }
  }, [location]);

  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8080/api/grievances', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Use data.data if it exists, otherwise fallback to data
        const grievancesArray = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        setGrievances(grievancesArray);
      } else {
        setError('Failed to fetch grievances');
      }
    } catch (err) {
      setError('An error occurred while fetching grievances');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'in_progress':
        return <FileText className="h-5 w-5" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5" />;
      case 'rejected':
        return <XCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">My Grievances</h1>
            <button
              onClick={() => navigate('/submit-grievance')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Grievance
            </button>
          </div>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-zinc-200">
              {Array.isArray(grievances) && grievances.length === 0 ? (
                <li className="px-6 py-4 text-center text-zinc-500">
                  No grievances found. Submit your first grievance!
                </li>
              ) : (
                Array.isArray(grievances) && grievances.map((grievance) => (
                  <li key={grievance._id}>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-purple-600 truncate">
                            {grievance.title}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500 truncate">
                            {grievance.description}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              grievance.status
                            )}`}
                          >
                            {getStatusIcon(grievance.status)}
                            <span className="ml-1">
                              {grievance.status.replace('_', ' ')}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-zinc-500">
                          Submitted on{' '}
                          {new Date(grievance.createdAt).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => navigate(`/grievance/${grievance._id}`)}
                          className="text-sm font-medium text-purple-600 hover:text-purple-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 