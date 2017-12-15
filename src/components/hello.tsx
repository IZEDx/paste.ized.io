import * as React from "react";
const {Component} = React;

export interface HelloProps {
    compiler: string;
    framework: string;
}

export const hello = (props: HelloProps) => <h1>Hello from { props.compiler } and { props.framework }!</h1>;

export class Hello extends Component<HelloProps, {}> {
    public render() {
        return <h1>Hello from { this.props.compiler } and { this.props.framework }!</h1>;
    }
}