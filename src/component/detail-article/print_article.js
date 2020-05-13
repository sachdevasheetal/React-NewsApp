import React,{Component} from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon
} from "react-share";
import commentBox from 'commentbox.io';
import  {OverlayTrigger,Tooltip} from 'react-bootstrap'
import {MdExpandMore,MdExpandLess} from 'react-icons/md';

import {FaRegBookmark,FaBookmark} from 'react-icons/fa';
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

class PrintArticle extends Component
{
  constructor(props)
  {
    super()
    this.state={
      isMarked:false,
      show_more:false
    }
  }
  componentDidMount() {

        this.removeCommentBox = commentBox('');//Enter your commentBox.io APPID
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }
    renderTooltip(props) {
      console.log("tooltip"+props)
     return (
       <Tooltip id="button-tooltip" {...props}>
         {props}
       </Tooltip>
     );
   }
  render()
  {
    var arr=['CSCI_571_NewsApp']
    const { match: { params } } = this.props.params;

    return(
      <div className="total">
      <h2>Customers</h2>

      {this.props.customers.map(
        (customer,id) =>
        <div  className="card mb-3 detailed" key={customer.id}>
          <div className="row no-gutters">

            <div className="col-sm-12">

              <div className="card-body card-body-1">

                <h2 className="card-title card-title-1">{customer.headline.main}</h2>

                <div className="alignment" style={{'text-align':"justify"}}>
                <div className="in">
                <span className="pub_date">{customer.pub_date.substr(0,customer.pub_date.indexOf('T'))}</span>
                  <span className="sharing">
                  <OverlayTrigger placement="top" overlay={this.renderTooltip("Facebook")}>
                  <FacebookShareButton
                       url={customer.web_url}
                       hashtag= "#CSCI_571_NewsApp"
                       className="Demo__some-network__share-button">
                       <FacebookIcon
                         size={20}
                         round
                       />
                  </FacebookShareButton>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={this.renderTooltip("Twitter")}>
                  <TwitterShareButton
                      url={customer.web_url}
                      hashtags={arr}
                      className="Demo__some-network__share-button">
                         <TwitterIcon
                           size={20}
                           round/>
                   </TwitterShareButton>
                   </OverlayTrigger>
                   <OverlayTrigger placement="top" overlay={this.renderTooltip("Email")}>
                   <EmailShareButton
                      url={customer.web_url}
                      subject="#CSCI_571_NewsApp"
                      className="Demo__some-network__share-button">
                         <EmailIcon
                           size={20}
                           round/>
                   </EmailShareButton>
                   </OverlayTrigger>
                   <OverlayTrigger placement="top" overlay={this.renderTooltip("Bookmark")}>
                   <span className="sharing" onClick={(event) => this.book(event, decodeURIComponent(params.id),customer)}>
                   <GetSymbol marked={this.state.isMarked}/>
                   </span></OverlayTrigger>
                   </span>
                </div>

                <img src={customer.multimedia[0].url} className="card-img card-img-1" alt="..."/>
                </div>

              {(!this.state.show_more)&&<div className="less"><div className="testing">{customer.abstract}</div>
              <span style={{'float':"right"}} onClick={this.show_more}><MdExpandMore/></span>
              </div>
              }
              {(this.state.show_more)&&<div className="more"><div style={{'text-align':"justify"}}>{customer.abstract}</div>
              <span style={{'float':"right"}} onClick={this.show_more}><MdExpandLess/></span>
              </div>
              }
              </div>

            </div>
          </div>

      <div id={customer.id} className="commentbox" />
        </div>

      )



    }


      </div>
    );
  }
}
export default PrintArticle;
