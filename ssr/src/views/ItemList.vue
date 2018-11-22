<template>
    <div>Item List of {{ type }}</div>
</template>

<script>
export default {
    name: 'item-list',
    components: {
        Item
    },
    props: {
        type: String
    },
    data() {
        return {};
    }
};
</script>

<style>
</style>
