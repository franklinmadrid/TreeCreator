//Js file of all the functions of renderer.js
//used for unit testing only

function recursionPreOrder(inOrder, result){
    if (inOrder.length == 1){
        result.push(inOrder[0]);
        return result;
    }else{
        const rootPos =findRoot(inOrder);
        result = recursionPreOrder(inOrder.slice(rootPos,rootPos+1), result);
        result = recursionPreOrder(inOrder.slice(0,rootPos), result);
        result = recursionPreOrder(inOrder.slice(rootPos+1,inOrder.length), result);
        return result;
    }
}

//returns inOrder array as a Pre Order array using recursion.
function recursionPostOrder(inOrder, result){
    if (inOrder.length === 1){
        result.push(inOrder[0]);
        return result;
    }else{
        const rootPos =findRoot(inOrder);
        result = recursionPostOrder(inOrder.slice(0,rootPos), result);
        result = recursionPostOrder(inOrder.slice(rootPos+1, inOrder.length), result);
        result = recursionPostOrder(inOrder.slice(rootPos, rootPos+1), result);
        return result;
    }
}
//returns in order root position of array input
function findRoot(input){
    let rootPos= -1;
    let firstPriority = false;
    let secondPriority = false;
    //Searches for in order root of array input
    for(let i =0; i < input.length; i++){
        if(input[i] == "+" || input[i] == "-"){
            rootPos = i;
            firstPriority = true;
        }else if((input[i] == "*" || input[i] == "/") && !firstPriority){
            rootPos = i;
            secondPriority = true;
        }else if(input[i] == "^" && !secondPriority && !firstPriority){
            rootPos = i;
        }
    }
    return rootPos;
}
function findRootObjects(input){
    let rootPos= -1;
    let firstPriority = false;
    let secondPriority = false;
    //Searches for in order root of array input
    for(let i =0; i < input.length; i++){
        if(input[i].child == "+" || input[i].child == "-"){
            rootPos = i;
            firstPriority = true;
        }else if((input[i].child == "*" || input[i].child == "/") && !firstPriority){
            rootPos = i;
            secondPriority = true;
        }else if(input[i].child == "^" && !secondPriority && !firstPriority){
            rootPos = i;
        }
    }
    return rootPos;
}
function recursionTreeDataPre(inOrder, result, parent){
    if (inOrder.length === 1){
        inOrder[0].parent = parent;
        result.push(inOrder[0]);
        return result;
    }else{
        const rootPos =findRootObjects(inOrder);
        result = recursionTreeDataPre(inOrder.slice(rootPos,rootPos+1), result, parent);
        result = recursionTreeDataPre(inOrder.slice(0,rootPos), result, inOrder[rootPos].id);
        result = recursionTreeDataPre(inOrder.slice(rootPos+1,inOrder.length), result, inOrder[rootPos].id);
        return result;
    }
}

function inputCheck(input){
    let valid = true;
    const inputArr = input.split("");
    if(input.length < 2){valid = false}
    for(let i = 0; i<inputArr.length;i++) {
        if (inputArr[i] == " ") {
            valid = false;
            //checks if current character is an operator
        } else if (/[\^\/*\-+]/.test(inputArr[i])) {
            if (i == 0 || i == inputArr.length - 1) {
                valid = false;
                //checks if current operator has another operator next to it
            } else if (/[\^\/*\-+]/.test(inputArr[i - 1]) || /[\^\/*\-+]/.test(inputArr[i + 1])) {
                valid = false;
            }
        }
    }
    return valid;
}
function objectFactory(element,id){
    return {"child": element,
            "id": String(id),
            "parent": ""}
}
function elementToObjects(array){
    let tmp = [];
    for(let i = 0;i<array.length;i++){
        tmp.push(objectFactory(array[i],i));
    }
    return tmp;
}
function evaluate(input){
    let answer = eval(input);
    return answer;
}

module.exports = {findRoot, recursionPreOrder, recursionPostOrder, inputCheck, findRootObjects,recursionTreeDataPost: recursionTreeDataPre, elementToObjects, evaluate };