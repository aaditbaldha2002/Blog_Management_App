import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const AdminBoxWrapper=styled(Box)(({theme})=>({
    borderRadius: 5,
    textAlign:'center',
    color:'black',
    backgroundColor: 'white',
    height:'fit-content',
    width:320,
    marginTop:25,
}));

