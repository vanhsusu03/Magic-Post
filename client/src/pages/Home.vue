<template>
    <div class="img-animated items-center">
        <img src="../assets/img/poster1.png" alt="" class="poster1">
        <img src="../assets/img/poster2.png" alt="" class="poster2">
    </div>
</template>
<script>
// import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import "../assets/general_css/style.css";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    data() {
        return {

        }
    },
    components: {
    },
    methods: {
        // ...mapMutations(['setStudent', 'setLogged', 'setAdmin']),

        scrollToTop() {
            window.scrollTo(0, 0);
        },
        // async handleSearch() {
        //     // this.$refs.anyName.reset();
        //     this.$router.push(`/searching/${this.form.keyw}`);
        // },
    },
    computed: {
        ...mapState(['isLogin'])
    },
}
</script>
<style lang = "scss" scoped>
* {
    position: relative;
    padding: 0;
    margin: 0;
}

.img-animated {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 500px;

    img {
        width: 90%;
    }

    @keyframes FadeOut {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 1;
        }

        75% {
            opacity: 0;
        }

        100% {
            opacity: 0;
        }
    }

    .poster1 {
        position: relative;
        animation-name: FadeOut;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: 3.5s;
        animation-direction: alternate;
    }

    @keyframes FadeIn {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 0;
        }

        75% {
            opacity: 1;
        }

        100% {
            opacity: 1;
        }
    }

    .poster2 {
        position: absolute;
        top: 0;
        animation-name: FadeIn;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: 3.5s;
        animation-direction: alternate;
    }


}
</style>