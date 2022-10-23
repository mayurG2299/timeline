import React from "react";
import TweetsContainer from "./components/TweetsContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
function MainContainer() {
  const [tweets, setTweets] = useState([]);
  const [tweetsContainerRef, setTweetsContainerRef] = useState([]);

  useEffect(() => {
    axios
      .get("http://www.mocky.io/v2/5d1ef97d310000552febe99d")
      .then((response) => {
        // console.log(response.data);
        // response.status == 200 ? setTweets(response.data) : setTweets([]);
        response.status == 200
          ? localStorage.setItem("tweets", JSON.stringify(response.data))
          : localStorage.setItem("tweets", JSON.stringify([]));
        if (
          JSON.parse(localStorage.getItem("filterData")) == null ||
          JSON.parse(localStorage.getItem("filterData")).length == 0
        ) {
          localStorage.setItem("filterData", JSON.stringify([]));
          setTweets(JSON.parse(localStorage.getItem("tweets")));
        } else {
          setTweets(JSON.parse(localStorage.getItem("filterData")));
        }

        // console.log({ isLiked: localStorage.getItem("isLiked") });
        if (JSON.parse(localStorage.getItem("isLiked")) == null)
          localStorage.setItem("isLiked", JSON.stringify([]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header tweets={tweets} onChangeTweets={setTweets} />
      <TweetsContainer
        tweets={tweets}
        likedPost={JSON.parse(localStorage.getItem("isLiked"))}
        setTweetsContainerRef={setTweetsContainerRef}
      />
      <Footer tweetsContainerRef={tweetsContainerRef} />
    </>
  );
}

export default MainContainer;
