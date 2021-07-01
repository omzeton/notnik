<template>
    <div class="grid-layout">
        <Navbar />
        <transition name="fade">
            <SettingsModal v-if="settingsModalOpen" />
        </transition>
        <transition name="fade">
            <router-view />
        </transition>
        <StatusBar v-if="isAuthenticated" />
    </div>
</template>

<script>
import Navbar from "./Navbar";
import SettingsModal from "@/components/Authorized/SettingsModal/SettingsModal";
import LoginView from "./LoginView";
import NoteList from "./Authorized/ListView/NoteList";
import StatusBar from "@/components/StatusBar";

export default {
    components: {
        Navbar,
        LoginView,
        NoteList,
        SettingsModal,
        StatusBar,
    },
    computed: {
        settingsModalOpen() {
            return this.$store.getters["ui/GET_SETTINGS_MODAL_IS_OPEN"];
        },
        isAuthenticated() {
            return this.$store.getters["auth/GET_IS_AUTHENTICATED"];
        },
    },
};
</script>

<style lang="scss">
.grid-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
</style>
