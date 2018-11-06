<template>
    <layout>
        <div slot="content">
            <el-form v-model="form" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="接口名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作方式">
                            <el-select v-model="form.method">
                                <el-option key="1" label="GET" value="get"></el-option>
                                <el-option key="2" label="POST" value="post"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-button type="primary" @click="submit()">保存</el-button>
            </el-row>
        </div>
    </layout>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                method: ''
            }
        };
    },
    methods: {
        submit() {
            this.$services.saveApi({ ...this.form });
        }
    }
};
</script>

