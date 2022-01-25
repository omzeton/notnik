<template>
    <div class="editor">
        <EditorTopNavbar />
        <EditorMain />
        <EditorBottomNavbar />
    </div>
</template>

<script>
import EditorBottomNavbar from "./EditorBottomNavbar.vue";
import EditorMain from "./EditorMain.vue";
import EditorTopNavbar from "./EditorTopNavbar.vue";

export default {
    components: {
        EditorBottomNavbar,
        EditorMain,
        EditorTopNavbar,
    },
    mounted() {
        this.$store.dispatch("notes/FETCH_ALL_NOTES_FROM_DB");
    },
};
</script>
