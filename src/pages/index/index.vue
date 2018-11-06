<template>
    <layout>
        <div>Hello, world</div>
    </layout>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {};
    },
    created() {
        this.getUserById().then(res => {
            console.log(res);
        });
        this.$services.getUserByIdMock();
    },
    methods: {
        getUserById(id) {
            return this.$services.getUserById();
        }
    }
};
</script>

