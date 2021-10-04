import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { MapSetGroup } from "mapguide-react-layout";
import React from "react";

export const NewMapGroup: React.FC<{ onAddMap: (payload: MapSetGroup) => void }> = (props) => {
    const [name, setName] = React.useState("");
    const onAddMap = () => {
        const payload: MapSetGroup = {
            "@id": name,
            Map: []
        };
        props.onAddMap(payload);
    };
    return <div style={{ padding: 10 }}>
        <FormGroup label="Name">
            <InputGroup value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <Button intent={Intent.PRIMARY} onClick={onAddMap}>Add Map</Button>
    </div>;
}