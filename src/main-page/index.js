import React, { Component } from 'react';
// import logo from './logo.svg';
import './main-page.css';
import Customers from '../component/customers/customers';

import World from '../component/customers/world';

import Politics from '../component/customers/politics';

import Business from '../component/customers/business';

import Sports from '../component/customers/sports';

import Technology from '../component/customers/technology';
import PageWithComments from '../component/customers/testcomment';
import Search from '../component/customers/search';
import { ToastContainer, toast,Zoom } from 'react-toastify';
import Bookmark from '../component/bookmarks/bookmark';
import Article from '../component/detail-article/article';
import PrintArticle from '../component/detail-article/print_article'
import smoothscroll from 'smoothscroll-polyfill';
import Header from './header';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch as Switch1,
  Route,
  NavLink,
  Link
} from "react-router-dom";
class App extends Component {
  state ={
    article:null,


  }

constructor(props)
{
  super(props)
  var x=localStorage.getItem("checked")
      var y
      if(x=="false")
          y=false
      else
          y=true

  this.state={
    checked:y,
    right:true,
    icon:false
  }
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
  this.filterChannel=this.filterChannel.bind(this)
  this.rightNav=this.rightNav.bind(this)
  this.bookmarkIcon=this.bookmarkIcon.bind(this)
}

rightNav= (right) => {
    this.setState({right:right})
  }

  filterChannel = (checked) => {
      window.location.reload(true)
      localStorage.removeItem("checked")
      localStorage.setItem("checked",checked)
      this.setState({ checked:checked });
    }
    filterKeyword = (key) => {
        this.setState({key})
        console.log(this.props)
      }
      filterCategory = (category) => {
          this.setState({ category });
          alert(category)

        }
        filterBookmark = (bookmark) => {
            this.setState({ bookmark });
            alert('check book')

          }

          bookmarkIcon = (icon) =>
          {
            this.setState({icon:icon})
          }

            Bookmark =() => {
              return <Bookmark/>
            }

  render() {
    //localStorage.clear()
  let activeComponent = null;
  if(!this.state.article)
  activeComponent=<Customers getActive={this.getActive}/>
  else {
    activeComponent=<Article article={this.state.article}/>
  }

    let checked=false
    if(localStorage.getItem("checked")==="true")
      checked=true
    else {
      checked=false
    }

    return (

      <div className="container">

        <ToastContainer/>

      <HashRouter>
        <Route render={(props) => <Header {...props} rightNav={this.state.right} bookmarkIcon={this.state.icon} filterBookmark={this.filterBookmark} filterChannel={this.filterChannel} filterKeyword={this.filterKeyword}/>}/>
        <Route exact path="/" render={(props) => <Customers {...props} getActive={this.state.checked} />}/>
        <Route path="/world" render={(props) => <World {...props} getActive={this.state.checked} />} />
        <Route path="/tech" component={this.Technology} />
        <Route path="/politics" render={(props) => <Politics {...props} getActive={this.state.checked} />} />
        <Route path="/business"  render={(props) => <Business {...props} getActive={this.state.checked} />}/>
          <Route path="/technology" render={(props) => <Technology {...props} getActive={this.state.checked} />} />
        <Route exact path='/article/:id' render={(props) => <Article {...props} getActive={this.state.checked} rightNav={this.rightNav} store_small={this.props}/>} />
        <Route path="/sports" render={(props) => <Sports {...props} getActive={this.state.checked} />} />
        <Route path="/bookmark" render={(props) => <Bookmark {...props} bookmarkIcon={this.bookmarkIcon} rightNav={this.rightNav} getActive={this.state.checked} />}  />
        <Route path="/search/:key" render={(props) => <Search {...props} rightNav={this.rightNav} getActive={this.state.checked} />}/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
