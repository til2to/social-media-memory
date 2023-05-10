import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab'

import useStyles from './styles';

const Paginate = () => {
  const classes = useStyles();
  return (
    <Pagination />
  )
}

export default Paginate