
import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPostAndUsers = () => {
    return async (dispatch, getState) => {
        // below await is to wait for fetch post to complete
        await dispatch(fetchPosts());
        // loadash map function will give back all userIds from posts
        // then loadash uniq will give back all unique ones.
       const userIds = _.uniq( _.map(getState().posts, 'userId'))
       
       // call fetchUser for each unique ids
        userIds.forEach(id=> dispatch(fetchUser(id)))

    }

}


export const fetchPosts = () => {

    // We return an asyc function from action creator instead 
    // of action. Once the async operation is completed, redux-thunk
    // will call the dispatch function with payload from api
    return async (dispatch)=> {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({
            type:'FETCH_POSTS',
            payload:response.data
        })
    }
};


export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({
            type:"FETCH_USER",
            payload: response.data 
        })

    }
};



