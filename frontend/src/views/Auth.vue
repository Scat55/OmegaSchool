<script>
import AuthCom from '@/components/AuthCommand/AuthCom.vue';
import ComandAuth from '@/components/AuthCommand/ComandAuth.vue';

export default {
  name: 'AuthPage',
  components: { AuthCom, ComandAuth },
  data() {
    return {
      login: true,
      auth: false,
    };
  },
  methods: {
    changeStatusFormToAuth() {
      this.login = false;
      this.auth = true;
    },
    changeStatusFormToReg() {
      this.login = true;
      this.auth = false;
    },
  },
};
</script>

<template>
  <div>
    <AuthCom @goToReg="changeStatusFormToReg" v-if="auth" />
    <ComandAuth @goToAuth="changeStatusFormToAuth" v-if="login" />
  </div>
</template>

<style scoped lang="scss"></style>
