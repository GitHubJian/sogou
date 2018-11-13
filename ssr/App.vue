<template>
    <div>
        Hello,{{item}}
        <input v-model="msg" />
    </div>
</template>

<script>
export default {
    fetch({ store }) {
        return store.dispatch('fetchItem');
    },
    data() {
        return {
            msg: 'xiaows'
        };
    },
    computed: {
        item: function() {
            return this.$store.state.item + this.msg;
        }
    }
};
</script>

