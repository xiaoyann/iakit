// class Query {
//     constructor(selector) {
//         // selector
//         if (typeof selector === 'string') {
//             this.elems = arraySlice(document.querySelectorAll(selector));
//         // Query's instance
//         } else if (selector instanceof Query) {
//             return selector;
//         // dom object    
//         } else {
//             this.elems = [selector];
//         }
//     }

//     each(callback) {
//         this.elems.forEach((elem, index) => {
//             callback.call(elem, elem, index);
//         });
//         return this;
//     }

//     html(html) {
//         if (typeof html === 'undefined') {
//             return this.elems[0].innerHTML;
//         } else {
//             return this.each((elem) => {
//                 elem.innerHTML = html;
//             })
//         }
//     }

//     text(text) {
//         if (typeof text === 'undefined') {
//             return this.elems[0].textContent;
//         } else {
//             return this.each((elem) => {
//                 elem.textContent = text;
//             });
//         }
//     }

//     css() {

//     }

//     attr() {

//     }

//     show() {
//         return this.each(function(elem) {
//             if (getComputedStyle(elem, '')['display'] === 'none') {
//                 elem.style.display = 'block';
//             }
//         })
//     }

//     addClass(name) {
//         let namesArr = name.split(/\s+/g);
//         return this.each((elem) => {
//             let classList = [];
//             let className = elem.className;
//             if (className) {
//                 namesArr.forEach((item) => {
//                     if (!className.match(item)) classList.push(item);
//                 });
//             } else {
//                 classList = namesArr;
//             }
//             if (classList.length > 0) {
//                 if (className) classList.unshift(className);
//                 elem.className = classList.join(' ');
//             }
//         });
//     }

//     removeClass(name) {
//         let namesArr = name.split(/\s+/g);
//         return this.each((elem) => {
//             let className = elem.className;
//             if (className) {
//                 namesArr.forEach((item) => {
//                     let pattern = new RegExp('(^|\\s+)' + item + '(\\s+|$)', 'g');
//                     className = className.replace(pattern , ' ');
//                 });
//                 elem.className = className.trim();
//             }
//         });
//     }
// }


// export default function $(selector) {
//     return new Query(selector);
// }

