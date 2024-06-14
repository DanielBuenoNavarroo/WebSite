<script setup>
import NewsComp from '@/components/NewsComp.vue';
import NewsCompShort from '@/components/NewsCompShort.vue';
import { getNewsRequest } from '@/api/news';
import { ref, nextTick, onBeforeMount } from 'vue';
import { marked } from 'marked';

const currentPage = ref(1);
const news = ref([]);
const areMorePages = ref(true);
const showNews = ref(true);
const selectedNew = ref(null);
const renderedContent = ref('');

const getNews = async () => {
    const res = await getNewsRequest('es', currentPage.value);
    if (currentPage.value === 1) {
        news.value = res.data;
    } else {
        news.value.push(...res.data);
    }
    if (res.data.length < 5) {
        areMorePages.value = false;
    }
};

const changePage = () => {
    currentPage.value++;
    getNews();
};

const changeShowNews = (id, enable) => {
    showNews.value = enable;
    if (!enable) {
        changeSelectedNew(id);
    }
};

const changeSelectedNew = (id) => {
    selectedNew.value = news.value[id];
    changeContent();
};

const changeContent = async () => {
    await nextTick();
    if (selectedNew.value) {
        renderedContent.value = marked(selectedNew.value.content);
    }
};

function isNotEmpty() {
    return news.value.length > 0;
}

function latestNews() {
    return news.value.slice(0, 4);
}

onBeforeMount(() => {
    getNews();
});
</script>

<template>
    <div class="newsWrapper">
        <div v-if="showNews" class="news-list">
            <div class="welcome-news">
                <div class="welcome-news-wrapper">
                    <div>Noticias</div>
                </div>
            </div>
            <div v-if="!isNotEmpty()">
                <h1 style="color: white; margin-top: 50px;">No hay noticias para mostrar</h1>
            </div>
            <div v-else class="news" v-for="(newsItem, index) in news" :key="index">
                <NewsComp :news="newsItem" @click="changeShowNews(index, false)" />
            </div>
            <div v-if="isNotEmpty() && areMorePages">
                <button @click="changePage">Mostrar más</button>
            </div>
        </div>
        <div v-else class="showNews">
            <button @click="changeShowNews(0, true)">Atrás</button>
            <div class="showNews-wrapper">
                <div class="content">
                    <h1>{{ selectedNew.title }}</h1>
                    <p>{{ selectedNew.createdAt.split('T')[0] }}</p>
                    <img :src="selectedNew.src">
                    <div id="news-content" v-html="renderedContent"></div>
                </div>
                <div class="other-news">
                    <p>Últimas noticias</p>
                    <hr>
                    <div class="show-other-news" v-for="(newsItem, index) in latestNews()" :key="index">
                        <NewsCompShort :news="newsItem" class="news-short" @click="changeShowNews(index, false)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.newsWrapper {
    height: 100%;
    width: 100vw;
    background: url('/src/assets/background-home-2.jpg');
    background-size: cover;
    overflow: hidden;

    .news-list {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        scrollbar-width: none;

        .welcome-news {
            width: 100vw;
            padding-top: 100px;
            display: flex;
            justify-content: center;

            .welcome-news-wrapper {
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

            &:hover{
                background-color: rgba(108, 110, 110, 0.8);
            }
        }
    }

    .showNews {
        width: 100%;
        height: 100%;
        overflow-y: scroll;

        button {
            position: relative;
            top: 150px;
            left: 200px;
            background-color: transparent;
            width: 210px;
            height: 40px;
            border: solid 1px gray;
            color: gray;
            font-size: 18px;

            &:hover {
                background-color: rgba(108, 110, 110, 0.4);
            }
        }

        .showNews-wrapper {
            width: 80%;
            margin-left: 10%;
            display: flex;
            justify-content: center;
            padding-top: 100px;

            .content {
                width: 900px;
                height: fit-content;
                overflow-x: hidden;
                margin: 100px 100px 30px 0;
                background-color: white;
                border-top: solid 7px rgb(145, 135, 2);
                padding: 40px 50px 20px 50px;

                img {
                    width: 800px;
                }
            }

            .other-news {
                width: 350px;
                height: fit-content;
                margin-top: 100px;
                background-color: white;
                border-top: solid 7px rgb(145, 135, 2);
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                font-size: 22px;

                p {
                    margin: 40px 0;
                    height: fit-content;
                }

                hr {
                    width: 250px;
                    margin-bottom: 10px;
                }

                .news-short {
                    &:hover {
                        background-color: rgba(148, 148, 148, 0.3);
                    }
                }
            }
        }
    }

}
</style>