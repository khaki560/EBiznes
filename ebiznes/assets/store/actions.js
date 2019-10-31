import axios from 'axios';
import Toastr from 'vue-toastr';

import router from './../router';

export default {
    register({ commit }, payload) {
        const { username, password1, password2, email } = payload;

        axios.post('/rest-auth/registration/', {
            username,
            password1,
            password2,
            email,
        })
        .then(({ data }) => {
            commit('setUser', data)
            router.push({ name: 'home' });
        })
        .catch(error => {
            const { response: {
                data
            }} = error;

            commit('setError', data);
        })
    },
    login({ commit }, payload) {
        const { username, password } = payload;

        axios.post('/rest-auth/login/', {
            username,
            password,
        })
        .then((response) => {
            commit('setUser', response.data)
            router.push({ name: 'home' });
        })
        .catch(error => {
            const { response: {
                data
            }} = error;

            commit('setError', data);
        })
    },
    logout({ commit, getters }) {
        axios.post('/rest-auth/logout/', {}, getters.axiosConfig)
        .then(response => {
            commit('logout');

            document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        })
        .catch(({ data }) => Toastr.e(data))
    },
    loadServicePage({ commit }, url = '/api/services/services/') {
        axios.get(url)
        .then(({ data }) => {
            commit('setServices', data);
        })
        .catch(error => {
            const { response: {
                data
            }} = error;

            commit('setError', data);
        })
    },
    loadSingleService({ commit }, pk) {
        axios.get(`/api/services/services/${pk}/`)
        .then(({ data }) => {
            commit('setService', data);
        })
        .catch(error => {
            const { response: {
                data
            }} = error;

            commit('setError', data);
        })
    },
    createService({ commit, getters }, payload) {
        const { name, description, city, profession_id } = payload;

        axios.post('/api/services/services/', {
            name,
            description,
            city,
            profession_id,
        }, getters.axiosConfig)
        .then((response) => {
            // TODO: Go to your services.
            console.log(response);
        })
        .catch(error => {
            const { response: { data }} = error;
            commit('setError', data);
        })
    },
}
