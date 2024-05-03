<script setup>
</script>

<template>
    <div class="home-wrapper">
        <div class="contact-view"></div>
        <div class="home-view"></div>
        <div class="bottom-view">

        </div>
    </div>
</template>

<style scoped lang="scss">
.home-wrapper {
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    .contact-view {
        
    }

    .home-view {
        width: 100%;
        height: 100vh;
        background-color: #252525;
        scroll-snap-align: center;
        background-image: url('/src/assets/background.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }

    .bottom-view {
        width: 100%;
        height: 1400px;
        background-color: #6d5a5a;
        scroll-snap-align: center;
    }
}
</style>