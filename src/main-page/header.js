import  React,{Component} from 'react';
import {  Navbar, Nav,FormControl,Form } from 'react-bootstrap';
import Customers from '../component/customers/customers';
// import {Customers} from '../component/customers/customers';
import Technology from '../component/customers/technology';
import Sports from '../component/customers/sports';
import Politics from '../component/customers/politics';
import Business from '../component/customers/business';
import World from '../component/customers/world';
// import Switch from "react-switch";
import Switch from "react-switch";
import { MdBookmark } from 'react-icons/md';
import Autosuggest from 'react-autosuggest';
import Article from '../component/detail-article/article';
import ReactTooltip from 'react-tooltip';
import Bookmark from '../component/bookmarks/bookmark';
import { ToastContainer, toast } from 'react-toastify';
// import AsyncSelect from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import {
  BrowserRouter as Router,
  Switch as Switch1,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import axios from 'axios';
import {FaRegBookmark,FaBookmark} from 'react-icons/fa';
// import  AsyncSelect  from 'react-select/async';
import  {OverlayTrigger,Tooltip} from 'react-bootstrap'

import commentBox from 'commentbox.io';

function pre(text) {
  return "<pre>" + text.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</pre>"
}
function renderSearchResults(results) {
  document.getElementById("results").innerHTML = this.pre(JSON.stringify(results, null, 2));
}

function renderErrorMessage(message, code) {
  if (code)
      document.getElementById("results").innerHTML = "<pre>Status " + code + ": " + message + "</pre>";
  else
      document.getElementById("results").innerHTML = "<pre>" + message + "</pre>";
}
var ret=[];
var API_URL="https://api.cognitive.microsoft.com/bing/v7.0/Suggestions";
class Header extends Component  {
  state ={
    article:null,
  }
  getActive= (article) => {
      this.setState({article:article})
    }

   Home =() => {
  return <Customers getActive={this.state.checked}/>
}

   Technology =() => {
     return <Technology getActive={this.state.checked}/>
}
World =() => {
  return <World getActive={this.state.checked}/>
}
Sports =() => {
  return <Sports getActive={this.state.checked}/>
}
Politics =() => {
  return <Politics getActive={this.state.checked}/>
}
Business =() => {
  return <Business getActive={this.state.checked}/>
}



  promiseOptions = inputValue =>
    new Promise(resolve => {
      // alert('ssssss')
      setTimeout(() => {
        resolve(this.handleSearchChange(inputValue, ``));//Enter your microsoft bing autosuggest AppID
      }, 180);
    });


  handleSearchChange = async ( query,key ) => {
    try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${query}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": key
          }
        }
      );
      const data = await response.json();

      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ label: result.displayText, value: result.displayText }));

      this.setState({ results });
      this.setState({
        select: {
      ...this.state.select,

      options: results
    }
  })
      return (this.state.results)
    } catch (error) {
      console.error(`Error fetching search ${query}`);
    }
  };


  called=(e) =>
  {
    // alert(e)
    if(e==='link-1')
      this.props.filterCategory('home')
    else if(e==='link-2')
      this.props.filterCategory('world')
    else if(e==='link-3')
      this.props.filterCategory('politics')
    else if(e==='link-4')
        this.props.filterCategory('business')
    else if(e==='link-5')
        this.props.filterCategory('technology')
    else if(e==='link-6')
        this.props.filterCategory('sports')
    else if(e==='link-7')
            this.props.filterBookmark(true)
  }

  constructor(props)
  {
    super(props);
    //var x=(/true/i).tes(localStorage.getItem("checked"))
var x=localStorage.getItem("checked")
    var y
    if(x=="false")
        y=false
    else
        y=true

    this.state={
      checked:y,
      results:[],
      newValue:"",
      newLabel:"",
      val:"",
      select: {
        value:"",options:[]
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this)
    this.myRef = React.createRef()

  }

  handleChange(checked)
  {
       this.props.filterChannel(checked)
       this.setState({ checked:checked });

  }

  test = (event,val) => {
      //event.preventDefault()
      toast("Default Notification !",{
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true
    });

  }
  setValue = value => {
    this.setState(prevState => ({
      select: {
        ...prevState.select,
        value
      }
    }));
  };
   handleInputChange = newValue => {
  this.setValue(newValue);
  this.props.filterKeyword(newValue)
  this.setState({
    val:"aaaa"
  })

 this.props.history.push({pathname:`/search/${newValue.label}`,setValue:this.setValue});

};
componentDidMount() {

}
componentWillUnmount()
{
  this.setState(
  {newValue:"",newLabel:""})
}

hide()
{
  console.log(Tooltip)

}
  render(){

     const { select } = this.state;
     //value={select.value}
const activeClass = (route) => { return this.props.location.pathname === route ? "active" : null }
console.log(this.props.location.pathname)
  return (

    <div >
    <ReactTooltip  place="bottom"/>
    <div>
    <Navbar variant="dark"  expand="lg" className="bg-custom-2">

      <AsyncSelect  value={select.value} ref={this.myRef} id='check' placeholder="Enter Keyword .." noOptionsMessage={() => "No match"} loadOptions={this.promiseOptions} onChange={this.handleInputChange}  />

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="mr-auto">

          <Nav.Link as={Link} to="/" exact className={activeClass("/")}>Home</Nav.Link>
          <Nav.Link  as={Link} to="/world" className={activeClass("/world")}>World</Nav.Link>
          <Nav.Link as={Link} to='/politics' className={activeClass("/politics")}>Politics</Nav.Link>
          <Nav.Link as={Link} to="/business" className={activeClass("/business")}>Business</Nav.Link>
          <Nav.Link as={Link} to="/technology" className={activeClass("/technology")}>Technology</Nav.Link>
          <Nav.Link as={Link} to="/sports" className={activeClass("/sports")}>Sports</Nav.Link>

          </Nav>
          <Nav className="navbar-right">
              {  //<Nav.Link  to="/bookmark" as={Link}  className="justify-content-end"><OverlayTrigger placement="bottom" overlay={this.renderTooltip("Bookmark")}><span onClick="this.hide">{!this.props.bookmarkIcon && <FaRegBookmark color="white"/>}{this.props.bookmarkIcon && <FaBookmark color="white"/>}</span></OverlayTrigger></Nav.Link>
              }
              <Nav.Link  to="/bookmark" as={Link}  className="justify-content-end align-middle pr-3"><span data-tip="Bookmark">{!this.props.bookmarkIcon && <FaRegBookmark size="22" color="white"/>}{this.props.bookmarkIcon && <FaBookmark size="22" color="white"/>}</span></Nav.Link>
          </Nav>
        {this.props.rightNav && <Nav className="navbar-right">


        <Navbar.Text className="mr-2 align-middle" style={{color:"white"}}>
        NY Times&nbsp;&nbsp;
        </Navbar.Text>
        <Navbar.Text className="pr-3"><Switch onChange={this.handleChange} checked={this.state.checked} onColor="#0080ff"
        offColor="#d3d3d3"
        handleDiameter={22}
        uncheckedIcon={false}
        checkedIcon={false}
      height={22}
      width={46}
      className="react-switch align-middle "
      id="material-switch"/></Navbar.Text>
      <Navbar.Text className=" align-middle" style={{color:"white"}}>
        Guardian
      </Navbar.Text>
      </Nav>
    }
      </Navbar.Collapse>

      </Navbar>


</div>
</div>

  );
}
}
export default Header;
