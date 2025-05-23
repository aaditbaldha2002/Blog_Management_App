import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size} sx={{
      "&:hover":{
        cursor: "pointer",
      }
    }}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${process.env.REACT_APP_IP}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
