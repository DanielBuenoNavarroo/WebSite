<script setup>
import { reactive } from 'vue';
import es from '@/lenguages/es';
import en from '@/lenguages/en';


const props = defineProps(
    {
        lenguage: {
            type: String,
            required: true,
            default: 'en'
        }
    }
);

const messages = props.lenguage === 'en' ? en : es;

const state = reactive({
    login: true,
    signIn: false
})

const changeState = () => {
    state.signIn = !state.signIn;
    state.login = !state.login;
};
</script>

<template>
    <div class="web-login" v-if="state.login">
        <div class="logIn-wrapper">
            <span>{{ messages.logIn }}</span>
            <form>

            </form>
        </div>
        <button class="close" @click="$emit('changeState')"></button>
    </div>
    <div class="web-signIn" v-if="state.signIn">
        <div class="signIn-wrapper">
            <span>{{ messages.signIn }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.web-login {
    width: 450px;
    height: 550px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .logIn-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 32px !important;
        word-break: break-all;

        span {
            width: 100%;
            text-align: center;
            font-size: 27px;
            font-weight: 900;
        }
    }

    .close {
        width: 25px;
        height: 25px;
        position: static;
        cursor: pointer;
        position: absolute;
        top: 26px;
        right: 26px;
        background-color: transparent;
        border: none;
        outline: 0px;
        background-image: url('/src/assets/close-icon.png');
        background-size: cover;
    }
}
</style>