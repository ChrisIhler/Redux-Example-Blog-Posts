import { POSTS_RECEIVED } from '../actions/posts'

const postsInitialState = {
  posts: []
}

export default (state = postsInitialState, action) => {
  switch (action.type) {
    case POSTS_RECEIVED:
      return { ...state, posts: action.payload}
    default:
      return state
  }
}