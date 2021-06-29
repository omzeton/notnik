<template>
    <div class="entry">
        <div class="entry__img" />
        <div class="entry__info">
            <div class="entry__delete"></div>
            <h2>{{ title }}</h2>
            <h3>{{ year }} <span>-</span> {{ month }} <span>-</span> {{ day }}</h3>
            <div class="entry__body">{{ shortBody }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["body", "date", "imgUrl", "title", "uId", "id"],
    computed: {
        year() {
            return this.date.split("-")[0];
        },
        month() {
            return this.date.split("-")[1];
        },
        day() {
            return this.date.split("-")[2];
        },
        shortBody() {
            if (this.body.length > 100) {
                return this.body.slice(0, 125) + "...";
            } else {
                return this.body;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.entry {
    position: relative;
    background-color: $bla1;
    width: 30em;
    height: 9em;
    border-radius: 0.5em;
    overflow: hidden;
    display: grid;
    grid-template-columns: 10em 1fr;
    box-shadow: 0 0 40px -20px rgba(255, 255, 255, 0);
    transition: all 0.2s linear, opacity 0.5s linear;
    cursor: pointer;
    &:hover {
        transform: translateX(0.2em);
        background-color: $bla2;
        box-shadow: 0 0 40px -20px rgba(255, 255, 255, 0.3);
    }
    &__img {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: $bla1;
            opacity: 0.5;
            mix-blend-mode: overlay;
            transition: opacity 0.2s linear;
        }
    }
    &__info {
        padding: 0.5em 1em;
        color: $w;
        display: grid;
        grid-template-rows: 50px 20px 1fr;
        place-items: center stretch;
        box-sizing: border-box;
        h2 {
            font-family: "Baloo", cursive;
            font-size: 1.2em;
            line-height: 0em;
            outline: none;
            white-space: nowrap;
        }
        h3 {
            font-family: "Montserrat", sans-serif;
            line-height: 1em;
            font-size: 0.7em;
            margin-top: 0em;
            color: $bla4;
            outline: none;
            span {
                color: $bla4;
            }
        }
    }
    &__body {
        font-family: "Montserrat", sans-serif;
        line-height: 1em;
        font-size: 0.7em;
        color: $w;
        width: 23em;
        outline: none;
        text-align: justify;
    }
    &__delete {
        position: absolute;
        top: 0.6em;
        right: 0.6em;
        width: 0.9em;
        height: 0.9em;
        opacity: 0.1;
        background-image: url("@assets/delete.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
