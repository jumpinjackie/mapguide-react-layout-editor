import React from "react";
import { MapConfiguration } from "mapguide-react-layout";

export type PrimaryLayerEditorProps = {
    primaryLayer?: MapConfiguration;
    onChange: (primaryLayer: MapConfiguration, isReady: boolean) => void;
}

export type PrimaryLayerEditorDefn = {
    type: string;
    label: string;
    EditorComponent: React.ComponentType<PrimaryLayerEditorProps>;
}