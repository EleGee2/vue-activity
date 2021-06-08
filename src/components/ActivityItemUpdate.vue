<template>
  <article class="post">
    <div class="activity-title">
      <i
        class="fas fa-cog activity-settings"
        @click="isMenuDisplayed = !isMenuDisplayed"
      />
      <input
        v-model="activityToUpdate.title"
        type="text"
        class="input"
      >
    </div>
    <div class="activity-category">
      <select
        v-model="activityToUpdate.category"
        class="select"
      >
        <option
          disabled
          value=""
        >
          Please select one
        </option>
        <option
          v-for="(category, name) in categories"
          :key="category.id"
          :value="name"
        >
          {{ category.text }}
        </option>
      </select>
    </div>
    <div class="control activity-notes">
      <textarea
        v-model="activityToUpdate.notes"
        class="textarea"
        placeholder="Write some notes here"
      />
    </div>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a> updated {{ activityToUpdate.updatedAt | prettyTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <input
          id="progress"
          v-model.number="activityToUpdate.progress"
          type="range"
          name="progress"
          min="0"
          max="100"
          value="90"
          step="10"
        >
        <label for="progress">{{ activityToUpdate.progress }} %</label>
      </div>
    </div>
    <div
      v-if="isMenuDisplayed"
      class="activity-controll"
    >
      <a
        class="button is-warning"
        @click="updateActivity"
      >Commit Update</a>
      <a
        class="button is-danger"
        @click="$emit('toggleUpdate', false)"
      >Cancel</a>
    </div>
  </article>
</template>

<script>
  import textUtility from '@/mixins/textUtility'
  import store from '@/store'
  export default {
    mixins: [textUtility],
    props: {
      categories: {
        type: Object,
        required: true
      },
      activity: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        isMenuDisplayed: true,
        activityToUpdate: {...this.activity}
      }
    },
    methods: {
      updateActivity () {
        store.updateActivity(this.activityToUpdate).then( () => {
          this.$emit("toggleUpdate", false)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .activity-title {
    margin-bottom: 10px;

    > i {
      margin-bottom: 10px;
    }
  }
  .activity-category {
    margin-bottom: 10px;
  }
  .activity-notes {
    margin-bottom: 10px;
  }
  .activity-settings {
    float: right;
    font-size: 22px;
    &:hover {
      cursor: pointer;
    }
  }
  .activity-controll {
    margin: 20px 0 0 0;
    a {
      margin-right: 5px;
    }
  }
  .post .title {
    margin-bottom: 5px;
  }
</style>