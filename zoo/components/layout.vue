<template>
    <div class="layout">
        <el-container>
            <el-aside>

            </el-aside>
            <el-main>
                <el-header>
                    <div></div>
                </el-header>
                <div class="content">
                    <slot name="content"></slot>
                </div>
                <el-footer>
                    <div class="copyright">xiaowensheng@sogou-inc.com</div>
                </el-footer>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'layout',
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.copyright {
    text-align: center;
}
</style>
