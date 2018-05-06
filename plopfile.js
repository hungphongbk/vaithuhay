const validatorNotEmpty = (name) => (value) => value.length ? true : `${name} is required`;
module.exports = function (plop) {

  plop.handlebars.registerHelper("x", function (expression, options) {
    var result;
    var context = this;
    with (context) {
      result = (function () {
        try {
          return eval(expression);
        } catch (e) {
          console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
        }
      }).call(context);
    }
    return result;
  });
  plop.handlebars.registerHelper("xif", function (expression, options) {
    return plop.handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
  });
  plop.addHelper('vueExtensionForType', function (type) {
    return type === 'tsx' ? 'vuex' : 'vue';
  });

  plop.setGenerator('vue', {
    description: 'Create new Vue component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: validatorNotEmpty("Component name"),
      },
      {
        type: 'list',
        name: 'lang',
        default: 'ts',
        choices: [
          {value: 'ts', name: 'TypeScript'},
          {value: 'tsx', name: 'TypeScript with JSX support'},
          {value: '', name: 'Javascript'},
        ],
        message: 'Component language:',
      },
      {
        type: 'input',
        name: 'folder',
        message: 'Component path:',
        validate: validatorNotEmpty("Component path"),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'assets-src/js/{{folder}}/{{pascalCase name}}.{{vueExtensionForType lang}}',
        templateFile: 'plopTmpl/component.vue',
      },
    ],
  });
};
