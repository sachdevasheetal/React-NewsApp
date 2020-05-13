import React,{Component} from 'react';
import {FaRegBookmark,FaBookmark} from 'react-icons/fa';
import {MdExpandMore,MdExpandLess,MdClose} from 'react-icons/md';
import './article.css';
import Spinner from 'react-bootstrap/Spinner';
import PageWithComments from '../../component/customers/testcomment';
import {
  BrowserRouter as Router,
  Switch as Switch1,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import BounceLoader from "react-spinners/BounceLoader";
import commentBox from 'commentbox.io';
import { BabelLoading } from 'react-loadingg';
import { ToastContainer, toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon
} from "react-share";
import Collapse from 'react-bootstrap/Collapse';
import  {OverlayTrigger,Tooltip} from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast';
import { useMediaQuery } from 'react-responsive';
import * as Scroll from 'react-scroll';

class GetSymbol extends Component
{
  render()
  {
    if(!this.props.marked)
      return(<FaRegBookmark color="red"/>)
    else {
      return(<FaBookmark color="red"/>)
    }

  }
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 992 })
  return isMobile ? children : null
}
class Article extends Component  {
   scroll     = Scroll.animateScroll
  constructor(props)
  {
    super(props);
    const { match: { params } } = this.props;
    let to_be_set
    console.log("test article constructor"+decodeURIComponent(params.id))
    if(localStorage.getItem("bookmark "+decodeURIComponent(params.id))!=null)
      to_be_set=true
    else {
      to_be_set=false
    }
    console.log("set"+to_be_set)
    this.state={
      customers: [],
      store_small:[],
      showText: false,
      isLoaded:false,
      isMarked:to_be_set,
      show_more:false,
      toast_open:false,
      toast_close:false,
      isCommentBox:false
    }

    console.log("isMarked"+this.state.isMarked)

    this.book=this.book.bind(this)
    this.show_more=this.show_more.bind(this)
    this.myRef = React.createRef();
  }
  componentWillUnmount()
  {
     this.removeCommentBox();
    this.props.rightNav(true)
  }
componentDidMount()
  {
    console.log(window.location)
    console.log(this.props)
    const { apiUrl } = window['runConfig']
    this.props.rightNav(false)
    const { match: { params } } = this.props;
    console.log("test"+decodeURIComponent(params.id))
    console.log(this.props)
    var st=params.id
    console.log(st+this.props.getActive+st.indexOf("nytimes")===-1)
    if( st.indexOf("nytimes")===-1 )
    {
      console.log("guard"+st.indexOf("nytimes"))
      fetch(`${ apiUrl }/api/article/guard?web_url=${params.id}`)
      .then(res => res.json())
      .then(customers => this.setState({customers,isLoaded:true,store_small:this.props.location.articleProps}, () => console.log('customers fetched testing..',customers)));

    }
    else
    {
      fetch(`${ apiUrl }/api/article?web_url=${params.id}`)
      .then(res => res.json())
      .then(customers => this.setState({customers,isLoaded:true,store_small:this.props.location.articleProps}, () => console.log('customers fetched testing..',customers)));

    }


  }
componentDidUpdate()
{
this.removeCommentBox = commentBox('',//Enter your commentBox AppID
  {
    createBoxUrl(boxId, pageLocation) {

      pageLocation.search =  decodeURIComponent(''); // removes query string!
      pageLocation.hash = decodeURIComponent(boxId); // creates link to this specific Comment Box on your page
      return decodeURIComponent(pageLocation.href); // return url string
  }
  });
}
  componentWillReceiveProps(props)
  {
const { apiUrl } = window['runConfig']
    const { match: { params } } = this.props;
    console.log("test"+decodeURIComponent(params.id))
    console.log(this.props)
    // let to_be_set=false
    console.log(params.id+localStorage.getItem("bookmark "+decodeURIComponent(params.id)))
     if(localStorage.getItem("bookmark "+decodeURIComponent(params.id))!=null)
       {
         this.setState({
         isMarked:true
       })
     }
     else {
       this.setState({
         isMarked:false
       })
     }
    //alert("re"+props.getActive)
    var st=params.id
    if(props.getActive!==this.props.getActive)
    {if( st.indexOf("nytimes")===-1 )
    {
      console.log("fetching guardian")
      fetch(`${ apiUrl }/api/article/guard?web_url=${params.id}`)
      .then(res => res.json())
      .then(customers => this.setState({customers,isLoaded:true,store_small:this.props.location.articleProps}, () => console.log('customers fetched testing..',customers)));
    }
    else
    {
      console.log("fetching nytimes")
      fetch(`${ apiUrl }/api/article?web_url=${params.id}`)
      .then(res => res.json())
      .then(customers => this.setState({customers,isLoaded:true,store_small:this.props.location.articleProps}, () => console.log('customers fetched testing..',customers)));
    }
  }
  }

