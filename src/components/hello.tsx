import * as React from "react";
const {Component} = React;

import styles from "./hello.css";

export interface HelloProps {
    compiler: string;
    framework: string;
}

export const hello = (props: HelloProps) => <h1>Hello from { props.compiler } and { props.framework }!</h1>;

export class Hello extends Component<HelloProps, {}> {
    public render() {
        const style = Object.assign({},
          styles.h1
        );

        return <h1 style={ style }>Hello from { this.props.compiler } and { this.props.framework }!</h1>;
    }
}