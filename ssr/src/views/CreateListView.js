import ItemList from './ItemList.vue';

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1);

// They are essentially higher order components wrapping ItemList.vue
export default function createListView(type) {
    return {
        name: `${type}-stories-view`,
        asyncData({ store }) {
            return store.dispatch('FETCH_LIST_DATA', { type });
        },
        title: camelize(type),
        render: h => h(ItemList, { props: { type } })
    };
}
