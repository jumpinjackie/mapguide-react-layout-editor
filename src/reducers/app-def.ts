import type { ApplicationDefinition } from "mapguide-react-layout";
import { EditorAction } from "../actions/editor-actions";
import produce from "immer";

const INITIAL_STATE: ApplicationDefinition = {
    MapSet: {
        MapGroup: []
    },
    WidgetSet: [
        {
            Container: [],
            Widget: []
        }
    ]
};

export function appDefReducer(state = INITIAL_STATE, action: EditorAction) {
    switch (action.type) {
        case "Editor/REMOVE_MAP_GROUP":
            {
                const nextState = produce(state, draft => {
                    if (draft.MapSet)
                        draft.MapSet.MapGroup = draft.MapSet?.MapGroup.filter((mg) => mg["@id"] !== action.payload);
                });
                return nextState;
            }
        case "Editor/REMOVE_MAP_LAYER":
            {
                const nextState = produce(state, draft => {
                    if (draft.MapSet) {
                        const mGroup = draft.MapSet.MapGroup.find(mg => mg["@id"] === action.payload.mapGroupId);
                        if (mGroup) {
                            mGroup.Map = mGroup.Map.filter((m, i) => i !== action.payload.index);
                        }
                    }
                });
                return nextState;
            }
        case "Editor/ADD_MAP_GROUP":
            {
                const nextState = produce(state, draft => {
                    draft.MapSet?.MapGroup.push(action.payload);
                });
                return nextState;
            }
        case "Editor/ADD_MAP_LAYER":
            {
                const nextState = produce(state, draft => {
                    const mg = draft.MapSet?.MapGroup.find(m => m["@id"] === action.payload.mapGroupId);
                    if (mg) {
                        mg.Map.push(action.payload.layer);
                    }    
                });
                return nextState;
            }
    }
    return state;
}