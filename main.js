(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),p:""};t.d({},{O:()=>_}),t.p;var e={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"d00fcef6-e916-444a-bb6d-05c2cb1eeeb5","Content-Type":"application/json"}},n=function(t,e,n,o,r){var a=_.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__like-button"),s=a.querySelector(".card__image"),l=a.querySelector(".card__like-counter");return s.setAttribute("src",t.link),s.alt=t.name,a.querySelector(".card__title").textContent=t.name,l.textContent=t.likes.length,c(u,e,t.likes),u.addEventListener("click",(function(){o(u,l,t._id)})),e==t.owner._id?i.addEventListener("click",(function(){n(a,t._id)})):i.remove(),s.addEventListener("click",(function(){r(t.name,t.link)})),a},o=function(t,n){var o;(o=n,fetch("".concat(e.baseUrl,"/cards/").concat(o," "),{method:"DELETE",headers:e.headers})).then((function(){t.remove()})).catch((function(t){return console.log(t)}))},r=function(t,n,o){var r;t.classList.contains("card__like-button_is-active")?(t.classList.remove("card__like-button_is-active"),(r=o,fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){n.textContent=t.likes.length})).catch((function(t){return console.log(t)}))):(t.classList.add("card__like-button_is-active"),function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(o).then((function(t){n.textContent=t.likes.length})).catch((function(t){return console.log(t)})))},c=function(t,e,n){n.forEach((function(n){e==n._id&&t.classList.add("card__like-button_is-active")}))},a=function(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",u)},i=function(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)},u=function(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");i(e)}},s=function(t){t.target.classList.contains("popup")&&i(t.target)},l=function(t,e,n,o){var r=t.querySelector(".".concat(e.name,"-input-error"));e.classList.remove(o),r.classList.remove(n),r.textContent=""},d=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(r){l(t,r,e.errorClass,e.inputErrorClass),p(n,o,e.inactiveButtonClass)}))},p=function(t,e,n){f(t)?e.classList.add(n):e.classList.remove(n)},f=function(t){return t.some((function(t){return!t.validity.valid}))};function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var _=document.querySelector("#card-template").content,v=null,y=document.querySelector(".places__list"),h=document.forms["edit-profile"],b=document.forms["edit-profile-avatar"],S=document.forms["new-place"],k=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_edit_image"),g=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),E=document.querySelector(".profile__add-button"),L=document.querySelector(".profile__edit-button"),j=document.querySelectorAll(".popup__close"),x=document.querySelector(".profile__image"),A=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),O=h.name,w=h.description,U=b["avatar-link"],T=S["place-name"],B=S.link,D=q.querySelector(".popup__image"),I=q.querySelector(".popup__caption"),M=h.querySelector(".popup__button"),N=b.querySelector(".popup__button"),J=S.querySelector(".popup__button"),H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};j.forEach((function(t){var e=t.closest(".popup");e.classList.add("popup_is-animated"),e.addEventListener("mousedown",s),t.addEventListener("click",(function(){return i(e)}))})),x.addEventListener("click",(function(){a(C)})),E.addEventListener("click",(function(){a(g)})),L.addEventListener("click",(function(){V(),d(h,H),a(k)}));var V=function(){O.value=A.textContent,w.value=P.textContent},z=function(t,e){D.setAttribute("src",e),D.setAttribute("alt",t),I.textContent=t,a(q)};h.addEventListener("submit",(function(t){var n,o;t.preventDefault(),M.textContent="Сохранение...",(n=O.value,o=w.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){A.textContent=t.name,P.textContent=t.about})).catch((function(t){return console.log(t)})).finally((function(){M.textContent="Сохранить",i(k)}))})),b.addEventListener("submit",(function(t){t.preventDefault(),N.textContent="Сохранение...",function(t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(U.value).then((function(t){x.style.backgroundImage="url(".concat(t.avatar,")")})).catch((function(t){return console.log(t)})).finally((function(){N.textContent="Сохранить",i(C)}))})),S.addEventListener("submit",(function(t){var c,a;t.preventDefault(),J.textContent="Сохранение...",(c=T.value,a=B.value,fetch("".concat(e.baseUrl,"/cards "),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:a})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){y.prepend(n(t,v,o,r,z))})).catch((function(t){return console.log(t)})).finally((function(){S.reset(),d(S,H),J.textContent="Сохранить",i(g)}))})),Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))]).then((function(t){var e,c,a=(c=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==e);u=!0);}catch(t){s=!0,r=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(e,c)||function(t,e){if(t){if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(t,e):void 0}}(e,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];v=u._id,A.textContent=u.name,P.textContent=u.about,x.style.backgroundImage="url(".concat(u.avatar,")"),i.forEach((function(t){y.append(n(t,v,o,r,z))}))})).catch((function(t){console.log(t)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);p(n,o,t.inactiveButtonClass),n.forEach((function(r){r.addEventListener("input",(function(){(function(t,e,n,o){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?l(t,e,n,o):function(t,e,n,o,r){var c=t.querySelector(".".concat(e.name,"-input-error"));e.classList.add(r),c.textContent=n,c.classList.add(o)}(t,e,e.validationMessage,n,o)})(e,r,t.errorClass,t.inputErrorClass),p(n,o,t.inactiveButtonClass)}))}))}))}(H)})();