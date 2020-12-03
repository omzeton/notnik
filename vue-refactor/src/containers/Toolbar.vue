<template>
    <div class="toolbar">
        <div
            v-if="buttons"
            class="buttons-wrapper"
        >
            <ToolbarButton
                v-for="(button, index) in buttons"
                :key="index"
                :name="button.name"
                :route="button.route"
                :img="button.img"
            />
        </div>
    </div>
</template>

<script>
    import ToolbarButton from '../components/ToolbarButton';

    export default {
        components: {
            ToolbarButton,
        },
        computed: {
            buttons() {
                return this.$store.getters['ui/GET_BUTTONS'];
            },
        },
    };
</script>

<style lang="scss">
.toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 48px;
    height: 100vh;
    background-color: $bla1;
    .buttons-wrapper {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
