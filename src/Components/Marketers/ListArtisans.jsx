// src/pages/MarketerArtisans.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const MarketerArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await api.get('/marketers/list-registered-artisans/');
        setArtisans(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch artisans');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Registered Artisans
      </Typography>
      
      {artisans.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">No artisans registered yet</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/register-artisan')}
          >
            Register New Artisan
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {artisans.map((artisan) => (
            <Grid item xs={12} sm={6} md={4} key={artisan.id}>
              <Card elevation={3}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={artisan.profile_image}
                      alt={`${artisan.user.first_name} ${artisan.user.last_name}`}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {artisan.user.first_name} {artisan.user.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {artisan.service?.name || 'No service specified'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<WorkIcon />}
                      label={`${artisan.experience || 0} years experience`}
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={`₦${artisan.pay?.toLocaleString() || '0'}/job`}
                      variant="outlined"
                      color="success"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  </Box>

                  {artisan.location && (
                    <Box display="flex" alignItems="center" mb={1}>
                      <LocationOnIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {artisan.location.name}, {artisan.location.state?.name}
                      </Typography>
                    </Box>
                  )}

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/artisans/${artisan.id}`)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MarketerArtisans;