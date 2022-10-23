import React from "react";
import "./Footer.css";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import { IconButton, Tooltip, alpha } from "@mui/material";
function Footer({ tweetsContainerRef }) {
  return (
    <div className="goToTop">
      <Tooltip title="Go back to top">
        <IconButton
          onClick={() => {
            // console.log(tweetsContainerRef);
            tweetsContainerRef.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          sx={{
            "&:hover": {
              backgroundColor: alpha("#d4e8f2", 0.1),
            },
          }}
        >
          <NavigationOutlinedIcon sx={{ color: "#d6d9db" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Footer;
