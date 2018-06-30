<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .article-main {
    padding-top:100px;
    &-title {
      font-weight: 700;
      display: inline-block;
      width: 80%;
      margin-top: 0;
      line-height: $font-size-h1*1.3;
      @include responsive('xs-max') {
        width: 100%;
        @include font-size-with-line-height($font-size-h3)
      }
    }
    .created {
      color: #666;
      .fa {
        margin-right: .3em;
      }
    }
    &-content, &-comment {
      text-align: justify;
      margin-top: 50px;
    }
  }

  .article-nav {
    background-color: darken(#fff, 2%);
    width: 100%;
    border-top: 1px solid darken(#fff, 10%);
    border-bottom: 1px solid darken(#fff, 10%);
    margin-top: 40px;
    margin-bottom: 40px;

    &-links {
      .link {
        @extend %reset-link;
        color: #888;
        font-weight: 700;
        border-bottom: 3px solid transparent;
        display: inline-block;
        padding: 20px 5px 17px;
        margin: 0 15px;
        cursor: pointer;
        &.active {
          color: #555;
        }
      }
    }
    .number {
      $size: $font-size-base*1.2;
      font-size: $font-size-base*0.95;
      display: inline-block;
      transform: translateY(-0.5em);
      margin-left: 0.3em;
      font-weight: 500;
      height: $size;
      width: $size;
      line-height: $size;
      text-align: center;
      border-radius: 50%;
      background-color: $theme-red-color;
      color: white;
      &.zero {
        background-color: #888;
      }
    }
  }

  .related-articles {
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

  .related-articles-bottom {
    .item {
      @extend %reset-link;
      @extend %no-focus;
      display: block;
      padding: 0 5px;
      @include responsive('sm-min') {
        padding: 0 15px;
      }
      .title {
        $font: $font-size-h4;
        @include font-size-with-line-height($font*0.95);
        text-transform: uppercase;
        font-weight: 700;
        @include responsive('xs-max') {
          @include font-size-with-line-height($font*0.75);
          margin-bottom: .3rem;
        }
      }
    }
  }

  .article-main-content /deep/ {
    h1, h1 > span {
      font-size: $font-size-h4*0.85 !important;
      @include font-size-with-line-height($font-size-h4*0.85);
      color: #666;
      font-weight: 700;
    }
    ul, ol {
      list-style: circle;
      -webkit-padding-start: 2rem;
      -moz-padding-start: 2rem;
    }
    overflow: hidden;

    p > span {
      line-height: 1.55em;
    }
    img {
      width: 100%;
      height: auto;
    }
    .wholesale-item {
      margin-top: 40px;
      margin-left: 4px;
      margin-right: 4px;
      width: calc(100% - 8px);
      @include responsive('sm-min') {
        width: 80%;
      }
    }
  }

  .article-main-comment {
    @include responsive('sm-max') {
      margin-bottom: 2*$line-height-computed;
    }
    input {
      @include responsive('sm-min') {
        width: 50%;
      }

    }
    .form-control {
      border: 1px solid darken(#fff, 20%)
    }
  }

  .related-product {
    @extend %reset-link;
    display: block;
    width: 80%;
    margin-top: $line-height-computed*2;
    background: lighten($theme-color, 30%);
    @include outline-effect(desaturate(lighten($theme-color, 17%), 15%));
    /*display: table;*/
    &-thumb, &-detail {
      /*display: table-cell;*/
    }
    &-thumb {
      width: 30%;
      float: left;
    }
    &-detail {
      width: 70%;
      margin-left: 30%;
      padding-left: 2rem;
      padding-right: 2rem;
      .buynow {
        color: saturate(darken($theme-color, 16%), 5%);
        @include font-size-with-line-height($font-size-base*1.17);
      }
    }
  }
</style>
<template lang="pug">
  .article-main
    .container
      h1.article-main-title {{title}}
      p.description {{excerpt}}
    .article-nav
      .container
        .row
          .indicator
          .article-nav-links
            a.link(:class="{'active':tab==='content'}", @click="tab='content'") {{$t('content')}}
            a.link(:class="{'disabled': !comments.enabled, 'active':tab==='comment'}", @click="comments.enabled && (tab='comment')") {{$t('comments')}}
              span.number(v-if="comments.enabled", :class="{'zero':commentCount_===0}") {{commentCount_}}
    .container
      .row.gutter-40(sticky-container)
        .col-sm-8
          div.article-main-content(v-show="tab==='content'")
            component(:is="body")
          div.article-main-comment(v-show="tab==='comment'")
            template(v-if="commentCount_>0")
              ul
                li(v-for="comment in comments.list")
                  h5
                    strong {{comment.author}}
                    | &nbsp;vào lúc {{comment.created?comment.created:'vừa mới đây'}}
                  p.comment-content {{comment.content}}
            .text-center.text-muted(v-else)
              p
                | Bài viết chưa nhận được lượt comment nào.
                br
                | Hãy là người đầu tiên! :)
            form(style="margin-top: 40px", ref="form")
              .form-group
                input.form-control(placeholder="Tên của bạn", v-model="newComment.name", name="comment[author]")
              .form-group
                input.form-control(type="email", placeholder="Email của bạn", v-model="newComment.email", name="comment[email]")
              .form-group
                textarea.form-control(rows="4", :placeholder="$t('q')", v-model="newComment.content", name="comment[body]")
              .form-group
                div(ref="captcha")
            transition(name="vth-fade")
              p(v-if="status") {{status}}
            .btn.btn-grey(@click="sendComment") {{$t('send')}}
        .col-sm-4.related-articles
          div(v-if="relatedProducts.length>0" v-sticky sticky-offset="offset")
            h3.title CÁC SẢN PHẨM LIÊN QUAN
            ul
              li(v-for="rel in relatedProducts")
                a.inner(:href="rel.current.url")
                  thumbnail(:url_="rel.images[0].small", ratio_="1-1", :overlay_="false")
                  h5.title {{rel.current._title[$i18n.locale]}}
    .pt-5(v-dark-panel)
      .container.related-articles-bottom
        item-loop.pt(:slider-opts="slickOptions_", :list="relateds")
          template(slot="item", slot-scope="p")
            a.item(:href="p.item.url")
              thumbnail(ratio_="1-1", :overlay_="false", :url_="p.item.image", :lazy_="false")
              .ratio-6-5
                .content
                  h4.title {{p.item.title}}
                  p(v-if="!$mq.tablet") {{p.item.excerpt}}
                  p {{$t('seemore')}}
                    i.fa.fa-chevron-right.ml-1
</template>
<script>
  import transform from '../plugins/content-transform';
  import {delay} from '../components/helpers';
  import ProductWholeSaleItem from '../fragments/product__WholeSale-Item.vue';
  import {ItemLoop} from "@/components";
  import {slickOptions_} from "@/components/helpers";
  import {DarkPanel} from "../plugins/directives";


  const $ = jQuery,
    urlConcat = (base, append) => {
      let url = base;
      if (url[url.length - 1] !== '/' || append[0] !== '/') url += '/';
      url += append;
      return url;
    };

  const {id, title, url, author, excerpt, content, created, relateds, comments} = window.article;
  export default {
    components: {ItemLoop},
    directives: {DarkPanel},
    data() {
      return {
        title,
        url,
        author,
        excerpt,
        created,
        relateds: relateds.filter(article => article.id * 1 !== id * 1),
        comments,
        content,
        tab: 'content',
        relatedProducts: [],
        newComment: {
          name: '',
          email: '',
          content: ''
        },
        status: null,
        slickOptions_,
        offset:{
          top:80,
          bottom:40
        }
      };
    },
    computed: {
      commentCount_() {
        return comments.list.length;
      }
    },
    asyncComputed: {
      async body() {
        await
          delay(200);
        const res = await transform([
          'responsiveFrame',
          'markupTable',
          'productComboEmbed'
        ], this);
        res.components = {
          ProductWholeSaleItem
        };
        return res;
      }
    },
    methods: {
      flashStatus(status, timeout = 3000) {
        this.status = status;
        setTimeout(() => {
          this.status = null;
        }, timeout);
      },
      async sendComment() {
        const self = this;
        // auth.wrap(async ()=>{
        //
        // })()
        const {name, email, content} = self.newComment;
        if (name.length === 0 || email.length === 0 || content.length === 0) {
          self.flashStatus('Thông tin bạn nhập chưa đầy đủ');
        } else {
          await $.ajax({
            type: 'POST',
            url: urlConcat(window.location.href, 'comments'),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $(this.$refs.form).serialize()
          });
          if (self.comments.moderated) {
            self.flashStatus('Bình luận thành công! Tuy nhiên, lời bình cần được kiểm duyệt trước khi đăng lên', 5000);
          } else {
            self.flashStatus('Bình luận của bạn đã được đăng lên', 5000);
            self.comments.list.push({
              author: name,
              content
            });
          }
          await $.ajax({
            type: 'POST',
            url: 'https://vaithuhay.us17.list-manage.com/subscribe/post-json?u=a8c643e31c4f6fe8d2d5ec949&amp;id=ae079e8ffd&c=?',
            data: $.param({
              EMAIL: email
            }),
            dataType: 'jsonp'
          });
        }
      }
    },
    async mounted() {
      const {item} = await $.get('https://server.vaithuhay.com/b/articles/' + id + '/related');
      if (typeof item === 'undefined' || item.length === 0) return;
      const products = await Promise.all(item.map(i => $.get('https://server.vaithuhay.com/b/products?id=' + i)));
      const relateds = await Promise.all(products.map(({handle}) => new Promise(resolve => {
        $.get('/products/' + handle + '/?view=json')
          .then(rs => {
            resolve(JSON.parse(rs));
          });
      })));
      this.relatedProducts.push(...relateds);

      //init captcha
      $.getScript('https://www.google.com/recaptcha/api.js?render=explicit', () => {
        grecaptcha.render(this.$refs.captcha, {
          sitekey: '6LegnfkSAAAAAOV7USensnoe5Ku5UVMqktvu6_Ui'
        });
      });
    }
  };
</script>
<i18n>
  {
    "en": {
      "content": "Content",
      "comments": "Comments",
      "q": "Your comment",
      "send": "Send comment",
      "seemore": "Learn more"
    },
    "vi": {
      "content": "Bài viết",
      "comments": "Bình luận",
      "q": "Bạn nghĩ gì về bài viết này?",
      "send": "Gửi bình luận",
      "seemore": "Đọc thêm"
    }
  }
</i18n>
