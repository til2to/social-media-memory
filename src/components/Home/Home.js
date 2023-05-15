import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../posts/Posts'
import Form from '../form/Form'
import useStyles from "./styles";
import { getPostsBySearch } from '../../actions/posts'
import Paginate from '../pagination/Paginate'

// custom hook to extract parameters in the query string from URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  
  // Get page and searchQuery parameters
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery')

  const searchPost = () => {
    if(search.trim() || tags){
      // dispatch to get searched post
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/');
    }
  }
  // handle the 'enter' key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // search for the post
      setSearch(event.target.value)
      searchPost();
    }
  }
  // add tags in the field below the search field
  const handleAddTags = (tagToAdd) => setTags([...tags, tagToAdd]);
  // delete tag added
  const handleDeleteTags = (tagToDelete) => {
    return setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container 
        className={classes.gridContainer} 
        justifyContent="space-between" 
        alignItems="stretch" spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField name='search' 
              variant='outlined' 
              onKeyDown={handleKeyDown}
              label="search Memories"
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              />
              <ChipInput 
                style={{ margin: '10px 0'}}
                value={tags}
                onAdd={handleAddTags}
                onDelete={handleDeleteTags}
                label="search tags"
                variant='outlined'
              />
              <Button onClick={searchPost} 
                className={classes.searchButton} 
                color="primary"
                style={{ backgroundColor: '#001F3F' }}
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && 
              <Paper elevation={6}>
                <Paginate page={page} />
              </Paper>
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home