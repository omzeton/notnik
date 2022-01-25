<template>
    <input :class="`form__input form__input--${type}`" :placeholder="placeholder" ref="input" :value="value" :type="type" @input="updateValue" @focus="emitFocus" />
</template>

<script>
export default {
    props: {
        placeholder: String,
        value: String,
        type: String,
    },
    methods: {
        updateValue() {
            this.$emit("input", this.$refs.input.value);
        },
        emitFocus() {
            this.$emit("focus", true);
        },
    },
};
</script>
