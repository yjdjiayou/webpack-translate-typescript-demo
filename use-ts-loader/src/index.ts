interface Person {
    name: string;
    age: number
}

let p: Person = {
    name: 'abc',
    age: 18
};

console.log(p);

class Animal {

    name:string = 'abc';

}
console.log(new Animal().name);

const obj1 = {
    num:66,
    name:'xyz',
};
const obj2 = {...obj1};
console.log(obj2);

let aaa:number;
aaa = '6';


let bbb:string;
bbb = null;


function getA() {
    import('./aaa').then((res)=>{
        console.log(res);
    })
}
getA();










