import { Box } from "@mui/material"
import PostsWidget from "./PostsWidget"
import { useSelector } from "react-redux"
import { UserListWidget } from "./UserListWidget"
import { PostsAnalyticsWidget } from "./PostsAnalyticsWidget"
import { adminReducer } from "state";

export const MainViewWidget = () => {
    const view=useSelector((state)=>state.viewPart);
    return <>
        {/* for viewing all the posts */}
        <Box sx={{
            justifyContent:'center',
            alignItems:'center',
            width:1,
        }}>
        
        {/* {(view==="Users") && <UserListWidget />} */}
        {/* {(view==="Posts") && <PostsWidget />} */}
        {/* {(view==="PostsAnalytics") && <PostsAnalyticsWidget />} */}
            <PostsWidget isAdminSide='true'/>
        </Box>
    </>
}