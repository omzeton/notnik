<template>
    <div class="grid-layout">
        <Navbar />
        <router-view />
        <!-- <LoginView /> -->
        <!-- <NoteList /> -->
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
    display: grid;
    grid-template-columns: 3em 1fr;
}
</style>
