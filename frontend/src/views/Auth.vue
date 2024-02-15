<script>
import AuthCom from '@/components/AuthCommand/AuthCom.vue';
import ComandAuth from '@/components/AuthCommand/ComandAuth.vue';

export default {
  name: 'AuthPage',
  components: { AuthCom, ComandAuth },
  data() {
    return {
      login: true,
      auth: true,
    };
  },
};
</script>

<template>
  <div>
    <AuthCom v-if="auth" />
    <ComandAuth v-if="login" />
  </div>
</template>

<style scoped lang="scss"></style>
