<template>
    <div class="list">
        <SubMenu />
        <Editor />
    </div>
</template>

<script>
import SubMenu from "./SubMenu";
import Editor from "../Editor";

export default {
    components: {
        SubMenu,
        Editor,
    },
};
</script>
