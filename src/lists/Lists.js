// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text,TouchableHighlight} from "react-native";
import {H1, H3, Button, Icon, Card, CardItem, Thumbnail, Left, Body} from "native-base";
import {observable, action} from "mobx";
import {observer,inject} from "mobx-react/native";

import ListsStore from "./ListsStore";

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class Lists extends Component {

    storeList = new ListsStore();

    go(key: string, params) {
        this.props.navigation.navigate(key, {key: params});
    }

    render(): React$Element<*> {
        const {navigation, store} = this.props;
        const {tasks, loading} = this.storeList;
        return (<BaseContainer title="Aujourd'hui" navigation={navigation} scrollable>
        {
            !loading  && <View>
                <Text note>Intervention(s) à venir {store.overdueTaskCount}</Text>
                {/*<Image source={Images.lists} style={Styles.header}>
                    <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                        <H1 style={{ color: "white" }}>Task List</H1>
                    </View>
                </Image>*/}
                {
                    !tasks && <View>
                        <Text>You don't have any missions yet.</Text>
                    </View>
                }
                {
                    _.map(
                        tasks,
                        (item, key) => <Item
                            key={key}
                            title={item.title}
                            time={item.time}
                            image={item.imageURL}
                            distance={"7,8km"}
                            onToggle={done => this.store.toggleItem(key, done)}
                            onPress={() => this.go('ListsDetail',key)}
                        />
                    )
                }
            </View>
        }
      </BaseContainer>);
    }
}

@observer
class Item extends Component {

    props: {
        title: string,
        done?: boolean,
        onToggle: boolean => void,
        time: string,
        distance : string,
        imageURL : string,
        key: string
    }

    @observable done: boolean;
    @observable hour: string;

    componentWillMount() {
        const {done} = this.props;
        this.done = !!done;
        //this.hour = moment(time);
    }

    @autobind @action
    toggle() {
        const {onToggle} = this.props;
        this.done = !this.done;
        onToggle(this.done);
    }

    render(): React$Element<*>  {
        const {title, distance, time, onPress} = this.props;
        const btnStyle ={ backgroundColor: this.done ? variables.brandInfo : variables.lightGray };
        return (<TouchableHighlight onPress={onPress}><View style={Styles.listItem}>
            {/*<Button transparent
                    onPress={this.toggle}
                    style={StyleSheet.flatten([Styles.center, style.button, btnStyle])}>
                {this.done ? <Icon name="md-checkmark" style={{ color: "white" }} /> : undefined}
            </Button>
            <View style={[Styles.center, style.title]}>
                <Text style={{ color: this.done ? variables.gray : variables.black }}>{title}</Text>
            </View>*/}
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={{uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg"}} />
                  <Body>
                    <H3>{title}</H3>
                    <Text note> <Icon name="md-time" style={{ color: "#3F51B5", fontSize:13 }} /> {moment(time).format("LT")} </Text>
                    <Text note> <Icon name="ios-pin" style={{ color: "#3F51B5", fontSize:13  }} /> {distance} </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
        </View></TouchableHighlight>);
    }
}

const style = StyleSheet.create({
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    }
});
