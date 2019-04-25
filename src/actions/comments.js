export const COMMENTS_RECEIVED = 'COMMENTS_RECEIVED'

export function getComments() {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8082/api/comments')
    const json = await response.json()
    console.log('getComments', json)
    dispatch({
      type: COMMENTS_RECEIVED,
      payload: json
    })
  }
}