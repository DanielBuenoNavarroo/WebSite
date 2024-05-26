<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import SignIn from './components/SignIn.vue'
import DownloadApp from './components/DownloadApp.vue'
import { useLenguajeStore } from './stores/lenguage'
import { allLenguajes } from './lenguages/allLenguajes'
import lengs from './lenguages/lengs'

const lenguajeState = useLenguajeStore()
const data = lengs.app
const localData = ref(data.en)

const changeLanguage = () => {
  switch (lenguajeState) {
    case allLenguajes.EN:
      localData.value = data.en
      break
    case allLenguajes.ES:
      localData.value = data.es
      break
    default:
      break
  }
}

const route = useRoute()
watch(route, () => {
  changeTitle()
})

const titles = {
  '/': localData.value.titles.homeTitle,
  '/news': localData.value.titles.newsTitle,
  '/leaderboards': localData.value.titles.topsTitle
}

const changeTitle = () => {
  const title = titles[route.path] || localData.value.titles.homeTitle
  document.title = title
}

const state = reactive({
  signIn: false,
  download: false
})

const changeToSignIn = () => (state.signIn = !state.signIn)
const changeToDownload = () => (state.download = !state.download)
const handleDownload = async () => {
  const url =
    'https://www.googleapis.com/drive/v3/files/1xPYC3FGe4P30kMSE81yhfXpGgy9l0ly7?alt=media&key=AIzaSyAJpuonY--O10Xb5n7XN6T93thMU8Kk15I'
  try {
    const response = await axios.get(url, {
      responseType: 'blob'
    })
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    const downloadUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = 'setup-agileAsphalt.zip'
    document.body.appendChild(a)
    a.click()
    alert(localData.value.messages.done)
    document.body.removeChild(a)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    alert(localData.value.messages.failed)
    console.error(localData.value.messages.failed, error)
  }
}

window.addEventListener('blur', () => {
  document.title = localData.value.titles.comeback
})
window.addEventListener('focus', () => {
  changeTitle()
})
</script>

<template>
  <header>
    <div class="nav-wrapp">
      <div class="nav-start">
        <span>
          <img src="/src/assets/world-icon.png" alt="" @click="changeLanguage" />
          <p>-</p>
          <p>{{ lenguajeState.lenguaje }}</p>
        </span>
      </div>
      <nav>
        <RouterLink to="/" class="nav-item" :class="{ active: $route.path === '/' }">
          {{ localData.content.home }}
        </RouterLink>
        <RouterLink to="/news" class="nav-item" :class="{ active: $route.path === '/news' }">
          {{ localData.content.news }}
        </RouterLink>
        <RouterLink
          to="/leaderboards"
          class="nav-item"
          :class="{ active: $route.path === '/leaderboards' }"
        >
          {{ localData.content.tops }}
        </RouterLink>
      </nav>
      <div class="nav-end">
        <div class="nav-sn">
          <span @click="changeToSignIn">
            {{ localData.content.logIn }}
            <img src="/src/assets/user-icon.png" alt="user-icon" />
          </span>
        </div>
        <span class="nav-download" @click="handleDownload">
          {{ localData.content.download }}
        </span>
      </div>
    </div>
  </header>
  <main>
    <div class="signIn-overlay" v-if="state.signIn">
      <SignIn @change-state="changeToSignIn" />
    </div>
    <div class="download-overlay" v-if="state.download" @click="changeToDownload">
      <DownloadApp />
    </div>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.nav-wrapp {
  width: 100vw;
  height: 57px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(18, 18, 18, 1);
  border-bottom: 1px solid #363636;
  z-index: 997;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-y: hidden;
  opacity: 1;

  .nav-start {
    span {
      min-width: 355px;
      height: 100%;
      margin-left: 30px;
      display: inline-flex;
      align-items: center;
      user-select: none;

      img {
        width: 25px;
        cursor: pointer;
      }

      p {
        margin-left: 10px;
        color: white;
      }
    }
  }

  nav {
    height: 57px;
    color: #747474;
    display: inline-flex;
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
    min-width: 355px;
    height: 50px;
    display: inline-flex;
    justify-content: flex-end;

    .nav-sn {
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
      font-weight: 700;
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
    background-color: rgba(18, 18, 18, 0.5);
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
