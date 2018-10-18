import Vue from 'vue'
import moment from 'moment'

Vue.filter('dataFm',(input,fromastring)=>{
    return moment(input).format(formastring)
})