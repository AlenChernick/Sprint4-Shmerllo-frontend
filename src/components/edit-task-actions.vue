<template>
  <section class="edit-task-actions">
    <div class="main-task-sidebar">
      <div class="main-task-header">Add to card</div>
      <div v-for="btn in actionBtns" @click.stop="openModal(btn.type)" class="main-task-edit-btn">
        <span :class="btn.icon"></span>
        {{ btn.txt }}
      </div>
      <component :is="cmpType" @closeModal="closeModal" @editTask="editTask"> </component>
      <div class="archive-icon-container">
        <div @click.stop="removeTask"><span class="archive-icon"></span>Archive</div>
      </div>
    </div>
    <!-- @toggleLabel="toggleLabel"
        @toggleMember="toggleMember"
        
        @setTaskStyle="setTaskStyle"
        @addAttachment="addAttachment"
        @addCheckList="addCheckList"
        @setDate="setDate"
        @removeDate="removeDate"
        @removeTask="removeTask" -->
  </section>
</template>

<script>
import labelPicker from '../components/label-picker.vue'
import memberPicker from '../components/member-picker.vue'
import addCheckList from '../components/add-checklist.vue'
import datePicker from '../components/date-picker.vue'
import addAttachment from '../components/add-attachment.vue'
import coverPicker from '../components/cover-picker.vue'

export default {
  data() {
    return {
      actionBtns: [
        { txt: 'Members', icon: 'members-icon', type: 'memberPicker' },
        { txt: 'Labels', icon: 'labels-icon', type: 'labelPicker' },
        { txt: 'Checklist', icon: 'checklist-icon', type: 'addCheckList' },
        { txt: 'Dates', icon: 'dates-icon', type: 'datePicker' },
        { txt: 'Attachment', icon: 'attachment-icon', type: 'addAttachment' },
        { txt: 'Cover', icon: 'cover-icon', type: 'coverPicker' },
      ],
      cmpType: null,
      displayModal: 'none',
    }
  },
  methods: {
    openModal(cmpType) {
      this.cmpType = cmpType
    },
    closeModal() {
      this.cmpType = null
    },
    editTask(editData) {
      this.$emit('editTask', editData)
    },
    toggleLabel(labelId) {
      this.$emit('toggleLabel', labelId)
    },
    toggleMember(member) {
      this.$emit('toggleMember', member)
    },
    setTaskStyle(style) {
      this.$emit('setTaskStyle', style)
    },
    addAttachment(attachment) {
      this.$emit('addAttachment', attachment)
    },
    addCheckList(checklist) {
      this.$emit('addCheckList', checklist)
    },
    setDate(dateValue) {
      this.$emit('setDate', dateValue)
    },
    removeDate(dateValue) {
      this.$emit('removeDate', dateValue)
    },
    removeTask() {
      this.$emit('removeTask')
    },
  },
  components: {
    labelPicker,
    memberPicker,
    addCheckList,
    datePicker,
    addAttachment,
    coverPicker,
  },
}
</script>
