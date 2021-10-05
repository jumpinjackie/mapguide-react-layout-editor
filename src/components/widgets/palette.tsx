import { NonIdealState } from "@blueprintjs/core"
import React from "react"
import { WidgetItem } from "./widget-item";
import { loadWidgetInfosAsync, WidgetInfo } from "./widget-sets";

const WIDGET_GRID_STYLE: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
};

export const WidgetPalette = () => {
    const [availableWidgets, setAvailableWidgets] = React.useState<WidgetInfo[] | undefined>(undefined);
    React.useEffect(() => {
        loadWidgetInfosAsync().then(widgets => setAvailableWidgets(widgets));
    }, []);
    if (availableWidgets) {
        return <div style={WIDGET_GRID_STYLE}>
            {availableWidgets.map(w => <WidgetItem key={w.Type} widget={w} />)}
        </div>;
    } else {
        return <NonIdealState icon="inbox"
            title="You have no widgets available"
            description="Choose what widgets to populate this palette with below" />;
    }
}