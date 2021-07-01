<template>
    <div class="navbar" :class="{ 'navbar--inactive': !isAuthenticated }">
        <button class="navbar__button navbar__new" />
        <button class="navbar__button navbar__list" />
        <button class="navbar__button navbar__settings" @click="settings" />
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
    &--inactive {
        pointer-events: none;
        opacity: 0.2;
    }
}
</style>
