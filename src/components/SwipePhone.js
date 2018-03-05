// @flow
import * as React from "react";
import {Button, Icon, SwipeRow, Footer} from "native-base";
import { EvilIcons } from "@expo/vector-icons";

import Container from "./Container"
import type {NavigationProps, ChildrenProps} from "./Types";
import variables from "../../native-base-theme/variables/commonColor";




export default class SwipePhone extends React.Component {
    render(): React.Node {
        return (<Footer >
            <SwipeRow leftOpenValue={100} body={
              <View>
                <Button left danger rounded>
                  <Icon name='fa-phone'/>
                  <Text>"Glissez pour appeler"</Text>
                </Button>
              </View>
            }/>
        </Footer>);
    }
}
