<template>
    <div class="list" :class="{ 'is-active': isSubMenuActive }">
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
    computed: {
        isSubMenuActive() {
            return this.$store.getters["ui/GET_IS_SUBMENU_ACTIVE"];
        },
    },
};
</script>
