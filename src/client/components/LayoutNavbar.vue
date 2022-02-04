<template>
    <nav class="navbar" :class="{ 'navbar--inactive': !isLoggedIn }">
        <button class="navbar__button navbar__button--new" @click="createNewNote" aria-label="Create new note" />
        <button class="navbar__button navbar__button--grid" @click="toggleSubmenu" aria-label="Toggle submenu" />
        <button class="navbar__button navbar__button--settings" aria-label="Settigs" />
        <button class="navbar__button navbar__button--logout" @click="logout" aria-label="Log out" />
    </nav>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters["auth/GET_IS_LOGGED_IN"];
        },
    },
    methods: {
        createNewNote() {
            this.$store.dispatch("notes/CREATE_NEW_NOTE");
        },
        logout() {
            this.$store.dispatch("auth/LOG_OUT");
        },
        toggleSubmenu() {
            this.$store.dispatch("ui/TOGGLE_SUBMENU");
        },
    },
};
</script>
