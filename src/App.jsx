import { ThemeProvider, createTheme } from '@mui/material';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useState } from 'react';
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
 const [activePanel, setActivePanel] = useState('taxAdvice');

 const handlePanelSwitch = () => {
   setActivePanel(activePanel === 'taxAdvice' ? 'pf' : 'taxAdvice');
 };

 return (
   <ThemeProvider theme={theme}>
     <Box className="animated-background" sx={{
       minHeight: '100vh',
       width: '100vw',
       margin: 0,
       padding: 0
     }}>
       <Container maxWidth={false} disableGutters sx={{
         height: '100vh',
         width: '100vw'
       }}>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
         <Button 
  variant="contained" 
  onClick={handlePanelSwitch}
  sx={{
    backgroundColor: '#4caf50',
    fontSize: '1.1rem',
    padding: '10px 20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
    },
    transition: 'all 0.3s ease'
  }}
>
  {activePanel === 'taxAdvice' ? 'Personal Finance' : 'Tax Advice'}
</Button>
         </Box>
         <Paper elevation={3} className="glass-morphism" sx={{
           height: '100%',
           width: '100%',
           borderRadius: 0,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           p: 4
         }}>
           {activePanel === 'taxAdvice' ? (
             <>
               <Typography variant="h4" align="center" className="title-animation" sx={{ mb: 2 }}>
                 Tax Investment Advisor
               </Typography>
               <Typography variant="subtitle1" color="text.secondary" className="fade-in" sx={{ mb: 4 }}>
                 Smart Investment Planning & Tax Optimization
               </Typography>
               <TaxAdviceForm />
             </>
           ) : (
             <iframe
               src="http://localhost:3000" // Update with your other React project URL
               style={{
                 width: '100%',
                 height: '100%',
                 border: 'none',
                 borderRadius: '4px'
               }}
               title="Personal Finance App"
             />
           )}
         </Paper>
       </Container>
     </Box>
   </ThemeProvider>
 );
}

export default App;