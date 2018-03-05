// @flow
import autobind from "autobind-decorator";
import moment from "moment";
import * as React from "react";
import {ScrollView, View} from "react-native";
import {Footer, FooterTab, Button, Icon, Picker} from "native-base";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react/native";

import Month, {Date} from "./Month";

import {BaseContainer, Task} from "../components";
import type {ScreenParams, StoreProps} from "../components/Types";

import variables from "../../native-base-theme/variables/commonColor";

const now = moment();

@inject("store")
@observer
export default class Calendar extends React.Component<ScreenParams<{ datetime: string }> & StoreProps> {

    @observable selectedMonth: number;
    @observable selectedDate: Date;

    componentWillMount() {
        let datetime;
        try {
            datetime = this.props.navigation.state.params.datetime;
        } catch (e) {
            // do nothing
        }
        const dt = datetime ? moment(datetime, "YYYY-MM-DD HH:mm") : now;
        const month = dt.month();
        const day = dt.date();
        this.selectedMonth = month;
        this.selectedDate = { month, day };
    }

    @autobind @action
    onChangeMonth (month: number) {
        this.selectedMonth = month;
    }

    @autobind @action
    onChangeDate (date: Date) {
        this.selectedDate = date;
    }

    render(): React.Node {
        const {navigation, store} = this.props;
        const title = <Picker
            style={{width: 150}}
            selectedValue={this.selectedMonth}
            onValueChange={this.onChangeMonth}
            iosHeader="Select Month"
            iosIcon={<Icon name="ios-arrow-down-outline" />}>
        {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                .map(val => <Picker.Item key={val} value={val} label={moment().month(val).format("MMMM")}/>)
        }
        </Picker>;
        return <BaseContainer {...{ navigation, title, safe: true, bottomColor: variables.brandInfo }}>
            <View style={{ flexGrow: 1, backgroundColor: "white" }}>
                <Month month={this.selectedMonth} date={this.selectedDate} onPress={this.onChangeDate} />
                <ScrollView>
                {
                    store
                        .getTasksOfDay(this.selectedDate.day, this.selectedDate.month)
                        .map((task, key) => <Task {...{task, key}} />)
                }
                </ScrollView>
            </View>
        </BaseContainer>;
    }
}
