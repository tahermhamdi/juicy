import { DELETE_IMAGE } from "../actions";

const initialState = {
    data: []
};

export default function deleteimage(state = initialState, action) {
    switch (action.type) {
        case DELETE_IMAGE:
            return {
                ...state,
                id: action.imageid
            };

        default:
            return state;
    }
}
