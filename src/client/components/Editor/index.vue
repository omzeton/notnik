<template>
    <div class="editor">
        <EditorTopNavbar />
        <EditorMain />
        <EditorBottomNavbar />
        <DeletionBox />
    </div>
</template>

<script>
import EditorBottomNavbar from "@components/Editor/EditorBottomNavbar";
import EditorMain from "@components/Editor/EditorMain";
import EditorTopNavbar from "@components/Editor/EditorTopNavbar";
import DeletionBox from "@components/DeletionBox";

export default {
    components: {
        EditorBottomNavbar,
        EditorMain,
        EditorTopNavbar,
        DeletionBox,
    },
    mounted() {
        this.$store.dispatch("notes/FETCH_ALL_NOTES_FROM_DB");
    },
};
</script>
