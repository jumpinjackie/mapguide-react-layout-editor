import { Card } from "@blueprintjs/core";
import * as React from "react";

const TEMPLATES = [
    { name: "Slate", image: "templateinfo/images/slate.png" },
    { name: "Aqua", image: "templateinfo/images/aqua.png" },
    { name: "Maroon", image: "templateinfo/images/maroon.png" },
    { name: "LimeGold", image: "templateinfo/images/limegold.png" },
    { name: "TurquoiseYellow", image: "templateinfo/images/turquoise-yellow.png" },
    { name: "AjaxViewer", image: "templateinfo/images/ajax-viewer.png" },
    { name: "Sidebar", image: "templateinfo/images/sidebar.png" },
    { name: "Generic", image: "templateinfo/images/generic.png" }
];

const TemplateItem: React.FC<{ selected?: boolean, onSelect: () => void, template: typeof TEMPLATES[0] }> = ({ selected, template, onSelect }) => {
    return <div style={{ display: "inline-block", margin: 10 }} onClick={() => onSelect()}>
        <img style={selected === true ? { border: "5px solid blue" } : {}} width={200} height={150} alt={template.name} src={template.image} />
        <footer style={{ textAlign: "center" }}>{template.name}</footer>
    </div>;
}

export const TemplateSelector = () => {
    const [templateIndex, setTemplateIndex] = React.useState(0)
    return <Card>
        <h5 className="bp3-heading">Select Template</h5>
        <div>
            {TEMPLATES.map((tpl, i) => <TemplateItem key={tpl.name} onSelect={() => setTemplateIndex(i)} selected={i === templateIndex} template={tpl} />)}
        </div>
        <p>Selected template: <strong>{TEMPLATES[templateIndex].name}</strong></p>
    </Card>
};