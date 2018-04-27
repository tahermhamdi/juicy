import { combineReducers } from "redux";
import GifsReducer from "./gifs";
import TrendingReducer from "./trending";
import ModalReducer from "./modal";

const rootReducer = combineReducers({
    gifs: GifsReducer,
    trending: TrendingReducer,
    modal: ModalReducer
});

export default rootReducer;
