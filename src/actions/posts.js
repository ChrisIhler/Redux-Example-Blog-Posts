export const POSTS_RECEIVED = 'POSTS_RECEIVED'

export function getPosts() {
  return async (dispatch) => {
    const response = await fetch('https://boiling-lowlands-50769.herokuapp.com/api/posts')
    const json = await response.json()
    console.log('getPosts', json)
    const postsByVotes = json.sort(function(a,b){
      return  b.votes - a.votes
    })
    console.log('postsByVotes',postsByVotes)
    dispatch({
      type: POSTS_RECEIVED,
      payload: json
    })
  }
}

export function createPost(post){
  let {title, body, author, image} = post
  return (dispatch) => {
    fetch('https://boiling-lowlands-50769.herokuapp.com/api/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        title: title,
        author: author,
        body: body,
        img_url: image
      })
      
    }).then(response => {
      console.log('createPost',response)
    }).then( response => {
    dispatch(getPosts())
    })
  }
}

export function upVote(id){
  return async (dispatch) => {
    const response = await fetch(`https://boiling-lowlands-50769.herokuapp.com/api/posts/votes/increase/${id}`)
    const json = await response.json()
    console.log('up vote', json)
    dispatch(getPosts())
  }
}

export function downVote(id, votes){
  if (votes === 0) return {type: 'down vote'}
  return async (dispatch) => {
    const response = await fetch(`https://boiling-lowlands-50769.herokuapp.com/api/posts/votes/decrease/${id}`)
    const json = await response.json()
    console.log('up vote', json)
    dispatch(getPosts())
  }
}


