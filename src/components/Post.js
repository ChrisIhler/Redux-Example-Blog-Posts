import React from 'react'
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
  Label,
  Input
} from 'reactstrap'
import FaArrowUp from 'react-icons/lib/fa/arrow-up'
import FaArrowDown from 'react-icons/lib/fa/arrow-down'
import FaComment from 'react-icons/lib/fa/comment'
import Moment from 'react-moment';
import { upVote, downVote } from '../actions/posts'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


const Post = props => {
  let { author, content, id, title, createdAt, votes, img_url} = props.post

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
            <CardTitle>{title} | <FaArrowUp onClick={(e) => props.upVote(id)}/> {votes} <FaArrowDown onClick={(e) => props.downVote(id, votes)}/></CardTitle>
            <CardSubtitle>{author}</CardSubtitle>
            <CardText>
              {content}
            </CardText>
              <hr />
            <Moment format="MM-DD-YYYY">{createdAt}</Moment> | <FaComment /> 2 Comments
              <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input type="text" name="comment" id="comment-field" placeholder="Enter a comment here" />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
              <ul className="mt-2">
                <li>Comment One</li>
                <li>Comment Two</li>
              </ul>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    upVote,
    downVote
  }, dispatch)

export default connect(null, mapDispatchToProps)(Post)