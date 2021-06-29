<template>
    <div class="loader" :class="{ 'loader--visible': isLoading }">
        <h2>Loading</h2>
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
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.getters["auth/GET_IS_LOADING"];
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
    padding: 1em;
    padding-right: 6em;
    opacity: 0;
    transition: all 0.3s ease-out;
    z-index: 10;
    &__svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50%;
        right: -1.8em;
    }
    &__animation {
        height: 40%;
        width: 4em;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1em;
    }
    &--visible {
        bottom: 3em;
        opacity: 1;
    }
}
</style>
