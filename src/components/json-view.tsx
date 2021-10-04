import type { ApplicationDefinition } from "mapguide-react-layout";
import { useAppSelector } from "../app/hooks";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React from "react";

export const JsonView = () => {
    const appDef = useAppSelector(st => st.appDef as ApplicationDefinition);
    return <div style={{ position: "absolute", top: 50, left: 0, right: 0, bottom: 0 }}>
        <SyntaxHighlighter customStyle={{ height: "100%", margin: 0 }} language="json" style={a11yDark} showLineNumbers>
            {JSON.stringify(appDef, null, 4)}
        </SyntaxHighlighter>
    </div>;
}