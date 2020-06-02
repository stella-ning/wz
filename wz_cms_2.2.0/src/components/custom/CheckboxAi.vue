<template>
<div class="video-success">
    <svg class="checkmark" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 52 52" :style="style">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
</div>
</template>

<script>
export default {
    data() {
        return {
            style:{
                width:this.width,
                height:this.height,
            }
        }
    },
    methods: {

    },
    props:{
        width:{
            default:'28px'
        },
        height:{
            default:'28px'
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes breathLamp{
    0%{
        opacity:.7;
        // transform:scale(.5,.5);
    }
    100%{
        opacity:.9;
        // transform:scale(1,1);
    }
}

.video-success {
    margin: 0 auto;
    animation: breathLamp 1.5s forwards;
}

.video-success .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #66b1ff;
    fill: none;
    -webkit-animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.video-success .checkmark {
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #66b1ff;
    -webkit-animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
    animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.video-success .checkmark__check {
    -webkit-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    -webkit-animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@-webkit-keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@-webkit-keyframes scale {

    0%,
    100% {
        -webkit-transform: none;
        transform: none;
    }

    50% {
        -webkit-transform: scale3d(1.1, 1.1, 1);
        transform: scale3d(1.1, 1.1, 1);
    }
}

@keyframes scale {

    0%,
    100% {
        -webkit-transform: none;
        transform: none;
    }

    50% {
        -webkit-transform: scale3d(1.1, 1.1, 1);
        transform: scale3d(1.1, 1.1, 1);
    }
}

@-webkit-keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #66b1ff;
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #66b1ff;
    }
}
</style>
