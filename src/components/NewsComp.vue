<script setup>
const props = defineProps({
    news: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="news">
        <div class="image">
            <img :src="props.news.src" alt="">
        </div>
        <span class="spacer" />
        <div class="content">
            <div class="title">
                <h2>{{ props.news.title }}</h2>
            </div>
            <div class="subtitle">
                <p>{{ props.news.subtitle }}</p>
            </div>
            <div class="date-class">
                <p>{{ props.news.createdAt.split('T')[0] }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.news {
    width: 1250px;
    height: 150px;
    background: rgb(26, 27, 27);
    background: linear-gradient(90deg,
            rgba(26, 27, 27, 1) 0%,
            rgba(26, 27, 27, 1) 80%,
            rgba(26, 27, 27, .4) 100%);
    border-radius: 0 35px 0 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 20px 0;

    &:hover {
        border: solid 1px rgb(145, 135, 2);
    }

    .image {
        height: 150px;
        width: 275px;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        img {
            margin-left: 10px;
            height: 120px;
            width: 230px;
            border-radius: 10px;
        }
    }

    .spacer {
        height: 110px;
        border-left: solid 2px rgba(158, 158, 158, 0.2);
        margin-left: 10px;
    }

    .content {
        height: 150px;
        width: 100%;
        padding: 10px 10px 20px 30px;
        max-width: calc(100% - 325px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
            width: 100%;
            color: white;
            font-size: 17px;

            h2 {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1.1em;
                max-height: 2.2em;
                word-break: break-word;
            }
        }

        .subtitle {
            width: 100%;
            color: rgb(163, 163, 163);
            font-size: 18px;

            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1.5em;
                max-height: 3em;
                word-break: break-word;
            }
        }

        .date-class {
            width: 100%;
            color: rgb(163, 163, 163);
            font-size: 15px;

            p {
                text-align: end;
            }

        }
    }
}
</style>