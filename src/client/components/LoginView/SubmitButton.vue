<template>
    <input class="submit-button" type="submit" :value="value" />
</template>

<script>
export default {
    props: ["value"],
};
</script>

<style lang="scss" scoped>
.submit-button {
    margin-top: 2em;
    background-color: transparent;
    border-radius: 0.5em;
    border: 1px solid $w;
    box-sizing: border-box;
    padding: 1em;
    color: $w;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    &:hover {
        background-color: $w;
        color: $bla3;
    }
}
</style>
