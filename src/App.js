import React, { Component } from 'react';
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
  
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  } 
  componentDidMount() {
    this.performSearch();
  }
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


  render() { 
    console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
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