import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import './css/index.css';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import PageNotFound from './components/PageNotFound';
import apiKey from './config';

class App extends Component {
  // Everytime the app opens up we want to create a new array to store photos and set loading to true
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  } 

  // When the app starts we want to run this function that calls the function that runs the search as well as keeps track of history
  componentDidMount() {
    const history = createBrowserHistory();
    let query = history.location.pathname.replace(/[^\w\s]/gi, '').replace("search", '');
    console.log(history);
    this.performSearch(query);
  }

  // This function calls the api using the api key from the config component and the parameter passed from component did mount
  // If no parameter is specified the default value is cat
  performSearch = (query = 'cats') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo,
        loading: false
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

// Renders components based on url/links
  render() { 

    // Using this for testing erase later
    console.log(this.state.photos);

    return (
      
      <BrowserRouter> 
        <div className="container">
          <Route render={(props)=>
            <SearchForm onSearch={this.performSearch} {...props}/>
          } />
          <Nav onClick={this.performSearch}/>
          <Switch>
          
            <Route exact path = "/" render={() => 
            <Redirect to = '/search/cats' />} />
  
            <Route path ="/search/:name" 
            render={(props) =>
              (this.state.loading)
              ? <p>Loading...</p>
              : <Gallery data={this.state.photos} {...props}/>
            } />

            <Route component={PageNotFound} />
          </Switch>
            
        </div>

      </BrowserRouter>
      
    );
  }
}

export default App;