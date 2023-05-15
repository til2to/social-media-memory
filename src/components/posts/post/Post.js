import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, } from '@material-ui/core';
import { ThumbUpAltOutlined } from '@material-ui/icons';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { useDispatch, } from 'react-redux';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

import useStyles from "./styles";
import { deletePost, updateLikes } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const encryptedPayload = localStorage.getItem('profile');
  let user = null;

   // decrypt user profile from local storage
  const userInfo = process.env.REACT_APP_ENCODE_DECODE_OAUTH

  if (encryptedPayload) {
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, userInfo);
    if (bytes.toString().length > 0) {
      const decryptedPayload = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decryptedPayload);
    } else {
      console.error('Failed to decrypt payload');
    }
  }
 
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  // open post details
  const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay} >
          <Typography  variant='h6'>{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
        (<div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>)}
        <div className={classes.details}>
          <Typography  variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>  
          <Typography variant='body2' color='textSecondary' component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(updateLikes(post._id))}>
          <Likes fontSize='small'/>
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
          (
            <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize='small'/>
              Delete
            </Button>
          )
        }
      </CardActions>
    </Card>
  )
}

export default Post
