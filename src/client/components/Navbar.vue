<template>
    <div class="navbar" :class="{ 'navbar--inactive': !isAuthenticated }">
        <button class="navbar__button navbar__new" @click="createNewNote" aria-label="Create new note" />
        <button class="navbar__button navbar__list" @click="navigateToListView" aria-label="Go to all notes" />
        <button class="navbar__button navbar__settings" @click="settings" aria-label="Settigs" />
        <button class="navbar__button navbar__logout" @click="logout" aria-label="Log out" />
    </div>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters["auth/GET_IS_AUTHENTICATED"];
        },
    },
    methods: {
        settings() {
            this.$store.dispatch("ui/TOGGLE_SETTINGS_MODAL");
        },
        createNewNote() {
            this.$store.dispatch("notes/CREATE_NEW_NOTE");
        },
        navigateToListView() {
            if (this.$route.path !== "/notnik") {
                this.$router.push("/notnik");
                this.$store.dispatch("notes/SYNC_CHANGES", { notification: true });
            }
        },
        logout() {
            this.$store.dispatch("auth/LOG_OUT");
        },
    },
};
</script>

<style lang="scss">
.navbar {
    height: 100%;
    width: 3em;
    background-color: $bla1;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 2em;
    opacity: 1;
    transition: opacity 0.5s ease-out;
    z-index: 10;
    &__button {
        height: 3.5em;
        width: 100%;
        background-color: $bla2;
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: 40% 50%;
        cursor: pointer;
        transition: 0.4s opacity;
        border: none;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            width: 0.2em;
            top: 0;
            height: 100%;
            left: calc(100% - 0.2em);
        }
    }
    &__new {
        background-image: url("@assets/new.svg");
        &:after {
            background-color: $g;
        }
    }
    &__list {
        background-image: url("@assets/list.svg");
        &:after {
            background-color: $or2;
        }
    }
    &__settings {
        background-image: url("@assets/settings.svg");
        &:after {
            background-color: $blu;
        }
    }
    &__logout {
        background-color: $bla1;
        background-image: url("@assets/logout.svg");
        background-position: center center;
        position: absolute;
        bottom: 0;
    }
    &--inactive {
        pointer-events: none;
        opacity: 0.2;
        .navbar__logout {
            display: none;
            opacity: 0;
            visibility: hidden;
        }
    }
}
</style>
