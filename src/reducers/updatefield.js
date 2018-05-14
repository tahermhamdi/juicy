import { UPDATE_FIELD } from "../actions";

const initialState = {
    data: []
};

export default function updatefield(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FIELD:
            return {
                ...state,
                data: action.imageslist
            };

        default:
            return state;
    }
}
