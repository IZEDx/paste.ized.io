import * as React from "react";

export interface MainProps {
    compiler: string;
    framework: string;
}

export const MAIN = (props: MainProps) => {
    return <h1>Hello from { props.compiler } and { props.framework }!</h1>;
};