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
        <div class="content">
            <div class="title">
                <p>{{ props.news.title }}</p>
            </div>
            <div class="date-class">
                <p>{{ props.news.createdAt.split('T')[0] }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.news {
    width: 350px;
    height: 125px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 4px 0 0 0;

    .image {
        height: 75px;
        width: 135px;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        img {
            margin-left: 10px;
            height: 75px;
            width: 130px;
            border-radius: 10px;
            border: solid 1px rgba(145, 135, 2, .3);
        }
    }

    .content {
        height: 125px;
        width: 205px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
            width: 100%;
            height: 75px;
            color: black;
            font-size: 14px;
            display: inline-flex;
            align-items: end;
            padding-bottom: 20px;
            padding-left: 20px;

            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1em;
                max-height: 2em;
                word-break: break-word;
            }
        }

        .date-class {
            width: 100%;
            height: 75px;
            color: rgb(163, 163, 163);
            font-size: 10px;
            display: inline-flex;
            align-items: start;
            justify-content: end;
            padding-top: 20px;
            padding-right: 20px;
        }
    }
}
</style>