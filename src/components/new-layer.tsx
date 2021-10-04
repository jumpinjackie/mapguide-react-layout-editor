import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { MapConfiguration } from "mapguide-react-layout";
import React from "react";

export const NewLayer: React.FC<{ mapGroupId: string, onAddLayer: (mapGroupId: string, layer: MapConfiguration) => void }> = (props) => {
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const onAddLayer = () => {
        const payload: MapConfiguration = {
            Type: type,
            Extension: {
                
            }
        };
        props.onAddLayer(props.mapGroupId, payload);
    };
    return <div style={{ padding: 10 }}>
        <FormGroup label="Name">
            <InputGroup value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <Button intent={Intent.PRIMARY} onClick={onAddLayer}>Add Layer</Button>
    </div>;
};