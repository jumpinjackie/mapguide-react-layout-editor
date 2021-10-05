import { Button, FormGroup, HTMLSelect, InputGroup, Intent } from "@blueprintjs/core";
import { MapConfiguration, MapSetGroup, strIsNullOrEmpty } from "mapguide-react-layout";
import React from "react";
import { PrimaryLayerEditorDefn } from "./layer-editors/contracts";
import { MapGuide } from "./layer-editors/mapguide";
import { SubjectLayer } from "./layer-editors/subject-layer";

const PRIMARY_LAYER_EDITORS = [
    { type: "SubjectLayer", label: "Subject Layer", EditorComponent: SubjectLayer },
    { type: "MapGuide", label: "MapGuide Map Definition", EditorComponent: MapGuide }
] as PrimaryLayerEditorDefn[];

export const NewMapGroup: React.FC<{ onAddMap: (payload: MapSetGroup) => void }> = (props) => {
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("SubjectLayer");
    const [primaryLayer, setPrimaryLayer] = React.useState<MapConfiguration | undefined>(undefined);
    const [isReady, setIsReady] = React.useState(false);
    const onAddMap = () => {
        if (primaryLayer) {
            const payload: MapSetGroup = {
                "@id": name,
                Map: [
                    primaryLayer
                ]
            };
            props.onAddMap(payload);
        }
    };
    const activeEditor = PRIMARY_LAYER_EDITORS.find(ed => ed.type === type);
    const onPrimaryLayerChange = (layer: MapConfiguration, isReady: boolean) => {
        setPrimaryLayer(layer);
        setIsReady(isReady);
    };
    return <div style={{ padding: 10 }}>
        <FormGroup label="Name">
            <InputGroup intent={strIsNullOrEmpty(name) ? Intent.DANGER : Intent.SUCCESS} value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup label="Primary Layer Type">
            <HTMLSelect fill value={type} onChange={e => setType(e.target.value)}>
                {PRIMARY_LAYER_EDITORS.map(ed => <option key={ed.type} value={ed.type}>{ed.label}</option>)}
            </HTMLSelect>
        </FormGroup>
        {(() => {
            if (activeEditor) {
                const { EditorComponent } = activeEditor;
                return <EditorComponent onChange={onPrimaryLayerChange} primaryLayer={primaryLayer} />;
            }
        })()}
        <Button disabled={!isReady || strIsNullOrEmpty(name)} intent={Intent.PRIMARY} onClick={onAddMap}>Add Map</Button>
    </div>;
}