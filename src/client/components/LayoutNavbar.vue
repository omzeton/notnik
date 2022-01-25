<template>
    <nav class="navbar" :class="{ 'navbar--inactive': !isAuthenticated }">
        <button class="navbar__button navbar__button--new" @click="createNewNote" aria-label="Create new note" />
        <button class="navbar__button navbar__button--grid" @click="navigateToGridView" aria-label="Go to all notes" />
        <button class="navbar__button navbar__button--settings" @click="settings" aria-label="Settigs" />
        <button class="navbar__button navbar__button--logout" @click="logout" aria-label="Log out" />
    </nav>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters["auth/GET_IS_AUTHENTICATED"];
        },
    },
    methods: {
        createNewNote() {
            this.$store.dispatch("notes/CREATE_NEW_NOTE");
        },
        logout() {
            this.$store.dispatch("auth/LOG_OUT");
        },
        settings() {
            console.log("💙");
        },
        navigateToGridView() {
            console.log("💛");
        },
    },
};
</script>
