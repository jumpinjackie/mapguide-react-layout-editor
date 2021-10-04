import type { ApplicationDefinition } from "mapguide-react-layout";
import { EditorAction } from "../actions/editor-actions";

const INITIAL_STATE: ApplicationDefinition = {
    MapSet: {
        MapGroup: []
    },
    WidgetSet: []
};

export function appDefReducer(state = INITIAL_STATE, action: EditorAction) {
    return state;
}