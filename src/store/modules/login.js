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
         var userInfo =  response.data.data;
          console.log(userInfo);
         dispatch('testLogin',userInfo,{root:true})

        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },
}
