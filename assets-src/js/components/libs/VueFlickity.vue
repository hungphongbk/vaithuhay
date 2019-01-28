<style src="flickity/dist/flickity.css"></style>
<style module>
.wrapper :global(.flickity-slider) {
  will-change: transform;
}
</style>
<template>
  <div :class="$style.wrapper"><slot /></div>
</template>

<script>
import Flickity from "flickity";
import enqueueTask from "@/core/IdleTasks";

export default {
  props: {
    options: Object
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    if (this.$flickity) this.$flickity.destroy();
    this.$flickity = null;
  },

  methods: {
    /**
     * Initialize a new flickity and emit init event.
     */
    init() {
      enqueueTask(() => {
        this.$flickity = new Flickity(this.$el, this.options);
        this.$emit("init", this.$flickity);
      });
    },

    /**
     * Return the current flickity instance to access directly
     *
     * @return {Flickity}
     */
    flickity() {
      return this.$flickity;
    },

    /**
     * Selecting Slides
     */

    /**
     * Select a slide
     *
     * @param {number} index
     * @param {boolean} isWrapped
     * @param {boolean} isInstant
     */
    select(index, isWrapped, isInstant) {
      this.$flickity.select(index, isWrapped, isInstant);
    },

    /**
     * Change to the next slide
     *
     * @param {boolean} isWrapped
     * @param {boolean} isInstant
     */
    next(isWrapped, isInstant) {
      this.$flickity.next(isWrapped, isInstant);
    },

    /**
     * Change to the previous slide
     *
     * @param {boolean} isWrapped
     * @param {boolean} isInstant
     */
    previous(isWrapped, isInstant) {
      this.$flickity.previous(isWrapped, isInstant);
    },

    /**
     * Select a cell
     *
     * @param {number} value
     * @param {boolean} isWrapped
     * @param {boolean} isInstant
     */
    selectCell(value, isWrapped, isInstant) {
      this.$flickity.selectCell(value, isWrapped, isInstant);
    },

    /**
     * Sizing and Positioning
     */

    /**
     * Trigger a resize event
     */
    resize() {
      this.$flickity.resize();
    },

    /**
     * Trigger a reposition event
     */
    reposition() {
      this.$flickity.reposition();
    },

    /**
     * Adding and removing cells
     */

    /**
     * Prepend elements to flickity
     *
     * @param {array|HTMLElement|NodeList} elements
     */
    prepend(elements) {
      this.$flickity.prepend(elements);
    },

    /**
     * Append elements to flickity
     *
     * @param {array|HTMLElement|NodeList} elements
     */
    append(elements) {
      this.$flickity.append(elements);
    },

    /**
     * Insert elements at a given index
     *
     * @param {array|HTMLElement|NodeList} elements
     * @param {number} index
     */
    insert(elements, index) {
      this.$flickity.insert(elements, index);
    },

    /**
     * Remove elements from flickity
     *
     * @param {array|HTMLElement|NodeList} elements
     */
    remove(elements) {
      this.$flickity.remove(elements);
    },

    /**
     * Player
     */

    /**
     * Trigger a playPlayer event
     */
    playPlayer() {
      this.$flickity.playPlayer();
    },

    /**
     * Trigger a stopPlayer event
     */
    stopPlayer() {
      this.$flickity.stopPlayer();
    },

    /**
     * Trigger a pausePlayer event
     */
    pausePlayer() {
      this.$flickity.pausePlayer();
    },

    /**
     * Trigger a unpausePlayer event
     */
    unpausePlayer() {
      this.$flickity.unpausePlayer();
    },

    /**
     * Trigger a rerender event
     */
    rerender() {
      if (this.$flickity) this.$flickity.destroy();
      this.init();
    },

    /**
     * Utilities
     */

    /**
     * Destroy the flickity instance
     */
    destroy() {
      if (this.$flickity) this.$flickity.destroy();
    },

    /**
     * Trigger a rerender event
     */
    reloadCells() {
      if (this.$flickity) this.$flickity.reloadCells();
    },

    /**
     * Get the cell elements
     *
     * @return {array}
     */
    getCellElements() {
      if (this.$flickity) return this.$flickity.getCellElements();
    },

    /**
     * Return flickity data
     *
     * @return {Flickity}
     */
    data() {
      if (this.$flickity) return Flickity.data(this.$el);
      return {}
    },

    /**
     * Events
     */

    /**
     * Attach an event
     *
     * @param {string} eventName
     * @param {function} listener
     */
    on(eventName, listener) {
      if (this.$flickity) this.$flickity.on(eventName, listener);
    },

    /**
     * Remove an event
     *
     * @param {string} eventName
     * @param {function} listener
     */
    off(eventName, listener) {
      if (this.$flickity) this.$flickity.off(eventName, listener);
    },

    /**
     * Attach an event once
     *
     * @param {string} eventName
     * @param {function} listener
     */
    once(eventName, listener) {
      if (this.$flickity) this.$flickity.once(eventName, listener);
    },

    /**
     * Properties
     */

    /**
     * Return the selected element
     *
     * @return {HTMLElement}
     */
    selectedElement() {
      if (this.$flickity) return this.$flickity.selectedElement;
    },

    /**
     * Return the selected elements
     *
     * @return {array}
     */
    selectedElements() {
      if (this.$flickity) return this.$flickity.selectedElements;
    },

    /**
     * Return the selected index
     *
     * @return {number}
     */
    selectedIndex() {
      if (this.$flickity) return this.$flickity.selectedIndex;
    },

    /**
     * Return the cells
     *
     * @return {array}
     */
    cells() {
      if (this.$flickity) return this.$flickity.cells;
    },

    /**
     * Return the slides
     *
     * @return {array}
     */
    slides() {
      if (this.$flickity) return this.$flickity.slides;
    },

    /**
     * Disable dragging of slider
     */
    disableDrag() {
      this.$flickity.options.draggable = false;
      this.$flickity.updateDraggable();
    },

    /**
     * Enable dragging of slider
     */
    enableDrag() {
      this.$flickity.options.draggable = true;
      this.$flickity.updateDraggable();
    }
  }
};
</script>
