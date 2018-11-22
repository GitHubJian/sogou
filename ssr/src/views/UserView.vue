<template>
    <div>
        Hello, {{ user.name }}
    </div>
</template>

<script>
export default {
    name: 'user-view',
    computed: {
        user() {
            return this.$store.state.users[this.$route.params.id];
        }
    },
    asyncData({
        store,
        route: {
            params: { id }
        }
    }) {
        return store.dispatch('FETCH_USER', { id });
    }
};
</script>

