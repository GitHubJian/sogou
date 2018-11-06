<template>
    <div class="container">
        <aside class="aside"></aside>
        <section class="main">
            <header class="header">
                <Header />
            </header>
            <div class="content">
                <div class="wrapper">
                    <div>
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="copyright">xiaowensheng@sogou-inc.com</div>
            </footer>
        </section>
    </div>
</template>

<script>
import Header from './header.vue';

export default {
    name: 'layout',
    components: {
        Header
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.container {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    height: 100vh;

    .aside {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 200px;
        overflow: auto;
    }

    .main {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex: 1;
        flex-basis: auto;
        overflow: auto;

        .header {
            height: 50px;
            line-height: 50px;
        }
        .content {
            flex: 1;
            overflow: hidden;
            .wrapper {
                max-height: 100%;
                overflow: auto;
            }
        }
        .footer {
            height: 50px;
            line-height: 50px;
        }
    }
}
.copyright {
    text-align: center;
}
</style>
