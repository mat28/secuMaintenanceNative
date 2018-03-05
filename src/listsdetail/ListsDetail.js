// @flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text} from "react-native";
import {H1, H3, Button, Icon, Card, CardItem, Thumbnail, Left, Body, Right} from "native-base";
import {observable, action} from "mobx";
import {observer,inject} from "mobx-react/native";
import AwesomeAlert from 'react-native-awesome-alerts';

import ListsDetailStore from './ListsDetailStore'

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class ListsDetail extends Component {



    constructor(props){
      super(props)
      this.state = {
        showAlert : false,
        storeListDetail : new ListsDetailStore(this.props.navigation.state.key)
      }
    }

    go(key: string, params) {
        this.props.navigation.navigate(key, {key: params });
    }

    showAlert(){
      this.setState({
        showAlert: true
      });
    };

    hideAlert(idTask){
      this.go("Maps",idTask)
      this.setState({
        showAlert: false
      });
    };

    alertAndGo(){

    }

    render(): React$Element<*> {
        const {store} = this.props;
        const {showAlert, storeListDetail} = this.state;
        const {task, tasks, loading} = storeListDetail;
        const textAlert = "C'est parti "+ store.user.profile.name;
        const textGo = this.state.button ? "Arrêter" : "Commencer";

        return (<BaseContainer title="Aujourd'hui" navigation={this.props.navigation} scrollable>
        {
            !loading  && <View>
                <View style={{backgroundColor: "#3F51B5"}}>
                <Text style={{color:"#3F51B5"}} note>Intervention(s) en cours 1</Text>
                <Card>
                  <CardItem onPress={() => onPress}>
                    <Left>
                      <Thumbnail square source={{uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg"}} />
                      <Body>
                        <H3>{task.title}</H3>
                        <Text note> <Icon name="md-time" style={{ color: "#3F51B5", fontSize:13 }} /> {moment(task.time).format("LT")} </Text>
                        <Text  note> <Icon name="ios-pin" style={{ color: "#3F51B5", fontSize:13  }} /> 7,8km </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                        <Text  note> <Icon style={{ color: "#3F51B5", fontSize:13 }} name="ios-pin" /> Lidl Nevers </Text>
                        <Text  note> <Icon style={{ color: "#3F51B5", fontSize:13 }} name="ios-map" /> Batiment B </Text>
                        <Text  note> <Icon style={{ color: "#3F51B5", fontSize:13 }} name="ios-call" /> 06 12 63 17 71 </Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Right>
                      <Button transparent onPress={() => this.showAlert()}>
                        <Text >{textGo}</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                <AwesomeAlert
                  show={showAlert}
                  showProgress={false}
                  title={textAlert}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="Non pas tout de suite"
                  confirmText="Oui, c'est parti !"
                  confirmButtonColor="#5cb85c"
                  onCancelPressed={() => {
                    this.hideAlert();
                    this.go("Maps", task.key);
                  }}
                  onConfirmPressed={() => {
                    this.hideAlert();
                  }}
                />
              </View>
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
                            idTask={key}
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
        key: string,
        onPress: void => void
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
        return (<View style={Styles.listItem}>
            {/*<Button transparent
                    onPress={this.toggle}
                    style={StyleSheet.flatten([Styles.center, style.button, btnStyle])}>
                {this.done ? <Icon name="md-checkmark" style={{ color: "white" }} /> : undefined}
            </Button>
            <View style={[Styles.center, style.title]}>
                <Text style={{ color: this.done ? variables.gray : variables.black }}>{title}</Text>
            </View>*/}
            <Card>
              <CardItem onPress={() => onPress}>
                <Left>
                  <Thumbnail square source={{uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg"}} />
                  <Body>
                    <H3>{title}</H3>
                    <Text note> <Icon name="md-time" style={{ color: "#3F51B5", fontSize:"13px" }} /> {moment(time).format("LT")} </Text>
                    <Text note> <Icon name="ios-pin" style={{ color: "#3F51B5", fontSize:"13px"  }} /> {distance} </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
        </View>);
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
