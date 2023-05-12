import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

export default function ChatCard(props) {
  return (
      <Card {...props} sx={{
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
      <CardContent sx={{padding: "10px !important"}}>
        <Typography gutterBottom variant="p" component="div">
          {props.label}
        </Typography>
        </CardContent>
      </Paper>
    </Card>
  );
}