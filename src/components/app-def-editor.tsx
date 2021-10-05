import React from "react";
import { Navbar, Tabs, Tab, Alignment } from "@blueprintjs/core";
import { Editor } from "./editor";
import { JsonView } from "./json-view";

type TabId = "Editor" | "JsonView";

export const AppDefEditor = () => {
    const [tabId, setTabId] = React.useState<TabId>("Editor")
    const onHandleTabChange = (tabId: TabId) => {
        setTabId(tabId);
    };
    return <>
        <Navbar fixedToTop>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>AppDef Editor for mapguide-react-layout</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Tabs
                    animate
                    id="navbar"
                    large={true}
                    onChange={onHandleTabChange}
                    selectedTabId={tabId}>
                    <Tab id="Editor" title="Editor" />
                    <Tab id="JsonView" title="JSON" />
                </Tabs>
            </Navbar.Group>
        </Navbar>
        <div style={{ marginTop: 50 }}>
            {tabId === "Editor" && <Editor />}
            {tabId === "JsonView" && <JsonView />}
        </div>
    </>
}