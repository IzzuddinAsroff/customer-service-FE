<template>
    <v-container>
        <div v-if="isLoading">
            <LoadingSpinner></LoadingSpinner>
        </div>
        <div v-else>
            <v-row class="text-center">
                <v-col class="mb-4">
                    <h2 class="mb-3">
                        Customer Listing
                    </h2>

                    <p class="subheading font-weight-regular">
                        This project is to perform CRUD action
                    </p>

                    <div class="text-right pb-5">
                        <v-btn @click="modifyCustomerDetail('add')">Register new customer</v-btn>
                    </div>

                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        No
                                    </th>
                                    <th class="text-left">
                                        Name
                                    </th>
                                    <th class="text-left">
                                        Identification No
                                    </th>
                                    <th class="text-left">
                                        Gender
                                    </th>
                                    <th class="text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in customers" :key="index">
                                    <td class="text-left">{{ index + 1 }}</td>
                                    <td class="text-left">{{ item.fullname }}</td>
                                    <td class="text-left">{{ formatIC(item.identificationNo) }}</td>
                                    <td class="text-left">{{ item.gender }}</td>
                                    <td class="text-right">
                                        <v-btn @click="viewCustomerDetail(item)" depressed class="mr-1" color="primary">
                                            View
                                        </v-btn>
                                        <v-btn @click="modifyCustomerDetail('edit', item)" depressed class="mr-1"
                                            color="orange">
                                            Edit
                                        </v-btn>
                                        <v-btn @click="deleteCustomer(item)" depressed color="error">
                                            Delete
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </div>

        <DeleteDialog :isShow="dialogFlag" :customerInfo="selectedCustomer" @close="closeDialog"></DeleteDialog>
    </v-container>
</template>

<script>
import DeleteDialog from '../components/DeleteDialog.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import mixin from '../mixins/mixin';
export default {
    components: {
        DeleteDialog,
        LoadingSpinner
    },
    mixins: [mixin],
    data() {
        return {
            dialogFlag: false,
            isLoading: true,
            selectedCustomer: {}
        }
    },
    computed: {
        customers() {
            const self = this
            return self.$store.getters.getCustomerListState
        }
    },
    async created() {
        const self = this
        await self.$store.dispatch('getCustomerList')
        // setTimeout(() => {
        console.warn('self.customers', self.customers);
        self.isLoading = false
        // }, 1000);

    },
    methods: {
        viewCustomerDetail(payload) {
            const self = this

            self.$router.push({ name: "CustomerDetail", params: { customerInfo: payload } })
        },
        modifyCustomerDetail(type, payload) {
            const self = this

            let paramObject = {
                modifyType: type
            }

            if (type == 'edit') {
                paramObject.customerInfo = payload
            }

            self.$router.push({ name: "CustomerModify", params: paramObject })
        },
        deleteCustomer(payload) {
            const self = this
            self.dialogFlag = true
            self.selectedCustomer = payload
        },
        closeDialog() {
            const self = this
            self.dialogFlag = false
        },
    },
}
</script>