import React,{Component} from 'react';
import commentBox from 'commentbox.io';

class PageWithComments extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('');//Enter your commentbox.io AppID
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
      alert(this.props.id)
        return (
            <div id={this.props.id} className="commentbox" />
        );
    }
}
export default PageWithComments;
