// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare const System: any;
declare const ENV:string;
// google code-prettify
declare const PR:any;

declare const require:any;
declare const global:any;

// Some do it the other way around.
declare module 'json!*' {
  const value: any;
  export default value;
}
