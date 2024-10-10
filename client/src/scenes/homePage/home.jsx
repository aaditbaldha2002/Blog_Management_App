import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/NavigationBar";
// import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/PostForm";
import PostsWidget from "scenes/widgets/PostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import {Typography} from "@mui/material";
import styled from "styled-components";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="0rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}

        <FeedColumn>
          <Typography
            color={palette.neutral.dark}
            variant="h2"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
            style={{marginBottom: "0"}}
          >
            Feed
          </Typography>

          <PostsWidget userId={_id} />
        </FeedColumn>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};

const FeedColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default HomePage;
