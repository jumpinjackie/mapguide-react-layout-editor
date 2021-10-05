import { Button, ButtonGroup, Callout, Card, Drawer, Intent, Tree, TreeNodeInfo } from "@blueprintjs/core"
import { ApplicationDefinition, MapConfiguration, MapSetGroup } from "mapguide-react-layout";
import React from "react";
import { addLayer, addMapGroup, removeLayer, removeMapGroup } from "../actions/editor-actions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { NewLayer } from "./new-layer";
import { NewMapGroup } from "./new-map-group";

function isMapGroup(m: any): m is MapSetGroup {
    return m["@id"] != null
        && Array.isArray(m.Map);
}

function isMapLayer(m: any): m is MapConfiguration {
    return m.Type != null;
}

export const MapGroupEditor = () => {
    const [isAddingMap, setIsAddingMap] = React.useState(false);
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const maps = useAppSelector(st => (st.appDef as ApplicationDefinition).MapSet?.MapGroup);
    const dispatch = useAppDispatch();
    const [selectedPath, setSelectedPath] = React.useState<number[] | undefined>(undefined);
    const tree = maps?.map(mg => ({
        id: mg["@id"],
        label: mg["@id"],
        icon: "map",
        nodeData: mg,
        isExpanded: mg.Map.length > 0,
        childNodes: mg.Map?.map(m => ({
            id: m.Type,
            label: m.Type,
            icon: "layer",
            nodeData: m
        } as TreeNodeInfo<{}>)) ?? []
    } as TreeNodeInfo<{}>)) ?? [];
    let selectedNode: TreeNodeInfo<{}> | undefined;
    if (selectedPath) {
        selectedNode = Tree.nodeFromPath(selectedPath, tree);
        if (selectedNode)
            selectedNode.isSelected = true;
    }
    const onDelete = React.useCallback(() => {
        if (selectedNode) {
            const { nodeData } = selectedNode;
            if (isMapGroup(nodeData)) {
                dispatch(removeMapGroup(nodeData["@id"]));
            } else if (isMapLayer(nodeData) && maps) {
                for (const m of maps) {
                    const idx = m.Map.findIndex(mm => mm === nodeData);
                    if (idx >= 0) {
                        dispatch(removeLayer(m["@id"], idx));
                        break;
                    }
                }
            }
        }
    }, [selectedNode, maps, dispatch]);
    const onAddLayer = (mapGroupId: string, layer: MapConfiguration) => {
        setIsAddingLayer(false);
        dispatch(addLayer(mapGroupId, layer));
    };
    const onAddMap = (payload: MapSetGroup) => {
        setIsAddingMap(false);
        dispatch(addMapGroup(payload));
    };
    const onNodeClick = (node: TreeNodeInfo<{}>, nodePath: number[]) => {
        setSelectedPath(nodePath);
    };
    let mapGroupId;
    if (selectedNode) {
        mapGroupId = `${selectedNode.id}`;
    }
    return <Card>
        <h5 className="bp3-heading">Map Groups</h5>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>
                <ButtonGroup>
                    <Button icon="map-create" onClick={() => setIsAddingMap(true)}>Add Map</Button>
                    <Button disabled={selectedNode == null} icon="new-layer" onClick={() => setIsAddingLayer(true)}>Add Layer</Button>
                    <Button disabled={selectedNode == null} icon="delete" onClick={() => onDelete()}>Delete</Button>
                </ButtonGroup>
                <Drawer isOpen={isAddingMap} icon="map-create" title="Add Map" onClose={() => setIsAddingMap(false)}>
                    <NewMapGroup onAddMap={onAddMap} />
                </Drawer>
                <Drawer isOpen={isAddingLayer} icon="new-layer" title={`Add Layer to (${mapGroupId})`} onClose={() => setIsAddingLayer(false)}>
                    {mapGroupId && <NewLayer mapGroupId={mapGroupId} onAddLayer={onAddLayer} />}
                </Drawer>
                {tree.length > 0
                    ? <Tree onNodeClick={onNodeClick} contents={tree} />
                    : <Callout intent={Intent.DANGER}>Your application definition currently has no maps</Callout>}
            </div>
            <div>
            </div>
        </div>
    </Card>;
}