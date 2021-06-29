<template>
    <div class="grid-layout">
        <Navbar />
        <LoginView />
    </div>
</template>

<script>
import Navbar from "./Navbar";
import LoginView from "./LoginView";

export default {
    components: {
        Navbar,
        LoginView,
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
