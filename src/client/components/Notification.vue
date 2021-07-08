<template>
    <div class="notification">
        <p class="notification__content">Notes synced</p>
    </div>
</template>

<style lang="scss" scoped>
.notification {
    position: fixed;
    top: 2em;
    right: 2em;
    box-sizing: border-box;
    padding: 0.6em;
    z-index: 10;
    background-color: $g;
    border-radius: 1em;
    box-shadow: $g 0px 0px 12px;
    &__content {
        font-family: $primary;
        color: $w;
        font-weight: 600;
    }
}
</style>
