import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { TextFieldProps } from '@mui/material';

const MyInput = styled(InputBase)({

    '& .MuiInputBase-input': {
      borderBottom: 'none',
      color: "white"
    },
    '& .MuiInputBase-input:hover': {
      borderBottom: 'none',
    },
    '& .MuiInputBase-input:focus': {
      borderBottom: 'none',
    },
  });

  const MyComponent: React.FC<TextFieldProps> = (props) => {
  return (
    <MyInput {...props} sx={{width: "100%",
     paddingY: "15px"  ,
     paddingLeft: "10px",
     background: "#023e51",
      color: "white !important",
       border:"2px solid #023e51",
        borderRadius:"10px",
         marginBottom: "30px",
         borderBottom: 'none !important' 
        }} />
        
    
  );
}

export default MyComponent



