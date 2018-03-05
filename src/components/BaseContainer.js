// @flow
import * as React from "react";
import {Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content, Fab} from "native-base";
import { EvilIcons } from "@expo/vector-icons";

import Container from "./Container"
import type {NavigationProps, ChildrenProps} from "./Types";
import variables from "../../native-base-theme/variables/commonColor";

type BaseContainerProps = NavigationProps<*> & ChildrenProps & {
    title: string | React.Node,
    scrollable?: boolean,
    footer?: React.Node,
    safe?: boolean,
    bottomColor?: string
};

export default class BaseContainer extends React.Component<BaseContainerProps> {
    render(): React.Node {
        const {title, navigation, scrollable, footer, safe, bottomColor} = this.props;
        return <Container {...{safe, bottomColor}}>
                <NBHeader noShadow style={{ backgroundColor: "#3F51B5"}}>
                    <Left>
                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <EvilIcons name="navicon" size={32} color={variables.gray} />
                        </Button>
                    </Left>
                    <Body>
                    {
                        typeof(title) === "string" ? <Title style={{color: "#FFFFFF"}}>{title}</Title> : title
                    }
                    </Body>
                    <Right style={{ alignItems: "center" }}>

                    </Right>
                </NBHeader>
                {
                    scrollable ? <Content>
                            {this.props.children}
                        </Content>
                    :
                        this.props.children
                }
                {
                    footer
                }
            </Container>;
    }
}
