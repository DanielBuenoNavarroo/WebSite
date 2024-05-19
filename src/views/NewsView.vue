<script setup>
import NewsComp from '@/components/NewsComp.vue';
import { getNewsRequest } from '@/api/news';
import { onMounted, ref } from 'vue';

const news = ref([]);

const currentPage = ref(1)
const getNews = async () => {
    const res = await getNewsRequest('es', currentPage.value);
    news.value = res.data
    console.log(news.value)
}

onMounted(() => {
    getNews();
});

function isNotEmpty() {
    return news.value.length > 0;
}

</script>

<template>
    <div class="newsWrapper">
        <div class="news-list">
            <div v-if="!isNotEmpty()">
                <h1>No hay noticias para mostrar</h1>
            </div>
            <div v-else class="news" v-for="newsItem in news" :key="newsItem.id">
                <NewsComp :news="newsItem" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.newsWrapper {
    height: 100vh;
    width: 100vw;
    background: #0f2480;

    .news-list {
        width: 100%;
        height: 100%;
        padding-top: 100px;
        overflow-y: scroll;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        scrollbar-width: none;
    }
}
</style>