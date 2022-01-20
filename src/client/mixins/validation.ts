import mixins from "vue-typed-mixins";
import Vue from "vue";

import { Validation } from "@/types/store";

const MIN_LENGTH = 5;

const Base = Vue.extend({
    data(): { errors: Array<string>, errorTimeout: NodeJS.Timeout | null } {
        return {
            errors: [],
            errorTimeout: null,
        };
    },
});

export default mixins(Base).extend({
    methods: {
        validate(obj: Validation) {
            Object.entries(obj).forEach(([key, value]: [key: string, value: [password: Validation["password"], repeatPassword: Validation["repeatPassword"]] ]) => {
                if (typeof value === "object") {
                    this.validateTwoPasswords(...value);
                    return;
                }
                const method = this.capitalize(key);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this[`validate${method}`](value);
            });
        },
        validateEmail(input: string) {
            if (!input.length || !input.split("").includes("@") || input.length <= MIN_LENGTH) this.errors.push("Invalid email");
        },
        validatePassword(input: string) {
            if (!input.length || input.length <= MIN_LENGTH) this.errors.push("Invalid password");
        },
        validateTwoPasswords(inputA: string, inputB: string) {
            if (!inputA.length || inputA.length <= MIN_LENGTH) this.errors.push("Invalid first password");
            if (!inputB.length || inputB.length <= MIN_LENGTH) this.errors.push("Invalid second password");
            if (inputA !== inputB) this.errors.push("Passwords don't match eachother");
        },
        resetErrors() {
            this.errors = [];
        },
        capitalize(string: string) {
            return string[0].toUpperCase() + string.slice(1, string.length);
        },
    },
    watch: {
        "$store.state.auth.serverError"() {
            this.errors.push(this.$store.state.auth.serverError);
        },
        errors() {
            if (this.errorTimeout) clearTimeout(this.errorTimeout);
            if (this.errors.length) {
                this.errorTimeout = setTimeout(() => {
                    this.resetErrors();
                }, 5000);
            }
        },
    },
});
