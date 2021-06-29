<template>
    <div class="navbar">
        <button class="navbar__button navbar__new" />
        <button class="navbar__button navbar__list" />
        <button class="navbar__button navbar__settings" />
    </div>
</template>

<style lang="scss">
.navbar {
    height: 100%;
    background-color: $bla1;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 2em;
    &__button {
        height: 3.5em;
        width: 100%;
        background-color: $bla2;
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: 40% 50%;
        cursor: pointer;
        transition: 0.4s opacity;
        border: none;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            width: 0.2em;
            top: 0;
            height: 100%;
            left: calc(100% - 0.2em);
        }
    }
    &__new {
        background-image: url("@assets/new.svg");
        &:after {
            background-color: $g;
        }
    }
    &__list {
        background-image: url("@assets/list.svg");
        &:after {
            background-color: $rd;
        }
    }
    &__settings {
        background-image: url("@assets/settings.svg");
        &:after {
            background-color: $blu;
        }
    }
}
</style>
