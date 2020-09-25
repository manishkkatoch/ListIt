import { Subject } from 'rxjs';
import { Dispatch } from 'react';

export interface Item {
    title: String
}

export interface ListState {
    list: Item[]
}

export interface IListStore {
    state: ListState
    storeSubject: Subject<ListState>
    subscribe(state: React.Dispatch<ListState>): void
    addItem(item: Item): void
}



class FauxDatabase implements IListStore {
    state: ListState
    storeSubject: Subject<ListState>

    constructor() {
        this.state = { list: [] }
        this.storeSubject = new Subject()
        this.storeSubject.next(this.state)
    }
    
    subscribe(state: Dispatch<ListState>): void {
        this.storeSubject.subscribe(state);
    }
    addItem(item: Item): void {
        this.state = {
            ...this.state,
            list: [...this.state.list, item]
        }
        this.storeSubject.next(this.state)
    }
    removeItem(item: Item): void {
        this.state = {
            ...this.state,
            list: this.state.list.filter(listItem => listItem !== item)
        }
        this.storeSubject.next(this.state)
    }

    seed() {
        this.addItem({ title: "To Travel" })
        this.addItem({ title: "Grocery" })
    }
}

export const fauxDb = new FauxDatabase()
