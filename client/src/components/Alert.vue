<!-- Notice.vue -->
<template>
    <transition name="fade" mode="out-in">
        <div v-if="showNotice" key="notice" class="fixed bottom-4 right-4 p-6 pr-8 pb-6 bg-green-500 text-white rounded-lg">
           <strong>{{ message }}</strong>
        </div>
    </transition>
</template>
  
<script>
export default {
    name: 'Alert',
    props: {
        message: String,
    },
    data() {
        return {
            showNotice: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.showNotice = false;
        }, 5000); // 5000 milliseconds (5 seconds)
    },
};
</script>
  
<style scoped="lang">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>