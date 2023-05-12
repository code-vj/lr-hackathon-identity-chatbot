import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
interface MyComponentProps {
  children: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = (props) => { 
  return (
      <Card {...props} sx={{
          textAlign: "left",
          width: "100%",
          backgroundColor: "#01364b",
          color: "white",
          border: "2px solid #01364b",
          borderRadius: "10px",
          
          marginBottom: "25px",
          boxShadow: "10px 5px 5px #141414"
          
      }}>
        <Paper {...props} sx={{
          width: "100%",
          paddingY: "10px",
          backgroundColor: "#01364b",
          color: "white",
          borderRadius: "10px",
          boxShadow: "10px 5px 5px #141414"
          
      }}>
      <CardContent sx={{padding: "0px !important"}}>
        {props.children}
        </CardContent>
      </Paper>
    </Card>
  );
}

export default MyComponent;