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
        document.addEventListener("keydown", this.sync);
        this.$store.dispatch("auth/CHECK_AUTH_STATUS");
    },
    beforeDestroy() {
        document.removeEventListener("keydown", this.sync);
    },
    computed: {
        notificationVisible() {
            return this.$store.getters["ui/GET_NOTIFICATION_IS_VISIBLE"];
        },
    },
    methods: {
        sync(e) {
            if (!(e.keyCode === 83 && e.ctrlKey)) return;
            if (this.$route.path === "/notnik" || this.$route.path === "/") return;
            this.$store.dispatch("notes/SYNC_CHANGES", { notification: true });
            e.preventDefault();
        },
    },
};
</script>
