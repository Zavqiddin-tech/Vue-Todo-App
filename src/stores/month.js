import { ref } from "vue";
import { defineStore } from "pinia";


export const monthItems = defineStore('month', ()=> {
    const monthArray = ref([])
    monthArray.value = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june', 
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ]

    return {
        monthArray
    }
})