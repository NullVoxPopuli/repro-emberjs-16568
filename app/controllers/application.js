import Controller from '@ember/controller';
import { precompileTemplate } from '@ember/template-compilation';

export default class ApplicationController extends Controller {
  get repro() {
    return precompileTemplate(`hi`);
  }
}
