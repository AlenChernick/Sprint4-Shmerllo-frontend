<!-- <template>
  <div class="card-scene">
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".column-drag-handle"
      @drag-start="dragStart"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="group in groups" :key="group.id">
        <div>
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{ group.id }}
          </div>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(group.id, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(group.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="task in group.tasks" :key="task.id">
              <div>
                <p>{{ task.title }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd"
import { applyDrag, generateItems } from "../../services/dnd-service"

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
const columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"]
const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki",
]
const pickColor = () => {
  const rand = Math.floor(Math.random() * 10)
  return cardColors[rand]
}
const scene = {
  type: "container",
  props: {
    orientation: "horizontal",
  },
  children: generateItems(4, (i) => ({
    id: `column${i}`,
    type: "container",
    name: columnNames[i],
    props: {
      orientation: "vertical",
      className: "card-container",
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, (j) => ({
      type: "draggable",
      id: `${i}${j}`,
      props: {
        className: "card",
        style: { backgroundColor: pickColor() },
      },
      data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
    })),
  })),
}
export default {
  name: "Cards",
  props: {
    groups: {
      type: Array,
    },
  },
  components: { Container, Draggable },

  data() {
    return {
      scene,
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    }
  },
  methods: {
    onColumnDrop(dropResult) {
      console.log(dropResult);
      // const scene = Object.assign({}, this.scene)
      let groups =Object.assign({}, this.groups)
      groups = applyDrag(groups, dropResult)
      console.log(groups);
      let currBoard = this.$store.getters.getCurrBoard
      let boardId = currBoard._id
      this.$store.dispatch({ type: "saveGroups", groups, boardId })
    },
    onCardDrop(columnId, dropResult) {
      console.log(dropResult);
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter((p) => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.scene.children.filter((p) => p.id === columnId)[0].children[
          index
        ]
      }
    },
    dragStart() {
      console.log("drag started")
    },
    log(...params) {
      console.log(...params)
    },
  },
}
</script> -->

<template lang="">
  <section class="group-list">
    <h2>this is group list</h2>
    <Container v-if="groups" :get-child-payload="getChildPayload" group-name="1" @drop="onDrop($event)"
>
      <Draggable @mousedown.prevent class="group-container group-preview"  v-for="item in items" :key="item.id">
        <group-preview  :group="item"  />
      </Draggable>
    </Container>
  </section>
</template>
<script>
import groupPreview from "../components/group-preview.vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import {applyDrag} from "../../services/dnd-service.js"

export default {
  name: "group-list",
  props: {
    groups: {
      type: Array,
    },
  },
  data(){
return{
  items:[],
}
  },
  created() {
        this.items = JSON.parse(JSON.stringify(this.groups))
  
  },
  methods: {
    onDrop(dropRes) {
            this.items = applyDrag(this.items, dropRes)
            console.log('items', this.items)
        },
        getChildPayload(idx) {
            return this.items[idx]
        },

  },
  components: {
    groupPreview,
    Container,
    Draggable,
  },
}
</script> 