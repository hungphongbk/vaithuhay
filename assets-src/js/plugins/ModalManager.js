import Vue from "vue";
import Modal from "@/components/modal";
import { SYSTEM_MODAL_HIDE, SYSTEM_MODAL_SHOW } from "@/types";

const $modalEvent = new Vue();

const SystemModal = {
  functional: true,
  render(h, { data }) {
    const { title, content, commands, options = {} } = data.attrs;
    const { isDismissable } = Object.assign({}, options, {
      isDismissable: false
    });
    const renderedCommands = commands.map(
      ({ label, callback, isPrimary = false }) => (
        <div
          class={["btn", isPrimary ? "btn-theme-red" : "btn-default"]}
          onClick={callback}
        >
          {label}
        </div>
      )
    );

    return (
      <Modal title={title} is-dismissable={isDismissable}>
        <div class="modal-body">{content}</div>
        <div class="modal-footer">{renderedCommands}</div>
      </Modal>
    );
  }
};

export { $modalEvent, SystemModal };

export default (title, content, commands, _options = {}) =>
  new Promise(resolve => {
    const _commands = commands.map(({ label, type, isPrimary = false }) => ({
      label,
      isPrimary,
      callback() {
        $modalEvent.$emit(SYSTEM_MODAL_HIDE);
        resolve(type);
      }
    }));
    $modalEvent.$emit(SYSTEM_MODAL_SHOW, {
      title,
      content,
      commands: _commands,
      options: _options
    });
  });
