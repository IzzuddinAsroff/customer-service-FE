<template>
    <v-container>
        <h2>Customer Detail Page</h2>
        <v-divider></v-divider>
        <div class="pt-2">
            <NavigationPath :currentPath="currentPathName"></NavigationPath>
        </div>
        
        <div v-if="isLoading">
            <LoadingSpinner></LoadingSpinner>
        </div>
        <div v-else class="pt-5">
            <v-card class="mx-auto" outlined>
                <v-card-title>
                    Personal Detail
                </v-card-title>
                <v-divider></v-divider>
                <div class="px-8 py-5">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col>
                            <div class="center_image">
                                <v-img :lazy-src="selectedCustomer.personalData.image" max-height="250" max-width="150"
                                    :src="selectedCustomer.personalData.image"></v-img>
                            </div>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-spacer></v-spacer>
                            <div class="text-center">
                                {{ selectedCustomer.personalData.title }} {{ selectedCustomer.personalData.fullname }}
                            </div>
                            <v-spacer></v-spacer>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pt-0">
                            <v-spacer></v-spacer>
                            <div class="text-center">
                                {{ selectedCustomer.personalData.identificationNo }} ({{ age }}) ({{
                                    selectedCustomer.personalData.gender | getFullGender }})
                            </div>
                            <v-spacer></v-spacer>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pt-0">
                            <div class="text-center">
                                <b>Mailing address:</b> {{ selectedCustomer.personalData.address }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">
                            <div class="text-right">
                                <p> <b>Email address:</b> {{ selectedCustomer.personalData.email }}</p>
                            </div>
                        </v-col>
                        <v-col class="py-0 ">
                            <div class="text-left rounded_border">
                                <p> <b>Phone No:</b> {{ selectedCustomer.personalData.phoneNo }}</p>
                            </div>
                        </v-col>
                    </v-row>
                </div>

                <v-divider></v-divider>
                <v-card-title>
                    Marital Detail
                </v-card-title>
                <v-divider></v-divider>

                <div class="px-8 py-5">
                    <v-row>
                        <v-col>
                            <div class="text-center">
                                <b>Married: </b> <v-icon
                                    :color="selectedCustomer.maritalData.married ? 'green' : 'red'">mdi-circle</v-icon>
                            </div>
                        </v-col>
                    </v-row>
                    <section v-show="selectedCustomer.maritalData.married">
                        <v-row>
                            <v-col class="pb-0">
                                <div class="text-center">
                                    <p><b>Spouse name: </b> {{ selectedCustomer.maritalData.name }}</p>
                                </div>
                            </v-col>
                            <v-col>
                                <div class="text-center">
                                    <v-row>
                                        <v-col class="pb-0">
                                            <p class="mb-0"><b>Date of birth: </b> {{ selectedCustomer.maritalData.dob }}
                                            </p>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col class="pt-0"> ({{ calculateAge(selectedCustomer.maritalData.dob) }})</v-col>
                                    </v-row>
                                </div>
                            </v-col>
                            <v-col>
                                <div class="text-center">
                                    <p><b>Number of children: </b> {{ selectedCustomer.maritalData.noChild }}</p>
                                </div>
                            </v-col>
                        </v-row>
                    </section>
                </div>

                <v-divider></v-divider>
                <v-card-title>
                    Emergency Detail
                </v-card-title>
                <v-divider></v-divider>

                <div class="px-8 py-5">
                    <v-row>
                        <v-col class="">
                            <span><b>Name:</b> {{ selectedCustomer.emergencyContact.name }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="">
                            <span><b>Phone no:</b> {{ selectedCustomer.emergencyContact.phoneNo }}</span>
                        </v-col>
                    </v-row>
                </div>

                <v-divider></v-divider>
                <div class="text-right py-5 pr-8">
                    <v-btn @click="navigateBack()" rounded color="orange" >
                        Back
                    </v-btn>
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue'
import NavigationPath from '../components/NavigationPath.vue'
import mixin from '../mixins/mixin';
export default {
    components: {
        LoadingSpinner,
        NavigationPath
    },
    mixins: [mixin],
    data() {
        return {
            isLoading: true,
            selectedCustomer: {},
            currentPathName: ''
        }
    },
    computed: {
        age() {
            const self = this
            return self.calculateAge(self.getDOB(self.selectedCustomer.personalData.identificationNo))
        }
    },

    async created() {
        const self = this
        self.currentPathName = "Customer Information"
        let selectedCustomer = self.$route.params.customerInfo
        console.warn(selectedCustomer);
        await self.$store.dispatch('getCustomerDetail', selectedCustomer)

        self.selectedCustomer = self.$store.getters.getCustomerSelectedCustomer
        self.isLoading = false
    },

    methods: {
        navigateBack(){
            const self = this

            self.$router.push({name : "CustomerList"})
        }
    },
}
</script>
<style>
.center_image {
    display: flex;
    justify-content: center;
}
</style>