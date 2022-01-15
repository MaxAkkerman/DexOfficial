(self.webpackChunkmy_swap=self.webpackChunkmy_swap||[]).push([[8319],{76522:(e,n,t)=>{"use strict";t.d(n,{e:()=>r,m:()=>a});var r=function(e){var n=e.currentWallet,t=e.selectedWallet;return n?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(n,"</b>\n    installed. If you would prefer to use\n    <b>").concat(t,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(t,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(t,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===t?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},a=function(e){var n=e.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n  Tap the button below to <b>Open '.concat(n,"</b>. Please access this site on ").concat(n,"'s in-app browser for a seamless experience.\n  </p>\n  ")}},88319:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>o});var r=t(76522);function a(e,n,t,r,a,o,i){try{var l=e[o](i),s=l.value}catch(e){return void t(e)}l.done?n(s):Promise.resolve(s).then(r,a)}const o=function(e){var n,t,o=e.preferred,i=e.label,l=e.iconSrc;return{name:i||"Status",iconSrc:l,iconSrcSet:l,svg:e.svg||'\n<svg width="40" height="40" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M54.7 0C24.7 0 0.400024 24.3 0.400024 54.3C0.400024 84.3 24.7 108.6 54.7 108.6C84.7 108.6 109 84.3 109 54.3C108.9 24.3 84.6 0 54.7 0ZM47.3 77.6C40.4 78 33.4 74 33.1 67.5C32.7 61.1 37.9 56.8 46.5 56.4C49.7 56.2 52.3 56.5 54.8 56.7C57.4 57 60 57.2 63.1 57C64.6 56.9 66.2 56.7 67.8 56.4C67 67.4 58.6 77 47.3 77.6ZM65.3 52.3C61.9 52.5 59.2 52.2 56.5 51.9C53.8 51.6 51 51.3 47.7 51.5C46.1 51.6 44.4 51.8 42.8 52.2C43.8 40.2 52.6 29.7 64.5 29.1C71.8 28.7 79.1 33.1 79.5 40.2C79.9 47.2 74.4 51.8 65.3 52.3Z" fill="#4360DF"/>\n</svg>\n',wallet:(n=regeneratorRuntime.mark((function e(n){var t,r,a,o,i,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.getProviderName,r=n.getAddress,a=n.getBalance,o=n.getNetwork,i=window.ethereum,l=!1,e.abrupt("return",{provider:i,interface:i&&"Status"===t(i)?{connect:function(){return i.request({method:"eth_requestAccounts"}).then((function(){return l=!0}))},address:{get:function(){return l?r(i):Promise.resolve(null)}},balance:{get:function(){return l?a(i):Promise.resolve(null)}},network:{get:function(){return o(i)}},name:"Status"}:null});case 4:case"end":return e.stop()}}),e)})),t=function(){var e=this,t=arguments;return new Promise((function(r,o){var i=n.apply(e,t);function l(e){a(i,r,o,l,s,"next",e)}function s(e){a(i,r,o,l,s,"throw",e)}l(void 0)}))},function(e){return t.apply(this,arguments)}),type:"injected",link:"https://status.im/",installMessage:r.e,mobile:!0,preferred:o}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1zd2FwLy4vbm9kZV9tb2R1bGVzL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL2NvbnRlbnQtNjEyYmQwNGIuanMiLCJ3ZWJwYWNrOi8vbXktc3dhcC8uL25vZGVfbW9kdWxlcy9ibmMtb25ib2FyZC9kaXN0L2VzbS9zdGF0dXMtYjY4YjEwYjMuanMiXSwibmFtZXMiOlsiZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UiLCJoZWxwZXJzIiwiY3VycmVudFdhbGxldCIsInNlbGVjdGVkV2FsbGV0IiwiY29uY2F0IiwibW9iaWxlV2FsbGV0SW5zdGFsbE1lc3NhZ2UiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJyZXNvbHZlIiwicmVqZWN0IiwiX25leHQiLCJfdGhyb3ciLCJrZXkiLCJhcmciLCJpbmZvIiwidmFsdWUiLCJlcnJvciIsImRvbmUiLCJQcm9taXNlIiwidGhlbiIsIm9wdGlvbnMiLCJmbiIsIl93YWxsZXQiLCJwcmVmZXJyZWQiLCJsYWJlbCIsImljb25TcmMiLCJuYW1lIiwiaWNvblNyY1NldCIsInN2ZyIsIndhbGxldCIsInJlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiZ2V0UHJvdmlkZXJOYW1lIiwiZ2V0QWRkcmVzcyIsImdldEJhbGFuY2UiLCJnZXROZXR3b3JrIiwicHJvdmlkZXIiLCJhY2NvdW50c0FwcHJvdmVkIiwid3JhcCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJ3aW5kb3ciLCJldGhlcmV1bSIsImFicnVwdCIsImNvbm5lY3QiLCJyZXF1ZXN0IiwibWV0aG9kIiwiYWRkcmVzcyIsImdldCIsImJhbGFuY2UiLCJuZXR3b3JrIiwic3RvcCIsInNlbGYiLCJ0aGlzIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiZXJyIiwidW5kZWZpbmVkIiwiX3giLCJ0eXBlIiwibGluayIsImluc3RhbGxNZXNzYWdlIiwiZSIsIm1vYmlsZSJdLCJtYXBwaW5ncyI6IjRIQUFBLElBQUlBLEVBQTBCLFNBQWlDQyxHQUM3RCxJQUFJQyxFQUFnQkQsRUFBUUMsY0FDeEJDLEVBQWlCRixFQUFRRSxlQUU3QixPQUFJRCxFQUNLLHdJQUEwSUUsT0FBT0YsRUFBZSw0REFBNERFLE9BQU9ELEVBQWdCLHdMQUEwTEMsT0FBT0QsRUFBZ0IscVlBRXBjLG9IQUFxSEMsT0FBT0QsRUFBZ0IsNlFBQWlSQyxPQUEwQixVQUFuQkQsRUFBNkIsOFNBQWdULEdBQUkscUJBSTV2QkUsRUFBNkIsU0FBb0NKLEdBQ25FLElBQUlFLEVBQWlCRixFQUFRRSxlQUM3QixNQUFPLDJFQUE2RUMsT0FBT0QsRUFBZ0IscUNBQXFDQyxPQUFPRCxFQUFnQiw4RCwwRUNiekssU0FBU0csRUFBbUJDLEVBQUtDLEVBQVNDLEVBQVFDLEVBQU9DLEVBQVFDLEVBQUtDLEdBQU8sSUFBTSxJQUFJQyxFQUFPUCxFQUFJSyxHQUFLQyxHQUFVRSxFQUFRRCxFQUFLQyxNQUFTLE1BQU9DLEdBQXdCLFlBQWZQLEVBQU9PLEdBQXNCRixFQUFLRyxLQUFRVCxFQUFRTyxHQUFpQkcsUUFBUVYsUUFBUU8sR0FBT0ksS0FBS1QsRUFBT0MsR0E4RTdQLFFBdkVBLFNBQWdCUyxHQUNkLElBTnlCQyxFQWdCakJDLEVBVkpDLEVBQVlILEVBQVFHLFVBQ3BCQyxFQUFRSixFQUFRSSxNQUNoQkMsRUFBVUwsRUFBUUssUUFFdEIsTUFBTyxDQUNMQyxLQUFNRixHQUFTLFNBQ2ZDLFFBQVNBLEVBQ1RFLFdBQVlGLEVBQ1pHLElBTFFSLEVBQVFRLEtBTkgsd3FCQVliQyxRQWZ1QlIsRUFnQnlCUyxtQkFBbUJDLE1BQUssU0FBU0MsRUFBUS9CLEdBQ3JGLElBQUlnQyxFQUFpQkMsRUFBWUMsRUFBWUMsRUFBWUMsRUFBVUMsRUFDbkUsT0FBT1IsbUJBQW1CUyxNQUFLLFNBQWtCQyxHQUMvQyxPQUNFLE9BQVFBLEVBQVNDLEtBQU9ELEVBQVNFLE1BQy9CLEtBQUssRUFJSCxPQUhBVCxFQUFrQmhDLEVBQVFnQyxnQkFBaUJDLEVBQWFqQyxFQUFRaUMsV0FBWUMsRUFBYWxDLEVBQVFrQyxXQUFZQyxFQUFhbkMsRUFBUW1DLFdBQ2xJQyxFQUFXTSxPQUFPQyxTQUNsQk4sR0FBbUIsRUFDWkUsRUFBU0ssT0FBTyxTQUFVLENBQy9CUixTQUFVQSxFQUNWLFVBQWFBLEdBQTBDLFdBQTlCSixFQUFnQkksR0FBeUIsQ0FDaEVTLFFBQVMsV0FDUCxPQUFPVCxFQUFTVSxRQUFRLENBQ3RCQyxPQUFRLHdCQUNQN0IsTUFBSyxXQUNOLE9BQU9tQixHQUFtQixNQUc5QlcsUUFBUyxDQUNQQyxJQUFLLFdBQ0gsT0FBT1osRUFBbUJKLEVBQVdHLEdBQVluQixRQUFRVixRQUFRLFFBR3JFMkMsUUFBUyxDQUNQRCxJQUFLLFdBQ0gsT0FBT1osRUFBbUJILEVBQVdFLEdBQVluQixRQUFRVixRQUFRLFFBR3JFNEMsUUFBUyxDQUNQRixJQUFLLFdBQ0gsT0FBT2QsRUFBV0MsS0FHdEJYLEtBQU0sVUFDSixPQUdSLEtBQUssRUFDTCxJQUFLLE1BQ0gsT0FBT2MsRUFBU2EsVUFHckJyQixNQTNDRFYsRUFoQjhCLFdBQWMsSUFBSWdDLEVBQU9DLEtBQU1DLEVBQU9DLFVBQVcsT0FBTyxJQUFJdkMsU0FBUSxTQUFVVixFQUFTQyxHQUFVLElBQUlGLEVBQU1jLEVBQUdxQyxNQUFNSixFQUFNRSxHQUFPLFNBQVM5QyxFQUFNSyxHQUFTVCxFQUFtQkMsRUFBS0MsRUFBU0MsRUFBUUMsRUFBT0MsRUFBUSxPQUFRSSxHQUFVLFNBQVNKLEVBQU9nRCxHQUFPckQsRUFBbUJDLEVBQUtDLEVBQVNDLEVBQVFDLEVBQU9DLEVBQVEsUUFBU2dELEdBQVFqRCxPQUFNa0QsT0E4RDNXLFNBQWdCQyxHQUNkLE9BQU92QyxFQUFRb0MsTUFBTUgsS0FBTUUsYUFLL0JLLEtBQU0sV0FDTkMsS0FBTSxxQkFDTkMsZUFBZ0IsRUFBQUMsRUFDaEJDLFFBQVEsRUFDUjNDLFVBQVdBIiwiZmlsZSI6IjgzMTkubWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBleHRlbnNpb25JbnN0YWxsTWVzc2FnZSA9IGZ1bmN0aW9uIGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlKGhlbHBlcnMpIHtcbiAgdmFyIGN1cnJlbnRXYWxsZXQgPSBoZWxwZXJzLmN1cnJlbnRXYWxsZXQsXG4gICAgICBzZWxlY3RlZFdhbGxldCA9IGhlbHBlcnMuc2VsZWN0ZWRXYWxsZXQ7XG5cbiAgaWYgKGN1cnJlbnRXYWxsZXQpIHtcbiAgICByZXR1cm4gXCJcXG4gICAgPHAgc3R5bGU9XFxcImZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0OyBtYXJnaW46IDAuODg5cmVtIDA7XFxcIj5cXG4gICAgV2UgaGF2ZSBkZXRlY3RlZCB0aGF0IHlvdSBhbHJlYWR5IGhhdmVcXG4gICAgPGI+XCIuY29uY2F0KGN1cnJlbnRXYWxsZXQsIFwiPC9iPlxcbiAgICBpbnN0YWxsZWQuIElmIHlvdSB3b3VsZCBwcmVmZXIgdG8gdXNlXFxuICAgIDxiPlwiKS5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiPC9iPlxcbiAgICBpbnN0ZWFkLCB0aGVuIGNsaWNrIGJlbG93IHRvIGluc3RhbGwuXFxuICAgIDwvcD5cXG4gICAgPHAgc3R5bGU9XFxcImZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0OyBtYXJnaW46IDAuODg5cmVtIDA7XFxcIj5cXG4gICAgPGI+VGlwOjwvYj5cXG4gICAgSWYgeW91IGFscmVhZHkgaGF2ZSBcIikuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIiBpbnN0YWxsZWQsIGNoZWNrIHlvdXJcXG4gICAgYnJvd3NlciBleHRlbnNpb24gc2V0dGluZ3MgdG8gbWFrZSBzdXJlIHRoYXQgeW91IGhhdmUgaXQgZW5hYmxlZFxcbiAgICBhbmQgdGhhdCB5b3UgaGF2ZSBkaXNhYmxlZCBhbnkgb3RoZXIgYnJvd3NlciBleHRlbnNpb24gd2FsbGV0cy5cXG4gICAgPHNwYW5cXG4gICAgICBjbGFzcz1cXFwiYm4tb25ib2FyZC1jbGlja2FibGVcXFwiXFxuICAgICAgc3R5bGU9XFxcImNvbG9yOiAjNGE5MGUyOyBmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDtcXFwiXFxuICAgICAgb25jbGljaz1cXFwid2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xcXCI+XFxuICAgICAgVGhlbiByZWZyZXNoIHRoZSBwYWdlLlxcbiAgICA8L3NwYW4+XFxuICAgIDwvcD5cXG4gICAgXCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIlxcbiAgICA8cCBzdHlsZT1cXFwiZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7IG1hcmdpbjogMC44ODlyZW0gMDtcXFwiPlxcbiAgICBZb3UnbGwgbmVlZCB0byBpbnN0YWxsIDxiPlwiLmNvbmNhdChzZWxlY3RlZFdhbGxldCwgXCI8L2I+IHRvIGNvbnRpbnVlLiBPbmNlIHlvdSBoYXZlIGl0IGluc3RhbGxlZCwgZ28gYWhlYWQgYW5kXFxuICAgIDxzcGFuXFxuICAgIGNsYXNzPVxcXCJibi1vbmJvYXJkLWNsaWNrYWJsZVxcXCJcXG4gICAgICBzdHlsZT1cXFwiY29sb3I6ICM0YTkwZTI7IGZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcXCJcXG4gICAgICBvbmNsaWNrPXt3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7fT5cXG4gICAgICByZWZyZXNoIHRoZSBwYWdlLlxcbiAgICA8L3NwYW4+XFxuICAgIFwiKS5jb25jYXQoc2VsZWN0ZWRXYWxsZXQgPT09ICdPcGVyYScgPyAnPGJyPjxicj48aT5IaW50OiBJZiB5b3UgYWxyZWFkeSBoYXZlIE9wZXJhIGluc3RhbGxlZCwgbWFrZSBzdXJlIHRoYXQgeW91ciB3ZWIzIHdhbGxldCBpcyA8YSBzdHlsZT1cImNvbG9yOiAjNGE5MGUyOyBmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDtcIiBjbGFzcz1cImJuLW9uYm9hcmQtY2xpY2thYmxlXCIgaHJlZj1cImh0dHBzOi8vaGVscC5vcGVyYS5jb20vZW4vdG91Y2gvY3J5cHRvLXdhbGxldC9cIiByZWw9XCJub3JlZmVycmVyIG5vb3BlbmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+ZW5hYmxlZDwvYT48L2k+JyA6ICcnLCBcIlxcbiAgICA8L3A+XFxuICAgIFwiKTtcbiAgfVxufTtcblxudmFyIG1vYmlsZVdhbGxldEluc3RhbGxNZXNzYWdlID0gZnVuY3Rpb24gbW9iaWxlV2FsbGV0SW5zdGFsbE1lc3NhZ2UoaGVscGVycykge1xuICB2YXIgc2VsZWN0ZWRXYWxsZXQgPSBoZWxwZXJzLnNlbGVjdGVkV2FsbGV0O1xuICByZXR1cm4gXCJcXG4gIDxwIHN0eWxlPVxcXCJmb250LXNpemU6IDAuODg5cmVtO1xcXCI+XFxuICBUYXAgdGhlIGJ1dHRvbiBiZWxvdyB0byA8Yj5PcGVuIFwiLmNvbmNhdChzZWxlY3RlZFdhbGxldCwgXCI8L2I+LiBQbGVhc2UgYWNjZXNzIHRoaXMgc2l0ZSBvbiBcIikuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIidzIGluLWFwcCBicm93c2VyIGZvciBhIHNlYW1sZXNzIGV4cGVyaWVuY2UuXFxuICA8L3A+XFxuICBcIik7XG59O1xuXG5leHBvcnQgeyBleHRlbnNpb25JbnN0YWxsTWVzc2FnZSBhcyBlLCBtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZSBhcyBtIH07IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykgeyB0cnkgeyB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7IHZhciB2YWx1ZSA9IGluZm8udmFsdWU7IH0gY2F0Y2ggKGVycm9yKSB7IHJlamVjdChlcnJvcik7IHJldHVybjsgfSBpZiAoaW5mby5kb25lKSB7IHJlc29sdmUodmFsdWUpOyB9IGVsc2UgeyBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7IH0gfVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyB2YXIgc2VsZiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTsgZnVuY3Rpb24gX25leHQodmFsdWUpIHsgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpOyB9IGZ1bmN0aW9uIF90aHJvdyhlcnIpIHsgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7IH0gX25leHQodW5kZWZpbmVkKTsgfSk7IH07IH1cblxuaW1wb3J0IHsgZSBhcyBleHRlbnNpb25JbnN0YWxsTWVzc2FnZSB9IGZyb20gJy4vY29udGVudC02MTJiZDA0Yi5qcyc7XG52YXIgc3RhdHVzSWNvbiA9IFwiXFxuPHN2ZyB3aWR0aD1cXFwiNDBcXFwiIGhlaWdodD1cXFwiNDBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxMDkgMTA5XFxcIiBmaWxsPVxcXCJub25lXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPlxcbjxwYXRoIGZpbGwtcnVsZT1cXFwiZXZlbm9kZFxcXCIgY2xpcC1ydWxlPVxcXCJldmVub2RkXFxcIiBkPVxcXCJNNTQuNyAwQzI0LjcgMCAwLjQwMDAyNCAyNC4zIDAuNDAwMDI0IDU0LjNDMC40MDAwMjQgODQuMyAyNC43IDEwOC42IDU0LjcgMTA4LjZDODQuNyAxMDguNiAxMDkgODQuMyAxMDkgNTQuM0MxMDguOSAyNC4zIDg0LjYgMCA1NC43IDBaTTQ3LjMgNzcuNkM0MC40IDc4IDMzLjQgNzQgMzMuMSA2Ny41QzMyLjcgNjEuMSAzNy45IDU2LjggNDYuNSA1Ni40QzQ5LjcgNTYuMiA1Mi4zIDU2LjUgNTQuOCA1Ni43QzU3LjQgNTcgNjAgNTcuMiA2My4xIDU3QzY0LjYgNTYuOSA2Ni4yIDU2LjcgNjcuOCA1Ni40QzY3IDY3LjQgNTguNiA3NyA0Ny4zIDc3LjZaTTY1LjMgNTIuM0M2MS45IDUyLjUgNTkuMiA1Mi4yIDU2LjUgNTEuOUM1My44IDUxLjYgNTEgNTEuMyA0Ny43IDUxLjVDNDYuMSA1MS42IDQ0LjQgNTEuOCA0Mi44IDUyLjJDNDMuOCA0MC4yIDUyLjYgMjkuNyA2NC41IDI5LjFDNzEuOCAyOC43IDc5LjEgMzMuMSA3OS41IDQwLjJDNzkuOSA0Ny4yIDc0LjQgNTEuOCA2NS4zIDUyLjNaXFxcIiBmaWxsPVxcXCIjNDM2MERGXFxcIi8+XFxuPC9zdmc+XFxuXCI7XG5cbmZ1bmN0aW9uIHN0YXR1cyhvcHRpb25zKSB7XG4gIHZhciBwcmVmZXJyZWQgPSBvcHRpb25zLnByZWZlcnJlZCxcbiAgICAgIGxhYmVsID0gb3B0aW9ucy5sYWJlbCxcbiAgICAgIGljb25TcmMgPSBvcHRpb25zLmljb25TcmMsXG4gICAgICBzdmcgPSBvcHRpb25zLnN2ZztcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBsYWJlbCB8fCAnU3RhdHVzJyxcbiAgICBpY29uU3JjOiBpY29uU3JjLFxuICAgIGljb25TcmNTZXQ6IGljb25TcmMsXG4gICAgc3ZnOiBzdmcgfHwgc3RhdHVzSWNvbixcbiAgICB3YWxsZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfd2FsbGV0ID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlKGhlbHBlcnMpIHtcbiAgICAgICAgdmFyIGdldFByb3ZpZGVyTmFtZSwgZ2V0QWRkcmVzcywgZ2V0QmFsYW5jZSwgZ2V0TmV0d29yaywgcHJvdmlkZXIsIGFjY291bnRzQXBwcm92ZWQ7XG4gICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBnZXRQcm92aWRlck5hbWUgPSBoZWxwZXJzLmdldFByb3ZpZGVyTmFtZSwgZ2V0QWRkcmVzcyA9IGhlbHBlcnMuZ2V0QWRkcmVzcywgZ2V0QmFsYW5jZSA9IGhlbHBlcnMuZ2V0QmFsYW5jZSwgZ2V0TmV0d29yayA9IGhlbHBlcnMuZ2V0TmV0d29yaztcbiAgICAgICAgICAgICAgICBwcm92aWRlciA9IHdpbmRvdy5ldGhlcmV1bTtcbiAgICAgICAgICAgICAgICBhY2NvdW50c0FwcHJvdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCB7XG4gICAgICAgICAgICAgICAgICBwcm92aWRlcjogcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICBcImludGVyZmFjZVwiOiBwcm92aWRlciAmJiBnZXRQcm92aWRlck5hbWUocHJvdmlkZXIpID09PSAnU3RhdHVzJyA/IHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdDogZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJ1xuICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY291bnRzQXBwcm92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjb3VudHNBcHByb3ZlZCA/IGdldEFkZHJlc3MocHJvdmlkZXIpIDogUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmFsYW5jZToge1xuICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY291bnRzQXBwcm92ZWQgPyBnZXRCYWxhbmNlKHByb3ZpZGVyKSA6IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXROZXR3b3JrKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTdGF0dXMnXG4gICAgICAgICAgICAgICAgICB9IDogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gd2FsbGV0KF94KSB7XG4gICAgICAgIHJldHVybiBfd2FsbGV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB3YWxsZXQ7XG4gICAgfSgpLFxuICAgIHR5cGU6ICdpbmplY3RlZCcsXG4gICAgbGluazogJ2h0dHBzOi8vc3RhdHVzLmltLycsXG4gICAgaW5zdGFsbE1lc3NhZ2U6IGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlLFxuICAgIG1vYmlsZTogdHJ1ZSxcbiAgICBwcmVmZXJyZWQ6IHByZWZlcnJlZFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGF0dXM7Il0sInNvdXJjZVJvb3QiOiIifQ==