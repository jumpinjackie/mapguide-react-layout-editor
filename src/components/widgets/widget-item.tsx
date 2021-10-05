import { Card } from "@blueprintjs/core";
import { strIsNullOrEmpty } from "mapguide-react-layout";
import { WidgetInfo } from "./widget-sets";

export type WidgetItemProps = {
    widget: WidgetInfo;
};

export const WidgetItem: React.FC<WidgetItemProps> = ({ widget }) => {
    return <Card title={widget.Description} style={{ textAlign: "center" }}>
        <p>{strIsNullOrEmpty(widget.Label) ? widget.LocalizedType : widget.Label}</p>
    </Card>
};