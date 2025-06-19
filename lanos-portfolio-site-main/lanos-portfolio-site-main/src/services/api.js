const API_BASE_URL = '/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch {
      // ignore
    }
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.details = errorData.errors || null;
    throw error;
  }
  return response.json();
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Student Registration API
export const studentRegistrationAPI = {
  // Create new registration
  create: async (registrationData) => {
    return apiRequest('/registrations', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  },

  // Get all registrations
  getAll: async () => {
    return apiRequest('/registrations');
  },

  // Get registration by ID
  getById: async (id) => {
    return apiRequest(`/registrations/${id}`);
  },

  // Update registration
  update: async (id, registrationData) => {
    return apiRequest(`/registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registrationData),
    });
  },

  // Delete registration
  delete: async (id) => {
    return apiRequest(`/registrations/${id}`, {
      method: 'DELETE',
    });
  },

  // Search registrations
  searchByName: async (name) => {
    return apiRequest(`/registrations/search/name?name=${encodeURIComponent(name)}`);
  },

  searchByCollege: async (collegeName) => {
    return apiRequest(`/registrations/search/college?collegeName=${encodeURIComponent(collegeName)}`);
  },

  searchByCity: async (cityTown) => {
    return apiRequest(`/registrations/search/city?cityTown=${encodeURIComponent(cityTown)}`);
  },

  // Get registrations by criteria
  getByPreferredCourse: async (preferredCourse) => {
    return apiRequest(`/registrations/course/${preferredCourse}`);
  },

  getByHearAboutExam: async (hearAboutExam) => {
    return apiRequest(`/registrations/source/${hearAboutExam}`);
  },

  getByReferralCode: async (referralCode) => {
    return apiRequest(`/registrations/referral/${referralCode}`);
  },

  // Advanced search
  searchAdvanced: async (criteria) => {
    const params = new URLSearchParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    return apiRequest(`/registrations/search/advanced?${params.toString()}`);
  },

  // Get statistics
  getStatistics: async () => {
    return apiRequest('/registrations/statistics');
  },

  // Get available options
  getAvailableCourses: async () => {
    return apiRequest('/registrations/courses');
  },

  getAvailableSources: async () => {
    return apiRequest('/registrations/sources');
  },

  // Check if email exists
  checkEmailExists: async (email) => {
    return apiRequest(`/registrations/check-email?email=${encodeURIComponent(email)}`);
  },

  // Check if mobile exists
  checkMobileExists: async (mobile) => {
    return apiRequest(`/registrations/check-mobile?mobile=${encodeURIComponent(mobile)}`);
  },
};

// Referral Code API
export const referralCodeAPI = {
  // Create new referral code
  create: async (referralCodeData) => {
    return apiRequest('/referral-codes', {
      method: 'POST',
      body: JSON.stringify(referralCodeData),
    });
  },

  // Get all referral codes
  getAll: async () => {
    return apiRequest('/referral-codes');
  },

  // Get active referral codes
  getActive: async () => {
    return apiRequest('/referral-codes/active');
  },

  // Get referral code by ID
  getById: async (id) => {
    return apiRequest(`/referral-codes/${id}`);
  },

  // Get referral code by code
  getByCode: async (code) => {
    return apiRequest(`/referral-codes/code/${code}`);
  },

  // Update referral code
  update: async (id, referralCodeData) => {
    return apiRequest(`/referral-codes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(referralCodeData),
    });
  },

  // Delete referral code
  delete: async (id) => {
    return apiRequest(`/referral-codes/${id}`, {
      method: 'DELETE',
    });
  },

  // Activate referral code
  activate: async (id) => {
    return apiRequest(`/referral-codes/${id}/activate`, {
      method: 'PUT',
    });
  },

  // Deactivate referral code
  deactivate: async (id) => {
    return apiRequest(`/referral-codes/${id}/deactivate`, {
      method: 'PUT',
    });
  },

  // Search referral codes
  searchByOwner: async (ownerName) => {
    return apiRequest(`/referral-codes/search/owner?ownerName=${encodeURIComponent(ownerName)}`);
  },

  // Get top referral codes
  getTop: async () => {
    return apiRequest('/referral-codes/top');
  },

  // Get referral codes with minimum usage
  getWithMinUsage: async (minUsage) => {
    return apiRequest(`/referral-codes/usage/${minUsage}`);
  },

  // Get statistics
  getStatistics: async () => {
    return apiRequest('/referral-codes/statistics');
  },

  // Validate referral code
  validate: async (code) => {
    return apiRequest(`/referral-codes/validate/${code}`);
  },

  // Initialize default referral codes
  initialize: async () => {
    return apiRequest('/referral-codes/initialize', {
      method: 'POST',
    });
  },
};

export default {
  studentRegistration: studentRegistrationAPI,
  referralCode: referralCodeAPI,
}; 