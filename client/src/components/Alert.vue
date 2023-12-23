<template>
    <div v-if="showNotice" class="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-md shadow-md">
        <strong>{{ message }}</strong>
        <button @click="closeAlert" class="absolute top-1 right-2 text-sm font-semibold text-white focus:outline-none">
            X
        </button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showNotice: true,
        }
    },
    props: {
        message: String,
    },
    methods: {
        closeAlert() {
            this.showNotice = false;
            this.$emit('close');
        },
    },
    mounted() {
        setTimeout(() => {
            this.closeAlert();
        }, 3000); 
    }
};
</script>
  
<style scoped>
/* Add any custom styles here */
</style>
  