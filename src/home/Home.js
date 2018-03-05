// @flow
import moment from "moment";
import * as React from "react";
import {Text, Image, StyleSheet, View, WebView} from "react-native";
import {H1} from "native-base";
import {observer, inject} from 'mobx-react/native';

import {BaseContainer, Circle, Badge, Styles, Images, WindowDimensions} from "../components";
import type {ScreenProps, StoreProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";
@inject("store")
@observer
export default class Home extends React.Component<ScreenProps<> & StoreProps> {

    render(): React.Node {
        const today = moment().locale("fr");
        const month = today.format("MMMM Y").toUpperCase();
        const dayOfMonth = today.format("D");
        const dayOfWeek = today.format("dddd").toUpperCase();
        const {navigation, store} = this.props;
        return (
            <BaseContainer title="" {...{ navigation }}>
              {
                store.user &&
                <View style={[Styles.center, Styles.flexGrow]}>
                    <Image source={Images.home} style={[StyleSheet.absoluteFill, style.img]} />
                    <H1>Bonjour {store.user.profile.name} !</H1>
                      <Circle color={variables.brandInfo} size={150} style={style.circle} navigateTo="Lists" {... {navigation}}>
                          <Badge color={variables.brandPrimary} size={30} style={style.badge}>
                              <Text style={style.text}>{store.overdueTaskCount}</Text>
                          </Badge>
                          <Text style={[style.text, { fontSize: 48 }]}>{dayOfMonth}</Text>
                          <Text style={style.text}>{dayOfWeek}</Text>
                      </Circle>
                    <Text>{month}</Text>
                </View>
              }
            </BaseContainer>
        );
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions
    },
    circle: {
        marginVertical: variables.contentPadding * 4
    },
    badge: {
        position: "absolute",
        right: 10,
        top: 10
    },
    text: {
        fontFamily: variables.titleFontfamily,
        color: "white"
    }
});
