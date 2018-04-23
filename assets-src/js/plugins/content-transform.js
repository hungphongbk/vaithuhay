const $ = jQuery;
import 'lazyloadxt/src/jquery.lazyloadxt'
import 'readmore-js'
import Vue from 'vue'

function lazyloadImg($html) {
  let i = 0;
  $html.find('img').each((_, img) => {
    if (++i > 3) {
      const $img = $(img),
        src = $img.attr('src');
      $img.addClass('lazy')
        .removeAttr('src')
        .attr('v-lazy', "'" + src + "'");
    }
  });
}

function ptype($html) {
  //Neu $html chi co mot child, can phai chuan hoa lai HTML
  while ($html.children().length === 1) {
    const firstChild = $html.children(0);
    firstChild.replaceWith(firstChild.children())
  }
  const is = (node, tag) => node.nodeName.toLowerCase() === tag

  function normalize(child) {

  }

  //Danh dau type
  $html.children().each((_, child) => normalize(child))
  $html.children().each((_, child) => {
    const $child = child.nodeName === 'P' ? $(child).children(0)[0] : child;
    if ($child) {
      $(child).attr('data-node-type', $child.nodeName);
      switch ($child.nodeName) {
        case 'BR':
          if ($(child).children.length === 1)
            $(child).detach();
          break;
        case 'IMG':
          $(child).data('type', 'img');
          $(child).data('src', $child.getAttribute('src'));

          //except: vaithuhay embed
          if ($child.hasAttribute('data-vaithuhay-embed-type')) {
            $(child).attr('data-node-type', 'VAITHUHAY');
            $(child).data('type', 'vaithuhay');
            $(child).data('embed-type', $($child).data('vaithuhay-embed-type'));
            $(child).data('embed-data', $($child).data('vaithuhay-embed'));
            $($child).detach();
          }
          break;
        case 'H3':
          $(child).data('type', 'header');
          break;
        default:
          break;
      }
      // else $(child).detach();
    }
  })
}

function responsiveFrame($html) {
  const self = this;
  let $videoFrame = null;
  $html.find('iframe').each((_, frame) => {
    const $frame = $(frame);
    // if (!$videoFrame && /youtube.com/.test($(frame).attr('src'))) {
    //     $videoFrame = $(frame);
    //     $videoFrame.detach();
    //     self.injectVideo_($videoFrame)
    // }
    const ratio = ($frame.attr('height') * 1) / ($frame.attr('width') * 1);

    // setTimeout(() => {
    //   const w = $frame.width(),
    //     h = w * ratio;
    //   console.log(`${ratio} ${w} ${h}`);
    //   $frame.width(w).height(h);
    // }, 3000)
  })
}

function markupTable($html) {
  $($html).find('.mce-item-table')
    .each((_, table) => $(table)
      .addClass('table table-hover table-bordered')
      .css('width', '100%')
    );
}

function responsiveImg($html) {
  $html.find('img').css({
    'max-width': '100%',
    'height': 'auto'
  })
}

//TODO: edit /products/:id/wholesale?i={uuid}, get wholesale description by uuid
async function productComboEmbed($html) {
  await Promise.all($html.children().map((_, child) => new Promise(async resolve => {
    if ($(child).data('type') === 'vaithuhay' && $(child).data('embed-type') === 'wholesale') {
      // console.log($(child).data('embed-data'))
      const {apply, rule: uuid} = $(child).data('embed-data'),
        [{rules}] = await $.get(`https://api.v1.hungphongbk.com/vaithuhay/b/products/${apply}/wholesale?i=${uuid}`);
      // console.log(rules);
      $(child).replaceWith(`<product-whole-sale-item class='in-content' :apply='${apply * 1}' :rule=\'${JSON.stringify(rules[0])}\'></product-whole-sale-item>`);
    }
    resolve()
  })))
  // console.log('resolved all')
}

function makeGallery($html, options) {
  const {imgCount_} = options,
    stack = [];
  let first = false;

  function process(stack) {
    // console.log('ahihi');
    const count = stack.length,
      images = [];
    stack.forEach(($el, i) => {
      // console.log(i);
      images.push($el.data('src'));
      if (i !== count - 1) $el.detach();
      else {
        $el.replaceWith(`<product-images :images_=\'${JSON.stringify(images.map(i => ({
          small: i,
          original: i
        })))}\' :label-indicator_="true" :full-screen_="true"></product-images>`)
      }
    });
  }

  $html.children().each((_, child) => {
    if ($(child).data('type') === 'img') {
      if (first) first = false;
      else stack.push($(child));
    } else {
      // console.log(stack.length, imgCount_);
      if (stack.length >= imgCount_) process(stack);
      stack.length = 0;
    }
  });
  if (stack.length >= imgCount_) process(stack);
}

function makeExpandable($html) {
  const stack = [];
  let first = true;

  function process() {
    const $header = stack.shift(),
      header = $header.text(),
      content = stack.map($el => {
        const html = $el[0].outerHTML;
        $el.detach();
        return html;
      }).join('');
    $header.replaceWith(`<product-expandable title=\'${header.trim()}\'>${content}</product-expandable>`);
    stack.length = 0;
  }

  $html.children().each((_, child) => {
    if (first) {
      if ($(child).data('type') === 'header') first = false;
      else return true;
    }
    if ($(child).data('type') === 'header') {
      if (stack.length > 1) process();
    }
    stack.push($(child))
  });

  if (stack.length > 1) process();
}

const list = {
  ptype,
  responsiveFrame,
  markupTable,
  responsiveImg,
  makeGallery,
  makeExpandable,
  lazyloadImg,
  productComboEmbed
};

export default async (transforms, component) => {
  const html = component.content,
    $content = $(`<div>${html}</div>`);
  transforms.unshift('ptype');
  for (const t of transforms) {
    if (typeof t === 'string')
      await list[t].call(component, $content, {});
    else {
      const [f, opt] = t;
      await list[f].call(component, $content, opt);
    }
  }
  return Vue.compile(`<div>${$content.html()}</div>`);
}
