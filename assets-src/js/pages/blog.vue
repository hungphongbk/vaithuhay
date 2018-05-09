<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  %center {
    text-align: center;
  }

  .blog {

  }

  .headlines {
    background: $theme-color;
    padding: 60px 30px 40px 30px;
    &-title {
      font-weight: 700;
      color: white;
      font-size: $font-size-h1*1.15;
    }
  }

  .headline-posts {
    @extend %clearfix;
    margin: 0 -4px {
      top: 30px;
    }

    $headline: (
      1 1 50% 1.7*$font-size-base,
      3 2 50% 1.4*$font-size-base,
      3 2 25% $font-size-base,
      3 2 25% $font-size-base
    );
    .headline-post {
      float: left;
      @for $i from 1 through length($headline) {
        &:nth-child(#{$i}) {
          $cell: nth($headline, $i);
          @include aspect-ratio(nth($cell, 1), nth($cell, 2));
          width: nth($cell, 3);
          @if (length($cell)==4) {
            .post-title {
              font-size: nth($cell, 4);
            }
          }
        }
      }
    }
  }

  .headline-post {
    .content {
      padding: 8px;
      .inner {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .headline-detail {
    @extend %reset-link;
    width: 100%;
    height: 100%;
    padding: 1rem;
    display: flex;
    align-items: flex-end;
    background-color: rgba(black, .45);
    &, &:hover {
      color: white;
    }
    transition: all $animation-time ease;
    opacity: 0;
    .headline-post:hover & {
      opacity: 1;
    }
    .post-title {
      width: 75%;
    }
  }

  .sort-form {
    @extend %center;
    > div {
      display: inline-block;
      font-size: $font-size-base*1.4;
    }
    margin-bottom: 40px;
    @include responsive('xs-max') {
      margin-bottom: $grid-gutter-width/2;
    }
    .overlay-selector.sort-selector {
      display: inline-block;
      margin-left: $grid-gutter-width;
      min-width: 240px;

      .sort-title {
        text-align: left;
      }

      /deep/ .indicator {
        padding-bottom: 4px;
        border-bottom: 1px solid;
      }
    }
  }

  .post-list {
    padding-top: 40px;
    .description {
      height: $line-height-computed*7;
      color: #555;
      a {
        @extend %reset-link;
        display: inline-block;
        cursor: pointer;
      }
      .title {
        line-height: $font-size-h4*1.4;
        font-weight: 700;
      }
    }
    .inner {
      border-bottom: 1px dashed #ccc;
      margin-bottom: 20px;
    }
  }

  .related-articles {
    margin-top: 40px;
    > .title {
      height: 50px;
      margin: 0;
      font-weight: 700;
      color: #444;
    }
    li {
      .inner {
        @extend %reset-link;
        @extend %clearfix;
        display: block;
      }
      &:not(:last-child) .inner {
        padding-bottom: 12px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 12px;
      }
      .vth-thumb {
        width: 80px;
        float: left;
        margin-right: 15px;
      }
      .title {
        margin-top: 0;
        color: #666;
        font-size: $font-size-h5*1.1;
        line-height: $font-size-h5*1.55;
      }
      &:hover .title {
        color: #444;
      }
    }
  }

  #main-list {
    position: absolute;
    top: -$navbar-height;
  }
</style>
<template lang="pug">
  .blog
    .headlines
      .container
        .title-outer.text-center
          h1.headlines-title CÓ GÌ HOT?
        article-loop.headline-posts(:list="headlines")
          .headline-post(slot="item", slot-scope="p")
            .content
              .inner
                img(:src='p.item.image')
            .content
              a.headline-detail(:href="p.item.url")
                h4.post-title {{p.item.title}}
    .container(style="position: relative")
      #main-list
      .row.gutter-40
        .col-sm-8.post-list
          .sort-form
            div
              span Sắp xếp bởi
              overlay-selector.sort-selector(:list="sort_", v-model="currentSort_")
                template(slot="current", slot-scope="p")
                  span {{p.item.title}}
                template(slot="item", slot-scope="p")
                  h2.sort-title {{p.item.title}}
          paginate.row(:for_="articles", :perPage="6", @navigated="navigated")
            template(slot-scope="p")
              .col-md-6(v-for='post in p.list', :key='post.id')
                .inner
                  thumbnail.no-effect(:url_="post.image", ratio_="4-3", :overlay_="false")
                  .description
                    a(:href="post.url")
                      h4.title {{post.title}}
                      p Viết bởi&nbsp;
                        strong {{post.author}}
                        | &nbsp;vào lúc {{post.diff}}
        .col-sm-4.related-articles
          h3.title {{$t('related')}}
          ul
            li(v-for="rel in relateds")
              a.inner(:href="rel.url")
                thumbnail(:url_="rel.image", ratio_="1-1", :overlay_="false")
                h5.title {{rel.title}}
</template>
<script>
  import {ItemLoop as ArticleLoop, OverlaySelector} from '../components/index';
  import Paginate                                   from '../components/paginate.vue';

  export default {
    components: {ArticleLoop, Paginate, OverlaySelector},
    data() {
      const self = this,
        f = (id, title) => ({id, title}),
        sort_ = [
          f('new', 'Mới'),
          f('name', 'A-Z'),
        ];
      window.blog.forEach(async article => {
        self.$set(article, 'diff', '');
        const moment = await import(/* webpackChunkName: "locale" */ '../plugins/moment');
        self.$set(article, 'diff', moment.default(article.created, 'DD/MM/YYYY HH:mm:ss').fromNow());
      });
      return {
        blog: window.blog,
        relateds: window.blog.slice(0, 6),
        sort_,
        currentSort_: sort_[0]
      };
    },
    computed: {
      headlines() {
        return this.blog.slice(0, 4);
      },
      articles() {
        return this.blog.slice(4);
      }
    },
    methods: {
      navigated() {
        $.scrollTo('#main-list');
      }
    }
  };
</script>
<i18n>
  {
    "en": {
      "related": "RELATED ARTICLES"
    },
    "vi": {
      "related": "CÁC BÀI VIẾT LIÊN QUAN"
    }
  }
</i18n>
