import React, { Component } from 'react'
import AddPostForm from './AddPostForm'
import Post from './Post'
import FilterPosts from './FilterPosts'
import { Container, Row, Col, Button } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import { getComments } from '../actions/comments'
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggleNewPost: false,
      filterPosts: this.props.posts.posts,
      search: ''
    }
  }
  componentDidMount(){
    this.props.getPosts()
    this.props.getComments()
  }

  toggleCreatePost = () => {
    let toggle = this.state.toggleNewPost
    this.setState({ toggleNewPost: !toggle})
  }

  filter = async (str) => {
    // if (str) {
    //   return this.setState({filterPosts: this.props.posts.posts}),console.log('POSTS 123',this.state.filterPosts)
    // }
    await this.setState({search: str})
    // console.log(this.state.search)
    const search = this.state.search.toLowerCase()
    // console.log('search',search)
    function filteredBySearch(post, search) {
      const title = post.title.toLowerCase()
      // console.log(title)
      if (title.includes(search)) return post
    }
    const filtered = this.props.posts.posts.filter(function(post) { return filteredBySearch(post,search)  } )
    await this.setState({filterPosts: filtered})
    console.log('filtered posts',this.state.filterPosts)
  }

  render() {
    return (
      <Container className="mt-4">
        <Row>
          <Col sm={{size: 8, offset: 1}}>
            <FilterPosts filter={this.filter}/>
          </Col>
          <Col sm="2">
            <Button onClick={this.toggleCreatePost} color="secondary">Add Post</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={{size: 11, offset: 1}}>
            {this.state.toggleNewPost ? <AddPostForm toggleForm={ this.toggleCreatePost} /> : null}
          </Col>
        </Row>
        <Row>
          <Col className="pr-0" sm={{size: 9, offset: 1}}>

            {console.log('props displayed',this.props.posts.posts,this.state.filterPosts)}

              {/* {this.state.filterPosts ? this.state.filterPosts.map( post=> { 
                return <Post key={post.id} post={post}/>
              }) : null} */}

            {/* I am having problems transitionaing between the filtered search posts and the redux posts. It 
            seems if I try to use the filterPosts I can't get the full posts to populate initially.  */}
            {/* {this.props.posts.posts ? this.state.filterPosts.map( post=> { 
              return <Post key={post.id} post={post}/>
            }) : null} */}

            {this.props.posts.posts ? this.props.posts.posts.map( post=> { 
              return <Post key={post.id} post={post}/>
            }) : null}


          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getPosts,
    getComments,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
