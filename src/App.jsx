import { ThemeProvider, createTheme } from '@mui/material';
import { Container, Typography, Box, Paper } from '@mui/material';
import TaxAdviceForm from './components/TaxAdviceForm';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#4caf50' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    h4: {
      fontWeight: 600,
      background: 'linear-gradient(45deg, #1976d2 30%, #4caf50 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="animated-background" sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="sm" sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Paper elevation={3} className="glass-morphism" sx={{ 
            p: 4, 
            borderRadius: 3,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography variant="h4" gutterBottom align="center" className="title-animation">
              Tax Investment Advisor
            </Typography>
            <Typography 
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 4 }}
              className="fade-in"
            >
              Smart Investment Planning & Tax Optimization
            </Typography>
            <TaxAdviceForm />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;