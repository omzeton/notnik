<template>
    <div class="layout-wrapper">
        <div class="layout-wrapper__toolbar">
            <Toolbar />
        </div>
        <div class="layout-wrapper__view">
            <router-view />
        </div>
    </div>
</template>

<script>
    import Toolbar from './Toolbar';

    export default {
        components: {
            Toolbar,
        },
    };
</script>

<style lang="scss">
.layout-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    &__toolbar {
        width: 48px;
    }
    &__view {
        width: calc(100% - 48px);
    }
}
</style>
