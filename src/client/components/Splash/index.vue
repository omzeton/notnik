<template>
    <div class="homescreen">
        <Sign />
        <FormModal />
    </div>
</template>

<script>
import FormModal from "./FormModal";
import Sign from "../Icons/Sign";

export default {
    components: {
        FormModal,
        Sign,
    },
};
</script>

<style lang="scss">
.homescreen {
    position: absolute;
    width: calc(100% - 2em);
    height: 100%;
    right: 0;
    top: 0;
    background-color: $bla3;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("@assets/notnik_splash.jpg");
    @media (min-width: $md) {
        width: calc(100% - 3em);
    }
}
</style>
