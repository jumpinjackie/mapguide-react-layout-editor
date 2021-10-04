import type { MapConfiguration, MapSetGroup } from "mapguide-react-layout";

const ADD_MAP_GROUP = "Editor/ADD_MAP_GROUP";
const ADD_MAP_LAYER = "Editor/ADD_MAP_LAYER";
export interface IAddMapGroupAction {
    type: typeof ADD_MAP_GROUP,
    payload: MapSetGroup
}

export interface IAddMapLayerAction {
    type: typeof ADD_MAP_LAYER,
    payload: {
        mapGroupId: string;
        layer: MapConfiguration;
    };
}

export function addMapGroup(payload: MapSetGroup): IAddMapGroupAction {
    return {
        type: ADD_MAP_GROUP,
        payload
    }
}

export function addLayer(mapGroupId: string, layer: MapConfiguration): IAddMapLayerAction {
    return {
        type: ADD_MAP_LAYER,
        payload: {
            mapGroupId,
            layer
        }
    }
}

export type EditorAction = IAddMapGroupAction
    | IAddMapLayerAction;