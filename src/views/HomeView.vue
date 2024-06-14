<script setup>
</script>

<template>
    <div class="home-wrapper">
        <!-- <div class="contact-view">
            <div class="follow-us">
                <p>Síguenos</p>
                <span />
            </div>
        </div> -->
        <div class="home-view">
            <div class="logo-wrap">
                <div class="logo">
                    <p>AGILE ASPHALT</p>
                </div>
            </div>
            <div class="downloadWrapper">
                <div class="done">
                    <div class="desktop" @click="$emit('download')">
                        <img src="/src/assets/desktopIcon.png" alt="">
                        <p>DESKTOP</p>
                    </div>
                </div>
                <div class="toDo">
                    <p>Coming soon...</p>
                    <div class="ps5">
                        <img src="/src/assets/ps5.png" alt="">
                    </div>
                    <div class="googlePlay">
                        <img src="/src/assets/googlePlay.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="bottom-view"></div> -->
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
        background-image: url('/src/assets/background-home.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        .logo-wrap {
            width: fit-content;
            height: fit-content;
            margin-top: 80px;
            -webkit-box-shadow: 0px 0px 41px 31px rgba(0, 0, 0, 0.67);
            -moz-box-shadow: 0px 0px 41px 31px rgba(0, 0, 0, 0.67);
            box-shadow: 0px 0px 41px 31px rgba(0, 0, 0, 0.67);

            .logo {
                min-width: 800px;
                padding: 40px;
                display: flex;
                align-items: center;
                border: #725310 1px solid;
                background-color: #252525;
                -webkit-box-shadow: inset 0px 0px 12px 8px rgba(0, 0, 0, 0.68);
                -moz-box-shadow: inset 0px 0px 12px 8px rgba(0, 0, 0, 0.68);
                box-shadow: inset 0px 0px 12px 8px rgba(0, 0, 0, 0.68);

                p {
                    width: 100%;
                    font-family: 'dumb', serif;
                    font-weight: 900;
                    color: #725310;
                    font-size: 98px;
                    text-shadow:
                        0 1px 0 rgb(255, 215, 0),
                        1px 1px 0 #58530c,
                        2px 2px 0 #000,
                        3px 3px 0 #58530c,
                        4px 4px 0 #000;
                    position: relative;
                    display: inline-block;
                    text-align: center;
                }
            }
        }



        .downloadWrapper {
            width: 700px;
            height: 200px;
            position: absolute;
            bottom: 50px;
            left: 150px;
            display: flex;
            align-items: center;
            gap: 20px;

            .done {
                .desktop {
                    width: 200px;
                    height: 60px;
                    border: solid white 1px;
                    border-radius: 10px;
                    background-color: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    cursor: pointer;

                    img {
                        width: 50px;
                    }

                    p {
                        color: white;
                        font-weight: 900;
                    }
                }
            }

            .toDo {
                margin-top: -40px;
                display: inline-flex;
                flex-direction: column;
                gap: 10px;

                p {
                    height: 20px;
                    color: white;
                    font-weight: 900;
                    background-color: #000;
                    border-radius: 8px;
                    padding-left: 4px;
                }

                .ps5 {
                    width: 200px;
                    height: 60px;
                    border: solid white 1px;
                    border-radius: 10px;
                    background-color: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;

                    img {
                        width: 200px;
                    }
                }

                .googlePlay {
                    width: 200px;
                    height: 60px;
                    border: solid white 1px;
                    border-radius: 10px;
                    background-color: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;

                    img {
                        width: 200px;
                    }
                }
            }
        }

    }

    .bottom-view {
        width: 100vw;
        height: 100vh;
        background-color: #252525;
        scroll-snap-align: center;
        background-image: url('/src/assets/background-home-2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
    }
}
</style>