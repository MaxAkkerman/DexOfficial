(self.webpackChunkmy_swap=self.webpackChunkmy_swap||[]).push([[1846],{76522:(e,n,t)=>{"use strict";t.d(n,{e:()=>r,m:()=>a});var r=function(e){var n=e.currentWallet,t=e.selectedWallet;return n?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(n,"</b>\n    installed. If you would prefer to use\n    <b>").concat(t,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(t,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(t,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===t?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},a=function(e){var n=e.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n  Tap the button below to <b>Open '.concat(n,"</b>. Please access this site on ").concat(n,"'s in-app browser for a seamless experience.\n  </p>\n  ")}},71846:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>o});var r=t(76522);function a(e,n,t,r,a,o,l){try{var s=e[o](l),i=s.value}catch(e){return void t(e)}s.done?n(i):Promise.resolve(i).then(r,a)}const o=function(e){var n,t,o=e.preferred,l=e.label,s=e.iconSrc,i=e.svg,c=window.location.origin||window.location.host,p=encodeURIComponent(c);return{name:l||"D'CENT",svg:i||'\n<svg xmlns="http://www.w3.org/2000/svg" id="구성_요소_171_4" width="48" height="48" viewBox="0 0 48 48">\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 62.27 71.11" style="enable-background:new 0 0 62.27 71.11;" xml:space="preserve">\n<style type="text/css">\n\t.st0{fill:#B3B5B5;}\n\t.st1{fill:#72BFBC;}\n\t.st2{fill:#6D6E70;}\n</style>\n<g>\n\t<polygon class="st0" points="32.04,13.43 37.34,10.37 37.34,3.06 32.04,0 32.04,0 \t"/>\n\t<path class="st1" d="M12.53,45.25V24.69l17.71-10.22V0L0.9,16.94C0.34,17.26,0,17.86,0,18.5v33.88c0,0.03,0.01,0.07,0.01,0.1\n\t\tL12.53,45.25z"/>\n\t<path class="st2" d="M48.86,46.69L31.14,56.93L13.52,46.75L0.99,53.99l29.25,16.89c0.28,0.16,0.59,0.24,0.9,0.24\n\t\tc0.31,0,0.62-0.08,0.9-0.24l29.34-16.94c0.01,0,0.01-0.01,0.02-0.01L48.86,46.69z"/>\n\t<g>\n\t\t<path class="st0" d="M61.38,16.94l-11.63-6.71v7.3l-12.5,7.22l12.5,7.21v13.16l12.53,7.23V18.5\n\t\t\tC62.27,17.86,61.93,17.26,61.38,16.94z"/>\n\t</g>\n\t<polygon class="st2" points="24.93,31.85 24.94,46.18 37.1,39.16 37.1,24.83 \t"/>\n</g>\n</svg>\n',iconSrc:s,wallet:(n=regeneratorRuntime.mark((function e(n){var t,r,a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.getProviderName,r=n.createModernProviderInterface,a=n.createLegacyProviderInterface,o=window.ethereum||window.web3&&window.web3.currentProvider,e.abrupt("return",{provider:o,interface:o&&"D'CENT"===t(o)?"function"==typeof o.enable?r(o):a(o):null});case 3:case"end":return e.stop()}}),e)})),t=function(){var e=this,t=arguments;return new Promise((function(r,o){var l=n.apply(e,t);function s(e){a(l,r,o,s,i,"next",e)}function i(e){a(l,r,o,s,i,"throw",e)}s(void 0)}))},function(e){return t.apply(this,arguments)}),type:"injected",link:"https://link.dcentwallet.com/DAppBrowser/?url="+p,installMessage:r.e,mobile:!0,preferred:o}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1zd2FwLy4vbm9kZV9tb2R1bGVzL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL2NvbnRlbnQtNjEyYmQwNGIuanMiLCJ3ZWJwYWNrOi8vbXktc3dhcC8uL25vZGVfbW9kdWxlcy9ibmMtb25ib2FyZC9kaXN0L2VzbS9kY2VudC1hYWQ3YWI0MS5qcyJdLCJuYW1lcyI6WyJleHRlbnNpb25JbnN0YWxsTWVzc2FnZSIsImhlbHBlcnMiLCJjdXJyZW50V2FsbGV0Iiwic2VsZWN0ZWRXYWxsZXQiLCJjb25jYXQiLCJtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsInJlc29sdmUiLCJyZWplY3QiLCJfbmV4dCIsIl90aHJvdyIsImtleSIsImFyZyIsImluZm8iLCJ2YWx1ZSIsImVycm9yIiwiZG9uZSIsIlByb21pc2UiLCJ0aGVuIiwib3B0aW9ucyIsImZuIiwiX3dhbGxldCIsInByZWZlcnJlZCIsImxhYmVsIiwiaWNvblNyYyIsInN2ZyIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiaG9zdCIsImVuY29kZWRVcmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwid2FsbGV0IiwicmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJnZXRQcm92aWRlck5hbWUiLCJjcmVhdGVNb2Rlcm5Qcm92aWRlckludGVyZmFjZSIsImNyZWF0ZUxlZ2FjeVByb3ZpZGVySW50ZXJmYWNlIiwicHJvdmlkZXIiLCJ3cmFwIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImV0aGVyZXVtIiwid2ViMyIsImN1cnJlbnRQcm92aWRlciIsImFicnVwdCIsImVuYWJsZSIsInN0b3AiLCJzZWxmIiwidGhpcyIsImFyZ3MiLCJhcmd1bWVudHMiLCJhcHBseSIsImVyciIsInVuZGVmaW5lZCIsIl94IiwidHlwZSIsImxpbmsiLCJpbnN0YWxsTWVzc2FnZSIsImUiLCJtb2JpbGUiXSwibWFwcGluZ3MiOiI0SEFBQSxJQUFJQSxFQUEwQixTQUFpQ0MsR0FDN0QsSUFBSUMsRUFBZ0JELEVBQVFDLGNBQ3hCQyxFQUFpQkYsRUFBUUUsZUFFN0IsT0FBSUQsRUFDSyx3SUFBMElFLE9BQU9GLEVBQWUsNERBQTRERSxPQUFPRCxFQUFnQix3TEFBMExDLE9BQU9ELEVBQWdCLHFZQUVwYyxvSEFBcUhDLE9BQU9ELEVBQWdCLDZRQUFpUkMsT0FBMEIsVUFBbkJELEVBQTZCLDhTQUFnVCxHQUFJLHFCQUk1dkJFLEVBQTZCLFNBQW9DSixHQUNuRSxJQUFJRSxFQUFpQkYsRUFBUUUsZUFDN0IsTUFBTywyRUFBNkVDLE9BQU9ELEVBQWdCLHFDQUFxQ0MsT0FBT0QsRUFBZ0IsOEQsMEVDYnpLLFNBQVNHLEVBQW1CQyxFQUFLQyxFQUFTQyxFQUFRQyxFQUFPQyxFQUFRQyxFQUFLQyxHQUFPLElBQU0sSUFBSUMsRUFBT1AsRUFBSUssR0FBS0MsR0FBVUUsRUFBUUQsRUFBS0MsTUFBUyxNQUFPQyxHQUF3QixZQUFmUCxFQUFPTyxHQUFzQkYsRUFBS0csS0FBUVQsRUFBUU8sR0FBaUJHLFFBQVFWLFFBQVFPLEdBQU9JLEtBQUtULEVBQU9DLEdBc0Q3UCxRQS9DQSxTQUFlUyxHQUNiLElBTnlCQyxFQWlCakJDLEVBWEpDLEVBQVlILEVBQVFHLFVBQ3BCQyxFQUFRSixFQUFRSSxNQUNoQkMsRUFBVUwsRUFBUUssUUFDbEJDLEVBQU1OLEVBQVFNLElBQ2RDLEVBQU1DLE9BQU9DLFNBQVNDLFFBQVVGLE9BQU9DLFNBQVNFLEtBQ2hEQyxFQUFhQyxtQkFBbUJOLEdBQ3BDLE1BQU8sQ0FDTE8sS0FBTVYsR0FBUyxTQUNmRSxJQUFLQSxHQVhPLGluQ0FZWkQsUUFBU0EsRUFDVFUsUUFoQnVCZCxFQWlCeUJlLG1CQUFtQkMsTUFBSyxTQUFTQyxFQUFRckMsR0FDckYsSUFBSXNDLEVBQWlCQyxFQUErQkMsRUFBK0JDLEVBQ25GLE9BQU9OLG1CQUFtQk8sTUFBSyxTQUFrQkMsR0FDL0MsT0FDRSxPQUFRQSxFQUFTQyxLQUFPRCxFQUFTRSxNQUMvQixLQUFLLEVBR0gsT0FGQVAsRUFBa0J0QyxFQUFRc0MsZ0JBQWlCQyxFQUFnQ3ZDLEVBQVF1Qyw4QkFBK0JDLEVBQWdDeEMsRUFBUXdDLDhCQUMxSkMsRUFBV2QsT0FBT21CLFVBQVluQixPQUFPb0IsTUFBUXBCLE9BQU9vQixLQUFLQyxnQkFDbERMLEVBQVNNLE9BQU8sU0FBVSxDQUMvQlIsU0FBVUEsRUFDVixVQUFhQSxHQUEwQyxXQUE5QkgsRUFBZ0JHLEdBQW9ELG1CQUFwQkEsRUFBU1MsT0FBd0JYLEVBQThCRSxHQUFZRCxFQUE4QkMsR0FBWSxPQUdsTSxLQUFLLEVBQ0wsSUFBSyxNQUNILE9BQU9FLEVBQVNRLFVBR3JCZCxNQWxCRGhCLEVBakI4QixXQUFjLElBQUkrQixFQUFPQyxLQUFNQyxFQUFPQyxVQUFXLE9BQU8sSUFBSXRDLFNBQVEsU0FBVVYsRUFBU0MsR0FBVSxJQUFJRixFQUFNYyxFQUFHb0MsTUFBTUosRUFBTUUsR0FBTyxTQUFTN0MsRUFBTUssR0FBU1QsRUFBbUJDLEVBQUtDLEVBQVNDLEVBQVFDLEVBQU9DLEVBQVEsT0FBUUksR0FBVSxTQUFTSixFQUFPK0MsR0FBT3BELEVBQW1CQyxFQUFLQyxFQUFTQyxFQUFRQyxFQUFPQyxFQUFRLFFBQVMrQyxHQUFRaEQsT0FBTWlELE9Bc0MzVyxTQUFnQkMsR0FDZCxPQUFPdEMsRUFBUW1DLE1BQU1ILEtBQU1FLGFBSy9CSyxLQUFNLFdBQ05DLEtBQU0saURBQW1EOUIsRUFDekQrQixlQUFnQixFQUFBQyxFQUNoQkMsUUFBUSxFQUNSMUMsVUFBV0EiLCJmaWxlIjoiMTg0Ni5tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlID0gZnVuY3Rpb24gZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UoaGVscGVycykge1xuICB2YXIgY3VycmVudFdhbGxldCA9IGhlbHBlcnMuY3VycmVudFdhbGxldCxcbiAgICAgIHNlbGVjdGVkV2FsbGV0ID0gaGVscGVycy5zZWxlY3RlZFdhbGxldDtcblxuICBpZiAoY3VycmVudFdhbGxldCkge1xuICAgIHJldHVybiBcIlxcbiAgICA8cCBzdHlsZT1cXFwiZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7IG1hcmdpbjogMC44ODlyZW0gMDtcXFwiPlxcbiAgICBXZSBoYXZlIGRldGVjdGVkIHRoYXQgeW91IGFscmVhZHkgaGF2ZVxcbiAgICA8Yj5cIi5jb25jYXQoY3VycmVudFdhbGxldCwgXCI8L2I+XFxuICAgIGluc3RhbGxlZC4gSWYgeW91IHdvdWxkIHByZWZlciB0byB1c2VcXG4gICAgPGI+XCIpLmNvbmNhdChzZWxlY3RlZFdhbGxldCwgXCI8L2I+XFxuICAgIGluc3RlYWQsIHRoZW4gY2xpY2sgYmVsb3cgdG8gaW5zdGFsbC5cXG4gICAgPC9wPlxcbiAgICA8cCBzdHlsZT1cXFwiZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7IG1hcmdpbjogMC44ODlyZW0gMDtcXFwiPlxcbiAgICA8Yj5UaXA6PC9iPlxcbiAgICBJZiB5b3UgYWxyZWFkeSBoYXZlIFwiKS5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiIGluc3RhbGxlZCwgY2hlY2sgeW91clxcbiAgICBicm93c2VyIGV4dGVuc2lvbiBzZXR0aW5ncyB0byBtYWtlIHN1cmUgdGhhdCB5b3UgaGF2ZSBpdCBlbmFibGVkXFxuICAgIGFuZCB0aGF0IHlvdSBoYXZlIGRpc2FibGVkIGFueSBvdGhlciBicm93c2VyIGV4dGVuc2lvbiB3YWxsZXRzLlxcbiAgICA8c3BhblxcbiAgICAgIGNsYXNzPVxcXCJibi1vbmJvYXJkLWNsaWNrYWJsZVxcXCJcXG4gICAgICBzdHlsZT1cXFwiY29sb3I6ICM0YTkwZTI7IGZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcXCJcXG4gICAgICBvbmNsaWNrPVxcXCJ3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XFxcIj5cXG4gICAgICBUaGVuIHJlZnJlc2ggdGhlIHBhZ2UuXFxuICAgIDwvc3Bhbj5cXG4gICAgPC9wPlxcbiAgICBcIik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiXFxuICAgIDxwIHN0eWxlPVxcXCJmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDsgbWFyZ2luOiAwLjg4OXJlbSAwO1xcXCI+XFxuICAgIFlvdSdsbCBuZWVkIHRvIGluc3RhbGwgPGI+XCIuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIjwvYj4gdG8gY29udGludWUuIE9uY2UgeW91IGhhdmUgaXQgaW5zdGFsbGVkLCBnbyBhaGVhZCBhbmRcXG4gICAgPHNwYW5cXG4gICAgY2xhc3M9XFxcImJuLW9uYm9hcmQtY2xpY2thYmxlXFxcIlxcbiAgICAgIHN0eWxlPVxcXCJjb2xvcjogIzRhOTBlMjsgZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxcIlxcbiAgICAgIG9uY2xpY2s9e3dpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTt9PlxcbiAgICAgIHJlZnJlc2ggdGhlIHBhZ2UuXFxuICAgIDwvc3Bhbj5cXG4gICAgXCIpLmNvbmNhdChzZWxlY3RlZFdhbGxldCA9PT0gJ09wZXJhJyA/ICc8YnI+PGJyPjxpPkhpbnQ6IElmIHlvdSBhbHJlYWR5IGhhdmUgT3BlcmEgaW5zdGFsbGVkLCBtYWtlIHN1cmUgdGhhdCB5b3VyIHdlYjMgd2FsbGV0IGlzIDxhIHN0eWxlPVwiY29sb3I6ICM0YTkwZTI7IGZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0O1wiIGNsYXNzPVwiYm4tb25ib2FyZC1jbGlja2FibGVcIiBocmVmPVwiaHR0cHM6Ly9oZWxwLm9wZXJhLmNvbS9lbi90b3VjaC9jcnlwdG8td2FsbGV0L1wiIHJlbD1cIm5vcmVmZXJyZXIgbm9vcGVuZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5lbmFibGVkPC9hPjwvaT4nIDogJycsIFwiXFxuICAgIDwvcD5cXG4gICAgXCIpO1xuICB9XG59O1xuXG52YXIgbW9iaWxlV2FsbGV0SW5zdGFsbE1lc3NhZ2UgPSBmdW5jdGlvbiBtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZShoZWxwZXJzKSB7XG4gIHZhciBzZWxlY3RlZFdhbGxldCA9IGhlbHBlcnMuc2VsZWN0ZWRXYWxsZXQ7XG4gIHJldHVybiBcIlxcbiAgPHAgc3R5bGU9XFxcImZvbnQtc2l6ZTogMC44ODlyZW07XFxcIj5cXG4gIFRhcCB0aGUgYnV0dG9uIGJlbG93IHRvIDxiPk9wZW4gXCIuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIjwvYj4uIFBsZWFzZSBhY2Nlc3MgdGhpcyBzaXRlIG9uIFwiKS5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiJ3MgaW4tYXBwIGJyb3dzZXIgZm9yIGEgc2VhbWxlc3MgZXhwZXJpZW5jZS5cXG4gIDwvcD5cXG4gIFwiKTtcbn07XG5cbmV4cG9ydCB7IGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlIGFzIGUsIG1vYmlsZVdhbGxldEluc3RhbGxNZXNzYWdlIGFzIG0gfTsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTsgfSB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50czsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpOyBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7IH0gZnVuY3Rpb24gX3Rocm93KGVycikgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTsgfSBfbmV4dCh1bmRlZmluZWQpOyB9KTsgfTsgfVxuXG5pbXBvcnQgeyBlIGFzIGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlIH0gZnJvbSAnLi9jb250ZW50LTYxMmJkMDRiLmpzJztcbnZhciBkY2VudEljb24gPSBcIlxcbjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiBpZD1cXFwiXFx1QUQ2Q1xcdUMxMzFfXFx1QzY5NFxcdUMxOENfMTcxXzRcXFwiIHdpZHRoPVxcXCI0OFxcXCIgaGVpZ2h0PVxcXCI0OFxcXCIgdmlld0JveD1cXFwiMCAwIDQ4IDQ4XFxcIj5cXG48c3ZnIHZlcnNpb249XFxcIjEuMVxcXCIgaWQ9XFxcIkxheWVyXzFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgeG1sbnM6eGxpbms9XFxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcXFwiIHg9XFxcIjBweFxcXCIgeT1cXFwiMHB4XFxcIlxcblxcdCB2aWV3Qm94PVxcXCIwIDAgNjIuMjcgNzEuMTFcXFwiIHN0eWxlPVxcXCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYyLjI3IDcxLjExO1xcXCIgeG1sOnNwYWNlPVxcXCJwcmVzZXJ2ZVxcXCI+XFxuPHN0eWxlIHR5cGU9XFxcInRleHQvY3NzXFxcIj5cXG5cXHQuc3Qwe2ZpbGw6I0IzQjVCNTt9XFxuXFx0LnN0MXtmaWxsOiM3MkJGQkM7fVxcblxcdC5zdDJ7ZmlsbDojNkQ2RTcwO31cXG48L3N0eWxlPlxcbjxnPlxcblxcdDxwb2x5Z29uIGNsYXNzPVxcXCJzdDBcXFwiIHBvaW50cz1cXFwiMzIuMDQsMTMuNDMgMzcuMzQsMTAuMzcgMzcuMzQsMy4wNiAzMi4wNCwwIDMyLjA0LDAgXFx0XFxcIi8+XFxuXFx0PHBhdGggY2xhc3M9XFxcInN0MVxcXCIgZD1cXFwiTTEyLjUzLDQ1LjI1VjI0LjY5bDE3LjcxLTEwLjIyVjBMMC45LDE2Ljk0QzAuMzQsMTcuMjYsMCwxNy44NiwwLDE4LjV2MzMuODhjMCwwLjAzLDAuMDEsMC4wNywwLjAxLDAuMVxcblxcdFxcdEwxMi41Myw0NS4yNXpcXFwiLz5cXG5cXHQ8cGF0aCBjbGFzcz1cXFwic3QyXFxcIiBkPVxcXCJNNDguODYsNDYuNjlMMzEuMTQsNTYuOTNMMTMuNTIsNDYuNzVMMC45OSw1My45OWwyOS4yNSwxNi44OWMwLjI4LDAuMTYsMC41OSwwLjI0LDAuOSwwLjI0XFxuXFx0XFx0YzAuMzEsMCwwLjYyLTAuMDgsMC45LTAuMjRsMjkuMzQtMTYuOTRjMC4wMSwwLDAuMDEtMC4wMSwwLjAyLTAuMDFMNDguODYsNDYuNjl6XFxcIi8+XFxuXFx0PGc+XFxuXFx0XFx0PHBhdGggY2xhc3M9XFxcInN0MFxcXCIgZD1cXFwiTTYxLjM4LDE2Ljk0bC0xMS42My02LjcxdjcuM2wtMTIuNSw3LjIybDEyLjUsNy4yMXYxMy4xNmwxMi41Myw3LjIzVjE4LjVcXG5cXHRcXHRcXHRDNjIuMjcsMTcuODYsNjEuOTMsMTcuMjYsNjEuMzgsMTYuOTR6XFxcIi8+XFxuXFx0PC9nPlxcblxcdDxwb2x5Z29uIGNsYXNzPVxcXCJzdDJcXFwiIHBvaW50cz1cXFwiMjQuOTMsMzEuODUgMjQuOTQsNDYuMTggMzcuMSwzOS4xNiAzNy4xLDI0LjgzIFxcdFxcXCIvPlxcbjwvZz5cXG48L3N2Zz5cXG5cIjtcblxuZnVuY3Rpb24gZGNlbnQob3B0aW9ucykge1xuICB2YXIgcHJlZmVycmVkID0gb3B0aW9ucy5wcmVmZXJyZWQsXG4gICAgICBsYWJlbCA9IG9wdGlvbnMubGFiZWwsXG4gICAgICBpY29uU3JjID0gb3B0aW9ucy5pY29uU3JjLFxuICAgICAgc3ZnID0gb3B0aW9ucy5zdmc7XG4gIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICB2YXIgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGxhYmVsIHx8IFwiRCdDRU5UXCIsXG4gICAgc3ZnOiBzdmcgfHwgZGNlbnRJY29uLFxuICAgIGljb25TcmM6IGljb25TcmMsXG4gICAgd2FsbGV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3dhbGxldCA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShoZWxwZXJzKSB7XG4gICAgICAgIHZhciBnZXRQcm92aWRlck5hbWUsIGNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlLCBjcmVhdGVMZWdhY3lQcm92aWRlckludGVyZmFjZSwgcHJvdmlkZXI7XG4gICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBnZXRQcm92aWRlck5hbWUgPSBoZWxwZXJzLmdldFByb3ZpZGVyTmFtZSwgY3JlYXRlTW9kZXJuUHJvdmlkZXJJbnRlcmZhY2UgPSBoZWxwZXJzLmNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlLCBjcmVhdGVMZWdhY3lQcm92aWRlckludGVyZmFjZSA9IGhlbHBlcnMuY3JlYXRlTGVnYWN5UHJvdmlkZXJJbnRlcmZhY2U7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIgPSB3aW5kb3cuZXRoZXJldW0gfHwgd2luZG93LndlYjMgJiYgd2luZG93LndlYjMuY3VycmVudFByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgXCJpbnRlcmZhY2VcIjogcHJvdmlkZXIgJiYgZ2V0UHJvdmlkZXJOYW1lKHByb3ZpZGVyKSA9PT0gXCJEJ0NFTlRcIiA/IHR5cGVvZiBwcm92aWRlci5lbmFibGUgPT09ICdmdW5jdGlvbicgPyBjcmVhdGVNb2Rlcm5Qcm92aWRlckludGVyZmFjZShwcm92aWRlcikgOiBjcmVhdGVMZWdhY3lQcm92aWRlckludGVyZmFjZShwcm92aWRlcikgOiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB3YWxsZXQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF93YWxsZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhbGxldDtcbiAgICB9KCksXG4gICAgdHlwZTogJ2luamVjdGVkJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9saW5rLmRjZW50d2FsbGV0LmNvbS9EQXBwQnJvd3Nlci8/dXJsPScgKyBlbmNvZGVkVXJsLFxuICAgIGluc3RhbGxNZXNzYWdlOiBleHRlbnNpb25JbnN0YWxsTWVzc2FnZSxcbiAgICBtb2JpbGU6IHRydWUsXG4gICAgcHJlZmVycmVkOiBwcmVmZXJyZWRcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGNlbnQ7Il0sInNvdXJjZVJvb3QiOiIifQ==