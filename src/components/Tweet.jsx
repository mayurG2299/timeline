import React, { useState } from "react";
import { Avatar, IconButton, alpha, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Tweet.css";
import _ from "lodash";

const useClasses = makeStyles((theme) => ({
  iconContainer: {
    "&:hover": {
      backgroundColor: alpha("#f91880", 0.5),
    },
    "&:hover $icon": {
      color: "#f91880",
    },
  },
  icon: {
    color: "#d6d9db",
  },
}));
function Tweet({
  id,
  userName,
  userImageUrl,
  tweetText,
  tweetImageUrl,
  likes,
  isLiked,
}) {
  console.log({ likes, isLiked, id });
  const [likesCount, setLikeCount] = useState(
    isLiked ? JSON.stringify(parseInt(likes) + 1) : likes
  );
  const [liked, setIsLiked] = useState(isLiked ? 1 : 0);
  const classes = useClasses();
  console.log({ likesCount, liked });
  const onLike = () => {
    if (liked) {
      setLikeCount(parseInt(likesCount) - 1);
      let islikedArr = JSON.parse(localStorage.getItem("isLiked"));
      _.remove(islikedArr, (e) => {
        return e == id;
      });
      localStorage.setItem("isLiked", JSON.stringify(islikedArr));
      setIsLiked(false);
    } else {
      setLikeCount(parseInt(likesCount) + 1);
      let islikedArr = JSON.parse(localStorage.getItem("isLiked"));
      console.log({ islikedArr });
      islikedArr.push(id);
      console.log({ islikedArr });
      localStorage.setItem("isLiked", JSON.stringify(islikedArr));
      setIsLiked(true);
    }
    console.log({ likesCount, liked });
  };
  return (
    <div className="tweetContainer">
      <Avatar className="avatarContainer" alt={userName} src={userImageUrl} />
      <div className="dataContainer">
        <h3 className="userName">{userName}</h3>
        <h5 className="tweetText">{tweetText}</h5>
        {/* image */}
        {tweetImageUrl ? (
          <img className="tweetImage" src={tweetImageUrl} alt="" />
        ) : null}
        {/* options */}
        <div className="optionsContainer">
          <div className="likeOption">
            {/* <Tooltip title="Like"> */}{" "}
            <IconButton
              onClick={onLike}
              classes={{
                root: classes.iconContainer,
              }}
            >
              {liked ? (
                <FavoriteIcon sx={{ color: "#f91881" }} />
              ) : (
                <FavoriteBorderOutlinedIcon className={classes.icon} />
              )}
            </IconButton>{" "}
            {/* </Tooltip> */}
            {likesCount != "0" ? (
              <h3 className={liked ? "likeCount" : "likedCount"}>
                {likesCount}
              </h3>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
