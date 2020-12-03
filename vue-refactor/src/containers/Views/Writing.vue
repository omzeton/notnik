<template>
    <div class="writing-wrapper">
        <ImageSection />
        <TextSection />
    </div>
</template>

<script>
import ImageSection from '../../components/Writing/ImageSection';
import TextSection from '../../components/Writing/TextSection';

export default {
    components: {
        ImageSection,
        TextSection,
    },
};
</script>

<style lang="scss">
.writing-wrapper {
    position: relative;
    margin-left: 48px;
    height: 100%;
}
</style>
