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
    background-color: $bla3;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("@assets/notnik_splash.jpg");
}
</style>
