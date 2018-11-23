<template>
    <div>
        <div>Hello, server: {{ server }}</div>
        <div>welcome to client: {{ client }}</div>
        <input v-model="client">
    </div>
</template>

<script>
export default {
    name: 'hello-world',
    computed: {
        server() {
            return this.$store.state.server.name;
        }
    },
    asyncData({ store, route }) {
        return store.dispatch('SERVER_FETCH');
    },
    data() {
        return {
            client: 'fix'
        };
    },
    mounted() {
        this.clientFetch();
    },
    methods: {
        clientFetch() {
            return this.$store.dispatch('CLIENT_FETCH');
        }
    }
};
</script>
