(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"d00fcef6-e916-444a-bb6d-05c2cb1eeeb5","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n,r){return fetch("".concat(e.baseUrl).concat(n),r).then(t)},r=document.querySelector("#card-template").content,o=document.querySelector(".places__list"),c=document.forms["edit-profile"],i=document.forms["edit-profile-avatar"],a=document.forms["new-place"],u=document.querySelector(".popup_type_edit"),s=document.querySelector(".popup_type_edit_image"),l=document.querySelector(".popup_type_new-card"),d=document.querySelector(".popup_type_image"),p=document.querySelector(".profile__add-button"),f=document.querySelector(".profile__edit-button"),m=document.querySelectorAll(".popup__close"),v=document.querySelector(".profile__image"),_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=c.name,b=c.description,S=i["avatar-link"],k=a["place-name"],C=a.link,E=d.querySelector(".popup__image"),L=d.querySelector(".popup__caption"),g={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},q=function(e,t,n){var o=r.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),i=o.querySelector(".card__like-button"),a=o.querySelector(".card__image"),u=o.querySelector(".card__like-counter");return a.setAttribute("src",e.link),a.alt=e.name,o.querySelector(".card__title").textContent=e.name,u.textContent=e.likes.length,w(i,t,e.likes),i.addEventListener("click",(function(){n.likeFunction(i,u,e._id)})),t==e.owner._id?c.addEventListener("click",(function(){n.deleteFunction(o,e._id)})):c.remove(),a.addEventListener("click",(function(){n.openFunction(e.name,e.link)})),o},A=function(t,r){var o;(o=r,n("/cards/".concat(o," "),{method:"DELETE",headers:e.headers})).then((function(){t.remove()})).catch(console.error)},x=function(t,r,o){var c;t.classList.contains("card__like-button_is-active")?(c=o,n("/cards/likes/".concat(c),{method:"DELETE",headers:e.headers})).then((function(e){r.textContent=e.likes.length,t.classList.remove("card__like-button_is-active")})).catch(console.error):function(t){return n("/cards/likes/".concat(t),{method:"PUT",headers:e.headers})}(o).then((function(e){r.textContent=e.likes.length,t.classList.add("card__like-button_is-active")})).catch(console.error)},w=function(e,t,n){n.forEach((function(n){t==n._id&&e.classList.add("card__like-button_is-active")}))},F=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",B)},j=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",B)},B=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");j(t)}},O=function(e){e.target.classList.contains("popup")&&j(e.target)},T=function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-input-error"));t.classList.remove(r),o.classList.remove(n),o.textContent=""},P=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){T(e,o,t.errorClass,t.inputErrorClass),I(n,r,t.inactiveButtonClass)}))},I=function(e,t,n){U(e)?N(t,n):M(t,n)},M=function(e,t){e.disabled=!1,e.classList.remove(t)},N=function(e,t){e.disabled=!0,e.classList.add(t)},U=function(e){return e.some((function(e){return!e.validity.valid}))},D=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n},J=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;D(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){D(!1,r,o)}))};function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var V=null;m.forEach((function(e){var t=e.closest(".popup");t.classList.add("popup_is-animated"),t.addEventListener("mousedown",O),e.addEventListener("click",(function(){return j(t)}))})),v.addEventListener("click",(function(){F(s)})),p.addEventListener("click",(function(){F(l)})),f.addEventListener("click",(function(){z(),P(c,g),F(u)}));var z=function(){h.value=_.textContent,b.value=y.textContent},$=function(e,t){E.setAttribute("src",t),E.setAttribute("alt",e),L.textContent=e,F(d)};c.addEventListener("submit",(function(t){J((function(){return(t=h.value,r=b.value,n("/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:r})})).then((function(e){_.textContent=e.name,y.textContent=e.about,j(u)}));var t,r}),t)})),i.addEventListener("submit",(function(t){J((function(){return function(t){return n("/users/me/avatar",{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})})}(S.value).then((function(e){v.style.backgroundImage="url(".concat(e.avatar,")"),j(s)}))}),t)})),a.addEventListener("submit",(function(t){J((function(){return(t=k.value,r=C.value,n("/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:t,link:r})})).then((function(e){o.prepend(q(e,V,{deleteFunction:A,likeFunction:x,openFunction:$})),P(a,g),j(l)}));var t,r}),t)})),Promise.all([n("/cards",{headers:e.headers}),n("/users/me",{headers:e.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,a=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(s)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],i=r[1];V=i._id,_.textContent=i.name,y.textContent=i.about,v.style.backgroundImage="url(".concat(i.avatar,")"),c.forEach((function(e){o.append(q(e,V,{deleteFunction:A,likeFunction:x,openFunction:$}))}))})).catch(console.error),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);I(n,r,e.inactiveButtonClass),t.addEventListener("reset",(function(){N(r,e.inactiveButtonClass)})),n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?T(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.name,"-input-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,r)})(t,o,e.errorClass,e.inputErrorClass),I(n,r,e.inactiveButtonClass)}))}))}))}(g)})();