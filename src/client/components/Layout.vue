<template>
    <main class="layout">
        <LayoutNavbar />
        <router-view />
    </main>
</template>

<script>
import LayoutNavbar from "./LayoutNavbar";

export default {
    components: {
        LayoutNavbar,
    },
};
</script>
