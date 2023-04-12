import { AdminBoxWrapper } from "components/adminBoxWrapper";
import { Box, Typography } from "@mui/material";
export const BoxWidget=({imgOrder,text})=>{

    let imgUrl="";
    let imgAlt="";
    const deriveEverything=()=>{
        switch(imgOrder)
        {
            case 1:
                imgUrl="https://www.maxpixel.net/static/photo/2x/Happy-Emoji-Smile-Happy-Face-Yellow-Happiness-5865208.png";
                imgAlt="Happy Emoji";
                break;
            
            case 2:
                imgUrl="https://th.bing.com/th/id/OIP.FNx8zNSGAWV306j1BsocDAHaHk?pid=ImgDet&rs=1";
                imgAlt="Sad Emoji";
                break;
    
            case 3:
                imgUrl="https://th.bing.com/th/id/R.2633f2465add73a94a1078d381a8f1ea?rik=QBRRvUe7VV8NOQ&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f1061%2f1924%2fproducts%2fNeutral_Face_Emoji_grande.png%3fv%3d1480481054&ehk=c%2bJlGO8mC7MX%2b8SIlJCqhnGE1%2fTy69dFwA3xqeS2aOI%3d&risl=&pid=ImgRaw&r=0";
                imgAlt="Nuetral Emoji";
                break;
    
            default:
                imgUrl="-";
                break;
        }
    }
    deriveEverything();

    return (
        <AdminBoxWrapper>
            <Box sx={{
                marginTop:1
            }}>
                <img src={imgUrl} alt={imgAlt} width="100px" height="100px"/>
            </Box>
            <Box sx={{
                borderBottom: 2,
                borderBottomColor: 'black',
            }}>
                <Typography variant="h3">{text}</Typography>
            </Box>
            <Box>
                <Typography variant="h4">50</Typography>
            </Box>
        </AdminBoxWrapper>
    );
};