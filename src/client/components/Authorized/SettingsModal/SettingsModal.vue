<template>
    <div class="settings-modal">
        <div class="settings-modal__wrapper">
            <h2>🕳 This will be the place for setting the settings 🕳</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings-modal {
    position: fixed;
    width: calc(100vw - 3em);
    height: calc(100vh - 1.5em);
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    &__wrapper {
        background-color: $bla1;
        border-radius: 0.5em;
        box-sizing: border-box;
        padding: 2em;
        color: $w;
        font-family: "Baloo", cursive;
        box-shadow: 0 0 50px 0 $bla1;
    }
}
</style>
