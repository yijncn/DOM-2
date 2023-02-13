// const api = jQuery('.test')//不返回元素们，返回api对象
// api.addClass('red').addClass('blue')//链式操作
//jQuery('.test').addClass('red').addClass('blue')
//jQuery('.test').addClass('red').find('.child').addClass('blue').end().addClass('white')
// const x = jQuery('.test').find('.child')
// x.each((div) => console.log(div))
// x.parent().print()
// const y = jQuery('.test')
// y.children().print()

const $div = $('<div><span>1</span></div>')
const $childList = $('.child')
$('body').append($childList)