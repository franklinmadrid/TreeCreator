//Unit testing
const functions = require('./functions');
let testInput = "5+3";
let testArr= ['a','+','b','-','c','*','d','/','e','^','f'];
let testArr2=["8","+","8","+","8"];
let expression="5+5";
/*
//tests findRoot function
test("Finds root of inOrder array", () =>{
    expect(functions.findRoot(testArr)).toBe(3);
})
//tests recursionPreOrder function
test("returns inOrder array to PreOrder", () =>{
    expect(functions.recursionPreOrder(testArr,[])).toEqual(['-','+','a','b','/','*','c','d','^','e','f']);
})
//tests recursionPostOrder function
test("returns inOrder array to PostOrder", () =>{
    expect(functions.recursionPostOrder(testArr,[])).toEqual(['a','b','+','c','d','*','e','f','^','/','-']);
})
// tests inputCheck Function
test("checks if input is valid", () =>{
    expect(functions.inputCheck(testInput)).toBe(true);
})

//used for tracing of recursionTreeDataPost function
test("checks postorder objects", () =>{
    expect(functions.recursionTreeDataPost(functions.elementToObjects(testArr),[],'')).toBe([true]);
})
*/
test("evaluates expression", () =>{
    expect(functions.evaluate(expression)).toBe(10);
})