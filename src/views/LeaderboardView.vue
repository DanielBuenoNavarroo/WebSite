<script setup>
import { getTracks } from '@/api/leaderboard';
import { onBeforeMount, ref } from 'vue';
import TracksComp from '@/components/TracksComp.vue';

const currentPage = ref(1);
const tracks = ref([]);
const areMorePages = ref(true);

const getTracksMethod = async () => {
    try {
        const res = await getTracks(currentPage.value);
        if (currentPage.value === 1) {
            tracks.value = res.data.tracks;
        } else {
            tracks.value.push(...res.data.tracks);
        }
        if (res.data.tracks.length < 5) {
            areMorePages.value = false;
            console.log(areMorePages.value)
        }
        console.log(tracks.value)
    } catch (error) {
        areMorePages.value = false
        console.error('Error fetching tracks:', error);
    }
};

const changePage = () => {
    currentPage.value++;
    getTracksMethod();
};

const isNotEmpty = () => {return tracks.value.length > 0};

onBeforeMount(() => {
    getTracksMethod();
});
</script>

<template>
    <div class="leaderBoardWrapper">
        <div class="tracks-list">
            <div class="welcome-leaderboard">
                <div class="welcome-leaderboard-wrapper">
                    <div>Leaderboard</div>
                </div>
            </div>
            <div v-if="!isNotEmpty">
                <h1 style="color: white; margin-top: 50px;">No hay pistas para mostrar</h1>
            </div>
            <div v-else>
                <div class="tracks" v-for="(tracksItem, index) in tracks" :key="index">
                    <TracksComp :track="tracksItem" />
                </div>
            </div>
            <div v-if="areMorePages">
                <button @click="changePage">Mostrar más</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.leaderBoardWrapper {
    height: 100%;
    width: 100vw;
    background: url('/src/assets/background-home-2.jpg');
    background-size: cover;
    overflow: hidden;

    .tracks-list {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        scrollbar-width: none;

        .welcome-leaderboard {
            width: 100vw;
            padding-top: 100px;
            display: flex;
            justify-content: center;

            .welcome-leaderboard-wrapper {
                width: 1250px;

                div {
                    width: 400px;
                    height: 50px;
                    background: rgb(26, 27, 27);
                    background: linear-gradient(90deg,
                            rgba(26, 27, 27, .8) 0%,
                            rgba(26, 27, 27, .8) 80%,
                            rgba(26, 27, 27, .4) 100%);
                    color: white;
                    font-size: 30px;
                    font-weight: bold;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-left: solid 1.5px rgb(145, 135, 2);
                    padding-left: 10px;
                }
            }
        }

        button {
            width: 60vw;
            height: 30px;
            margin: 20px 0 50px 0;
            color: white;
            border: solid 1px white;
            border-radius: 3px;
            background-color: rgba(108, 110, 110, 0.4);

            &:hover {
                background-color: rgba(108, 110, 110, 0.8);
            }
        }
    }

}
</style>