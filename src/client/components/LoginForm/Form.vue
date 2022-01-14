<template>
    <div class="form">
        <h2 class="form__heading">{{ isLoginForm ? "Sign in" : "Register" }}</h2>
        <form class="form__container" @submit="submitHandler" novalidate>
            <Input placeholder="Email" type="email" v-model="form.email" @focus="resetErrors" />
            <Input v-if="isLoginForm" placeholder="Password" type="password" v-model="form.password" @focus="resetErrors" />
            <div v-else class="form__input-container">
                <Input placeholder="Password" type="password" v-model="form.password" @focus="resetErrors" />
                <Input placeholder="Repeat password" type="password" v-model="form.repeatPassword" @focus="resetErrors" />
            </div>
            <button class="form__submit" type="submit">{{ isLoginForm ? "Log in" : "Submit" }}</button>
        </form>
        <a @click="toggleFormType()" class="form__link" v-html="isLoginForm ? loginLinkContent : registerLinkContent" />
        <ValidationError :errors="errors" />
    </div>
</template>

<script>
import Input from "./Input";
import ValidationError from "./ValidationErrorTooltip";

import validation from "@/mixins/validation";

export default {
    mixins: [validation],
    data() {
        return {
            form: {
                email: "",
                password: "",
                repeatPassword: "",
            },
            loginLinkContent: `Don't have an account? <span class="form__link--accent">Register</span> a new one.`,
            registerLinkContent: `Already have an account? <span class="form__link--accent">Log in</span>.`,
        };
    },
    components: {
        Input,
        ValidationError,
    },
    methods: {
        submitHandler(event) {
            event.preventDefault();
            this.resetErrors();
            this.$store.dispatch("ui/SET_LOADING_STATE", { active: true, message: this.isLoginForm ? "Loading" : "Saving new user" }, { root: true });
            const { email, password, repeatPassword } = this.form;
            if (this.isLoginForm) {
                this.validate({ email, password });
            } else {
                this.validate({ email, password: [password, repeatPassword] });
            }
            if (!this.errors.length) {
                if (this.isLoginForm) {
                    this.$store.dispatch("auth/LOGIN", { email, password });
                } else {
                    this.$store.dispatch("auth/REGISTER", { email, password });
                }
                return;
            }
            this.$store.dispatch("ui/SET_LOADING_STATE", { active: false, message: "" }, { root: true });
        },
        toggleFormType() {
            this.form = {
                email: "",
                password: "",
                repeatPassword: "",
            };
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
