declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "jsx:*.svg" {
    import * as React from "react";

    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    export default ReactComponent;
}