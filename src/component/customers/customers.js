import React,{Component} from 'react';
import './customers.css';
import  Badge from 'react-bootstrap/Badge';
import {MdShare} from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import commentBox from 'commentbox.io';
import { BabelLoading } from 'react-loadingg';
import BounceLoader from "react-spinners/BounceLoader";
import { useMediaQuery } from 'react-responsive';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon
} from "react-share";
import {
  BrowserRouter as Router,
  Switch as Switch1,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";

class MyBadge extends Component
{

  render()
  {

    if(this.props.type.toLowerCase()===`world`)
    return(<Badge  style={{color:"white",backgroundColor:"#9370DB"}} className="float-right">{this.props.type.toUpperCase()}</Badge>);
    else if(this.props.type.toLowerCase()===`sport`||this.props.type.toLowerCase()===`sports`)
    return(<Badge variant="warning" className="float-right">{this.props.type.toUpperCase()}</Badge>);
    else if(this.props.type.toLowerCase()===`politics`)
    return(<Badge style={{color:"white",backgroundColor:"#0db5ba"}} className="float-right">{this.props.type.toUpperCase()}</Badge>);
    else if(this.props.type.toLowerCase()===`business`)
    return(<Badge variant="primary" className="float-right">{this.props.type.toUpperCase()}</Badge>);
    else if(this.props.type.toLowerCase()===`technology`)
    return(<Badge  style={{color:"black",backgroundColor:"#9ACD32"}} className="float-right">{this.props.type.toUpperCase()}</Badge>);
    else {
      // return null;
      return(<Badge style={{color:"white",backgroundColor:" 	#696969"}} className="float-right">{this.props.type.toUpperCase()}</Badge>);
    }

  }
}
// const isTabletOrMobileDevice = useMediaQuery({
// query: '(max-device-width: 1224px)'
//})
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 992 })
  return isMobile ? children : null
}
class Customers extends Component  {
  constructor(props)
  {

    super(props);

      this.state={
      customers: [],
      isOpen: false,
      loading:false,
      stored_id:0
    }

  }
  toggleModal = (event) => {
    console.log("toooogle")
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillUnmount() {
      this.removeCommentBox();
  }
  componentDidMount(props)
  {
    //alert("mount "+this.props.getActive+" "+typeof(this.props.getActive))
    const { apiUrl } = window['runConfig']
    console.log(apiUrl)
    this.removeCommentBox = commentBox('');//Enter your commentbox.io AppID
    if(this.props.getActive)
    {
      const category="home"
        fetch(`${apiUrl}/api/guard?web_url=${category}`).then(this.setState({loading:false}))
        .then(res => res.json())
        .then(customers => this.setState({customers,loading:true}, () => console.log('customers fetched true..',customers)) );
    }
    else
    { const category="home"
      fetch(`${apiUrl}/api/customers?web_url=${category}`).then(this.setState({loading:false}))
      .then(res => res.json())
      .then(customers => this.setState({customers,
        loading:true
      }, () => console.log('customers fetched false..',customers)));
    }
  }
  componentWillReceiveProps(props)
  {

  const { apiUrl } = window['runConfig']
    console.log("cuso "+props.getActive)
    if(this.props.getActive!==props.getActive)
  {
    if(props.getActive)
  {
    const category="home"
      fetch(`${apiUrl}/api/guard?web_url=${category}`).then(this.setState({loading:false}))
      .then(res => res.json())
      .then(customers => this.setState({customers,loading:true}, () => console.log('customers fetched true..',customers)) );
  }
  else
  { const category="home"
    fetch(`${apiUrl}/api/customers?web_url=${category}`).then(this.setState({loading:false}))
    .then(res => res.json())
    .then(customers => this.setState({customers,
      loading:true
    }, () => console.log('customers fetched false..',customers)));
  }
  }
  }
  setActive = event => {
    //alert("set active")

    this.setState({
      isOpen: !this.state.isOpen
    });

    }
    test()
    {
      //,articleProps:{name:customer}
      alert("test")
    }

    notify = (event,id) => {
      console.log(event.nativeEvent)
        event.preventDefault()

        this.setState({
          isOpen: !this.state.isOpen,
          stored_id:id
        });

    }

  render(){

    var arr=['CSCI_571_NewsApp']
    console.log("loading"+this.state.loading)
    if(!this.state.loading)
      return (
        //<MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
        <Mobile>
        <div style={{position:'fixed',top:'50%',left:'50%'}}> <BounceLoader color={'blue'}>Loading
        </BounceLoader><span className="font-weight-bold">Loading</span></div>
      </Mobile>)
      else
  return (

    <div className="total mt-3">


    {this.state.customers.map(
      (customer,id) =>
      <div>
      <Link  to={ {pathname:`article/${encodeURIComponent(customer.id)}`}}  className="nav-link card mb-4 shadow home" key={customer.id}>
        <div className="row no-gutters ">
          <div className="col-sm-3 pt-3 px-3  pb-3">
              <img src={customer.multimedia[0].url} className="card-img" alt="..."/>
          </div>
          <div className="col-sm-9">
            <div className="card-body">
              <h5 className="card-title font-italic font-weight-bold">{customer.title}<span onClick={(e) => {this.notify(e, id)}}><MdShare/></span><ToastContainer/></h5>

              <p className="card-text"><div className="testing1">{customer.abstract}</div></p>

              <p className="card-text"><span className="font-italic">{customer.published_date.substr(0,customer.published_date.indexOf('T'))}</span><MyBadge type={customer.section}/></p>

            </div>
          </div>
        </div>

      </Link>
      {
        this.state.stored_id===id&&<Modal show={this.state.isOpen} onHide={this.setActive} key={customer.id}>
      <Modal.Header closeButton >
      <h5>{customer.title}</h5>
      </Modal.Header>

      <Modal.Body>

      <div class="row">
      <h5 className="col-sm-12 mb-2" style={{textAlign: "center",fontSize:"18px"}}>
      Share Via
      </h5>
      </div>
      <div class="row">
      <div className="col" style={{textAlign: "center"}}>
      <FacebookShareButton
           url={customer.url}
           openShareDialogOnClick="true"
           hashtag= "#CSCI_571_NewsApp"
           className="Demo__some-network__share-button--1">
           <FacebookIcon
             size={40}
             round
           />
      </FacebookShareButton>
      </div>
      <div className="col" style={{textAlign: "center"}}>
      <TwitterShareButton
          url={customer.url}
          hashtags={arr}
          className="Demo__some-network__share-button--2">
             <TwitterIcon
               size={40}
               round/>
       </TwitterShareButton>
       </div>
       <div className="col"  style={{textAlign: "center"}}>
      <EmailShareButton
          url={customer.url}
          subject="#CSCI_571_NewsApp"
          className="Demo__some-network__share-button--3">
             <EmailIcon
               size={40}
               round/>
       </EmailShareButton>
       </div>
       </div>
      </Modal.Body>

      </Modal>
    }
      </div>
    )
  }

    </div>
  );
}
}
export default Customers;
