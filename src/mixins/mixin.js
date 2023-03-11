export default {
    filters: {
        getFullGender(value) {
            return value == 'M' ? "Male" : "Female"
        },
    },
    methods: {
        formatIC(payload){
            return `${payload.substring(0, 6)}-${payload.substring(6, 8)}-${payload.substring(8)}`
        },
        formatPhoneNo(payload){
            return `${payload.substring(0, 3)} ${payload.substring(3, 6)} ${payload.substring(6)}`
        },
        getDOB(payload) {
            const self = this
            if (payload.length >= 6) {
                let day = payload.slice(4, 6)
                let month = payload.slice(2, 4)
                let fullYear = self.getFullYearFromIc(payload.slice(0, 2))
                return `${day}-${month}-${fullYear}`
            }
        },
        calculateAge(payload) {
            const self = this
            if (payload != "" && payload != undefined && payload.length >= 6) {
                let fullYear = self.getFullYearFromIc(payload.slice(8))
                return new Date().getFullYear() > fullYear ? `${new Date().getFullYear() - fullYear} years old` : "Invalid age"
            } else {
                return "0 years old"
            }

        },
        getFullYearFromIc(year) {
            return parseInt(year) < 32 ? "20" + year : new Date(`${year}-01-01`).getFullYear()
        }
    }
};