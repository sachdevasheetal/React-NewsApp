import React,{Component} from 'react';

import './bookmark.css';
import  Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import {MdShare,MdDelete,MdClose} from 'react-icons/md';
import { ToastContainer, toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {OverlayTrigger,Tooltip} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import Toast from 'react-bootstrap/Toast';
import {
  Link
} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon
} from "react-share";
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
class MyChannelBadge extends Component
{

  render()
  {
    if(this.props.type===`ny`)
    return(<Badge style={{backgroundColor:"#D3D3D3"}} className="float-right align-items-center">NYTIMES</Badge>);
    else if(this.props.type===`guard`)
    return(<Badge variant="dark" className="float-right align-items-center">GUARDIAN</Badge>);


  }
}

class Bookmark extends Component  {
  constructor(props)
  {

    super(props);


    this.state={
      customers: [],
      isOpen: false,
      stored_id:0,
      toast_close:false,
      toast_content:[]
    }
this.test=this.test.bind(this)

this.del=this.del.bind(this)
  }
test()
{
  console.log("called test")
  const customers = [],
  keys = Object.keys(localStorage)
  var i = keys.length;
  console.log(i+(keys[0]))
  let x
  for ( var j=0;j<i;j++ ) {
  x=localStorage.getItem(keys[j]);
  // let y=eval(x)
  // const key=Object.keys(x)
  let str=keys[j].substr(0,keys[j].indexOf(' '))
  if(str==="bookmark")
  {console.log(JSON.parse(x));
  // var json=eval(x)
  let obj=JSON.parse(x)
  customers.push(obj)
  }
   // customers[j]=x

}
console.log(customers)
console.log(typeof (customers))
this.setState({customers:customers})
console.log(this.state.customers)
return customers
}



  toggleModal = (event) => {
    console.log("toooogle")
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  prevent = (event) => {
    alert("prevet")
  //  event.preventDefault()
  event.stopPropagation();
  }
componentDidMount()
{
  //Tooltip.hide()
  ReactTooltip.hide()
   // this.removeCommentBox = commentBox('5759723529830400-proj');
  // this.setState({customers:this.test})
  this.props.rightNav(false)
  this.props.bookmarkIcon(true)
  this.test()
}
componentWillUnmount()
{
   // this.removeCommentBox();
  this.props.bookmarkIcon(false)
  this.props.rightNav(true)
}
  setActive = event => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    }
    notify = (event,id) => {
      console.log(event.nativeEvent)
        event.preventDefault()
        this.setState({
          isOpen: !this.state.isOpen,
          stored_id:id
        });

    }
    setShowClose(st)
    {
      this.setState({
        toast_close:false
      })
    }
    del = (event,id) => {
      console.log(id)
        event.preventDefault()
        localStorage.removeItem("bookmark "+decodeURIComponent(this.state.customers[id].id))
        const store=this.state.customers
        toast(<div  style={{'color':'black', fontSize: '14px'}}>Removing {this.state.customers[id].headline.main}</div>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500,
            transition: Zoom,
            hideProgressBar: true
        });
        store.splice(id,1)
        this.setState({customers:store})
        console.log(this.state.customers)

    }

  render(){
    toast.configure()
    var arr=['CSCI_571_NewsApp']
    if(this.state.customers.length<=0)
    return(<div><h3 style={{textAlign:"center"}}>You have no saved articles</h3>
    {this.state.toast_close&&<Toast show={this.state.toast_close} delay={2700} autohide onClose={() => this.setShowClose(false)}>

    <Toast.Body><span style={{float:"right"}} onClick={() => this.setShowClose(false)}>&nbsp;&nbsp;&nbsp;<MdClose/></span><span>Removing {this.state.toast_content.headline.main}</span></Toast.Body>
    </Toast>

    }
    </div>
  );
    else
  return (
    <div className="total">
        <h2>Favorites</h2>
        {
        console.log("in render"+this.state.customers)}
        <div className="row hidden-md-up mb-4" >
    {this.state.customers.map(
      (customer,id) =>
      <div className="col-sm-3 mb-4" key={customer.id}>
      <Link  style={{cursor:'default'}} className="home" to={ {pathname:`article/${encodeURIComponent(customer.id)}`,articleProps:{name:customer} }}   key={customer.id}>

         <div className="card shadow">
           <div className="card-body">
             <h6 className="card-title font-italic font-weight-bold">{customer.headline.main}&nbsp;&nbsp;<span onClick={(e) => {this.notify(e, id)}}><MdShare/></span><span onClick={(event) => this.del(event, id)}><MdDelete/></span></h6>
             <img src={customer.multimedia[0].url} className="card-img" alt="..."/>

              <p style={{"marginTop":"10px"}} className="card-text"><span className="font-italic">{customer.pub_date.substr(0,customer.pub_date.indexOf('T'))}</span><MyChannelBadge type={customer.channel}/><span style={{'float':'right'}}>&nbsp;&nbsp;</span><MyBadge type={customer.section}/></p>
           </div>
         </div>


      </Link>


      {

      this.state.stored_id===id&&<Modal show={this.state.isOpen} onHide={this.setActive} key={customer.id}>
      <Modal.Header closeButton>
      <Modal.Title>
      {customer.channel==="guard"&&<h5 className="font-weight-bold">GUARDIAN</h5>}
      {customer.channel==="ny"&&<h5 className="font-weight-bold">NY TIMES</h5>}
      <div><h5>{customer.headline.main}</h5></div>
      </Modal.Title>
      </Modal.Header>

      <Modal.Body>

      <div class="row">
      <h5 className="col-sm-12 mb-2 " style={{textAlign: "center",fontSize:"18px"}}>
      Share Via
      </h5>
      </div>
      <div class="row">
      <div className="col" style={{textAlign: "center"}}>
      <FacebookShareButton
           url={customer.web_url}
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
          url={customer.web_url}
          hashtags={arr}
          className="Demo__some-network__share-button--2">
             <TwitterIcon
               size={40}
               round/>
       </TwitterShareButton>
       </div>
       <div className="col"  style={{textAlign: "center"}}>
      <EmailShareButton
          url={customer.web_url}
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
    {this.state.toast_close&&<Toast show={this.state.toast_close} delay={2700} autohide onClose={() => this.setShowClose(false)}>

    <Toast.Body><span style={{float:"right"}} onClick={() => this.setShowClose(false)}>&nbsp;&nbsp;&nbsp;<MdClose/></span><span>Removing {this.state.toast_content.headline.main}</span></Toast.Body>
    </Toast>

    }
      </div>
    )

}
</div>
    </div>
  );
}
}
export default Bookmark;
