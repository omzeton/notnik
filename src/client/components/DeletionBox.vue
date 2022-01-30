<template>
    <transition name="fade">
        <div class="deletion-box" v-if="isActive">
            <div class="deletion-box__backdrop"></div>
            <div class="deletion-box__modal">
                <div class="deletion-box__text">
                    <p>Are you sure you want to delete this note?</p>
                </div>
                <div class="deletion-box__buttons">
                    <button @click="confirmDeletion" class="deletion-box__button deletion-box__button--accept">
                        Yes
                    </button>
                    <button @click="hideModal" class="deletion-box__button deletion-box__button--cancel">No</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    computed: {
        isActive() {
            return this.$store.getters["ui/GET_DELETION_MODAL_IS_ACTIVE"];
        },
    },
    methods: {
        hideModal() {
            this.$store.dispatch("ui/TOGGLE_DELETION_MODAL");
        },
        confirmDeletion() {
            this.$store.dispatch("notes/CONFIRM_NOTE_DELETION");
        },
    },
};
</script>
