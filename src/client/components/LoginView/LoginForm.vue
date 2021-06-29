<template>
    <div>
        <h2 class="panel-heading">Sign in</h2>
        <form class="panel-form" @submit="submitHandler">
            <Input placeholder="Email" type="email" v-model="form.email" />
            <Input placeholder="Password" type="password" v-model="form.password" />
            <div class="buttons-wrapper">
                <Submit value="Log in" />
            </div>
        </form>
        <p @click="toggleFormType()" class="toggle-link">Don't have an account? <span>Register</span> a new one.</p>
    </div>
</template>

<script>
import Input from "./Input";
import Submit from "./SubmitButton";

export default {
    props: ["toggleFormType"],
    data() {
        return {
            form: {
                email: "test@test.com",
                password: "testtest",
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
            // TODO: Validation with vee-validate
            this.$store.dispatch("auth/LOGIN", { email: this.form.email, password: this.form.password });
        },
    },
};
</script>

<style lang="scss" scoped>
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
</style>
