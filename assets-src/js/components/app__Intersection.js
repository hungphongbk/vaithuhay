
  const $app = document.getElementById('app'),
    callbacks = new Set(),
    appObserver = new IntersectionObserver(() => {
    }, {
      root: $app,
      rootMargin: '0% 0% 10% 0%',
      threshold: 0
    })
  export default {
    name:'Intersection',
    data:()=>({
      el:null
    }),
    render(h){
      return this.$slots.default[0]
    },
    mounted(){
      Object.observe(this.$slots.default,changes=>{
        console.log(changes)
      })
    }
  }
