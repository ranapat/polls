/**
 * List component
 *
 * o Shows data in list and grid mode
 */

<template>
  <div class="list-wrapper">

    <div class="row">
      <div class="col-md-12" v-if="!questionsLoading && !questionsLoadError && reduced.length === 0">No data</div>
      <div class="col-md-12" v-if="questionsLoading">Questions loading...</div>
      <div class="col-md-12" v-if="questionsLoadError">Questions loading error : {{ questionsLoadError && questionsLoadError.response ? questionsLoadError.response.data.message : '' }}</div>
    </div>

    <div class="row data" v-if="reduced.length > 0">
      <div class="col-md-12 hide">
        <ul>
          <li v-for="item in reduced" v-bind:class="{ 'grid': view === config.grid.key, 'list': view === config.list.key }">
            <span class="title"><a href="javascript:void(0);" @click.stop="details(item.url)">{{ item.title }}</a></span>
            <label class="date-label">Published At: </label>
            <span class="date" v-if="view === config.list.key">{{ item.date | moment("Do MMMM YYYY") }}</span>
            <span class="date" v-if="view === config.grid.key">{{ item.date | moment("DD.MM.YYYY") }}</span>
            <label class="choices-label">Choices: </label>
            <span class="choices">{{ item.choices ? item.choices : '' }}</span>
            <div class="clearfix"></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row navigation" v-if="navigation">
      <div class="col-md-12 hide">
        <b-btn v-for="to in navigation" :key="to.rel" size="sm" @click.stop="navigateTo(to.url)">
          {{ to.rel }}
        </b-btn>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { view } from '../config'

export default {
  methods: {
    /**
     * Navigates to
     */
    navigateTo (url) {
      this.loadQuestions(url)
    },
    details (url) {
      this.loadQuestion(url)
    },
    /**
     * Maps the needed actions
     */
    ...mapActions([
      'loadQuestions', 'loadQuestion'
    ])
  },
  computed: {
    /**
     * Passes the config
     */
    config () {
      return view
    },
    /**
     * Gets next link
     */
    navigation () {
      return this.questions && this.questions.navigation ? this.questions.navigation : undefined
    },
    /**
     * Transforms the data it shall
     * in the format it needs
     */
    reduced () {
      if (this.questions && this.questions.items) {
        return this.questions.items.map(item => {
          return {
            url: item.url,
            title: item.question,
            date: item.published_at,
            choices: item.choices.length
          }
        })
      } else {
        return []
      }
    },
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'questions', 'questionsLoading', 'questionsLoadError',
      'view'
    ])
  },
  mounted: function () {
    this.loadQuestions()
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  height: calc(100%);
  min-height: 200px;

  .data {
    .hide {
      ul {
        list-style: none;

        li {
          overflow: hidden;

          &.grid {
            display: block;
            border: 2px solid #afafaf;
            border-radius: 5px;
            background-color: #efefef;
            margin: 5px;
            padding: 8px 5px 5px 5px;
            width: 270px;
            height: 140px;
            float: left;

            .title {
              display: block;
              width: 100%;
              margin-top: 15px;
              margin-bottom: 25px;
              text-align: center;
              overflow: hidden;
              z-index: 10;
              position: relative;
              background-color: rgba(255, 255, 255, 0.75);
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .date-label {
              display: block;
              float: left;
              width: 45%;
              margin-bottom: 0;
            }

            .date {
              display: block;
              float: right;
              width: 55%;
              text-align: left;
              overflow: hidden;
              z-index: 10;
              position: relative;
              background-color: rgba(255, 255, 255, 0.75);
              white-space: nowrap;
              text-overflow: ellipsis;
              clear: right;
            }

            .choices-label {
              clear: left;
              display: block;
              float: left;
              width: 45%;
              margin-botton: 0;
            }

            .choices {
              display: block;
              width: 55%;
              text-align: left;
              overflow: hidden;
              z-index: 10;
              position: relative;
              background-color: rgba(255, 255, 255, 0.75);
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          &.list {
            display: block;
            border: 1px solid #afafaf;
            border-radius: 5px;
            background-color: #efefef;
            margin: 5px;
            padding: 8px 5px 5px 5px;

            .title {
              float: left;
              text-align: left;
              padding-left: 15px;
              color: #afafaf;
              width: 60%;
              overflow: scroll;
              text-overflow: ellipsis;
            }

            .date-label {
              display: none;
            }

            .date {
              float: left;
              text-align: left;
              padding-left: 15px;
              color: #afafaf;
            }

            .choices-label {
              display: none;
            }

            .choices {
              float: right;
              text-align: left;
              padding-left: 15px;
              color: #afafaf;
              padding-right: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
