import { Button, FormGroup, HTMLSelect,  Intent } from "@blueprintjs/core";
import { MapConfiguration } from "mapguide-react-layout";
import React from "react";
import { GeoJSON } from "./layer-editors/geojson";
import { OSM } from "./layer-editors/osm";
import { Stamen } from "./layer-editors/stamen";

const LAYER_EDITORS = [
    { type: "OSM", label: "OpenStreetMap", EditorComponent: OSM },
    { type: "Stamen", label: "Stamen", EditorComponent: Stamen },
    { type: "GeoJSON", label: "GeoJSON", EditorComponent: GeoJSON },
]

export const NewLayer: React.FC<{ mapGroupId: string, onAddLayer: (mapGroupId: string, layer: MapConfiguration) => void }> = (props) => {
    const [type, setType] = React.useState("OSM");
    const onAddLayer = () => {
        const payload: MapConfiguration = {
            Type: type,
            Extension: {

            }
        };
        props.onAddLayer(props.mapGroupId, payload);
    };
    const activeEditor = LAYER_EDITORS.find(ed => ed.type === type);
    return <div style={{ padding: 10 }}>
        <FormGroup label="Layer Type">
            <HTMLSelect fill value={type} onChange={e => setType(e.target.value)}>
                {LAYER_EDITORS.map(ed => <option key={ed.type} value={ed.type}>{ed.label}</option>)}
            </HTMLSelect>
        </FormGroup>
        {(() => {
            if (activeEditor) {
                const { EditorComponent } = activeEditor;
                return <EditorComponent />;
            }
        })()}
        <Button intent={Intent.PRIMARY} onClick={onAddLayer}>Add Layer</Button>
    </div>;
};