const initialState = {
    selectedImage: null,
    modalVisible: false
};
import events from "./events";
export default function reducer(state = initialState, action) {
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
        state = {
            imageslist: action.imageslist
        };
    }
    if (action.type == "REQUEST_IMAGE") {
        state = {
            imagedata: action.imagedata
        };
    }

    if (action.type == "OPEN_MODAL") {
        state = {
            ...state,
            slotinfo: action.slotinfo,
            modalVisible: true
        };
    }
    if (action.type == "CLOSE_MODAL") {
        var imageSelected = state.imageslist.filter(
            image => image.id == action.selectedImage
        );
        events.push({
            id: 15,
            title: "Working on " + imageSelected[0].title,
            start: state.slotinfo.start,
            end: state.slotinfo.end
        });
        state = {
            ...state,
            imageCalendar: state.imageslist.filter(
                image => image.id == action.selectedImage
            ),
            modalVisible: false
        };
    }
    return state;
}
