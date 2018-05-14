import { combineReducers } from "redux";
import ImageListReducer from "./imageslist";
import UpdateImageReducer from "./updateimage";
import DeleteImageReducer from "./deleteimage";
import UploadImageReducer from "./uploadimage";
import UpdateFieldReducer from "./updatefield";

const rootReducer = combineReducers({
    imageslist: ImageListReducer,
    updateimage: UpdateImageReducer,
    deleteimage: DeleteImageReducer,
    uploadimage: UploadImageReducer,
    updatefield: UpdateFieldReducer
});

export default rootReducer;
