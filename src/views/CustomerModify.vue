<template>
    <v-container>
        <h2>{{ title }}</h2>

        <v-divider></v-divider>
        <div class="pt-2">
            <NavigationPath :currentPath="currentPathName"></NavigationPath>
        </div>

        <section v-if="isLoading">
            <LoadingSpinner></LoadingSpinner>
        </section>
        <section>
            <div class="pt-5">
                <v-card class="mx-auto" outlined>
                    <v-card-title>
                        Personal Detail
                    </v-card-title>
                    <v-divider></v-divider>

                    <div class="px-8">
                        <v-row v-show="type == 'add'">
                            <v-col class="pb-0">
                                <p class="mb-0"><b>Information</b></p>
                                <span style="color: red;">* - required to field</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="mt-2">
                                <v-img :src="imagePreview" :lazy-src="imagePreview"
                                    style="height: 100%; width: 80%; object-fit: fill" height="30vh"
                                    @click="clickUpload()"></v-img>
                                <v-file-input id="uploadImage" style="display: none;" accept="image/png, image/jpeg"
                                    @change="selectImage"></v-file-input>
                            </v-col>
                            <v-col>
                                <v-row class="pt-5">
                                    <v-col cols="2">
                                        <div>
                                            <v-select :items="titleList" v-model="selectedTitle" dense hide-details="auto"
                                                :rules="[rules.required]" label="Title*" outlined></v-select>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div>
                                            <v-text-field :disabled="type == 'edit'" outlined v-model="fullname" dense
                                                hide-details="auto" :rules="[rules.required]"
                                                label="Full Name*"></v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row class="">
                                    <v-col cols="6">
                                        <div>
                                            <v-text-field v-model="ic" :disabled="type == 'edit'" hide-details
                                                v-mask="'######-##-####'" :rules="[rules.required]" outlined dense
                                                label="Identification No*"></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="3">
                                        <div>
                                            <v-text-field :value="getDOB(ic)" hide-details disabled outlined dense
                                                label="Date Of Birth"></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="3">
                                        <div class="pt-2">
                                            <p>Today Age : {{ calculateAge(getDOB(ic)) }} </p>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row class="">
                                    <v-col cols="6">
                                        <div>
                                            <v-text-field v-model="email" hide-details :rules="[rules.email]" outlined dense
                                                label="Email"></v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col cols="6">
                                        <div>
                                            <v-text-field v-model="phoneNo" hide-details outlined dense prefix="+6"
                                                v-mask="'### ### #####'" label="Phone No"></v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea outlined name="input-7-4" label="Mailing Address"
                                    v-model="address"></v-textarea>
                            </v-col>

                        </v-row>
                    </div>

                    <v-divider></v-divider>
                    <v-card-title>
                        Marital Detail
                    </v-card-title>
                    <v-divider></v-divider>

                    <div class="px-8 pb-5">
                        <v-row class="pt-4">
                            <v-col cols="1">
                                <div class="text-center pt-5">
                                    <p>
                                        Married :
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="">
                                <v-radio-group hide-details v-model="maritalStatus" @change="resetMarriedData()" row>
                                    <v-radio label="Yes" :value=true></v-radio>
                                    <v-radio label="No" :value=false></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <div v-if="maritalStatus" class="pb-3">
                            <v-row>
                                <v-col cols="6">
                                    <div>
                                        <v-text-field hide-details v-model="spouseName" outlined dense
                                            label="Name"></v-text-field>
                                    </div>
                                </v-col>
                                <v-col cols="3">
                                    <div>
                                        <v-text-field hide-details v-model="spouseDOB" v-mask="'##-##-####'" outlined dense
                                            label="Date Of Birth"></v-text-field>
                                    </div>
                                </v-col>
                                <v-col cols="3">
                                    <div class="pt-2">
                                        <p>Today Age : {{ calculateAge(spouseDOB) }} </p>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">
                                    <v-text-field hide-details v-model="childNo" type="number" min="0" outlined dense
                                        label="Number of children"></v-text-field>
                                </v-col>
                            </v-row>
                        </div>
                    </div>

                    <v-divider></v-divider>
                    <v-card-title>
                        Emergency Contact
                    </v-card-title>
                    <v-divider></v-divider>

                    <div class="px-8 pb-5">
                        <v-row class="pt-4">
                            <v-col cols="6">
                                <div>
                                    <v-text-field v-model="emergencyName" hide-details outlined dense
                                        label="Name"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div>
                                    <v-text-field v-model="emergencyPhoneNo" hide-details outlined dense prefix="+6"
                                        v-mask="'### ### #####'" label="Phone No"></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                    </div>

                    <v-divider></v-divider>
                    <div class="text-right py-5 pr-8">
                        <v-btn @click="navigateBack" class="mr-2" rounded color="orange">
                            Back
                        </v-btn>
                        <v-btn :disabled="isDisableSubmit" @click="submitCustomerDetail()" rounded color="green">
                            Submit
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </section>
        <BasicDialog :isShow="openDialog" :message="dialogMessage" @close="openDialog = false, navigateBack()"></BasicDialog>
    </v-container>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue'
