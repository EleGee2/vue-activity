// import fakeApi from '@/lib/fakeApi'
import fakeApi from '../lib/fakeApi'
import Vue from 'vue'

const store = {
  state: {
    activities: {},
    categories: {}
  },

  generateUid () { return Math.floor(new Date() * Math.random()) },

  fetchActivities () {
    return fakeApi.get('activities', {force: 1}).then(activities => {

      Object.keys(activities).forEach(key => {
        Vue.set(this.state.activities, key, activities[key])

        // this.setItem(activities, key, activities[key])
      })
      return activities
    })
  },

  fetchCategories () {
    return fakeApi.get("categories", {force: 1}).then(categories => {

      Object.keys(categories).forEach(key => {
        Vue.set(this.state.categories, key, categories[key])

        // this.setItem(categories, key, categories[key])
      })
      return categories
    })
  },

  fetchUsers () {
    return {
        name: "Filip Jerga",
        id: "-Aj34jknvncx98812",
    }
  },

  createActivity (activity) {
    activity.id = this.generateUid();
    activity.progress = 0;
    activity.createdAt = new Date();
    activity.updatedAt = new Date();

    return fakeApi.post("activities", activity).then(createdActivity => {
      this.setItem("activities", createdActivity.id, createdActivity)
      return createdActivity
    })
  },

  updateActivity (activity) {
    activity.updatedAt = new Date()

    return fakeApi.post("activities", activity).then(updatedActivity => {
      this.setItem("activities", updatedActivity.id, updatedActivity)
      return updatedActivity
    })
  },

  deleteActivity (activity) {
    return fakeApi.delete("activities", activity).then(deletedactivities => {
      Vue.delete(this.state.activities, activity.id)
      return deletedactivities
    })
  }, 

  setItem(resource, id, item) {
    Vue.set(this.state[resource], id, item)
  },
}

export default store