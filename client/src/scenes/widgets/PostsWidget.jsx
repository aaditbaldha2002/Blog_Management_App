import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, resetPosts } from "state/index";
import PostWidget from "./PostWidget";
import { usePosts } from "../../context";

const PostsWidget = ({ userId, isProfile = false, isAdminSide }) => {
  const { posts, dispatch } = usePosts();
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const hasMorePostsRef = useRef(hasMorePosts);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    hasMorePostsRef.current = hasMorePosts;
  }, [hasMorePosts]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [page]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll); // Listen for scroll events
    return () => window.removeEventListener("scroll", throttledHandleScroll); // Cleanup
  }, []);

  useEffect(()=>{
    resetPosts();
  },[]);

  const resetPosts = () =>{
    dispatch({ type: "RESET_POSTS" });
    setPage(1); 
    setHasMorePosts(true); 
  }

  const throttle = (func, delay) => {
    let lastCall = 0;

    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func(...args);
      }
    };
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMorePostsRef.current
    ) {
      setPage((prevPage) => prevPage + 1); // Load the next page
    }
  };

  const getPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_IP}/posts?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    if (data.length == 0) {
      setHasMorePosts(false);
    }
    dispatch({
      type: "SET_POSTS",
      payload: (prevPosts) => [...prevPosts, ...data],
    });
  };

  const getUserPosts = async () => {
    //do something with page
    const response = await fetch(
      `${process.env.REACT_APP_IP}/posts/user/${userId}?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    
    if (data.length == 0) setHasMorePosts(false);
    dispatch({
      type: "SET_POSTS",
      payload: (prevPosts) => [...prevPosts, ...data],
    });
  };

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt          
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt = {createdAt}
            isProfile={isProfile}
            isAdminPost={isAdminSide}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
