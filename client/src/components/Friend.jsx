import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import SentimentSatisfiedSharpIcon from "@mui/icons-material/SentimentSatisfiedSharp";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state/index";
import { setPosts } from "state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState } from "react";
import { usePosts } from "../context";
import moment from "moment";
import {SECOND_DIFF,MINUTE_DIFF,HOUR_DIFF,DAY_DIFF,MONTH_DIFF} from "constants/index";

const Friend = ({
  call,
  postId,
  friendId,
  name,
  subtitle,
  userPicturePath,
  createdAt,
  isProfile = false,
  isAdminSide,
}) => {
  const dispatch = useDispatch();
  const { dispatch: postsDispatch } = usePosts();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("null");
  const { palette } = useTheme();
  const loggedInUserId = useSelector((state) => state.user._id);
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.find((friend) => friend._id === friendId);

  const OpendeleteModal = () => {
    setOpen(true);
  };

  const ClosedeleteModal = () => {
    setOpen(false);
  };

  const DeletePost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_IP}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    ClosedeleteModal();
    postsDispatch({
      type: "DELETE_POST",
      payload: postId, // The _id of the post you want to delete
    });
  };

  const analysePost = async () => {
    let postStat = await fetch(
      `${process.env.REACT_APP_IP}/admin/${postId}/analysis`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.msg.replaceAll("\r\n", ""));
      })
      .catch((err) => {});
  };

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_IP}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  const getRelativeTime = (createdAt) => {
    // The post time is parsed in UTC (MongoDB Stores Time in UTC)
    const postTime = moment.utc(createdAt);

    // Use the current time in the user's local timezone
    const now = moment();

    const diffSeconds = now.diff(postTime, "seconds");

    if (diffSeconds < SECOND_DIFF) {
      return `${diffSeconds}s`; // Show seconds if less than 60s
    } else if (diffSeconds < MINUTE_DIFF) {
      const diffMinutes = now.diff(postTime, "minutes");
      return `${diffMinutes}m`; // Show minutes if less than 1hr
    } else if (diffSeconds < HOUR_DIFF) {
      const diffHours = now.diff(postTime, "hours");
      return `${diffHours}hr`; // Show hours if less than 24hrs
    } else if (diffSeconds < DAY_DIFF) {
      const diffDays = now.diff(postTime, "days");
      return `${diffDays}d`; // Show days if less than 30 days
    } else if (diffSeconds < MONTH_DIFF) {
      const diffMonths = now.diff(postTime, "months");
      return `${diffMonths}mo`; // Show months if less than 1 year
    } else {
      const diffYears = now.diff(postTime, "years");
      return `${diffYears}yr`; // Show years if more than 1 year
    }
};
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
            {call === "PostWidget" && (
              <>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: "4px", // Adds some space between name and time
                    fontWeight: "500", // Lighter font weight
                    fontSize:"1rem",
                    color: palette.text.secondary, // Optional: make the color lighter
                  }}
                >
                  •
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: "4px", // Adds some space between name and time
                    fontWeight: "100", // Lighter font weight
                    fontSize:"0.80rem",
                    color: palette.text.secondary, // Optional: make the color lighter
                  }}
                >
                  {getRelativeTime(createdAt)}
                </Typography>
              </>
            )}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/*sentiment analysis button */}
      {isAdminSide === "true" && (
        <Button onClick={analysePost} variant="contained">
          Analyse Post
        </Button>
      )}

      {/* for positive icon */}
      {isAdminSide === "true" && response === "positive" && (
        <SentimentSatisfiedSharpIcon />
      )}

      {/* for negative icon */}
      {isAdminSide === "true" && response === "negative" && (
        <SentimentVeryDissatisfiedIcon />
      )}

      {/* for neutral icon */}
      {isAdminSide === "true" && response === "neutral" && (
        <SentimentNeutralOutlinedIcon />
      )}

      <FlexBetween gap="1rem">
        {call == "PostWidget" && loggedInUserId == friendId && (
          <IconButton aria-label="delete">
            <DeleteIcon onClick={OpendeleteModal} />

            <Dialog
              open={open}
              onClose={ClosedeleteModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Post?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete post? This action cannot be
                  reverted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={ClosedeleteModal}>Cancel</Button>
                <Button onClick={DeletePost} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </IconButton>
        )}
        {call == "PostWidget" &&
          loggedInUserId != friendId &&
          isProfile == false && (
            <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )}
            </IconButton>
          )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
