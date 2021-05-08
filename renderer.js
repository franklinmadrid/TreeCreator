//When document(index.html) is ready run this code
$(document).ready(function() {
    const math = require('mathjs');
    //When PreOrder button is clicked it will execute code below
    $("#btnPre").click(function(e){
        e.preventDefault();
        const input = $("#UserInput").val();
        //checks if user input is valid, if it is will return preorder traversal with tree
        //If not valid will alert user that input was not valid
        if (inputCheck(input) ){
            const inOrderArr = input.split("");
            const resultArr = recursionPreOrder(inOrderArr, []);
            const result = resultArr.join("");
            //Change Output to pre order Traversal text
            document.getElementById("output").innerText = result;
            let answer='';
            try{
                answer=evaluate(input);
            }catch(err){
                answer="Cannot evaluate expression";
            }
            document.getElementById("answer").innerText = answer;
            //processes input to be used as data in the format needed to
            //create a tree with the createTree function
            let data = recursionTreeDataPre(elementToObjects(input), [], "");
            //updates tree graphic instead of creating new tree graphic
            if($("#tree").length > 0){
                $("#tree").remove();
                createTree(data);
            }else{
                createTree(data);
            }
        }else{
            alert("Input is invalid");
            window.location.reload();
        }

    })

    //When InOrder button is clicked it will execute code below
    $("#btnIn").click(function(e){
        e.preventDefault();
        const input = $("#UserInput").val();
        if (inputCheck(input)){
            document.getElementById("output").innerText = input;
            let answer='';
            try{
                answer=evaluate(input);
            }catch(err){
                answer="Cannot evaluate expression";
            }
            document.getElementById("answer").innerText = answer;
            let data = recursionTreeDataPre(elementToObjects(input),[],"");
            if($("#tree").length > 0){
                $("#tree").remove();
                createTree(data);
            }else{
                createTree(data);
            }
        }else {
            alert("Input is invalid");
            window.location.reload();
        }


    })
    //When PostOrder button is clicked it will execute code below
    $("#btnPost").click(function(e){
        e.preventDefault();
        const input = $("#UserInput").val();
        if (inputCheck(input)){
            const inOrderArr = input.split("");
            const resultArr= recursionPostOrder(inOrderArr,[]);
            const result =  resultArr.join("");
            document.getElementById("output").innerText =result;
            let answer='';
            try{
                answer=evaluate(input);
            }catch(err){
                answer="Cannot evaluate expression";
            }
            document.getElementById("answer").innerText = answer;
            let data = recursionTreeDataPre(elementToObjects(input),[],"");
            if($("#tree").length > 0){
                $("#tree").remove();
                createTree(data);
            }else{
                createTree(data);
            }
        }else{
            alert("Input is invalid");
            window.location.reload();
        }

    })

    function evaluate(input){
        let answer = math.evaluate(input);
        return answer;
    }

    //returns inOrder array as a Pre Order array using recursion.
    function recursionPreOrder(inOrder, result){
        //base case
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
        if (inOrder.length == 1){
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
        //Uses reverse PEMDAS to find root of an array
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

    //turns inorder array of objects and populates the parent field
    function recursionTreeDataPre(inOrder, result, parent){
        if (inOrder.length === 1){
            inOrder[0].parent = parent;
            result.push(inOrder[0]);
            return result;
        }else{
            const rootPos =findRootObjects(inOrder);
            result = recursionTreeDataPre(inOrder.slice(rootPos,rootPos+1), result, parent);
            //uses id to allow duplicates since id is unique
            result = recursionTreeDataPre(inOrder.slice(0,rootPos), result, inOrder[rootPos].id);
            result = recursionTreeDataPre(inOrder.slice(rootPos+1,inOrder.length), result, inOrder[rootPos].id);
            return result;
        }
    }

    //same as findRoot function except this is for objects
    //objects are needed to graph the tree and allow duplicates
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

    //Checks if input is in proper inorder format
    //returns true if input is valid, false otherwise
    function inputCheck(input){
        let valid = true;
        const inputArr = input.split("");
        if(input.length < 2){valid = false}
        for(let i = 0; i<inputArr.length;i++) {
            //checks if there are spaces
            if (inputArr[i] == " ") {
                valid = false;
            //checks if operand and operator alternate in proper order
            } else if((i % 2 == 0 && /[\^\/*\-+]/.test(inputArr[i])) || (i % 2 == 1 && !/[\^\/*\-+]/.test(inputArr[i]))){
                valid = false;
            }
        }
        return valid;
    }

    //helper function used to turn elements into objects with specified fields
    function objectFactory(element,id){
        return {"child": element,
            "id": String(id),
            "parent": ""}
    }
    //turns array of elements into array of objects using objectFactory function
    function elementToObjects(array){
        let tmp = [];
        for(let i = 0;i<array.length;i++){
            tmp.push(objectFactory(array[i],i));
        }
        return tmp;
    }

    //creates SVG from tree data
    function createTree(inputData, partitions){
        //initialize svg and set attributes
        let svg = d3.select("body").append("svg")
            .attr("width",600).attr("height", 600).attr("id","tree")
            .append("g").attr("transform", "translate(50,50)");
        let data = inputData;
        //uses data and turns it into a data structure that
        //d3js can use to make a tree with
        let dataStructure = d3.stratify()
            .id(function(d){return d.id;})
            .parentId(function(d){return d.parent;})
            (data);
        //initialize tree Structure
        let treeStructure = d3.tree().size([500,300]);
        let information = treeStructure(dataStructure);
        //creates array of circles with x and y coordinates
        //obtained from descendants
        let circles = svg.append("g").selectAll("circle")
            .data(information.descendants());
        circles.enter().append("circle")
            .attr("cx", function(d){return d.x;})
            .attr("cy", function(d){return d.y;})
            .attr("r",5);
        //creates curved paths using descendant information
        //for source and target x,y coordinates
        //uses control points to curve path
        let connections = svg.append("g").selectAll("path")
            .data(information.links());
        connections.enter().append("path")
            .attr("d",function(d){
                return "M" + d.source.x + "," + d.source.y + " C " +
                    d.source.x + "," + (d.source.y + d.target.y)/2 +
                    " " + d.target.x + "," +  (d.source.y + d.target.y)/2 +
                    " " + d.target.x + "," + d.target.y;
            });
        //displays text of name of node next to circle on the svg
        let names = svg.append("g").selectAll("text")
            .data(information.descendants());
        names.enter().append("text")
            .text(function (d){return d.data.child;})
            .attr("x",function(d){return d.x+7;})
            .attr("y",function(d){return d.y+4;})
    }

});

