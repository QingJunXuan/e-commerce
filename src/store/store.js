import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedList:[]
    },
    mutations:{
        setList(state,list){
            state.selectedList=list
        }
    }
})