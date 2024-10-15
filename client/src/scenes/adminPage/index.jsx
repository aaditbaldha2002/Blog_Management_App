import { Box, Divider, Typography} from "@mui/material";
import { margin } from "@mui/system";
// import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/NavigationBar";
import { BoxWidget } from "scenes/widgets/BoxWidget";
import { MainViewWidget } from "scenes/widgets/MainViewWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import { SideBarWidget } from "scenes/widgets/SideBarWidget";

const adminPage=()=>{
    // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    // const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box sx={{
            height:1
        }}>
            <Navbar side="admin"/>
            {/* bottom part of the view */}
            <Box sx={{
                display:'flex',
                flexWrap:'nowrap',
                columnGap:2,
                height:'fit-content',
            }}>
                {/* for side bar */}
                <Box sx={{
                    margin:2,
                    width:0.4,
                    position:'-webkit-sticky'
                }}>
                    <SideBarWidget></SideBarWidget>
                </Box>

                {/* for the divider */}
                <Box>
                    <Divider orientation="vertical" variant="middle"></Divider>
                </Box>

                {/* for the main view */}
                <Box sx={{
                    width:1,
                    marginTop:2,
                    alignItems:'center',
                    justifyContent:'center',
                    flexFlow:'column',
                    display:'flex',
                }}>

                    <Box sx={{
                        width:0.6,
                        alignContent:'center',
                        flexFlow:'column',
                        display:'flex',
                    }}>
                        {/* for the title */}
                        {/* or can be used for a search bar */}
                        <Box sx={{
                            textAlign: 'center'
                        }}>
                            <Typography variant="h2"> Posts </Typography> 
                        </Box>

                        <MainViewWidget/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default adminPage;
