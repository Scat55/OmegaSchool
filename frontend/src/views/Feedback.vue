<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
    };
  },
  methods: {
    sendFeedBack() {
      this.token = JSON.parse(localStorage.getItem('local'));

      axios
        .post(
          '/api/sendFeedback',
          {
            name: this.name,
            email: this.email,
            message: this.message,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(() => {
          alert('Сообщение отправлено');
        })
        .catch((e) => {
          console.log(e);
          alert('Ошибка отправки сообщения');
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="introductios">
      <div class="introductios__title">FAQ</div>
      <p>
        1.Что такое обратная связь и зачем она нужна? Обратная связь - это механизм, позволяющий
        пользователям делиться своими мыслями, идеями, предложениями или проблемами, с которыми они
        столкнулись на платформе. Это помогает команде платформы улучшить качество обучения и
        удовлетворить потребности пользователей.
      </p>
      <br />
      <p>
        2.Как я могу оставить обратную связь? Вы можете оставить обратную связь, заполнив форму
        обратной связи на нашем сайте. Вам нужно будет указать свое имя, адрес электронной почты и
        сообщение.
      </p>
      <br />
      <p>
        3.Какую информацию я должен включить в свою обратную связь? Ваша обратная связь должна быть
        конкретной и содержательной. Пожалуйста, укажите, что вам понравилось или не понравилось,
        какие проблемы вы столкнулись и какие улучшения вы бы хотели видеть.
      </p>
      <br />
      <p>
        4.Кто будет читать мою обратную связь? Ваша обратная связь будет прочитана командой
        платформы. Мы ценим ваше мнение и используем его для улучшения нашего сервиса.
      </p>
      <br />
      <p>
        5.Что произойдет после того, как я оставлю обратную связь? После того, как вы оставите
        обратную связь, мы рассмотрим ваше сообщение и предпримем необходимые действия. Если ваше
        сообщение требует ответа, мы свяжемся с вами по электронной почте.
      </p>
      <br />
      <p>
        6.Могу ли я оставить обратную связь анонимно? Да, вы можете оставить обратную связь
        анонимно. Однако, если вы хотите получить ответ от нас, вам нужно будет предоставить свой
        адрес электронной почты.
      </p>
      <br />
      <p>
        7.Будет ли моя обратная связь конфиденциальной? Да, мы уважаем вашу конфиденциальность и не
        будем делиться вашей обратной связью с третьими лицами без вашего согласия.
      </p>
    </div>
    <div class="feedback__container">
      <div class="feedback__container__title">
        <h1>Обратная связь</h1>
      </div>
      <div class="feedback__container__form">
        <form @submit.prevent="sendFeedBack">
          <div class="feedback__container__form__name">
            <label for="name">Имя</label>
            <input type="text" id="name" v-model="name" />
          </div>
          <div class="feedback__container__form__email">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="feedback__container__form__message">
            <label for="message">Сообщение</label>
            <textarea name="" id="message" v-model="message"></textarea>
          </div>
          <div class="feedback__container__form__button">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  background: #fff;
  border-radius: 1rem;
  align-items: start;
  min-height: 70%;
  border: 2px solid $accentColor;
  padding: 40px;
  gap: 15%;
}

.feedback__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  gap: 20px;

  &__title {
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    &__name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      & label {
        font-size: 20px;
        font-weight: 700;
        margin-top: 20px;
      }

      & input {
        width: 300px;
        height: 40px;
        border-radius: 10px;
        border: 2px solid $accentColor;
        padding: 10px;
        font-size: 20px;
        font-weight: 400;
        outline: none;
      }
    }

    &__email {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      & label {
        font-size: 20px;
        font-weight: 700;
        margin-top: 20px;
      }

      & input {
        width: 300px;
        height: 40px;
        border-radius: 10px;
        border: 2px solid $accentColor;
        padding: 10px;
        font-size: 20px;
        font-weight: 400;
        outline: none;
      }
    }

    &__message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      & label {
        font-size: 20px;
        font-weight: 700;
        margin-top: 20px;
      }

      & textarea {
        width: 300px;
        height: 200px;
        border-radius: 10px;
        border: 2px solid $accentColor;
        padding: 10px;
        font-size: 20px;
        font-weight: 400;
        outline: none;
        resize: vertical;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      & button {
        background: $accentColor;
        color: #fff;
        border: none;
        width: 200px;
        height: 40px;
        border-radius: 1rem;
        font-size: 20px;
      }
    }
  }
}

.introductios {
  width: 40%;
  &__title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
}

@media (max-width: 835px) {
  .container {
    flex-direction: column;
    gap: 40px;
    padding: 20px;
    align-items: center;
    margin: 80px 20px 0 20px;
  }

  .introductios {
    width: 90%;
  }
}
</style>
