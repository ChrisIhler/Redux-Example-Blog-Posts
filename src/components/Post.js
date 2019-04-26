import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import FaArrowUp from 'react-icons/lib/fa/arrow-up'
import FaArrowDown from 'react-icons/lib/fa/arrow-down'
import FaComment from 'react-icons/lib/fa/comment'
import Moment from 'react-moment';
import { upVote, downVote } from '../actions/posts'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getComments, createComment } from '../actions/comments';
import React, { Component } from 'react'


class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggleComments: true,
      addComment: '',
      numberOfComments: null
    }
  }

  getCommentsByPostId = (comments, id) => {
    const filteredCommentsById = comments.filter(comment => comment.post_id === id)
    const renderComments = filteredCommentsById.map(comment => <li key={comment.id}>{comment.content}</li>)
    // this.setState({numberOfComments: renderComments.length})
    return renderComments
  }
  
  toggleCommenting(){
    this.setState({toggleComments: !this.state.toggleComments})
  }
  
  submitComment(content, postId){
    this.props.createComment(content, postId)
  }

  onChangeComment = async(str) => {
    await this.setState({addComment: str})
    console.log(this.state.addComment)
  }
  render() {

    // console.log('this',this.props)
  let { author, content, id, title, createdAt, votes, img_url} = this.props.post 
  let renderCommentsById = this.getCommentsByPostId(this.props.comments.comments, id)
  return (
    
      <Row className="mt-3">
        <Col>
          <Card>
            <CardImg
              top
              width="100%"
              src={img_url}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{title} | <FaArrowUp onClick={(e) => this.props.upVote(id)}/> {votes} <FaArrowDown onClick={(e) => this.props.downVote(id, votes)}/></CardTitle>
              <CardSubtitle>{author}</CardSubtitle>
              <CardText>
                {content}
              </CardText>
                <hr />
              <Moment format="MM-DD-YYYY">{createdAt}</Moment> | <FaComment onClick={(e) => this.toggleCommenting()} />   {`${renderCommentsById.length} ${ renderCommentsById.length === 1 ? 'Comment' : 'Comments'}`}
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input onChange={(e)=>this.onChangeComment(e.target.value)} type="text" name="comment" id="comment-field" placeholder="Enter a comment here" />
                  </FormGroup>
                  <Button  onClick={()=> this.submitComment(this.state.addComment,id) }>Submit</Button>
                </Form>
                <ul className="mt-2">
                {this.state.toggleComments ? renderCommentsById
                  : null}
                </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}



const mapStateToProps = state => ({
  comments: state.comments
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    upVote,
    downVote,
    getComments,
    createComment,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post)