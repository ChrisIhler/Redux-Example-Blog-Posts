import { COMMENTS_RECEIVED } from '../actions/comments'

const postsInitialState = {
  comments: []
}

export default (state = postsInitialState, action) => {
  switch (action.type) {
    case COMMENTS_RECEIVED:
      return { ...state, comments: action.payload}
    default:
      return state
  }
}