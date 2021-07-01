<template>
    <div class="status-bar">
        <div class="status-bar__counts">
            <p>Entries: {{ amountOfEntries }}</p>
        </div>
        <div>&nbsp;</div>
        <div class="status-bar__timer">
            <p class="status-bar__date">{{ date[0] }}</p>
            <p class="status-bar__hour">{{ date[1] }}</p>
        </div>
    </div>
</template>

<script>
import { getCurrentDate } from "@/utils";

export default {
    data() {
        return {
            date: ["", ""],
        };
    },
    computed: {
        amountOfEntries() {
            return this.$store.getters["notes/GET_NOTES_LENGTH"];
        },
    },
    mounted() {
        this.date = getCurrentDate();
        setInterval(() => {
            this.date = getCurrentDate();
        }, 1000);
    },
};
</script>

<style lang="scss" scoped>
.status-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: $bla3;
    width: calc(100% - 3em);
    height: 1.5em;
    display: grid;
    grid-template-columns: 4em 1fr 9em;
    box-sizing: border-box;
    &__counts,
    &__timer {
        font-family: "Montserrat", sans-serif;
        font-size: 0.7rem;
        color: $w2;
        white-space: nowrap;
    }
    &__counts {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__timer {
        position: relative;
    }
    &__date {
        position: absolute;
        top: 50%;
        left: 1em;
        font-size: 0.67rem;
        transform: translateY(-50%);
    }
    &__hour {
        position: absolute;
        top: 50%;
        right: 1em;
        transform: translateY(-50%);
    }
}
</style>
