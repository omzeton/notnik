const MIN_LENGTH = 5;

export default {
    data() {
        return {
            errors: [],
            errorTimeout: null,
        };
    },
    methods: {
        validate(obj) {
            Object.entries(obj).forEach(([key, value]) => {
                if (typeof value === "object") {
                    this.validateTwoPasswords(...value);
                    return;
                }
                const method = this.capitalize(key);
                this[`validate${method}`](value);
            });
        },
        validateEmail(input) {
            if (!input.length || !input.split("").includes("@") || input.length <= MIN_LENGTH) this.errors.push("Invalid email");
        },
        validatePassword(input) {
            if (!input.length || input.length <= MIN_LENGTH) this.errors.push("Invalid password");
        },
        validateTwoPasswords(inputA, inputB) {
            if (!inputA.length || inputA.length <= MIN_LENGTH) this.errors.push("Invalid first password");
            if (!inputB.length || inputB.length <= MIN_LENGTH) this.errors.push("Invalid second password");
            if (inputA !== inputB) this.errors.push("Passwords don't match eachother");
        },
        resetErrors() {
            this.errors = [];
        },
        capitalize(string) {
            return string[0].toUpperCase() + string.slice(1, string.length);
        },
    },
    watch: {
        "$store.state.auth.serverError"() {
            this.errors.push(this.$store.state.auth.serverError);
        },
        errors() {
            clearTimeout(this.errorTimeout);
            if (this.errors.length) {
                this.errorTimeout = setTimeout(() => {
                    this.resetErrors();
                }, 5000);
            }
        },
    },
};
