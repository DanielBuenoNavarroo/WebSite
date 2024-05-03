<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { reactive, ref, onMounted, watch } from 'vue';
import en from './lenguages/en';
import es from './lenguages/es';
import SignIn from './components/SignIn.vue';
import DownloadApp from './components/DownloadApp.vue';

onMounted(() => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.draggable = false;
    });
    document.title = messages.homeTitle;
});

window.addEventListener('blur', () => {
    document.title = messages.comeBack;
});
window.addEventListener('focus', () => {
    changeTitle()
});

const currentLanguage = ref('es');
const messages = currentLanguage.value === 'en' ? en : es;

const route = useRoute();
watch(route, () => {
    changeTitle();
});

const titles = {
    '/': messages.homeTitle,
    '/news': messages.newsTitle,
    '/leaderboards': messages.topsTitle,
};

const changeTitle = () => {
    const title = titles[route.path] || messages.homeTitle;
    document.title = title;
};

const state = reactive({
    signIn: false,
    download: false
});
const changeToSignIn = () => state.signIn = !state.signIn;
const changeToDownload = () => state.download = !state.download;
</script>

<template>
    <header>
        <div class="nav-wrapp">
            <div class="nav-start"></div>
            <nav>
                <RouterLink to="/" class="nav-item" :class="{ 'active': $route.path === '/' }">
                    {{ messages.home }}
                </RouterLink>
                <RouterLink to="/news" class="nav-item" :class="{ 'active': $route.path === '/news' }">
                    {{ messages.news }}
                </RouterLink>
                <RouterLink to="/leaderboards" class="nav-item" :class="{ 'active': $route.path === '/leaderboards' }">
                    {{ messages.tops }}
                </RouterLink>
            </nav>
            <div class="nav-end">
                <div class="nav-sn">
                    <span @click="changeToSignIn">
                        {{ messages.logIn }}
                        <img src="/src/assets/user-icon.png" alt="user-icon">
                    </span>
                </div>
                <span class="nav-download" @click="changeToDownload">
                    {{ messages.download }}
                </span>
            </div>
        </div>
    </header>
    <main>
        <div class="signIn-overlay" v-if="state.signIn">
            <SignIn :lenguage="currentLanguage" @change-state="changeToSignIn" />
        </div>
        <div class="download-overlay" v-if="state.download" @click="changeToDownload">
            <DownloadApp />
        </div>
        <RouterView />
    </main>
</template>

<style scoped lang="scss">
.nav-wrapp {
    width: 100%;
    min-width: 1760px;
    height: 57px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(18, 18, 18, 1);
    border-bottom: 1px solid #363636;
    z-index: 997;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-y: hidden;
    opacity: 1;

    .nav-start {
        width: 20%;
    }

    nav {
        width: 60%;
        height: 57px;
        color: #747474;
        display: flex;
        justify-content: center;
        align-items: center;

        .nav-item {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            text-align: center;
            height: 55px;
            font-size: 18px;
            font-weight: 700;
            padding: 0 30px;
            color: #fff;
            text-decoration: none;

            user-select: none;
            cursor: pointer;

            &:hover {
                color: #307af7;
            }
        }

        .active {
            color: #307af7;
            border-bottom: 3px solid #307af7;
        }
    }

    .nav-end {
        width: 20%;
        height: 50px;
        display: inline-flex;
        justify-content: flex-end;

        .nav-sn {
            min-width: 150px;
            display: inline-flex;
            user-select: none;

            span {
                font-size: 18px;
                padding: 0 30px;
                text-align: center;
                font-weight: 700;
                color: #fff;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                cursor: pointer;

                img {
                    width: 30px;
                    height: 30px;
                    margin-left: 6px;
                }
            }
        }

        .nav-download {
            width: 168px;
            height: 62px;
            margin-top: -8px;
            background-image: url('/src/assets/btn-download.png');
            background-repeat: no-repeat;
            background-size: 100%;
            text-align: center;
            font-size: 18px;
            color: #121212;
            font-weight: 900;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            user-select: none;
        }
    }
}

main {
    width: 100%;
    height: 100vh;

    .signIn-overlay,
    .download-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(18, 18, 18, .5);
        position: fixed;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>