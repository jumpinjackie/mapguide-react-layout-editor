import { Button, ButtonGroup, Callout, Card, Dialog, Intent, Tree, TreeNodeInfo } from "@blueprintjs/core"
import { ApplicationDefinition, MapConfiguration, MapSetGroup } from "mapguide-react-layout";
import React from "react";
import { addLayer, addMapGroup } from "../actions/editor-actions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { NewLayer } from "./new-layer";
import { NewMapGroup } from "./new-map-group";

export const MapGroupEditor = () => {
    const [selectedNode, setSelectedNode] = React.useState<TreeNodeInfo<{}> | undefined>(undefined);
    const [isAddingMap, setIsAddingMap] = React.useState(false);
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const maps = useAppSelector(st => (st.appDef as ApplicationDefinition).MapSet?.MapGroup);
    const dispatch = useAppDispatch();
    const tree = maps?.map(mg => ({
        id: mg["@id"],
        label: mg["@id"]
    })) ?? [];
    const onDelete = () => {

    };
    const onAddLayer = (mapGroupId: string, layer: MapConfiguration) => {
        setIsAddingLayer(false);
        dispatch(addLayer(mapGroupId, layer));
    };
    const onAddMap = (payload: MapSetGroup) => {
        setIsAddingMap(false);
        dispatch(addMapGroup(payload));
    };
    const onNodeClick = (node: TreeNodeInfo<{}>) => {
        setSelectedNode(node);
    };
    let mapGroupId;
    if (selectedNode) {
        mapGroupId = `${selectedNode.id}`;
    }
    return <Card>
        <h5 className="bp3-heading">Map Groups</h5>
        <ButtonGroup>
            <Button icon="map-create" onClick={() => setIsAddingMap(true)}>Add Map</Button>
            <Button disabled={selectedNode == null} icon="new-layer" onClick={() => setIsAddingLayer(true)}>Add Layer</Button>
            <Button disabled={selectedNode == null} icon="delete" onClick={() => onDelete()}>Delete</Button>
        </ButtonGroup>
        <Dialog isOpen={isAddingMap} icon="map-create" title="Add Map" onClose={() => setIsAddingMap(false)}>
            <NewMapGroup onAddMap={onAddMap} />
        </Dialog>
        <Dialog isOpen={isAddingLayer} icon="new-layer" title="Add Layer" onClose={() => setIsAddingLayer(false)}>
            {mapGroupId && <NewLayer mapGroupId={mapGroupId} onAddLayer={onAddLayer} />}
        </Dialog>
        {tree.length > 0
            ? <Tree onNodeClick={onNodeClick} contents={tree} />
            : <Callout intent={Intent.DANGER}>Your application definition currently has no maps</Callout>}
    </Card>;
}