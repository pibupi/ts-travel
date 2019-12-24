export interface FuncInterface {
  name: string
  (arg: number): string
}
export class ClassC {
  constructor() {}
}
class ClassD {
  constructor() {}
}
export {ClassD}
export {ClassD as ClassNamedD}
export * from './b'
export { name} from './b'
export {name as NameProp} from './b'
