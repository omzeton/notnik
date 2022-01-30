<template>
    <div class="list">
        <SubMenu />
        <Editor />
    </div>
</template>

<script>
import SubMenu from "@components/Submenu";
import Editor from "@components/Editor";

export default {
    components: {
        SubMenu,
        Editor,
    },
};
</script>
