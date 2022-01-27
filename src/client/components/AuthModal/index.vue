<template>
    <div class="form">
        <div class="form__heading">
            <h2 class="form__title">{{ isLoginForm ? "Sign in" : "Register" }}</h2>
            <transition name="fade">
                <LoadingSpinner v-if="isLoading" />
            </transition>
        </div>
        <form class="form__container" @submit="submitHandler" novalidate>
            <FormInput placeholder="Email" type="email" v-model="form.email" @focus="resetErrors" />
            <FormInput
                v-if="isLoginForm"
                placeholder="Password"
                type="password"
                v-model="form.password"
                @focus="resetErrors"
            />
            <div v-else class="form__input-container">
                <FormInput placeholder="Password" type="password" v-model="form.password" @focus="resetErrors" />
                <FormInput
                    placeholder="Repeat password"
                    type="password"
                    v-model="form.repeatPassword"
                    @focus="resetErrors"
                />
            </div>
            <button class="form__submit" type="submit">{{ isLoginForm ? "Log in" : "Submit" }}</button>
        </form>
        <a @click="toggleFormType()" class="form__link" v-html="isLoginForm ? loginLinkContent : registerLinkContent" />
        <FormPopup :errors="errors" />
    </div>
</template>

<script>
import FormInput from "@components/AuthModal/FormInput";
import FormPopup from "@components/AuthModal/FormPopup";
import LoadingSpinner from "@components/LoadingSpinner";

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
            isLoading: false,
        };
    },
    components: {
        FormInput,
        FormPopup,
        LoadingSpinner,
    },
    methods: {
        submitHandler(event) {
            event.preventDefault();
            this.isLoading = true;
            this.resetErrors();
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
            } else {
                this.isLoading = false;
            }
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
