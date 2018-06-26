/**
 * Top Bar component
 *
 * o Shows header
 * o Show conditional sidebar trigger
 */

<template>
  <div class="topbar-wrapper">
    <div class="row">
      <div class="col-md-3 label">Polls Example...</div>
      <div class="col-md-1 button" v-if="!sidebarOpened">
        <b-btn size="sm" @click.stop="openSidebar()">
          Open
        </b-btn>
      </div>
      <div v-bind:class="{ 'col-md-9': sidebarOpened, 'col-md-8': !sidebarOpened }" class="status">
        <span>{{ status }}</span>
        <a href="javascript:void(0)" v-on:click="toggleStatuses"><i v-bind:class="{ 'down': statusesOpened, 'right': !statusesOpened }"  class="arrow"></i></a>
      </div>
    </div>
    <div v-bind:class="{ 'shown': statusesOpened, 'hidden': !statusesOpened }" class="row">
      <div v-bind:class="{ 'col-md-3': sidebarOpened, 'col-md-4': !sidebarOpened }"></div>
      <div v-bind:class="{ 'col-md-8': sidebarOpened, 'col-md-7': !sidebarOpened }" class="statuses">
        <ul>
          <li v-for="status in statuses" v-bind:value="status">
            {{ status }}
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    toggleStatuses () {
      if (this.statusesOpened) {
        this.closeStatuses()
      } else {
        this.openStatuses()
      }
    },
    /**
     * Maps the needed actions
     */
    ...mapActions([
      'openSidebar', 'openStatuses', 'closeStatuses'
    ])
  },
  computed: {
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'sidebarOpened', 'status', 'statuses', 'statusesOpened'
    ])
  }
}
</script>

<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #000;
  padding: 13px 3px 13px 3px;
  margin: 0 15px 0 15px;

  .label {
    color: #a8a8a8;
    text-align: left;
    text-indent: 5px;
  }

  .button {
    color: #fff;
    button {
      padding: 1px 5px 1px 5px;
    }
  }

  .status {
    color: #efefef;
    font-style: italic;
    text-align: left;

    span {
      float: left;
    }

    a {
      float: right;
      margin-right: 50px;
    }
  }

  .hidden {
    display: none;
  }
  .visible {
    display: block;
  }

  .statuses {
    background-color: #a8a8a8;
    height: 150px;
    overflow: scroll;

    ul {
      li {
        list-style-type: none;
        text-align: left;
        font-size: 13px;
      }
    }
  }

  i {
    border: solid #efefef;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

}
</style>
