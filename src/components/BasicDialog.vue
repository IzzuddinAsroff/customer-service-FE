<template>
    <div>
        <v-dialog v-model="dialogFlag" width="500">
            <v-card>
                <v-card-title class="text-p5 lighten-2" :style="{'background': messageType}">
                </v-card-title>
                <v-card-text class="pt-5">
                    <b>{{ message }}</b>
                </v-card-text>

                <v-divider></v-divider>

                <div class="text-right py-1">
                    <v-btn @click="closeDialog(true)" color="primary" text>
                        Ok
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
        },
        messageType: {
            type: String,
            default: "green"
        },
    },
    computed: {
        dialogFlag() {
            const self = this
            return self.isShow
        }
    },
    methods: {
        closeDialog() {
            const self = this
            self.$emit('close')
        },
    },
}
</script>