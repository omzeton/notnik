<template>
    <div class="form-panel">
        <transition name="fade">
            <LoginForm :toggleFormType="toggleFormType" v-if="isLoginForm" />
            <RegistrationForm :toggleFormType="toggleFormType" v-else />
        </transition>
    </div>
</template>

<script>
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default {
    components: {
        LoginForm,
        RegistrationForm,
    },
    methods: {
        toggleFormType() {
            this.$store.dispatch("ui/TOGGLE_FORM_VIEW");
        },
    },
    computed: {
        isLoginForm() {
            return this.$store.getters["ui/GET_FORM_VIEW"];
        },
    },
};
</script>

<style lang="scss">
.form-panel {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 30em;
    background-color: $bla3;
    box-shadow: 0 0 50px 0 $bla1;
    border-radius: 0.5em;
    width: 25em;
}
.errors {
    position: absolute;
    top: calc(100% + 2em);
    left: 50%;
    transform: translateX(-50%);
    background-color: $err;
    border-radius: 0.5em;
    box-shadow: 0 0 30px -10px $err;
    box-sizing: border-box;
    padding: 1em;
    color: $w;
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
    &__header {
        display: block;
        margin-bottom: 0.8em;
        margin-right: 2em;
    }
    &__subheader {
        display: block;
        white-space: nowrap;
    }
}
</style>
