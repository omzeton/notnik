<template>
    <div>
        <Layout />
        <LoadingBar />
    </div>
</template>

<script>
import Layout from "./Layout";
import LoadingBar from "./LoadingBar";

export default {
    components: {
        Layout,
        LoadingBar,
    },
    mounted() {
        this.$store.dispatch("auth/CHECK_AUTH_STATUS");
    },
};
</script>
