<template>
    <router-link :to="`notnik/note/${id}`" class="grid-cell" @click="makeSelection">
        <div class="entry">
            <FileIcon />
            <p class="entry__title">{{ title }}</p>
        </div>
    </router-link>
</template>

<script>
import FileIcon from "@/components/Icons/FileIcon.vue";

export default {
    props: ["body", "date", "imgUrl", "title", "uId", "id"],
    components: {
        FileIcon,
    },
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
    methods: {
        makeSelection() {
            console.log("test");
        },
    },
};
</script>

<style lang="scss" scoped>
.grid-cell {
    display: flex;
    align-items: center;
    justify-content: center;
}
.entry {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $bla4;
    &:hover {
        color: $bla2;
    }
    &:active {
        color: $bla3;
    }
    svg {
        width: 60%;
    }
    &__title {
        position: absolute;
        color: $w;
        font-size: 0.8rem;
        font-family: "Montserrat", sans-serif;
        width: 80%;
        top: 80%;
        text-align: center;
    }
}
</style>
