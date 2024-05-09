<script setup>
</script>

<template>
    <div class="home-wrapper">
        <div class="contact-view">
            <div class="follow-us">
                <p>Síguenos</p>
                <span />
            </div>
        </div>
        <div class="home-view"></div>
        <div class="bottom-view"></div>
    </div>
</template>

<style scoped lang="scss">
.home-wrapper {
    height: 100vh;
    width: 100vw;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    .contact-view {
        height: 100vh;
        width: 75px;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 996;
        border-left: 1px solid white;
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        .follow-us {
            width: 200px;
            transform: rotate(90deg);
            display: inline-flex;
            align-items: center;

            p {
                font-size: 24px;
                font-weight: 500;
            }

            span {
                height: 50px;
                width: 0px;
                border-right: 1px solid white;
                margin-top: 6px;
                margin-left: 25px;
                transform: rotateZ(90deg);
            }
        }
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