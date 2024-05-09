<script setup>
import { reactive, ref, watch } from 'vue';

const emit = defineEmits(['change-state'])

const handleClick = () => {
    emit('change-state')
}

const email = ref('')
const password = ref('')
const disabled = ref(true)
const isEnabled = () => {
    if (email.value === '' || password.value === '') disabled.value = true
    else disabled.value = false
    console.log(disabled.value)
};
watch(email, isEnabled)
watch(password, isEnabled)

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
            <form action="">
                <h2>Login</h2>
                <div class="inputBox">
                    <input type="email" required placeholder="Usuario/Correo electrónico" v-model="email">
                    <p v-if="email === ''">No puede quedar en blanco</p>
                </div>
                <div class="inputBox">
                    <input type="password" required placeholder="Contraseña" v-model="password">
                    <p v-if="password === ''">No puede quedar en blanco</p>
                </div>
                <button :disabled="disabled">Log In</button>
                <div class="register">
                    <p @click="changeState">Don't have a account? Register</p>
                </div>
            </form>
        </div>
        <button class="close" @click="handleClick" />
    </div>
    <div class="web-signIn" v-if="state.signIn">
        <div class="signIn-wrapper">
            <span>{{ messages.signIn }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.web-login {
    width: 500px;
    height: 600px;
    background: transparent;
    backdrop-filter: blur(10px);
    border: 2px solid rgba($color: #000, $alpha: .7);
    border-radius: 25px;
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
        padding: 32px;
        word-break: break-all;

        form {
            width: 100%;
            height: 100%;

            h2 {
                width: 100%;
                text-align: center;
                font-size: 27px;
                font-weight: 900;
                margin-bottom: 10px;
                color: #ffffff;
            }

            .inputBox {

                input {
                    width: 100%;
                    height: 50px;
                    border-radius: 12px;
                    padding-left: 10px;
                    font-size: 17px;
                    margin-top: 20px;

                    &:focus {
                        outline: none;
                        border: 2px solid rgba($color: #be3f3f, $alpha: 1.0);
                    }
                }

                p {
                    height: 20px;
                    color: #be3f3f;
                }
            }

            button {
                width: 100%;
                height: 50px;
                border-radius: 12px;
                margin-top: 50px;
            }

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