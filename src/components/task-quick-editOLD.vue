<template>
  <span @click.stop="quickEditDisplay = 'block'" class="edit-icon"> <font-awesome-icon icon="fa-solid fa-pen" /></span>

  <div @click.stop="quickEditDisplay = 'none'" class="quickEditScreen" :style="{ display: quickEditDisplay }"></div>

  <section class="quickEdit" :style="{ display: quickEditDisplay }">
    <div class="title-edit">
      <img v-if="task.style?.bgImgUrl" :src="task.style.bgImgUrl" />
      <h5>{{ task.title }}</h5>
    </div>

    <div class="action-buttons">
      <button><span class="card-icon"></span>Open card</button>
      <button><span class="labels-icon"></span>Edit lables</button>
      <button><span class="members-icon"></span>Change members</button>
      <button><span class="cover-icon"></span>Change cover</button>
      <button><span class="dates-icon"></span>Edit dates</button>
      <button><span class="archive-icon"></span>Archive</button>
    </div>

    <div class="save-button">
      <button>Save</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'task-quick-edit',
  props: {
    task: {
      type: Object,
    },
    groupId: {
      type: String,
    },
  },
  data() {
    return {
      quickEditDisplay: 'block',
    }
  },
  methods: {
    openTaskDetails() {
      this.$router.push(`/board/${this.getCurrBoard._id}/${this.groupId}/${this.task.id}`)
    },
  },
  computed: {
    getCurrBoard() {
      return this.$store.getters.getCurrBoard
    },
  },
  components: {
    taskQuickEdit,
  },
}
</script>
<style lang=""></style>
