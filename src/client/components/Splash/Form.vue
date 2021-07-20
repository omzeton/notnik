<template>
    <div class="form">
        <h2 class="form__heading">{{ isLoginForm ? "Sign in" : "Register" }}</h2>
        <form class="form__form" @submit="submitHandler" novalidate>
            <Input placeholder="Email" type="email" v-model="form.email" @focus="resetErrors" />
            <Input v-if="isLoginForm" placeholder="Password" type="password" v-model="form.password" @focus="resetErrors" />
            <div v-else class="form__input-container">
                <Input placeholder="Password" type="password" v-model="form.password" @focus="resetErrors" />
                <Input placeholder="Repeat password" type="password" v-model="form.repeatPassword" @focus="resetErrors" />
            </div>
            <div class="form__buttons">
                <Submit :value="isLoginForm ? 'Log in' : 'Submit'" />
            </div>
        </form>
        <p @click="toggleFormType()" class="form__link" v-html="isLoginForm ? loginLinkContent : registerLinkContent" />
        <transition name="fade">
            <div v-if="errors.length" class="errors errors--active">
                <p class="errors__header">⛔ Validation error{{ errors.length === 1 ? "" : "s" }}</p>
                <p class="errors__subheader" v-for="(error, index) in errors" :key="index">{{ error }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
import Input from "./Input";
import Submit from "./SubmitButton";
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
        Submit,
    },
    methods: {
        submitHandler(event) {
            event.preventDefault();
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

<style lang="scss">
.form {
    position: absolute;
    width: 100%;
    height: 100%;
    &__heading {
        margin-left: 10%;
        margin-top: 1.5em;
        font-size: 1.2em;
        font-family: "Baloo", cursive;
        color: $w;
        @media (min-width: $md) {
            font-size: 2em;
            margin-top: 2em;
        }
    }
    &__form {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    &__buttons {
        width: 80%;
    }
    &__link {
        position: absolute;
        left: 10%;
        bottom: 10%;
        color: $w;
        font-family: "Montserrat", sans-serif;
        font-size: 0.5em;
        font-weight: 400;
        cursor: pointer;
        @media (min-width: $md) {
            font-size: 0.7em;
        }
        &--accent {
            color: $rd;
        }
    }
    &__input-container {
        width: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.5em;
        input {
            width: 100%;
        }
        @media (min-width: $md) {
            column-gap: 2em;
        }
    }
}
</style>
