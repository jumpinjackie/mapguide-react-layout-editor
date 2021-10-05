import { Card } from "@blueprintjs/core"
import { WidgetPalette } from "./widgets/palette"

export const WidgetsEditor = () => {
    return <Card>
        <h5 className="bp3-heading">Widgets</h5>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>
            </div>
            <WidgetPalette />
        </div>
    </Card>
}