<template>
    <input class="form-input" :placeholder="placeholder" ref="input" :value="value" :type="type" @input="updateValue()" @focus="emitFocus" />
</template>

<script>
export default {
    props: ["placeholder", "value", "type", "rules"],
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

<style lang="scss">
.form-input {
    width: 80%;
    height: 2em;
    margin-top: 1.5em;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $w;
    color: $w2;
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
    font-size: 0.6rem;
    &:focus {
        outline: none;
        border-bottom: 1px solid $rd;
    }
    @media (min-width: $md) {
        margin-top: 2em;
        height: 3em;
        font-size: 0.8rem;
    }
}
</style>
