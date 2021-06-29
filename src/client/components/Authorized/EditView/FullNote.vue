<template>
    <div class="full-entry">
        <Body />
        <Header />
    </div>
</template>

<script>
import Body from "./Body";
import Header from "./Header";

export default {
    components: {
        Body,
        Header,
    },
};
</script>

<style lang="scss" scoped>
.full-entry {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 11em 1fr;
}
</style>
