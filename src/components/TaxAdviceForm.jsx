import React, { useState } from 'react';
import { TextField, Button, FormControl, Select, MenuItem, FormControlLabel, Checkbox, InputLabel, Box, Typography, Container, Paper, Grid } from '@mui/material';
import axios from 'axios';

const ResponseDisplay = ({ data }) => (
   <Box sx={{ mt: 4 }}>
     <Paper sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa', borderLeft: '4px solid #1976d2' }}>
       <Typography variant="h6" gutterBottom color="primary">Tax Analysis Summary</Typography>
       <Typography variant="body2" sx={{ mb: 2 }}>
         Based on your financial profile, here's how tax-saving investments could benefit you:
       </Typography>
       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
         <Paper sx={{ p: 2, flex: '1 1 300px', bgcolor: '#fff', boxShadow: 2 }}>
           <Typography variant="subtitle2" color="primary">TAX BEFORE INVESTMENT</Typography>
           <Typography variant="h5">₹{data.taxBeforeInvestment.toLocaleString()}</Typography>
         </Paper>
         <Paper sx={{ p: 2, flex: '1 1 300px', bgcolor: '#fff', boxShadow: 2 }}>
           <Typography variant="subtitle2" color="primary">TAX AFTER INVESTMENT</Typography>
           <Typography variant="h5">₹{data.taxAfterInvestment.toLocaleString()}</Typography>
         </Paper>
         <Paper sx={{ p: 2, flex: '1 1 300px', bgcolor: '#fff', boxShadow: 2, borderLeft: '4px solid #4caf50' }}>
           <Typography variant="subtitle2" color="primary">POTENTIAL TAX SAVINGS</Typography>
           <Typography variant="h5" color="success.main">₹{data.totalTaxSaved.toLocaleString()}</Typography>
         </Paper>
       </Box>
     </Paper>
  
     <Paper sx={{ p: 3, bgcolor: '#f8f9fa', borderLeft: '4px solid #1976d2' }}>
       <Typography variant="h6" gutterBottom color="primary">Recommended Investment Strategy</Typography>
       <Typography variant="body2" sx={{ mb: 3 }}>
         Based on your risk profile and investment goals, here are our tailored recommendations:
       </Typography>
       {data.recommendations.map((rec, index) => (
         <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#fff', boxShadow: 2 }}>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
             <Box sx={{ minWidth: '200px' }}>
               <Typography variant="subtitle2" color="primary">SCHEME NAME</Typography>
               <Typography variant="h6">{rec.schemeName}</Typography>
             </Box>
             <Box>
               <Typography variant="subtitle2" color="primary">RECOMMENDED AMOUNT</Typography>
               <Typography variant="h6">₹{rec.amountAllocated.toLocaleString()}</Typography>
             </Box>
             <Box>
               <Typography variant="subtitle2" color="primary">TAX SECTION</Typography>
               <Typography variant="h6">{rec.section}</Typography>
             </Box>
             <Box>
               <Typography variant="subtitle2" color="primary">EXPECTED RETURNS</Typography>
               <Typography variant="h6" color="success.main">{rec.expectedReturnRate}% p.a.</Typography>
             </Box>
           </Box>
         </Paper>
       ))}
     </Paper>
   </Box>
);

function TaxAdviceForm() {
 const [formData, setFormData] = useState({
   income: '',
   amountToInvest: '',
   age: '',
   maritalStatus: 'MARRIED',
   currentEPFContribution: '',
   riskProfile: 'low',
   lockInPeriod: 'low',
   hasHealthInsurance: false
 });

 const [response, setResponse] = useState(null);
 const [error, setError] = useState(null);

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError(null);
   try {
     const res = await axios.post('http://localhost:8080/api/tax-advisor/recommendations', formData);
     setResponse(res.data);
   } catch (err) {
     setError(err.response?.data?.message || 'Error submitting form');
     console.error('Error:', err);
   }
 };

 const handleChange = (e) => {
   const { name, value, checked } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: name === 'hasHealthInsurance' ? checked : value
   }));
 };

 return (
   <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
     <Container maxWidth="md" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
       <Paper elevation={3} sx={{ p: 4, my: 4, width: '100%', maxWidth: '800px' }}>
         <Box sx={{ textAlign: 'center' }}>
           <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
             Tax Investment Advisor
           </Typography>
         </Box>
         
         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
           <Grid container spacing={2}>
             <Grid item xs={12} md={6}>
               <TextField
                 name="income"
                 label="Annual Income"
                 type="number"
                 value={formData.income}
                 onChange={handleChange}
                 fullWidth
                 required
               />
             </Grid>
             <Grid item xs={12} md={6}>
               <TextField
                 name="amountToInvest"
                 label="Amount to Invest"
                 type="number"
                 value={formData.amountToInvest}
                 onChange={handleChange}
                 fullWidth
                 required
               />
             </Grid>
             <Grid item xs={12} md={6}>
               <TextField
                 name="age"
                 label="Age"
                 type="number"
                 value={formData.age}
                 onChange={handleChange}
                 fullWidth
                 required
               />
             </Grid>
             <Grid item xs={12} md={6}>
               <FormControl fullWidth required>
                 <InputLabel>Marital Status</InputLabel>
                 <Select
                   name="maritalStatus"
                   value={formData.maritalStatus}
                   onChange={handleChange}
                   label="Marital Status"
                 >
                   <MenuItem value="MARRIED">Married</MenuItem>
                   <MenuItem value="SINGLE">Single</MenuItem>
                 </Select>
               </FormControl>
             </Grid>
             <Grid item xs={12} md={6}>
               <TextField
                 name="currentEPFContribution"
                 label="Current EPF Contribution"
                 type="number"
                 value={formData.currentEPFContribution}
                 onChange={handleChange}
                 fullWidth
                 required
               />
             </Grid>
             <Grid item xs={12} md={6}>
               <FormControl fullWidth required>
                 <InputLabel>Risk Profile</InputLabel>
                 <Select
                   name="riskProfile"
                   value={formData.riskProfile}
                   onChange={handleChange}
                   label="Risk Profile"
                 >
                   <MenuItem value="low">Low</MenuItem>
                   <MenuItem value="medium">Medium</MenuItem>
                   <MenuItem value="high">High</MenuItem>
                 </Select>
               </FormControl>
             </Grid>
             <Grid item xs={12} md={6}>
               <FormControl fullWidth required>
                 <InputLabel>Lock In Period</InputLabel>
                 <Select
                   name="lockInPeriod"
                   value={formData.lockInPeriod}
                   onChange={handleChange}
                   label="Lock In Period"
                 >
                   <MenuItem value="low">Low</MenuItem>
                   <MenuItem value="medium">Medium</MenuItem>
                   <MenuItem value="high">High</MenuItem>
                 </Select>
               </FormControl>
             </Grid>
             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     name="hasHealthInsurance"
                     checked={formData.hasHealthInsurance}
                     onChange={handleChange}
                   />
                 }
                 label="Has Health Insurance"
               />
             </Grid>
           </Grid>

           <Button 
             type="submit" 
             variant="contained" 
             color="primary"
             sx={{ mt: 3 }}
             fullWidth
           >
             Get Investment Recommendations
           </Button>
         </Box>

         {error && (
           <Box sx={{ mt: 3, textAlign: 'center' }}>
             <Typography color="error">{error}</Typography>
           </Box>
         )}

         {response && <ResponseDisplay data={response} />}
       </Paper>
     </Container>
   </Box>
 );
}

export default TaxAdviceForm;