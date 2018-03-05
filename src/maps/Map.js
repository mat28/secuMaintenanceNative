//@flow
import * as _ from "lodash";
import moment from "moment";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {MapView, Constants, Location, Permissions} from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import {Platform, StyleSheet, Image, View, Text,Title} from "react-native";
import {H1,H3, Button, Icon, Card, CardItem, Thumbnail, Left, Body,Spinner, Right, Tab, Tabs, TabHeading} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {observable, action} from "mobx";
import {observer,inject} from "mobx-react/native";

import {BaseContainer, Styles, Images} from "../components";

import MapStore from './MapStore';


import variables from "../../native-base-theme/variables/commonColor";

@inject("store")
@observer
export default class Map extends Component {

  state = {
    location: null,
    latitude : null,
    longitude : null,
    loading : true,
    errorMessage: null,
    mapStore : new MapStore(this.props.navigation.state.key)
  };

  componentWillMount(){
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({ loading : false,latitude : location.coords.latitude, longitude : location.coords.longitude, location : location });
    console.log(location);
  }

  render(): React$Element<*> {
    const coordinates = [{
      latitude : this.state.latitude,
      longitude : this.state.longitude
    },{
      latitude : 46.990896,
      longitude : 3.162845
    }];
    const {navigation} = this.props;
    return(
      <BaseContainer title="Intervention" {...{ navigation }}>
        {!this.state.location ? (
            <Spinner color='blue' />)
           : (
            <Tabs>
              <Tab heading={ <TabHeading><Icon name="ios-map" /><Text>Carte</Text></TabHeading>}>
                <Grid>
                    <Row size={60}>
                      <MapView style={{flex : 1}} initialRegion={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                              }}>
                        <MapView.Marker coordinate={{latitude : this.state.latitude, longitude : this.state.longitude}}/>
                        <MapView.Marker coordinate={coordinates[1]}/>
                        <MapViewDirections
                          origin = {{latitude : this.state.latitude, longitude : this.state.longitude}}
                          destination = {coordinates[1]}
                          apikey="AIzaSyDk8NZnPOZaVKCpdWQODQ_ZH3yRHPHvzKs"
                          strokeWidth={3}
                          strokeColor="3F51B5"
                          onReady={(result) => {
                            this.mapView.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                right: (width / 20),
                                bottom: (height / 20),
                                left: (width / 20),
                                top: (height / 20),
                              }
                            });
                          }}
                          onError={(errorMessage) => {
                            console.log(errorMessage);
                          }}
                        />
                      </MapView>
                    </Row>
                    <Row size={40}>
                      <Card>
                        <CardItem>
                          <Left>
                            <Thumbnail circle source={{uri: "https://transvosges.files.wordpress.com/2016/02/dsc08012.jpg"}} />
                            <Body>
                              <H3>Coucou</H3>
                              <Text note> <Icon name="md-time" style={{ color: "#3F51B5", fontSize:13 }} /> 9h15 </Text>
                              <Text note> <Icon name="ios-pin" style={{ color: "#3F51B5", fontSize:13 }} /> 0,1km </Text>
                            </Body>
                          </Left>
                          <Body>
                            <Button warning> <Text>Arrêter</Text> </Button>
                          </Body>
                        </CardItem>
                      </Card>
                    </Row>
                  </Grid>
              </Tab>
              <Tab heading={ <TabHeading><Icon name="ios-list" /><Text>Etape</Text></TabHeading>}>

              </Tab>
            </Tabs>)
        }
      </BaseContainer>
    )
  }
}
