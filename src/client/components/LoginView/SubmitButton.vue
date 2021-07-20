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
    color: $w;
    font-family: "Montserrat", sans-serif;
    padding: 0.8em;
    font-size: 0.6rem;
    cursor: pointer;
    &:hover {
        background-color: $w;
        color: $bla3;
    }
    @media (min-width: $md) {
        padding: 1em;
        font-size: 0.8rem;
    }
}
</style>
