// @flow
import {observable, computed} from "mobx";

import type {Tasks, Task} from "../Model";
import {Firebase} from "../components";

export default class ListsDetailStore {

    @observable _loading: boolean = true;
    @observable _task: Task;


    @computed get task(): Task {return this._task;}
    set task(task:Task){this._task = task;}

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    constructor(key: string) {
        Firebase.userRef.child(`tasks/${key}`).once("value")
              .then(task => this.task = task)
              .then(() => this.loading = false);
    }
}
