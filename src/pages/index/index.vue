<template>
    <layout>
        <div slot="content">
            Hello, world111
            {{name}}
            <input v-model="name">
            <router-view></router-view>
        </div>
    </layout>
</template>

<script>
export default {
    data() {
        return { name: 1 };
    },
    methods: {
        getUserById() {
            return this.$services.getUserById();
        }
    }
};
</script>

