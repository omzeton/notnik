<template>
    <div>
        <Layout />
        <LoadingBar />
        <transition name="fade">
            <Notification v-if="notificationVisible" />
        </transition>
    </div>
</template>

<script>
import Layout from "./Layout";
import LoadingBar from "./LoadingBar";
import Notification from "./Notification";

export default {
    components: {
        Layout,
        LoadingBar,
        Notification,
    },
    mounted() {
        this.$store.dispatch("auth/CHECK_AUTH_STATUS");
    },
    computed: {
        notificationVisible() {
            return this.$store.getters["ui/GET_NOTIFICATION_IS_VISIBLE"];
        },
    },
};
</script>
