import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { strIsNullOrEmpty } from "mapguide-react-layout";
import React from "react";
import { PrimaryLayerEditorProps } from "./contracts";

function isValidMapDefId(str: string) {
    if (!strIsNullOrEmpty(str)) {
        //Crude, but sufficient
        return str.startsWith("Library://") && str.endsWith(".MapDefinition");
    }
    return false;
}

export const MapGuide: React.FC<PrimaryLayerEditorProps> = ({ primaryLayer, onChange }) => {
    const [resId, setResId] = React.useState(primaryLayer?.Extension?.ResourceId ?? "");
    const [isReady, setIsReady] = React.useState(isValidMapDefId(resId));
    React.useEffect(() => {
        setResId(primaryLayer?.Extension?.ResourceId ?? "");
    }, [primaryLayer]);
    const onResIdChange = (rid: string) => {
        const ready = isValidMapDefId(rid);
        setResId(rid);
        setIsReady(ready);
        onChange({
            Type: "MapGuide",
            Extension: {
                ResourceId: rid
            }
        }, ready);
    };
    return <div>
        <FormGroup label="Map Definition">
            <InputGroup intent={isReady ? Intent.SUCCESS : Intent.DANGER} value={resId} onChange={e => onResIdChange(e.target.value)} />
        </FormGroup>
    </div>
}