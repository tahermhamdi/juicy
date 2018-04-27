import { OPEN_MODAL, CLOSE_MODAL } from "../actions";

const initialState = {
    selectedImage: null,
    modalVisible: false
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalVisible: true,
                selectedImage: action.gif.selectedImage
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modalVisible: false,
                selectedImage: null
            };
        default:
            return state;
    }
}
