import { rootStore } from '@tdev-stores/rootStore';
import DirectusStore from './stores/DirectusStore';
import ViewStore from '@tdev-stores/ViewStores';

const createStore = (viewStore: ViewStore) => {
    return new DirectusStore(viewStore);
};

const register = () => {
    rootStore.viewStore.registerStore('directusStore', createStore);
};

register();
