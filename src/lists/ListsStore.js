// @flow
import {observable, computed} from "mobx";

import type {Tasks} from "../Model";
import {Firebase} from "../components";

export default class ListsStore {

    @observable _loading: boolean = true;
    @observable _tasks: Tasks;

    @computed get tasks(): Tasks { return this._tasks; }
    set tasks(tasks: Tasks) { this._tasks = tasks; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    constructor() {
        Firebase.getUser()
            .then(user => this.tasks = user.tasks)
            .then(() => this.loading = false);
    }

    get overdueTaskCount(): number {
        const now = (new Date()).getTime() / 1000;
        return this.tasks ? _.map(this.tasks || {}, task => task)
                .filter(task => !task.done)
                .filter(task => task.time <= now).length
            : 0;
    }

    toggleItem(key: string, done: boolean) {
        Firebase.userRef.child(`tasks/${key}/done`).set(done);
    }
}
