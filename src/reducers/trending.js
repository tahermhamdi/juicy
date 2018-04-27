import { REQUEST_TRENDING } from "../actions";

const initialState = {
    data: []
};

export default function trending(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TRENDING:
            return {
                ...state,
                data: action.payload.data.data
            };
        default:
            return state;
    }
}
