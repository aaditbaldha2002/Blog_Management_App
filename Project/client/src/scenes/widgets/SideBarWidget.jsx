import WidgetWrapper from "components/WidgetWrapper"
import { Box, Divider, Typography} from "@mui/material";
import { borderColor } from "@mui/system";
import { themeSettings } from "theme";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPostAnalyticsView, setPostsView, setUserView } from "state/index";
import { useTheme } from "@emotion/react";


export const SideBarWidget=()=>{
    const dispatch = useDispatch();
    const [isUsers,setUsers]=useState("false");
    const [isPosts,setPosts]=useState("true");
    const [isPostsAnalysis,setPostsAnalysis]=useState("false");

    return <>
    <WidgetWrapper>
        {/* for the list of options */}
        <Box sx={{
            display:'flex',
            justifyContent:'center',
            rowGap:2,
            flexFlow:'column'
        }}>
            {/* for viewing the users */}
            <Box sx={{
                textAlign:'center'
            }}>
                <Typography variant="h3" onClick={()=>{
                    if(isUsers==="false")
                    {
                        dispatch(setUserView());
                        setUsers("true");
                        setPosts("false");
                        setPostsAnalysis("false");
                    }
                }} 
                sx={{
                    color:isUsers==="true"?'darkcyan':'primary',
                    "&:hover":{
                        color: isUsers==="true"?'darkcyan':'cyan'
                    }
                }}>View Users</Typography>
            </Box>
            <Divider variant="middle"></Divider>
            {/* for viewing the posts */}
            <Box sx={{
                textAlign:'center'
            }}>
                <Typography variant="h3" onClick={()=>{
                    if(isPosts==="false")
                    {
                        dispatch(setPostsView());
                        setUsers("false");
                        setPosts("true");
                        setPostsAnalysis("false");
                    }
                }} 
                sx={{
                    color:isPosts==="true"?'darkcyan':'primary',
                    "&:hover":{
                        color:isPosts==="true"?'darkcyan':'cyan'
                    }
                }}>View Posts</Typography>
            </Box>
            <Divider variant="middle"></Divider>
            {/* for viewing post analytics */}
            <Box sx={{
                textAlign:'center'
            }}>
                <Typography variant="h3" onClick={()=>{
                    if(isPostsAnalysis==="false")
                    {
                        dispatch(setPostAnalyticsView());
                        setUsers("false");
                        setPosts("false");
                        setPostsAnalysis("true");
                    }
                }}
                sx={{
                    color:isPostsAnalysis==="true"?'darkcyan':'primary',
                    "&:hover":{
                        color:isPostsAnalysis==="true"?'darkcyan':'cyan'
                    }
                }}>View Posts Analytics</Typography>
            </Box>
        </Box>
    </WidgetWrapper>
    </>
}