  setActive = newValue => {
        this.props.getActive(newValue.abstract)
    }

    book = (event,val,custom) => {
      console.log("here")
        console.log(val, custom)

        localStorage.removeItem("bookmark "+val)
        if(!this.state.isMarked)
        {localStorage.setItem("bookmark "+val,JSON.stringify(custom));
         this.setState({isMarked:true})
        toast(<div  key={custom.headline.main} style={{'color':'black', fontSize: '14px'}}>Saving {custom.headline.main}</div>, {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 2500,
               transition: Zoom,
               hideProgressBar: true,
               toastId: {val}
           });

        }
        else {
           toast(<div  style={{'color':'black', fontSize: '14px'}}>Removing {custom.headline.main}</div>, {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 2500,
               transition: Zoom,
               hideProgressBar: true
           });
          this.setState({isMarked:false})

        }

    }
     renderTooltip(props) {
      return (
        <Tooltip  trigger="hover" id="button-tooltip" {...props}>
          {props}
        </Tooltip>
      );
    }
     isEllipsisActive(element) {
  return element.offsetHeightt < element.scrollHeight;
}
    show_more()
    {

        if(this.state.show_more===false)
        {
          document.getElementById("testing").style.display="none"
          document.getElementById("more_arrow").style.display="none"
          document.getElementById("more").style.display="block"
          document.getElementById("less_arrow").style.display="block"
           window.scrollTo({ top: 900, left: 0, behavior: 'smooth' })

        }
        else {

            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            document.getElementById("more").style.display="none"
            document.getElementById("less_arrow").style.display="none"
            document.getElementById("testing").style.display="block"
            document.getElementById("more_arrow").style.display="block"
            document.querySelector('.total').scrollIntoView({ behavior: 'smooth' });

        }
          this.setState({show_more:!this.state.show_more})
    }

