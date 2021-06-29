<template>
    <input class="form-input" :placeholder="placeholder" ref="input" :value="value" :type="type" @input="updateValue()" />
</template>

<script>
export default {
    props: ["placeholder", "value", "type"],
    methods: {
        updateValue() {
            this.$emit("input", this.$refs.input.value);
        },
    },
};
</script>

<style lang="scss">
.form-input {
    width: 80%;
    height: 3em;
    margin-top: 2em;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $w;
    color: $w2;
    font-family: "Montserrat", sans-serif;
    &:focus {
        outline: none;
        border-bottom: 1px solid $rd;
    }
}
</style>
