<template>
    <div>
        <v-row>
            <v-col>
                <span>
                    <u @click="navigateHome()">Customer Listing</u> > <b>{{ currentPath }}</b>
                </span>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props:{
        currentPath: {
            type: String
        }
    },
    
    methods: {
        navigateHome() {
            const self = this
            self.$router.push({ name: "CustomerList" })
        }
    },
}
</script>