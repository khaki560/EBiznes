<template>
    <div>
        <b-modal
            :active.sync="shouldShowCookieModal"
            has-modal-card
            aria-role="dialog"
            aria-modal>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{ $t('message.cookieHeader') }}</p>
                </header>
                <div class="modal-card-body">
                    <div class="content">
                        {{ $t('message.cookie') }}
                    </div>
                </div>
                <footer class="modal-card-foot">
                    <button
                        class="button"
                        type="button"
                        @click="acceptCookie"
                    >{{ $t('message.cookieAccept') }}</button>
                </footer>
            </div>
        </b-modal>

        <b-navbar v-if="authorizationGranted" type="is-dark">
            <template slot="brand">
                Service rent
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ name: 'service-list' }">
                    {{ $t('navbar.home') }}
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ name: 'service-create' }">
                    {{ $t('navbar.createService') }}
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ name: 'service-user' }">
                    {{ $t('navbar.yourService') }}
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ name: 'rent-history' }">
                    {{ $t('navbar.rentHistory') }}
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-dropdown :label="$t('navbar.yourAccount')">
                    <b-navbar-item tag="router-link" :to="{ name: 'your-account' }">
                        {{ $t('navbar.editAccount') }}
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ name: 'password-change' }">
                        {{ $t('navbar.changePassword') }}
                    </b-navbar-item>
                    <b-navbar-item tag="div">
                        <logout/>
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
        </b-navbar>

        <b-navbar v-else-if="!authorizationGranted && shouldDisplayNavbar($route.name)" type="is-dark">
            <template slot="brand">
                Service rent
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ name: 'service-list' }">
                    {{ $t('navbar.home') }}
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ name: 'register' }">
                    {{ $t('navbar.register') }}
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ name: 'login' }">
                    {{ $t('navbar.login') }}
                </b-navbar-item>
            </template>
        </b-navbar>

        <router-view />
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'App',

    computed: {
        ...mapGetters([
            'authorizationGranted',
            'shouldDisplayNavbar',
            'shouldShowCookieModal',
        ]),
    },

    methods: {
        acceptCookie: function() {
            this.$store.commit('acceptCookie');
        },
    },
};
</script>
