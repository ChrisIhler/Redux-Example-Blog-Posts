import React, {Component} from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {createPost} from '../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../actions/posts'

class AddPostForm extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  onSubmit = (e) => {
    let post = this.state
    let {title, body, author, image} = post
    if (!title || !body || !author|| !image) {
      alert('Finish form to submit')
    }
    e.preventDefault()
    this.props.createPost(post)
    this.props.toggleForm()
  }

  render() {
    console.log('props',this.props)

    return (
      <Row>
        <Col sm="10">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="title-field">Title</Label>
              <Input onChange={ (e) => this.setState({title: e.target.value})} type="text" name="title" id="title-field" />
            </FormGroup>
            <FormGroup>
              <Label for="body-field">Body</Label>
              <Input onChange={ (e) => this.setState({body: e.target.value})} type="text" name="body" id="body-field" />
            </FormGroup>
            <FormGroup>
              <Label for="author-field">Author</Label>
              <Input onChange={ (e) => this.setState({author: e.target.value})} type="text" name="author" id="author-field" />
            </FormGroup>
            <FormGroup>
              <Label for="image-field">Image URL</Label>
              <Input onChange={ (e) => this.setState({image: e.target.value})} type="text" name="image" id="image-field" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}



const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createPost,
    getPosts
  }, dispatch)

export default connect(null, mapDispatchToProps)(AddPostForm)
