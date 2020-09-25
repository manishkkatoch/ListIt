import { Item, fauxDb } from "../store";
import { Subscription } from "rxjs";
import { useState, useEffect } from "react";

interface ListState {
    items: Item[]
}

type AddListFn = (item: Item) => void
type RemoveListFn = (item: Item) => void

export const useLists: () => [ListState, AddListFn, RemoveListFn] = () => {
    const addList = (item: Item) => fauxDb.addItem(item)
    const removeList = (item: Item) => fauxDb.removeItem(item)

    const [state, setState] = useState<ListState>({ items: [] }); 
    
    useEffect(() => {
        const subscriptions: Subscription[] = [
            fauxDb.storeSubject.subscribe(listState => setState(state => ({...state, items:listState.list})))
        ];

        fauxDb.seed()
        return () => { subscriptions.map(it => it.unsubscribe()) };
      }, []);

    return [state, addList, removeList]
} 