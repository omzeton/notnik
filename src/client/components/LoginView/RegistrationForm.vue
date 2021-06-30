<template>
    <div class="registration-form">
        <h2 class="panel-heading">Register</h2>
        <form class="panel-form" @submit="submitHandler" novalidate>
            <Input placeholder="Email" type="email" v-model="form.email" @focus="resetErrors" />
            <div class="password-container">
                <Input placeholder="Password" type="password" v-model="form.password" @focus="resetErrors" />
                <Input placeholder="Repeat password" type="password" v-model="form.repeatPassword" @focus="resetErrors" />
            </div>
            <div class="buttons-wrapper">
                <Submit value="Submit" />
            </div>
        </form>
        <p @click="toggleFormType()" class="toggle-link">Already have an account? <span>Log in</span>.</p>
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
    props: ["toggleFormType"],
    mixins: [validation],
    data() {
        return {
            form: {
                email: "",
                password: "",
                repeatPassword: "",
            },
        };
    },
    components: {
        Input,
        Submit,
    },
    methods: {
        submitHandler(event) {
            event.preventDefault();
            this.$store.dispatch("auth/SET_LOADING_STATE", true);
            const { email, password, repeatPassword } = this.form;
            this.errors.push(this.validateEmail(email)[0]);
            this.errors.push(this.validateTwoPasswords(password, repeatPassword)[0]);
            if (!this.errors.length) {
                // this.$store.dispatch("auth/LOGIN", { email, password });
                // REGISTER NEW USER
                return;
            }
            this.$store.dispatch("auth/SET_LOADING_STATE", false);
        },
    },
};
</script>

<style lang="scss" scoped>
.registration-form {
    position: absolute;
    width: 100%;
    height: 100%;
}
.panel-heading {
    margin-left: 10%;
    margin-top: 2em;
    font-family: "Baloo", cursive;
    font-size: 2em;
    color: $w;
}
.panel-form {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.buttons-wrapper {
    width: 80%;
}
.toggle-link {
    position: absolute;
    left: 10%;
    bottom: 10%;
    color: $w;
    font-family: "Montserrat", sans-serif;
    font-size: 0.7em;
    font-weight: 400;
    cursor: pointer;
    span {
        color: $rd;
    }
}
.password-container {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2em;
    input {
        width: 100%;
    }
}
</style>
