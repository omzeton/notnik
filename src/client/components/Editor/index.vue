<template>
    <div class="editor">
        <EditorBottomNavbar />
        <EditorMain />
        <EditorTopNavbar />
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
};
</script>
