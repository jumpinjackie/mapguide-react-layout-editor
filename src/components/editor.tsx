import { MapGroupEditor } from "./map-group-editor";
import { TemplateSelector } from "./template-selector";
import { WidgetsEditor } from "./widgets-editor";

export const Editor = () => {
    return <>
        <TemplateSelector />
        <MapGroupEditor />
        <WidgetsEditor />
    </>;
}