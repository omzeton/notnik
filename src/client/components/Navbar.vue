<template>
    <nav class="navbar" :class="{ 'navbar--inactive': !isAuthenticated }">
        <button class="navbar__button navbar__button--new" @click="createNewNote" aria-label="Create new note" />
        <button class="navbar__button navbar__button--grid" @click="navigateToGridView" aria-label="Go to all notes" />
        <button class="navbar__button navbar__button--settings" @click="settings" aria-label="Settigs" />
        <button class="navbar__button navbar__button--delete" :class="[isDeletingMode && 'navbar__delete--active']" @click="toggleDeletingMode" aria-label="Settigs" />
        <button class="navbar__button navbar__button--logout" @click="logout" aria-label="Log out" />
    </nav>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters["auth/GET_IS_AUTHENTICATED"];
        },
        isDeletingMode() {
            return this.$store.getters["ui/GET_IS_DELETING_MODE"];
        },
    },
    methods: {
        settings() {
            this.$store.dispatch("ui/TOGGLE_SETTINGS_MODAL");
        },
        createNewNote() {
            if (this.$route.path === "/notnik") {
                this.$store.dispatch("notes/CREATE_NEW_NOTE");
            }
        },
        navigateToGridView() {
            if (this.$route.path !== "/notnik") {
                this.$router.push("/notnik");
                this.$store.dispatch("notes/SYNC_CHANGES", { notification: true });
            }
        },
        logout() {
            this.$store.dispatch("auth/LOG_OUT");
        },
        toggleDeletingMode() {
            this.$store.dispatch("ui/TOGGLE_DELETING_MODE");
        },
    },
};
</script>
