<template>
  <div class="taskComand">
    <div class="container">
      <div class="taskComand__content">
        <h3 class="taskComand__content-title">
          Добро пожаловать! Этот тест предназначен для проверки ваших знаний в определенной области.
          Важно соблюдать установленные временные рамки для каждого задания, чтобы оценить вашу
          способность быстро и точно решать задачи.
        </h3>
        <ul class="taskComand__content-list">
          <li class="taskComand__content-item">
            Подготовка к тесту:
            <p>
              Убедитесь, что у вас есть стабильное подключение к интернету. Подготовьтесь к
              концентрации внимания на заданиях в течение коротких промежутков времени. Подготовка к
              тесту:
            </p>
          </li>
          <li class="taskComand__content-item">
            Структура теста:
            <p>
              Тест состоит из [количества заданий] заданий. Каждое задание предполагает решение в
              течение одной минуты.
            </p>
          </li>
          <li class="taskComand__content-item">
            Таймер:
            <p>
              В левом верхнем углу экрана вы видите таймер, который отсчитывает время для текущего
              задания. На каждом задании у вас есть ровно одна минута для чтения, понимания и
              ответа.
            </p>
          </li>
          <li class="taskComand__content-item">
            Как решать задания:
            <p>
              Читайте внимательно формулировку каждого задания. При необходимости делайте пометки
              или записи для более быстрого решения. Ответ дайте в пределах отведенного времени.
            </p>
          </li>
          <li class="taskComand__content-item">
            Переход к следующему заданию:
            <p>
              По истечении одной минуты таймер автоматически переключится на следующее задание. Вы
              не сможете вернуться к предыдущему заданию, так что старайтесь дать ответ в отведенное
              время.
            </p>
          </li>
          <li class="taskComand__content-item">
            Окончание теста:
            <p>
              По завершении всех заданий тест автоматически завершится. Оцените, как лучше
              распределять время между заданиями, чтобы закончить все успешно.
            </p>
          </li>
        </ul>
        <button class="taskComand__content-btn">Приступить к заданию</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.taskComand {
  &__content {
    margin-top: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.9375rem;

    &-title {
      letter-spacing: 0.1rem;
      line-height: 140%;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
    &-item {
      font-weight: bold;
      list-style: none;
      p {
        font-weight: normal;
        letter-spacing: 0.1rem;
        line-height: 140%;
        margin-top: 0.3125rem;
      }
    }
    &-btn {
      font-family: 'Visitor';
      margin-top: 1rem;
      padding: 0.625rem;
      background-color: rgb(5, 224, 5);
      color: #fff;
      text-align: center;
      border: none;
      outline: none;
      font-size: 1.2rem;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
