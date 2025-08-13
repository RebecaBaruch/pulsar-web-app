module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/app/{{kebabCase name}}/controller/index.controller.tsx',
        templateFile: './templates/controller.hbs'
      },
      {
        type: 'add',
        path: '../src/app/{{kebabCase name}}/view/index.view.tsx',
        templateFile: './templates/view.hbs'
      },
      {
        type: 'add',
        path: '../src/app/{{kebabCase name}}/page.tsx',
        templateFile: './templates/page.hbs'
      }
    ]
  });
};
