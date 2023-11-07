<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: this.$route.params.id,
      userID: this.$route.params.userID,
      token: '',
    };
  },

  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get(`/api/getTasksForTeacherByStudentByID/${this.id}/${this.userID}`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  },
};
</script>

<style lang="scss" scoped></style>
