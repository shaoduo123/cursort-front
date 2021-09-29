import axios from "../../assets/js/http";

export default {
  state: {
    msg: '',
  }, getters: {},
  mutations: {
    setLoginVo(state, payload) {

    }
  },
  actions: {
    login({commit, dispatch, state}, payload) {
      return new Promise((resolve, reject) => {

        let loginVo = payload.loginVo;

        axios.post('/api/tokens/login', {
          username: loginVo.phone,
          password: loginVo.password
        })
          .then(function (response) {
            if (response.data.code == 0) {
              var userInfo = response.data.data;
              //dispatch('testLogin', userInfo, {root: true});
              window.localStorage.setItem('Authorization', userInfo.tokens);
              window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
              console.log('mlogin-localstorge-token', window.localStorage.getItem('Authorization'));
              axios.defaults.headers.common['Authorization'] = userInfo.tokens;

              commit('setUserInfo', userInfo, {root: true});
              commit('setToken', userInfo.tokens, {root: true}); //设置token
              resolve(response);
            } else {
              //console.log("登录失败");
              reject("用户名或密码错误！");
            }
          })
          .catch(function (error) {
            console.log('login', error)
            reject("登录出错！请重试");
          });
      });
    }, loginByPhone({commit, dispatch, state}, payload) {

      return new Promise((resolve, reject) => {
        axios.post('/api/tokens/loginByPhone', {
          phone: payload.loginVo.phone,
          captcha: payload.loginVo.captcha
        }).then(function (response) {
          debugger;
          if (response.data.code == 0) {
            var userInfo = response.data.data;
            //dispatch('testLogin', userInfo, {root: true});
            window.localStorage.setItem('Authorization', userInfo.tokens);
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log('mlogin-localstorge-token', window.localStorage.getItem('Authorization'));
            axios.defaults.headers.common['Authorization'] = userInfo.tokens;

            commit('setUserInfo', userInfo, {root: true});
            commit('setToken', userInfo.tokens, {root: true}); //设置token
            resolve(response);
          } else {
            reject("用户名或密码错误！");
          }
        })
          .catch(function (error) {
            console.log('login', error)
            reject("登录出错！请重试");
          });
      });
    }, logout({commit, dispatch, state}, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/tokens/logout')
          .then(function (response) {

            if (response.data.code == 3) {
              var data = response.data
              //dispatch('testLogin', userInfo, {root: true});
              window.localStorage.clear();
              commit('setUserInfo', null, {root: true});
              commit('setToken', null, {root: true}); //设置token
              resolve(response);
            } else {
              //console.log("登录失败");
              reject("退出失败！");
            }
          })
          .catch(function (error) {
            console.log('login', error)
            reject("退出失败！请重试");
          });

      });
    }, sendCaptcha({commit, dispatch, state}, payload) {
      let phonenumber = payload.phone;
      console.log('phone', phonenumber)
      return new Promise((resolve, reject) => {
        axios.get('/api/tokens/sendCaptcha', {
          params:{
            phone: phonenumber,
          }
        }).then(function (response) {
          debugger;
          resolve("验证码发送成功！");
        })
          .catch(function (error) {
            console.log('login', error)
            reject("验证码发送失败！请重试");
          });

      });
    }, register({commit, dispatch, state}, payload) {
      console.log("regesit",payload);
      return new Promise((resolve, reject) => {
        axios.post('/api/tokens/register', {
            phone: payload.user.phone,
            captcha: payload.user.captcha,
            password: payload.user.password,
        }).then(function (response) {
          debugger;
          if(response.data.code==0){
            resolve("注册成功！");
          }else{
            reject("注册失败!"+response.data.msg);
          }
        }) .catch(function (error) {
            console.log('login', error)
            reject(error);
          });

      });
    },
  }
}
