import axios from 'axios'

export default {
  state:{

  },
  mutations:{
    setLoginVo(state,payload) {

    }
  },
  actions:{
    login({ commit, dispatch, state},payload){
      debugger;
      let loginVo = payload.loginVo;
      axios.post('/api/tokens/login', {
        username: loginVo.phone,
        password: loginVo.password
      })
        .then(function (response) {
         var data =  response.data;
         dispatch('app/testLogin',null,{root:true})
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },
}
