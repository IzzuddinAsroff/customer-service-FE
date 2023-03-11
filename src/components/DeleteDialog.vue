<template>
    <div>
        <v-dialog v-model="dialogFlag" width="500">
            <v-card>
                <v-card-title class="text-p5 grey lighten-2">
                    Delete {{ customerInfo.fullname }} Information.
                </v-card-title>

                <v-card-text class="pt-2 text-2">
                    <span class="">
                        <b>Want to proceed permanently deleting this customer?</b> 
                    </span>

                </v-card-text>

                <v-divider></v-divider>

                <div class="text-right py-3">
                    <v-btn class="pr-2" @click="closeDialog(true)" color="green" text>
                        Yes
                    </v-btn>
                    <v-btn @click="closeDialog(false)" color="red" text>
                        No
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
        <BasicDialog :messageType="msgType" :isShow="openDialog" :message="dialogMessage" @close="openDialog = false"></BasicDialog>
    </div>
</template>

<script>
import BasicDialog from './BasicDialog.vue'
export default {
    components: {
        BasicDialog
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        customerInfo: {
            type: Object,
            default: {}
        },
    },
    data() {
        return {
            openDialog: false,
            dialogMessage: '',
            msgType: ''
        }
    },
    computed: {
        dialogFlag() {
            const self = this
            return self.isShow
        }
    },
    methods: {
        closeDialog(payload) {
            const self = this
            self.$emit('close')

            if (payload) {
                self.deleteCustomerInfo()
            }
        },
        async deleteCustomerInfo() {
            const self = this
            console.log(self.customerInfo);

            const res = await self.$store.dispatch('deleteCustomerDetail', self.customerInfo)
            console.log(res);
            if (res.success) {
                await self.$store.dispatch('getCustomerList')
            } else {
                self.openDialog = true
                self.dialogMessage = res.msg
                self.msgType = "red"
            }
        }
    },
}
</script>