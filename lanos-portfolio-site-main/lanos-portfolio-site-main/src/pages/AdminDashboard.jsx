import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { studentRegistrationAPI, referralCodeAPI } from '../services/api';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [referralCodes, setReferralCodes] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('registrations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter registrations based on search term
    if (searchTerm.trim() === '') {
      setFilteredRegistrations(registrations);
    } else {
      const filtered = registrations.filter(reg => 
        reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.cityTown.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRegistrations(filtered);
    }
  }, [searchTerm, registrations]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [regData, refData, statsData] = await Promise.all([
        studentRegistrationAPI.getAll(),
        referralCodeAPI.getAll(),
        studentRegistrationAPI.getStatistics()
      ]);
      
      setRegistrations(regData);
      setFilteredRegistrations(regData);
      setReferralCodes(refData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'rgba(0, 200, 83, 0.8)';
      case 'inactive': return 'rgba(255, 76, 76, 0.8)';
      default: return 'rgba(255, 255, 255, 0.6)';
    }
  };

  if (loading) {
    return (
      <section style={{ padding: '8rem 0 4rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2>Loading...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '8rem 0 4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Admin Dashboard</h1>
          
          {/* Statistics Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ color: '#00c2ff', marginBottom: '0.5rem' }}>Total Registrations</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{statistics.totalRegistrations || 0}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ color: '#00c2ff', marginBottom: '0.5rem' }}>With Referral Codes</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{statistics.registrationsWithReferralCode || 0}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ color: '#00c2ff', marginBottom: '0.5rem' }}>Active Referral Codes</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{referralCodes.filter(ref => ref.active).length}</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={() => setActiveTab('registrations')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'registrations' ? '#00c2ff' : 'transparent',
                color: activeTab === 'registrations' ? '#000' : '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: activeTab === 'registrations' ? 'bold' : 'normal'
              }}
            >
              Registrations ({registrations.length})
            </button>
            <button
              onClick={() => setActiveTab('referralCodes')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'referralCodes' ? '#00c2ff' : 'transparent',
                color: activeTab === 'referralCodes' ? '#000' : '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: activeTab === 'referralCodes' ? 'bold' : 'normal'
              }}
            >
              Referral Codes ({referralCodes.length})
            </button>
          </div>

          {/* Search Bar */}
          {activeTab === 'registrations' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Search by name, email, college, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
              />
            </div>
          )}

          {/* Content */}
          <div style={{
            backgroundColor: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {activeTab === 'registrations' ? (
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: '#00c2ff' }}>Student Registrations</h3>
                {filteredRegistrations.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {searchTerm ? 'No registrations found matching your search.' : 'No registrations yet.'}
                  </p>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {filteredRegistrations.map((registration) => (
                      <motion.div
                        key={registration.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          padding: '1.5rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <div>
                            <h4 style={{ color: '#00c2ff', marginBottom: '0.5rem' }}>{registration.fullName}</h4>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Email:</strong> {registration.emailAddress}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Mobile:</strong> {registration.mobileNumber}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>College:</strong> {registration.collegeName}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Course:</strong> {registration.currentCourseAndYear}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>City:</strong> {registration.cityTown}
                            </p>
                            {registration.preferredCourse && (
                              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                                <strong>Preferred Course:</strong> {registration.preferredCourse}
                              </p>
                            )}
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Heard via:</strong> {registration.hearAboutExam}
                            </p>
                            {registration.referralCode && (
                              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                                <strong>Referral Code:</strong> {registration.referralCode}
                              </p>
                            )}
                          </div>
                          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                            <div>ID: {registration.id}</div>
                            <div>Created: {formatDate(registration.createdAt)}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: '#00c2ff' }}>Referral Codes</h3>
                {referralCodes.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                    No referral codes found.
                  </p>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {referralCodes.map((referralCode) => (
                      <motion.div
                        key={referralCode.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          padding: '1.5rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ color: '#00c2ff', marginBottom: '0.5rem' }}>{referralCode.code}</h4>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Owner:</strong> {referralCode.ownerName}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Usage Count:</strong> {referralCode.usageCount}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Description:</strong> {referralCode.description || 'No description'}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '15px',
                              backgroundColor: getStatusColor(referralCode.active ? 'active' : 'inactive'),
                              color: '#fff',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}>
                              {referralCode.active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.5rem' }}>
                              ID: {referralCode.id}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminDashboard; 