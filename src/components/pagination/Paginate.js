import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actionCreators from '../../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if(page) dispatch(actionCreators.getPosts(page))
  }, [page])

  return (
    <Pagination 
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem { ...item } component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate