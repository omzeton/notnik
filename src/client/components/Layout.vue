<template>
    <div class="grid-layout">
        <Navbar />
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
import Navbar from "./Navbar";
import LoginView from "./LoginView";
import NoteList from "./Authorized/ListView/NoteList";

export default {
    components: {
        Navbar,
        LoginView,
        NoteList,
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
