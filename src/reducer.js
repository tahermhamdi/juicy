export default function reducer(state = {}, action) {
    console.log("action.type  : ", action.type);
    if (action.type == "UPLOAD_IMAGE") {
        return {
            ...state,
            imagedata: action.imagedata
        };
    }
    if (action.type == "UPDATE_IMAGE") {
        state = Object.assign({}, state, {
            imagedata: [...state, action.imagedata]
        });
    }
    if (action.type == "UPDATE_FIELD") {
        let clone = state.imagedata;
        clone[0][action.key] = action.value;
        state = {
            ...state,
            imagedata: clone
        };
    }

    if (action.type == "IMAGES_LIST") {
        state = {
            ...state,
            imageslist: action.imageslist
        };
    }
    if (action.type == "IMAGES_CRITERIA") {
        console.log("action.imageslist : ", action.imageslist);
        state = {
            imageslist: action.imageslist
        };
    }
    if (action.type == "REQUEST_IMAGE") {
        console.log("action.imagedata : ", action.imagedata);
        state = {
            imagedata: action.imagedata
        };
    }
    return state;
}
