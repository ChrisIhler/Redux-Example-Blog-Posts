import posts from './posts.js'
import comments from './comments.js'
import { combineReducers } from 'redux'

export default combineReducers({
  posts: posts,
  comments: comments
})