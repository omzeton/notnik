export default {
    data() {
        return {
            errors: [],
        };
    },
    methods: {
        validateEmail(input) {
            const errors = [];
            if (!input.length || !input.split("").includes("@") || input.length <= 3) errors.push("Invalid email.");
            return errors;
        },
        validatePassword(input) {
            const errors = [];
            if (!input.length || input.length <= 3) errors.push("Invalid password.");
            return errors;
        },
        validateTwoPasswords(inputA, inputB) {
            const errors = [];
            if (!inputA.length || inputA.length <= 3) errors.push("First password invalid.");
            if (!inputB.length || inputB.length <= 3) errors.push("Second password invalid.");
            if (inputA !== inputB) errors.push("Passwords don't match eachother.");
            return errors;
        },
        resetErrors() {
            this.errors = [];
        },
    },
};
