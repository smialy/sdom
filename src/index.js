import Binder from './binder';

export default function create(config, element){
   return new Binder(config, element);
}
