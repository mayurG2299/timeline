import React, { useRef } from "react";

import Tweet from "./Tweet";

import "./TweetsContainer.css";
function TweetsContainer({ tweets, likedPost, setTweetsContainerRef }) {
  const tweetsContainer = useRef(null);
  console.log({ likedPost });
  setTweetsContainerRef(tweetsContainer.current);
  return (
    <div className="tweetsContainer" ref={tweetsContainer}>
      {tweets.map((tweet) => {
        return (
          <Tweet
            id={tweet._id}
            userName={tweet.author}
            userImageUrl={"temp.png"}
            tweetText={tweet.text}
            tweetImageUrl={tweet?.imageUrl}
            likes={tweet?.likes ?? 0}
            isLiked={likedPost.includes(tweet._id) ? true : false}
          />
        );
      })}
    </div>
  );
}

export default TweetsContainer;
