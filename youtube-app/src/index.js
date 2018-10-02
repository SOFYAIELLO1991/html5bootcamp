import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import Auth from './components/Auth';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer'
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const YT_API = 'AIzaSyDfU0bVmY6kv9H8Sm3k9X0ucyM5cHyd8ak';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.searchYoutube('');
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term) }, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar siteTitle='React Youtube App' />
        <Auth/>
        <div className="container">
          <SearchBar
            onChange={(searchTerm) => {this.videoSearch(searchTerm)}} />
          <VideoPlayer video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
            videos={this.state.videos}
            />
            <div id="results"></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.app'));