import NavigationPath from '../components/NavigationPath.vue'
import BasicDialog from '../components/BasicDialog.vue'
import blankProfle from '../assets/blank_person.png'
import mixin from '../mixins/mixin';
export default {
    components: {
        LoadingSpinner,
        NavigationPath,
        BasicDialog
    },
    mixins: [mixin],
    data() {
        return {
            isLoading: true,
            currentPathName: 'Add New Customer',
            title: "Register New Customer",
            type: "add",
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            titleList: [
                'Mr',
                'Mrs',
                'Datuk',
                'Dato',
                'Tan Sri',
                'Tun',
            ],
            selectedTitle: "",
            fullname: "",
            ic: '',
            address: "",
            imagePreview: blankProfle,
            email: "",
            phoneNo: "",
            profilePicture: "",
            maritalStatus: "",
            spouseName: "",
            spouseDOB: "",
            childNo: 0,
            emergencyName: "",
            emergencyPhoneNo: "",
            openDialog: false,
            dialogMessage: "",
            customerInfo: {}
        }
    },
    computed: {
        isDisableSubmit() {
            const self = this
            if (!_.isEmpty(self.selectedTitle) && !_.isEmpty(self.fullname) && (!_.isEmpty(self.ic) && self.ic.length == 14 )) {
                return false
            }
            return true

        }
    },
    methods: {
        navigateBack() {
            const self = this

            self.$router.push({ name: "CustomerList" })
        },
        resetMarriedData() {
            const self = this
            self.spouseName = ""
            self.spouseDOB = ""
            self.childNo = ""
        },
        clickUpload() {
            document.getElementById("uploadImage").click()
        },
        async selectImage(e) {
            const self = this
            const file = e;
            if (!file) return;
            const readData = (f) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(f);
                });
            const data = await readData(file);
            self.imagePreview = data;
            self.profilePicture = data
        },
        getGenderFromIC(payload) {
            return parseInt(payload.charAt(payload.length - 1)) % 2 == 0 ? "F" : "M"
        },
        populateCustomerInfo() {
            const self = this
            self.selectedTitle = self.customerInfo.personalData.title
            self.fullname = self.customerInfo.personalData.fullname
            self.ic = self.formatIC(self.customerInfo.personalData.identificationNo)
            self.email = self.customerInfo.personalData.email
            self.phoneNo = self.formatPhoneNo(self.customerInfo.personalData.phoneNo)
            self.address = self.customerInfo.personalData.address
            self.imagePreview = self.customerInfo.personalData.image
            self.profilePicture = self.customerInfo.personalData.image

            self.maritalStatus = self.customerInfo.maritalData.married
            self.spouseName = self.customerInfo.maritalData.name
            self.spouseDOB = self.customerInfo.maritalData.dob
            self.childNo = self.customerInfo.maritalData.noChild

            self.emergencyName = self.customerInfo.emergencyContact.name
            self.emergencyPhoneNo = self.formatPhoneNo(self.customerInfo.emergencyContact.phoneNo)
        },
        async submitCustomerDetail() {
            const self = this
            self.isLoading = true
            self.dialogMessage = ""

            let removeDashIc = self.ic.split('-').join("")
            let payload = {
                personalData: {
                    title: self.selectedTitle,
                    fullname: self.fullname,
                    gender: self.getGenderFromIC(self.ic),
                    identificationNo: removeDashIc,
                    email: self.email,
                    phoneNo: self.phoneNo,
                    address: self.address,
                    image: self.profilePicture
                },
                maritalData: {
                    married: self.maritalStatus,
                    name: self.spouseName,
                    dob: self.spouseDOB,
                    noChild: self.childNo
                },
                emergencyContact: {
                    name: self.emergencyName,
                    phoneNo: self.emergencyPhoneNo
                }
            }

            let url = ""
            if (self.type == "add") {
                url = "addCustomerDetail"
            } else {
                url = 'updateCustomerDetail'
                payload.id = self.customerInfo.id
            }
            const res = await self.$store.dispatch(url, payload)

            setTimeout(() => {
                self.openDialog = true
                self.dialogMessage = res.msg
                self.isLoading = false
            }, 1000);
        },

    },

    async created() {
        const self = this
        if (self.$route.params.modifyType == "edit") {
            self.title = "Edit Customer Detail"
            let selectedCustomer = self.$route.params.customerInfo
            self.currentPathName = self.title

            await self.$store.dispatch('getCustomerDetail', selectedCustomer)
            self.customerInfo = _.cloneDeep(self.$store.getters.getCustomerSelectedCustomer)
            self.populateCustomerInfo()
        }

        self.type = self.$route.params.modifyType
    },
    mounted() {
        const self = this
        self.isLoading = false
    },

}
</script>