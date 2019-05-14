export const COMMENTS_RECEIVED = 'COMMENTS_RECEIVED'

export function getComments() {
  return async (dispatch) => {
    const response = await fetch('https://blooming-springs-92699.herokuapp.com/api/comments')
    const json = await response.json()
    console.log('getComments', json)
    dispatch({
      type: COMMENTS_RECEIVED,
      payload: json
    })
  }
}

export function createComment(content, postId){
  return (dispatch) => {
    fetch('https://https://blooming-springs-92699.herokuapp.com/api/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        content: content,
        post_id: postId,
      })     
    }).then(response => {
      console.log('createComment',response)
    }).then( response => {
    dispatch(getComments())
    })
  }
}