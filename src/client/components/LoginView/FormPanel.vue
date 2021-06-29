<template>
    <div class="form-panel">
        <LoginForm :toggleFormType="toggleFormType" v-if="isLoginForm" />
        <RegistrationForm :toggleFormType="toggleFormType" v-else />
    </div>
</template>

<script>
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default {
    data() {
        return {
            isLoginForm: true,
        };
    },
    components: {
        LoginForm,
        RegistrationForm,
    },
    methods: {
        toggleFormType() {
            this.isLoginForm = !this.isLoginForm;
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
</style>
