<script setup>
import { reactive, ref, computed } from 'vue';
import { registerRequest, loginRequest } from '@/api/auth.js';
import { useUserStore } from '@/stores/user.js';

const authStore = useUserStore();

const emit = defineEmits(['change-state'])
const handleClick = () => {
    emit('change-state')
}

// Login form
const emailLogin = ref('');
const passwordLogin = ref('');
const disabledLogin = computed(() =>
    emailLogin.value === '' ||
    passwordLogin.value === ''
);
const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const user = {
        email: emailLogin.value,
        password: passwordLogin.value
    }
    const res = await loginRequest(user)
    authStore.login_register(res.data)
}

// Register form
const emailRegister = ref('');
const passwordRegister = ref('');
const usernameRegister = ref('');
const disabledRegister = computed(() =>
    emailRegister.value === '' ||
    passwordRegister.value === '' ||
    usernameRegister.value === ''
);
const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const user = {
        username: usernameRegister.value,
        email: emailRegister.value,
        password: passwordRegister.value
    }
    console.log(user)
    const res = await registerRequest(user)
    console.log(res)
    if (res.status == 200) emit('change-state')
}

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
    <div class="login-register-wrapper">
        <div class="logIn-wrapper" v-if="state.login">
            <form @submit="handleSubmitLogin">
                <h2>Login</h2>
                <div class="inputBox">
                    <input type="email" required placeholder="Usuario/Correo electrónico" v-model="emailLogin" id="emailLogin">
                    <p v-if="emailLogin === ''">No puede quedar en blanco</p>
                </div>
                <div class="inputBox">
                    <input type="password" required placeholder="Contraseña" v-model="passwordLogin" id="passwordLogin">
                    <p v-if="passwordLogin === ''">No puede quedar en blanco</p>
                </div>
                <button :disabled="disabledLogin">Log In</button>
                <div class="changeSignIn">
                    <p @click="changeState">Don't have a account? Register</p>
                </div>
            </form>
        </div>
        <div class="signIn-wrapper" v-if="state.signIn">
            <form @submit="handleSubmitRegister">
                <h2>Register</h2>
                <div class="inputBox">
                    <input type="text" required placeholder="Nombre de usuario" v-model="usernameRegister" id="usernameRegister">
                    <p v-if="usernameRegister === ''">No puede quedar en blanco</p>
                </div>
                <div class="inputBox">
                    <input type="email" required placeholder="Usuario/Correo electrónico" v-model="emailRegister" id="emailRegister">
                    <p v-if="emailRegister === ''">No puede quedar en blanco</p>
                </div>
                <div class="inputBox">
                    <input type="password" required placeholder="Contraseña" v-model="passwordRegister" id="passwordRegister">
                    <p v-if="passwordRegister === ''">No puede quedar en blanco</p>
                </div>
                <button :disabled="disabledRegister">Register</button>
                <div class="changeLogin">
                    <p @click="changeState">Already have an account? LogIn</p>
                </div>
            </form>
        </div>
        <button type="button" class="close" @click="handleClick" />
    </div>
</template>

<style scoped lang="scss">
.login-register-wrapper {
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

    .logIn-wrapper, .signIn-wrapper {
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
                    border: 1px solid #beb63f;

                    &:focus {
                        outline: none;
                        border: 2px solid rgba($color: #be3f3f, $alpha: 1.0);
                    }
                }

                p {
                    margin-top: 3px;
                    margin-left: 10px;
                    height: 20px;
                    color: #be3f3f;
                }

            }

            button {
                width: 100%;
                height: 50px;
                border-radius: 12px;
                margin-top: 50px;
                cursor: pointer;
            }

            .changeSignIn {
                margin-top: 20px;
                cursor: pointer;
                color: #beb63f;
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