import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from '../posts/post/Post';
import useStyles from "./styles"

const Posts = ({ setCurrentId }) => {
  const classes = useStyles()
  const { posts, isLoading } = useSelector((state) => state.posts);
  
  if(!posts.length && !isLoading) return 'No Posts';

  return (
    isLoading ? <CircularProgress/> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} xs={12} sm={12} md={4} xl={3} item>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts