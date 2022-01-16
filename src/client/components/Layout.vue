<template>
    <main class="layout">
        <Navbar />
        <router-view />
    </main>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: {
        Navbar,
    },
};
</script>
