<style lang="scss" module>
  @import "../../sass/inc/inc";

  .container {
    min-height: 100%;
  }

  .item {
    padding: .3rem 1.3rem;
    border-radius: 4px;
    background: white;
    margin-bottom: .7rem;

    .item-inner {
      display: flex;
    }
    &:hover, &.edit-mode {
      background: #f3f3f3;
    }
  }

  .info {
    flex-grow: 1;
    h5 {
      display: inline-block;
      text-transform: uppercase;
    }
    @at-root .default {
      margin-left: 2rem;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
  }

  .action {
    cursor: pointer;
    padding: 5px 6px;
    margin-top: 2px;
    border-radius: 4px;
    transition: background-color $animation-time ease;
    background-color: rgba(#000, 0);
    &:hover {
      background-color: rgba(#000, .07);
    }
    &.edit {
      color: $brand-primary;
    }
    &.remove {
      color: $brand-danger;
    }
  }

  .edit-panel {
    display: block;
    :global {
      .form-group {
        margin-bottom: 7px;
      }
      .col-form-label {
        text-align: left;
      }
      .form-control {
        border: 1px solid #ccc {
          radius: .4rem;
        }
      }
    }
  }
</style>
<template lang="pug">
  div(:class="$style.container")
    flash-message-hub(label="user/address")
    ul
      li(v-for="item in address", :class="{ [$style.item]: true, [$style.editMode]: item.isEditMode }")
        transition(name="vth-fade")
          div(v-if="!item.isEditMode", :class="$style.itemInner")
            div(:class="$style.info")
              h5 {{item.first_name}} {{item.last_name}}
              span(v-if="item.default", :class="['text-success', $style.default]")
                fa-icon(:icon="faCheckCircle")
                | &nbsp;Địa chỉ mặc định
              p
                span.text-muted Địa chỉ:&nbsp;
                | {{item.fullAddress}}
              p
                span.text-muted Số điện thoại:&nbsp;
                | {{item.phone}}
            div(:class="$style.actions")
              div(:class="[$style.action, $style.edit]", @click="beginEdit(item)")
                fa-icon(:icon="faEdit", size="lg")
              div(v-if="!item.default", :class="[$style.action, $style.remove]", @click="deleteItem(item)")
                fa-icon(:icon="faTrashAlt", size="lg")
          div(v-else, :class="$style.editPanel")
            form
              .form-group.row
                .col-sm-12
                  h5 Chỉnh sửa địa chỉ liên lạc
              .form-group.row
                label.col-form-label.col-sm-3 Họ và tên
                .col-sm-9
                  input.form-control(type="text", v-model="edit.fullName")
              .form-group.row
                label.col-form-label.col-sm-3 Số điện thoại
                .col-sm-9
                  input.form-control(type="text", v-model="edit.phone")
              .form-group.row
                label.col-form-label.col-sm-3 Địa chỉ
                .col-sm-9
                  textarea.form-control(rows="3", v-model="edit.address1")
              .form-group.row
                .col-sm-9.col-sm-offset-3
                  btn.btn-success(:icon="faSave", @click="updateItem(edit.toObject)") CẬP NHẬT
                  btn.btn-danger.ml-2(v-if="!item.default", :icon="faTrashAlt", @click="deleteItem(item)") XÓA
                  btn.btn-default.ml-2(@click="cancelEdit") BỎ QUA
</template>
<script lang="ts" src="./UserPanelPageAddresses.vue.ts"></script>
