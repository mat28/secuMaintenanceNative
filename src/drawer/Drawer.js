// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from "react-native";
import {Button, H1, Icon, Header, Left, Right, Text, List, ListItem} from "native-base";

import {Avatar, Images, Firebase, WindowDimensions, Styles} from "../components";

import type {NavigationProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

export default class Drawer extends React.Component<NavigationProps<>> {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    @autobind
    logout() {
        Firebase.auth.signOut();
    }

    @autobind
    close() {
        this.go("DrawerClose");
    }

    @autobind
    profile() {
        this.go("Profile");
    }

    render(): React.Node {
        const navState = this.props.navigation.state;
        const currentIndex = navState.index;
        const items = navState.routes
            .filter(route => ["Settings", "Create", "Lists", "Maps", "ListsDetail", "Profile", "Groups", "Overview", "Timeline"].indexOf(route.key) === -1)
            .map((route, i) =>
                <DrawerItem key={i} onPress={() => this.go(route.key)} label={route.key} active={currentIndex === i} />
            );
        //
        return (
            <View style={Styles.flexGrow}>
                <Image source={Images.drawer} style={[StyleSheet.absoluteFill, style.img]} />
                <View style={[StyleSheet.absoluteFill, style.background]} />
                <SafeAreaView style={StyleSheet.absoluteFill}>
                    <View style={style.container}>
                        <Header style={style.header} noShadow>
                            <Left>
                                <Button transparent onPress={this.close}>
                                    <Icon name="ios-close-outline" style={style.closeIcon} />
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.profile} style={{ height: 70 }}>
                                    <Avatar size={50} style={{ marginTop: 12 }} />
                                </Button>
                            </Right>
                        </Header>
                    <View >
                        <List>{items}</List>
                    </View>
                    <View style={style.row}>
                        <DrawerIcon label="settings" icon="ios-settings-outline" onPress={() => this.go("Settings")} />
                        <DrawerIcon label="log out" icon="ios-log-out-outline" onPress={this.logout} />
                    </View>
                </View>
            </SafeAreaView>
            </View>
        );
    }
}

type DrawerItemProps = {
    label: string,
    onPress: () => void,
    active?: boolean
};

class DrawerItem extends React.Component<DrawerItemProps> {
    render(): React.Element<React.ComponentType<Button>> {
        const {label, onPress, active} = this.props;
        return (<ListItem>
          <Button onPress={onPress} full transparent>
            <H1 style={{ color: active ? "white" : "rgba(255, 255, 255, .5)" }}>{label}</H1>
        </Button></ListItem>);
    }
}

type DrawerIconProps = {
    label: string,
    icon: string,
    onPress: () => void
};

class DrawerIcon extends React.Component<DrawerIconProps> {
    render(): React.Element<React.ComponentType<Button>> {
        const {label, icon, onPress} = this.props;
        return <TouchableOpacity style={style.drawerIcon} onPress={onPress}>
            <Icon name={icon} style={{ color: "rgba(255, 255, 255, .5)" }} />
            <Text style={{ color: "white", fontSize: 12 }}>{label.toUpperCase()}</Text>
        </TouchableOpacity>;
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions
    },
    container: {
        flexGrow: 1,
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: "transparent"
    },
    background: {
        backgroundColor: "rgba(101, 99, 164, .9)"
    },
    mask: {
        color: "rgba(255, 255, 255, .5)"
    },
    closeIcon: {
        fontSize: 50,
        color: "rgba(255, 255, 255, .5)"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: variables.contentPadding * 2
    },
    drawerItemsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: variables.contentPadding * 1
    },
    drawerItems: {
        flex: 1,
        justifyContent: "space-between"
    },
    drawerIcon: {
        justifyContent: "center",
        alignItems: "center"
    }
});
