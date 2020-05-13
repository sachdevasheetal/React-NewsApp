import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import {MdShare} from 'react-icons/md';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon
} from "react-share";

import  Badge from 'react-bootstrap/Badge';
import Modal from "react-bootstrap/Modal";
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
class nested extends Component{
constructor(props)
{
  super(props)

  this.state(
    {
      customers:props.complete,
      stored_id:0,
      isOpen: false
    }
  )
}

render(props){
console.log(props.complete)
return(
  <div className="row hidden-md-up">
     {this.props.complete.map(
       (customer,id) =>
       <div className="col-sm-3">
       <Link  to={ {pathname:`article/${encodeURIComponent(customer.id)}`,articleProps:{name:customer} }}   key={customer.id}>

          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{customer.title}<span onClick={this.notify}><MdShare/></span></h4>
              <img src={customer.multimedia[0].url} className="card-img" alt="..."/>

               <p className="card-text"><span className="font-italic">{customer.published_date}</span><MyBadge type={customer.section}/></p>
            </div>
          </div>


       </Link>
       </div>
       // <div class="card" key={customer.title}>{customer.abstract} {customer.section}</div>f
     )

 }
 </div>
)


}

}

class Search extends Component
{
  constructor(props)
  {
    super(props)
    this.state={
    customers: [],
    ny: [],
    complete:[],
    loading:false,
    query:""
    }
  }
  componentDidMount(props)
  {
        // console.log(document.getElementById("check").defaultInputValue)
        // console.log(this.myRef)
        //
         this.props.rightNav(false)
        const { apiUrl } = window['runConfig']
        const { match: { params } } = this.props;
        console.log("test"+(params.key))
        // if(this.props.getActive)
        // {
        //   fetch(`/api/search/ny?web_url=${params.key}`).then(this.setState({loading:false}))
        //   .then(res => res.json())
        //   .then(customers => this.setState({customers,loading:true}, () => console.log('customers fetched true..',customers)) );
        // }
        // else {
        //   fetch(`/api/search/guard?web_url=${params.key}`).then(this.setState({loading:false}))
        //   .then(res => res.json())
        //   .then(customers => this.setState({customers,loading:true}, () => console.log('customers fetched true..',customers)) );
        // }
        if(this.props.getActive)
        {
          const category="home"
            fetch(`${ apiUrl }/api/search/guard?web_url=${params.key}`).then(this.setState({loading:false}))
            .then(res => res.json())
            .then(customers => this.setState({customers,loading:true}, () => console.log('customers fetched true..',customers)) );
        }
        else
        { const category="home"
          fetch(`${ apiUrl }/api/search/ny?web_url=${params.key}`).then(this.setState({loading:false}))
          .then(res => res.json())
          .then(customers => this.setState({customers,
            loading:true
          }, () => console.log('customers fetched false..',customers)));
        }

  }
  componentDidUpdate(prevProps,prevState)
  {
    console.log(prevProps.match.params.key)
    console.log(this.props.match.params.key)
    // const { match: { params } } =prevProps;
    // // prev_key=param.key
    // const { match: { params_prev } } = this.props
    if(prevProps.match.params.key !== this.props.match.params.key){

     const { match: { params } } = this.props;
     const { apiUrl } = window['runConfig']
  //   console.log("test"+(params.key))
  if(this.props.getActive)
  {
    const category="home"
      fetch(`${ apiUrl }/api/search/guard?web_url=${params.key}`).then(this.setState({loading:false}))
      .then(res => res.json())
      .then(customers => this.setState({customers,loading:true}, () => console.log('customers fetched true..',customers)) );
  }
  else
  { const category="home"
    fetch(`${ apiUrl }/api/search/ny?web_url=${params.key}`).then(this.setState({loading:false}))
    .then(res => res.json())
    .then(customers => this.setState({customers,
      loading:true
    }, () => console.log('customers fetched false..',customers)));
  }
}
  }
  notify = (event,id) => {
    console.log(event.nativeEvent)
      event.preventDefault()

      this.setState({
        isOpen: !this.state.isOpen,
        stored_id:id
      });

  }
  setActive = event => {
    //alert("set active")

    this.setState({
      isOpen: !this.state.isOpen
    });

    }
  componentWillReceiveProps()
  {
    const { match: { params } } = this.props;
    console.log("test"+(params.key))

  }

    componentWillUnmount(props)
    {
      // console.log(this.props.location)
      if(this.props.location.setValue)
      this.props.location.setValue(null)
        this.props.rightNav(true)
    }
  render(){
    var arr=['CSCI_571_NewsApp']

  return (
    <div className="total">
    <h2>Results</h2>

  <div className="row hidden-md-up mb-4">
    {this.state.customers.map(
      (customer,id) =>
      <div className="col-sm-3">
      <Link  style={{cursor:'default'}} className="home" to={ {pathname:`/article/${encodeURIComponent(customer.id)}`,articleProps:{name:customer} }}   key={customer.id}>

         <div className="card shadow" style={{marginTop:"15px"}}>
           <div className="card-body">
             <h6 className="card-title font-italic font-weight-bold">{customer.title}<span onClick={(e) => {this.notify(e, id)}}><MdShare/></span></h6>
             <img src={customer.multimedia[0].url} className="card-img" alt="..."/>
              <p className="card-text mt-2"><span className="font-italic">{customer.published_date.substr(0,customer.published_date.indexOf('T'))}</span><MyBadge  type={customer.section}/></p>
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
      </div>
    )

  }
  </div>
    </div>
  );
}
}



export default Search;
