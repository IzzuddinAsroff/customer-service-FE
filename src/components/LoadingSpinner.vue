<template>
    <div >
        <v-overlay></v-overlay>
        <div class="position_center">
            <v-progress-circular color="blue-lighten-3" indeterminate :size="66" :width="7"></v-progress-circular>
        </div>
    </div>
</template>

<style>
.position_center {
    position: fixed;
    z-index: 999;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 50px;
    z-index: 2;
}</style>