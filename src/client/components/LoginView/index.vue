<template>
    <div class="homescreen">
        <FormPanel />
    </div>
</template>

<script>
import FormPanel from "./FormPanel";

export default {
    components: {
        FormPanel,
    },
};
</script>

<style lang="scss">
.homescreen {
    position: absolute;
    width: calc(100% - 3em);
    height: 100%;
    right: 0;
    top: 0;
    background-color: $bla3;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("@assets/notnik_splash.jpg");
}
</style>
