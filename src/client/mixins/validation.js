export default {
    data() {
        return {
            errors: [],
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
            if (!input.length || !input.split("").includes("@") || input.length <= 3) this.errors.push("Invalid email.");
        },
        validatePassword(input) {
            if (!input.length || input.length <= 3) this.errors.push("Invalid password.");
        },
        validateTwoPasswords(inputA, inputB) {
            if (!inputA.length || inputA.length <= 3) this.errors.push("Invalid first password.");
            if (!inputB.length || inputB.length <= 3) this.errors.push("Invalid second password.");
            if (inputA !== inputB) this.errors.push("Passwords don't match eachother.");
        },
        resetErrors() {
            this.errors = [];
        },
        capitalize(string) {
            return string[0].toUpperCase() + string.slice(1, string.length);
        },
    },
};