    setShow(st)
  {
    this.setState({
      toast_open:false
    })
  }
  setShowClose(st)
  {

    this.setState({
      toast_close:false
    })
  }
  countLines(para)
  {
    if(para!==undefined){
      alert("here")
      console.log(para)
    var count=0,only=0,show=0
    var inp=para.abstract;
    var len=inp.length
    var str=''
    for(var i=0;i<len;i++)
    {
      if(count===4)
      {
        if(i+1<len)
          show=1
        else if(i+1===len)
            only=1;

        break
      }
      else {
        count++
      }
      str=str+inp[i]
    }
    if(count<4)
    {
      only=1
    }
    if(only===1)
    {
       console.log(inp)
    }
    else if(show===1)
    {

      str=str+"..."
      console.log(str)
    }}
  }
  render(){
var arr=['CSCI_571_NewsApp']
const { match: { params } } = this.props;
console.log(this.state.store_small)
var count=0,only=0,show=0,inp,str,para,rem="",store
if(this.state.isLoaded)
{
   para=this.state.customers[0].abstract
  console.log(para)
  if(para!==undefined){

  inp=para;
  var len=inp.length
   str=''
   var i
  for( i=0;i<len;i++)
  {
    if(count===4)
    {
      if(i+1<len)
        show=1
      else if(i+1===len)
          only=1;

      break
    }
    else if(inp[i]==='.'&&i+1<len&&inp[i+1]===' ') {
      count++
    }
    str=str+inp[i]
  }
  if(count<4)
  {
    only=1
  }
  if(only===1)
  {
     console.log(inp)
  }
  else if(show===1)
  {
    store=str
    str=str+".."
    console.log(str)
    for(var j=i;j<len;j++)
    {
      rem=rem+inp[j]
    }
  }}
}


if(!this.state.isLoaded){
  return (
  <Mobile><div style={{textAlign:"center"}}>
  <div style={{position:'fixed',top:'50%',left:'50%'}}> <BounceLoader color={'blue'}>Loading
  </BounceLoader><span className="font-weight-bold">Loading</span></div>

  </div></Mobile>
  )
}
else
return(


  <div className="total mt-3" ref={(e2) => {this.messagesEnd=e2;}}>

{
  this.state.customers.map(
    (customer,id) =>
    <div  className="card shadow  detailed" key={customer.id}>
      <div className="row no-gutters">

        <div className="col-sm-12">

          <div className="card-body card-body-1">

            <div className="card-title card-title-1 font-italic" >{customer.headline.main}</div>

            <div className="alignment" style={{'text-align':"justify"}}>
            <div className="in">
            <span className="pub_date font-italic ml-3">{customer.pub_date.substr(0,customer.pub_date.indexOf('T'))}</span>
              <span className="sharing">

              <OverlayTrigger trigger="hover" placement="top" overlay={this.renderTooltip("Facebook")}><FacebookShareButton

                   url={customer.web_url}
                   hashtag= "#CSCI_571_NewsApp"
                   className="Demo__some-network__share-button">
                   <FacebookIcon
                     size={20}
                     round
                   />
              </FacebookShareButton>
              </OverlayTrigger>
              <OverlayTrigger trigger="hover" placement="top" overlay={this.renderTooltip("Twitter")}>
              <TwitterShareButton
                  url={customer.web_url}
                  hashtags={arr}
                  className="Demo__some-network__share-button">
                     <TwitterIcon
                       size={20}
                       round/>
               </TwitterShareButton>
               </OverlayTrigger>
               <OverlayTrigger trigger="hover" placement="top" overlay={this.renderTooltip("Email")}>
               <EmailShareButton
                  url={customer.web_url}
                  subject="#CSCI_571_NewsApp"
                  className="Demo__some-network__share-button">
                     <EmailIcon
                       size={20}
                       round/>
               </EmailShareButton>
               </OverlayTrigger>
               <OverlayTrigger trigger="hover" placement="top" overlay={this.renderTooltip("Bookmark")}>
               <span className="sharing ml-5 mr-3" onClick={(event) => this.book(event, decodeURIComponent(params.id),customer)}>
               <GetSymbol marked={this.state.isMarked}/>
               </span>
               </OverlayTrigger>
               </span>
            </div>

            <img src={customer.multimedia[0].url} className="card-img card-img-1 mt-2" alt="..."/>
            </div>
            { <div id="more"><div style={{'text-align':"justify"}}><div>{store}</div><div ref={(el) => {this.messagesEnd=el;}}><br/>{rem}</div></div>
              <span style={{'float':"right"}} onClick={this.show_more} id="less_arrow"><MdExpandLess size={20}/></span>

              </div>

            }
            {
              only?<div className="less"><div  id="testing" ref={this.myRef}>{customer.abstract}</div>
                </div>:(<div className="less"><div  id="testing" ref={this.myRef}>{str}</div>
                  <span style={{'float':"right"}} onClick={this.show_more} id="more_arrow"><MdExpandMore size={20}/></span>
                  <div>&nbsp;</div>
                  </div>)
            }

          </div>
          {this.state.toast_open&&<Toast animation="zoom" show={this.state.toast_open} delay={270000} autohide onClose={() => this.setShow(false)}>

          <Toast.Body><span style={{float:"right"}} onClick={() => this.setShow(false)}>&nbsp;&nbsp;&nbsp;<MdClose/></span><span>Saving {customer.headline.main}</span></Toast.Body>
          </Toast>

          }
          {this.state.toast_close&&<Toast show={this.state.toast_close} delay={2700} autohide onClose={() => this.setShowClose(false)}>

          <Toast.Body><span style={{float:"right"}} onClick={() => this.setShowClose(false)}>&nbsp;&nbsp;&nbsp;<MdClose/></span><span>Removing {customer.headline.main}</span></Toast.Body>
          </Toast>

          }

        </div>
      </div>

    </div>
  )
}

<div class="commentbox" id={decodeURIComponent(params.id)}></div>
  </div>
 );
}
}
export default Article;
