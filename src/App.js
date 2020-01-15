import React, { Component } from 'react';
import './css/index.css';
import axios from 'axios';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: []
    };
  } 

  componentDidMount() {
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(response => {
        this.setState({
          gifs: response.data.data
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Nav />
          <Gallery />

        </div>

      </BrowserRouter>
      
    );
  }
}
