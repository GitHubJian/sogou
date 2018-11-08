<template>
    <layout>
        <div>Hello, world</div>
    </layout>
</template>

<script>
import store from './store.js';

export default {
    store,
    data() {
        return {};
    },
    created() {
        this.getUserById().then(() => {
        });
        this.$services.getUserByIdMock();
    },
    methods: {
        getUserById() {
            return this.$services.getUserById();
        }
    }
};
</script>

