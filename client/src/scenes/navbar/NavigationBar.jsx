import { useState } from "react";
import { setPosts } from "state/index";

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { styled, keyframes } from "styled-components";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [search, setSearch] = useState("");
  const [iconDropdownVisibility, setIconDropdownVisibility] = useState(false);
  const [profileIconDropdownHovered, setIconDropdownHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const picturePath = user.picturePath;
  const token = useSelector((state) => state.token);
  const whichSide = useSelector((state) => state.side);
  const navbardisplay = useMediaQuery("(min-width: 200px");

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const searchbox = async () => {
    if (search !== "" && search !== " ") {
      const response = await fetch(
        `${process.env.REACT_APP_IP}/posts/${search}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      console.log(posts);
    } else {
      const response = await fetch(`${process.env.REACT_APP_IP}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      console.log(posts);
    }
  };

  const handleDropdownVisibility = () => {
    let currentHoveredState = profileIconDropdownHovered;
    if (currentHoveredState === true) {
      setIconDropdownHovered(false);
      setTimeout(() => {
        setIconDropdownVisibility(false);
      }, 250);
    } else {
      setIconDropdownHovered(true);
      setIconDropdownVisibility(true);
    }
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          // color="primary"
          onClick={() => {
            console.log(whichSide);
            if (whichSide === "admin") {
              navigate("/admin");
            } else navigate("/home");
          }}
          sx={{
            "&:hover": {
              cursor: "pointer",
              background: `linear-gradient(to right, ${theme.palette.neutral.dark} 50%, ${theme.palette.primary.main} 50%)`, // Color transition from white to cyan
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              animation: "color-transition 0.35s forwards",
              backgroundSize: "200% 100%",
            },

            "&:not(:hover)": {
              background: `linear-gradient(to left, ${theme.palette.neutral.dark} 50%, ${theme.palette.primary.main} 50%)`, // Color transition from white to cyan
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              animation: "color-reverse-transition 0.35s forwards",
              backgroundSize: "200% 100%",
            },

            "@keyframes color-transition": {
              "0%": {
                backgroundPosition: "0% 0%",
              },
              "100%": {
                backgroundPosition: "-100% 0%",
              },
            },

            "@keyframes color-reverse-transition": {
              "0%": {
                backgroundPosition: "0% 0%",
              },
              "100%": {
                backgroundPosition: "100% 0%",
              },
            },
          }}
        >
          Blog Management
        </Typography>
        {navbardisplay && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.25rem 0.5rem 0.25rem 1rem"
          >
            <InputBase
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IconButton onClick={searchbox}>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <ProfileIcon
            onMouseEnter={handleDropdownVisibility}
            onMouseLeave={handleDropdownVisibility}
            src={`${process.env.REACT_APP_IP}/assets/${picturePath}`}
          />

          {iconDropdownVisibility && (
            <ProfileDropdown
              style={{
                backgroundColor: background,
              }}
              animate={profileIconDropdownHovered}
            >
              <MenuItem
                value={fullName}
                onMouseEnter={() => {
                  setIconDropdownHovered(true);
                }}
                onMouseLeave={() => {
                  setIconDropdownHovered(false);
                }}
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => dispatch(setLogout())}
                onMouseEnter={() => {
                  setIconDropdownHovered(true);
                }}
                onMouseLeave={() => {
                  setIconDropdownHovered(false);
                }}
              >
                Log Out
              </MenuItem>
            </ProfileDropdown>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/*<Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} /> */}

            <ProfileIcon
              onMouseEnter={handleDropdownVisibility}
              onMouseLeave={handleDropdownVisibility}
              src={`${process.env.REACT_APP_IP}/assets/${picturePath}`}
              size="30px"
              alt="Error"
            />

            {iconDropdownVisibility && (
              <ProfileDropdown animate={profileIconDropdownHovered}>
                <MenuItem
                  value={fullName}
                  onMouseEnter={() => {
                    setIconDropdownHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIconDropdownHovered(false);
                  }}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setLogout())}
                  onMouseEnter={() => {
                    setIconDropdownHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIconDropdownHovered(false);
                  }}
                >
                  Log Out
                </MenuItem>
              </ProfileDropdown>
            )}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

const ProfileIcon = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  object-fit: cover;
`;

const fadeOut = keyframes`
  from{
    opacity: 1;
  }to{
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from{
    opacity:0;
  }to{
    opacity:1;
  }
`;

const ProfileDropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  right: 90px;
  animation: ${(props) => (props.animate ? fadeIn : fadeOut)} 0.25s linear
    forwards;
  border-radius: 5px;
`;

export default Navbar;
