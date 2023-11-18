<script>
import AchivkaShablon from "@/components/AchivmentStudent/AchivkaShablon.vue";

export default {
  components: {AchivkaShablon},
  props: {
    grades: Array,
    achievements: Array,
  },
  data() {
    return {
      selectedItem: '',
      sum: '',
    };
  },
  methods: {},
  computed: {},
  mounted(){
    this.sum = this.grades[0].informatics + this.grades[0].mathematics + this.grades[0].physics + this.grades[0].chemistry + this.grades[0].biology + this.grades[0].geography + this.grades[0].technology;
  }
};
</script>

<template>
  <div class="achievement_main">
    <div class="achievement_title">
      <p>Витрина достижений</p>
      <select v-model="selectedItem">
        <option value="">Общие награды</option>
        <option value="Биология">Биология</option>
        <option value="География">География</option>
        <option value="Информатика">Информатика</option>
        <option value="Математика">Математика</option>
        <option value="Технология">Технология</option>
        <option value="Физика">Физика</option>
        <option value="Химия">Химия</option>
      </select>
    </div>
    <div class="achievement_body">
      <div class="selected item1" v-show="selectedItem === ''">
        <p>Общее количество полученных баллов: {{ sum }} </p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">В путь к знаниям!</h4>
            <p class="achievement-text"> Ваш первый балл заложил основу стремления к обучению. Это только начало!</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">100 баллов набрано!</h4>
            <p class="achievement-text"> 100 баллов - и вы уже доказали свою усердность. Продолжайте в том же духе!</p>
          </div>
          <div :class="['achievement-card', sum >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">500 баллов за плечами!</h4>
            <p class="achievement-text">Собрав 500 баллов, вы показываете истинную жажду знаний. Вперед к новым вершинам!</p>
          </div>
          <div :class="['achievement-card', sum >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">1000 баллов - впечатляет!</h4>
            <p class="achievement-text">Вы достигли рубежа в 1000 баллов! Ваши знания и усилия заслуживают восхищения.</p>
          </div>
          <div :class="['achievement-card', sum >= 7000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">7000 баллов - покорение вершин!</h4>
            <p class="achievement-text">7000 баллов! Ваше имя будет вписано в анналы учебных достижений.</p>
          </div>
        </div>
      </div>
      <div class="selected item2" v-show="selectedItem === 'Биология'">
        <p>Твой балл по Биологии {{ grades[0].biology }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].biology >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/biology (7).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Начинающий Натуралист</h4>
            <h4 class="title">Первый балл по биологии!</h4>
            <p class="achievement-text">Вы открыли для себя удивительный мир живой природы. Ваше путешествие только начинается!</p>
          </div>
          <div :class="['achievement-card', grades[0].biology >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/biology (8).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Исследователь Живой Природы</h4>
            <h4 class="title" >50 баллов за изучение жизни!</h4>
            <p class="achievement-text">Получив 50 баллов по биологии, вы погрузились в изучение сложности живых организмов.</p>
          </div>
          <div :class="['achievement-card', grades[0].biology >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/biology (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Эксперт Биодиверситета</h4>
            <h4 class="title" >250 баллов за понимание биоразнообразия!</h4>
            <p class="achievement-text"> Ваше знание о живых существах и их экосистемах достигло впечатляющих 250 баллов.</p>
          </div>
          <div :class="['achievement-card', grades[0].biology >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/biology (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Мастер Генетики</h4>
            <h4 class="title" >500 баллов по биологии!</h4>
            <p class="achievement-text">Вы достигли уровня понимания сложных биологических процессов и генетических кодов.</p>
          </div>
          <div :class="['achievement-card', grades[0].biology >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/biology (2).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Биолог-Инноватор</h4>
            <h4 class="title" >1000 баллов за вклад в науку о жизни!</h4>
            <p class="achievement-text">С набором в 1000 баллов вы внесли огромный вклад в науку о жизни, открывая новые горизонты для исследований.</p>
          </div>
        </div>
      </div>
      <div class="selected item3" v-show="selectedItem === 'География'">
        <p>Твой балл по Географии {{ grades[0].geography }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].geography >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/georgaphy (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Молодой Путешественник</h4>
            <h4 class="title">Первый балл по географии!</h4>
            <p class="achievement-text">Вы начали путешествие по картам и континентам, открывая новые уголки мира.</p>
          </div>
          <div :class="['achievement-card', grades[0].geography >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/geography (2).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Исследователь Мира</h4>
            <h4 class="title">50 баллов за картографические открытия!</h4>
            <p class="achievement-text">50 баллов свидетельствуют о вашем стремлении познать разнообразие нашей планеты.</p>
          </div>
          <div :class="['achievement-card', grades[0].geography >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/geography (3).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Знаток Регионов</h4>
            <h4 class="title">250 баллов за исследование Земли!</h4>
            <p class="achievement-text"> Вы погрузились в изучение климатов, почв и ландшафтов, расширяя свои географические горизонты.</p>
          </div>
          <div :class="['achievement-card', grades[0].geography >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/geography (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Магистр Картографии</h4>
            <h4 class="title">500 баллов за мастерство в географии!</h4>
            <p class="achievement-text">С навыками картографа и знатока географических данных вы достигли новых высот в обучении.</p>
          </div>
          <div :class="['achievement-card', grades[0].geography >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/geography (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Географический Гуру</h4>
            <h4 class="title">1000 баллов за глубокие знания Земли!</h4>
            <p class="achievement-text">1000 баллов отмечают ваше глубокое понимание физических и культурных ландшафтов нашей планеты.</p>
          </div>
        </div>
      </div>
      <div class="selected item4" v-show="selectedItem === 'Информатика'">
        <p>Твой балл по Информатике {{ grades[0].informatics }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].informatics >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (3).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Новичок Кода</h4>
            <h4 class="title" >Первый балл по информатике!</h4>
            <p class="achievement-text"> Вы открыли мир программирования и технологий. Продолжайте исследовать!</p>
          </div>
          <div :class="['achievement-card', grades[0].informatics >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (2).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Программист-Практик</h4>
            <h4 class="title">50 баллов в мире кода!</h4>
            <p class="achievement-text">Ваши 50 баллов по информатике говорят о настоящем интересе к вычислениям и алгоритмам.</p>
          </div>
          <div :class="['achievement-card', grades[0].informatics >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform.png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Архитектор Систем</h4>
            <h4 class="title">250 баллов информатики!</h4>
            <p class="achievement-text">Вы показали глубокие знания в информатике, набрав 250 баллов. Ваш путь к цифровому превосходству продолжается.</p>
          </div>
          <div :class="['achievement-card', grades[0].informatics >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Информационный Магистр</h4>
            <h4 class="title">500 баллов по информатике!</h4>
            <p class="achievement-text">С 500 баллами вы доказали, что информатика для вас не просто предмет, а страсть.</p>
          </div>
          <div :class="['achievement-card', grades[0].informatics >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (7).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Великий Программист</h4>
            <h4 class="title">1000 баллов кода и логики!</h4>
            <p class="achievement-text">Ваша целеустремленность и знания вывели вас на рубеж в 1000 баллов по информатике. Вы истинный Великий Программист!</p>
          </div>
        </div>
      </div>
      <div class="selected item5" v-show="selectedItem === 'Математика'">
        <p>Твой балл по Математике {{ grades[0].mathematics }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].mathematics >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/math (7).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Начинающий Счетовод</h4>
            <h4 class="title">Первый балл по математике!</h4>
            <p class="achievement-text">Вы открыли дверь в мир чисел и фигур. Пусть каждое уравнение будет решено!</p>
          </div>
          <div :class="['achievement-card', grades[0].mathematics >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/math (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Геометрический Исследователь</h4>
            <h4 class="title">50 баллов среди форм и фигур!</h4>
            <p class="achievement-text">Ваши 50 баллов показывают, что геометрия и алгебра стали вашими друзьями.</p>
          </div>
          <div :class="['achievement-card', grades[0].mathematics >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/math (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Алгебраический Виртуоз</h4>
            <h4 class="title">250 баллов абстрактного мышления!</h4>
            <p class="achievement-text">250 баллов - вы искусно оперируете формулами и теоремами. Продолжайте укреплять свои знания!</p>
          </div>
          <div :class="['achievement-card', grades[0].mathematics >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/math (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Властелин Чисел</h4>
            <h4 class="title">500 баллов в царстве переменных!</h4>
            <p class="achievement-text">Вы достигли 500 баллов, доказав, что переменные и функции подчиняются вашему уму.</p>
          </div>
          <div :class="['achievement-card', grades[0].mathematics >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/math (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Математический Гений</h4>
            <h4 class="title">1000 баллов за теоремы и доказательства!</h4>
            <p class="achievement-text">С 1000 баллами вы вошли в пантеон математических великих. Ваша логика безупречна!</p>
          </div>
        </div>
      </div>
      <div class="selected item6" v-show="selectedItem === 'Технология'">
        <p>Твой балл по Технологии {{ grades[0].technology }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].technology >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Инициатор Инноваций</h4>
            <h4 class="title">Первый балл по технологии!</h4>
            <p class="achievement-text">Ваши первые шаги в мире технологий задали тон вашему техническому прогрессу.</p>
          </div>
          <div :class="['achievement-card', grades[0].technology >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Техник-Конструктор</h4>
            <h4 class="title">50 баллов за инженерное искусство!</h4>
            <p class="achievement-text">Собрав 50 баллов, вы показали свою способность к конструированию и проектированию.</p>
          </div>
          <div :class="['achievement-card', grades[0].technology >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/trud (3).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Инженер-Изобретатель</h4>
            <h4 class="title">250 баллов за инновационные разработки!</h4>
            <p class="achievement-text">Вы доказали свою изобретательность и инженерный талант, достигнув 250 баллов.</p>
          </div>
          <div :class="['achievement-card', grades[0].technology >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/trud (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Технологический Эксперт</h4>
            <h4 class="title">500 баллов за вклад в будущее!</h4>
            <p class="achievement-text">С 500 баллами вы стали настоящим экспертом в технологиях, способным воплощать будущее уже сегодня.</p>
          </div>
          <div :class="['achievement-card', grades[0].technology >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/inform (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Пионер Технологий</h4>
            <h4 class="title">1000 баллов за революционные открытия!</h4>
            <p class="achievement-text">Ваша страсть и усилия привели к значительным технологическим открытиям, что отмечено 1000 баллами.</p>
          </div>
        </div>
      </div>
      <div class="selected item7" v-show="selectedItem === 'Физика'">
        <p>Твой балл по Физике {{ grades[0].physics }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].physics >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/phisic (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Наблюдатель Явлений</h4>
            <h4 class="title" >Первый балл по физике!</h4>
            <p class="achievement-text">Вселенная полна тайн, и вы только начали их разгадывать. Вперед к открытиям!</p>
          </div>
          <div :class="['achievement-card', grades[0].physics >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/phisic (2).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Экспериментатор </h4>
            <h4 class="title">50 баллов законов движения!</h4>
            <p class="achievement-text">Вы изучили основы и собрали 50 баллов, применяя законы Ньютона в реальности.</p>
          </div>
          <div :class="['achievement-card', grades[0].physics >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/phisic (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Мастер Теории</h4>
            <h4 class="title">250 баллов в мире взаимодействий!</h4>
            <p class="achievement-text">Энергия и сила стали вашими союзниками на пути к 250 баллам.</p>
          </div>
          <div :class="['achievement-card', grades[0].physics >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/phisic (3).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Астрофизик </h4>
            <h4 class="title" >500 баллов среди звезд и планет!</h4>
            <p class="achievement-text">Изучив 500 баллов физики, вы приближаетесь к пониманию тайн Вселенной.</p>
          </div>
          <div :class="['achievement-card', grades[0].physics >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/phisic (8).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Физик-Теоретик</h4>
            <h4 class="title">1000 баллов за покорение элементарных частиц!</h4>
            <p class="achievement-text">Ваши 1000 баллов говорят о глубоком понимании сложнейших явлений физики.</p>
          </div>
        </div>
      </div>
      <div class="selected item8" v-show="selectedItem === 'Химия'">
        <p>Твой балл по Химии {{ grades[0].chemistry }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', grades[0].chemistry >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/15.png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Юный Алхимик</h4>
            <h4 class="title" >Первый балл за химические исследования!</h4>
            <p class="achievement-text">Вы сделали первый шаг к раскрытию секретов веществ и их превращений.</p>
          </div>
          <div :class="['achievement-card', grades[0].chemistry >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/13.png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Лаборант-Аналитик</h4>
            <h4 class="title" >50 баллов за реакции и вещества!</h4>
            <p class="achievement-text">С 50 баллами вы уже знаете, как вещества реагируют друг с другом и изменяются.</p>
          </div>
          <div :class="['achievement-card', grades[0].chemistry >= 250 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/1.png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Органический Синтетик</h4>
            <h4 class="title">250 баллов за молекулярное мастерство!</h4>
            <p class="achievement-text">Вы углубились в органическую химию и собрали 250 баллов, создавая сложные соединения.</p>
          </div>
          <div :class="['achievement-card', grades[0].chemistry >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/11.png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Химик-Инноватор</h4>
            <h4 class="title" >500 баллов за открытия в химии!</h4>
            <p class="achievement-text">Ваш вклад в химию огромен, и 500 баллов это подтверждают. Вы настоящий новатор!</p>
          </div>
          <div :class="['achievement-card', grades[0].chemistry >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/12.png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Магистр Элементов</h4>
            <h4 class="title">1000 баллов за власть над периодической таблицей!</h4>
            <p class="achievement-text">С 1000 баллами вы достигли мастерства в химии, владея знаниями о каждом элементе.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.achievement_main {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.achievement_title {
  text-align: center;

  & > select {
    font-size: 1.1rem;
    padding: 5px;
    outline: none;
    border-radius: 1rem;
    margin-top: 15px;
    width: 100%;
    text-align: center;
  }
}

.selected {
  margin-top: 20px;

  & > p {
    background: white;
    padding: 15px;
    border-radius: 1rem;
    margin-bottom: 20px;
  }
}

// card 

.my_achivment {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  .achievement-card {

    flex: 1 1 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px);
    min-width: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &.inactive {
      //opacity: 0.5;
      filter: grayscale(100%);
      pointer-events: none;
    }

    &:not(:nth-child(3n)) {
      margin-right: 0;
    }

    .achievement-image {
      width: 100%;
      height: auto;
      margin-bottom: 15px;
    }

    .achievement-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      text-align: center;
    }

    .achievement-text {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }
  }
}

.title {
  margin-bottom: 10px;
  text-align: center;
}

@media (max-width: 767px) {
  .my_achivment {
    justify-content: center;
  }

  .achievement-card {
    flex-basis: 100%;
    max-width: 100%;
  }
}

.countExercise p {
  margin-bottom: 0;
}
</style>
