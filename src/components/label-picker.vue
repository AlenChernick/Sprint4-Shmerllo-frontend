<template lang="">
  <section class="actions-modal-container label-picker">
    <h4>Labels</h4>
    <span @click.stop="closeModal" class="close-icon"></span>
    <div class="label-picker-header">Labels</div>
    <ul class="clean-list" v-for="label in labelsToEdit" @click.stop="toggleLabel(label.id)">
      <li class="label-picker-list" :style="{ 'background-color': label.bgColor }">
        <input @input="editLabels" v-model="label.txt" />
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'label-picker',

  data() {
    return {
      labelsToEdit: null,
    }
  },
  methods: {
    toggleLabel(labelId) {
         this.$emit('editTask', {type: 'toggleLabel', data: labelId}) 
      // this.$emit('toggleLabel', labelId)
    },
    editLabels() {
      this.$store.dispatch({ type: 'editLabels', labels: this.labelsToEdit })
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },
  created() {
    this.labelsToEdit = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard.boardLabels))
  },
  computed: {
    labels() {
      return this.$store.getters.getCurrBoard.boardLabels
    },
  },
}
</script>
<style lang=""></style>
