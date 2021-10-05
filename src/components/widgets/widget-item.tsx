import { Card } from "@blueprintjs/core";
import { WidgetInfo } from "./widget-sets";

export type WidgetItemProps = {
    widget: WidgetInfo;
};

export const WidgetItem: React.FC<WidgetItemProps> = ({ widget }) => {
    return <Card title={widget.Description} style={{ textAlign: "center" }}>
        <p>{widget.Label}</p>
    </Card>
};