<script setup>
import { getScores } from '@/api/leaderboard';
import { onMounted, ref } from 'vue';
const props = defineProps({
    track: {
        type: Object,
        required: true
    }
})
const scores = ref([]);
const thereIsRecords = () => {
    return scores.value.length > 0;
}

const getTopScores = async () => {
    try {
        const res = await getScores(props.track._id);
        scores.value = res.data;
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

const handleTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    let millis = Math.floor((time - seconds) * 1000);
    return `${minutes}:${seconds}:${millis.toString().substring(0, 5)}`
}

onMounted(() => {
    getTopScores();
})
</script>

<template>
    <div class="tracks">
        <div class="title">{{ props.track.name }}</div>
        <div class="author">{{ props.track.author.username }}</div>
        <div class="tracks--leaderboard">
            Top 5 scores:
            <div class="displayScores" v-if="!thereIsRecords()">No hay records existentes</div>
            <div v-else class="displayScores" v-for="(score, index) in scores" :key="index">
                {{ index + 1 }} - {{ score.user.username }} - {{ handleTime(score.score) }}
                <hr style="margin: 10px 0 10px 0;">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tracks {
    width: 1250px;
    background: rgb(26, 27, 27);
    background: linear-gradient(90deg,
            rgba(26, 27, 27, 1) 0%,
            rgba(26, 27, 27, 1) 80%,
            rgba(26, 27, 27, .4) 100%);
    border-radius: 0 35px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin: 20px 0;

    .title {
        font-size: 30px;
        color: white;
        margin-top: 10px;
    }

    .author {
        font-size: 20px;
        color: white;
        margin-top: 3px;
    }

    .tracks--leaderboard {
        width: 90%;
        height: auto;
        border: solid 1px rgb(145, 135, 2);
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 20px 50px 20px 50px;
        font-size: 20px;
        color: white;
    }

    .displayScores{
        margin-top: 10px;
    }

}
</style>