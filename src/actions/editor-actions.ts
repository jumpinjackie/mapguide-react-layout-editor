import type { MapConfiguration, MapSetGroup } from "mapguide-react-layout";

const ADD_MAP_GROUP = "Editor/ADD_MAP_GROUP";
const ADD_MAP_LAYER = "Editor/ADD_MAP_LAYER";
const REMOVE_MAP_GROUP = "Editor/REMOVE_MAP_GROUP";
const REMOVE_MAP_LAYER = "Editor/REMOVE_MAP_LAYER";
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

export interface IRemoveMapGroupAction {
    type: typeof REMOVE_MAP_GROUP,
    payload: string;
}

export interface IRemoveMapLayerAction {
    type: typeof REMOVE_MAP_LAYER,
    payload: {
        mapGroupId: string;
        index: number;
    }
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

export function removeMapGroup(id: string): IRemoveMapGroupAction {
    return {
        type: REMOVE_MAP_GROUP,
        payload: id
    }
}

export function removeLayer(mapGroupId: string, index: number): IRemoveMapLayerAction {
    return {
        type: REMOVE_MAP_LAYER,
        payload: {
            mapGroupId,
            index
        }
    }
}

export type EditorAction = IAddMapGroupAction
    | IAddMapLayerAction
    | IRemoveMapGroupAction
    | IRemoveMapLayerAction;