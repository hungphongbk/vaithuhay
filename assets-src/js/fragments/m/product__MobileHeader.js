import style from './product__MobileHeader.m-scss'
import store from '@/store'

export default {
  functional:true,
  render(h){
    return <div class={style.mobileHeader}>
      <h3>{store.state.product.current._title.vi}</h3>
    </div>
  }
}
