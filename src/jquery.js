window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        if(selectorOrArrayOrTemplate[0] === '<'){
            // 创建 div
            elements=[createElement(selectorOrArrayOrTemplate)]
        }else{
            // 查找 div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }

    function createElement(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    //api可以操作elements
    return {
        oldApi: selectorOrArray.oldApi,
        jquery: true,
        elements: elements,
        get(index){
        return elements[index]
        },
        appendTo(node){
        if(node instanceof Element){
            this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
        }else if(node.jquery === true){
            this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        }
        },
        append(children){
        if(children instanceof Element){
            this.get(0).appendChild(children)
        }else if(children instanceof HTMLCollection){
            for(let i =0;i<children.length;i++){
            this.get(0).appendChild(children[i])
            }
        }else if(children.jquery === true){
            children.each(node => this.get(0).appendChild(node))
        }
        },
        //闭包：函数访问外部的变量
        addClass(className){
            for(let i = 0; i < elements.length; i++){
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector){
            let array = []
            for(let i = 0; i < elements.length; i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            array.oldApi = this //this 就是 api
            return jQuery(array)    
        },
        end(){
            return this.oldApi //this 就是当前的 api
        },
        each(fn){
            for(let i = 0; i < elements.length; i++){
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent(){
            const array = []
            this.each((node) => {
                if(array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode)
                }                
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
        },
        children(){
            const array = []
            this.each((node) => {
                array.push(...node.children)               
            })
            return jQuery(array)
        }
    }
}

window.$ = window.jQuery