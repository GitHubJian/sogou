<template>
    <div>
        Hello,{{state.item}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'xiaows'
        };
    },
    fetchdata({ store }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('fetchItem');
    }
};
</script>

