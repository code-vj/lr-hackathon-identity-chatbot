import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  Paper } from '@mui/material';
interface MyComponentProps {
  label: string;
}

const MyComponent: React.FC<MyComponentProps> = (props) => { 
  return (
    <Card {...props} sx={{width: "100%", background: "black", color: "white", border:"4px solid #01364b ", borderRadius:"10px", marginBottom: "40px"}}>
        <Paper {...props} sx={{ background: "black", color: "white"}}>
      <CardContent sx={{padding: "10px !important"}}>
        <Typography gutterBottom variant="h6" component="div">
          {props.label}
        </Typography>
        </CardContent>
      </Paper>
    </Card>
  );
}

export default MyComponent