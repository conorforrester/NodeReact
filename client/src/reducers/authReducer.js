import { FETCH_USER } from  '../actions/types';

//state of null - we do not know if the user is actually logged in or not, so return null
export default function(state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            //use "false" when user not logged in, otherwise action.payload data will show empty string
            return action.payload || false;
        default:
            return state;
    }
}