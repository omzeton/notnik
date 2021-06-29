<template>
    <div>
        <Layout />
    </div>
</template>

<script>
import Layout from "./Layout.vue";

export default {
    components: {
        Layout,
    },
    mounted() {
        this.$store.dispatch("auth/LOGIN", { email: "test@test.com", password: "testtest" });
    },
};
</script>
