
import $ from './dom';
let va = new $(document.querySelector(""))

var t: ArrayLike<Element>;
var b: NodeListOf<Element> = document.querySelectorAll("");
t = b;
interface UserArr{
    //定义索引key为number类型，索引值为string类型
    [index:number]:string
}

class abc implements UserArr{
    [index: number]: string;
    
}