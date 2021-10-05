const parser = require("fast-xml-parser");

export interface WidgetInfo {
    Type: string;
    LocalizedType: string;
    Description: string;
    Location: string | null | undefined;
    Label: string;
    Tooltip: string;
    StatusText: string | null | undefined;
    ImageUrl: string | null | undefined;
    ImageClass: string | null | undefined;
    /**
     * Indicates if this widget can be docked to a standard toolbar or menu
     */
    StandardUi: boolean;
    /**
     * Indicates what kinds of containers this widget can reside in
     */
    ContainableBy: string;
    Parameter?: {
        Name: string,
        Description: string,
        Type: string,
        Label: string;
        DefaultValue: string;
        IsMandatory: boolean
    }[];
}

export async function loadWidgetInfosAsync(): Promise<WidgetInfo[]> {
    const widgetPromises = [];

    //widgetPromises.push(fetch("widgetinfo/GoogleStreetViewer.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/WidgetInfoTemplate.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/about.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/activityindicator.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/basemapswitcher.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/buffer.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/bufferpanel.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/centerselection.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/clearselection.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/colorpicker.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/coordinatetracker.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/cursorposition.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/editablescale.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/extenthistory.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/featureinfo.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/geolocation.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/help.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/initialmapview.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/invokescript.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/invokeurl.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/legend.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/linktoview.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/mapmenu.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/maptip.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/measure.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/navigator.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/overviewmap.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/pan.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/panonclick.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/panquery.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/print.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/query.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/quickplot.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/redline.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/refreshmap.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/savemap.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/scalebar.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/scalebardual.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/search.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/select.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/selectioninfo.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/selectionpanel.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/selectpolygon.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/selectradius.xml").then(r => r.text()));
    //widgetPromises.push(fetch("widgetinfo/selectradiusvalue.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/selectwithin.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/taskpane.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/theme.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/viewoptions.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/viewsize.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/zoom.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/zoomonclick.xml").then(r => r.text()));
    widgetPromises.push(fetch("widgetinfo/zoomtoselection.xml").then(r => r.text()));

    const xmls = await Promise.all(widgetPromises);
    const widgets = [];
    for (const xml of xmls) {
        const w = parser.parse(xml);
        widgets.push(w.WidgetInfo);
    }
    return widgets;
}