<template>
    <div class="loader" :class="{ 'loader--visible': isLoading }">
        <div class="loader__left-column">
            <h2>{{ message }}</h2>
        </div>
        <div class="loader__right-column">
            <svg
                class="loader__svg"
                version="1.1"
                id="L4"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 0 0"
                xml:space="preserve"
            >
                <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
                </circle>
                <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
                </circle>
                <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
                </circle>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.getters["ui/GET_IS_LOADING"];
        },
        message() {
            return this.$store.getters["ui/GET_LOADING_MESSAGE"];
        },
    },
};
</script>

<style lang="scss">
.loader {
    position: fixed;
    bottom: -6em;
    right: 3em;
    background-color: $rd;
    color: $w;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0 0 30px -8px $rd;
    border-radius: 0.5em;
    font-size: 0.6rem;
    box-sizing: border-box;
    opacity: 0;
    transition: all 0.3s ease-out;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr 5em;
    column-gap: 0.5em;
    padding: 1em;
    &__left-column,
    &__right-column {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__svg {
        position: absolute;
        left: 1em;
        width: 120%;
    }
    &--visible {
        bottom: 3em;
        opacity: 1;
    }
}
</style>
