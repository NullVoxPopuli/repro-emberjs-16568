import Route from '@ember/routing/route';

import { setComponentTemplate } from '@ember/component';
import _templateOnlyComponent from '@ember/component/template-only';

import { compileTemplate as _compile } from '@ember/template-compilation';

const code = `
<ul>
  {{#each (array
    (hash href='https://emberjs.com' text='Ember home page')
    (hash href='https://github.com/nullvoxpopuli' text='My GitHub')
    (hash href='https://twitter.com/nullvoxpopuli' text='My Twitter')
  ) as |site|}}
    <li>
      <a href={{site.href}} target="_blank">{{site.text}}</a>
    </li>
  {{/each}}
</ul>
`;

export default class ApplicationRoute extends Route {
  async model() {
    const foo = toComponent(
      compileTemplate(code, { moduleName: 'repro-foo' }),
      'repro-foo'
    );

    return { foo };
  }
}

function toComponent(template, name) {
  // https://github.com/glimmerjs/glimmer-vm/blob/master/packages/%40glimmer/runtime/lib/component/template-only.ts#L83
  return setComponentTemplate(template, _templateOnlyComponent(name));
}

function compileTemplate(text, { moduleName }) {
  let compiled = _compile(text, {
    strictMode: false,
    moduleName,
    locals: [],
    isProduction: false,
    meta: {},
    plugins: {
      ast: [],
    },
  });

  return compiled;
}
