(self.webpackChunkmy_swap=self.webpackChunkmy_swap||[]).push([[3525],{76522:(A,e,n)=>{"use strict";n.d(e,{e:()=>g,m:()=>t});var g=function(A){var e=A.currentWallet,n=A.selectedWallet;return e?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(e,"</b>\n    installed. If you would prefer to use\n    <b>").concat(n,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(n,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(n,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===n?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},t=function(A){var e=A.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n  Tap the button below to <b>Open '.concat(e,"</b>. Please access this site on ").concat(e,"'s in-app browser for a seamless experience.\n  </p>\n  ")}},63525:(A,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>w});var g=n(76522);function t(A,e){var n=Object.keys(A);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(A);e&&(g=g.filter((function(e){return Object.getOwnPropertyDescriptor(A,e).enumerable}))),n.push.apply(n,g)}return n}function r(A){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?t(Object(n),!0).forEach((function(e){o(A,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(e){Object.defineProperty(A,e,Object.getOwnPropertyDescriptor(n,e))}))}return A}function o(A,e,n){return e in A?Object.defineProperty(A,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):A[e]=n,A}function a(A,e,n,g,t,r,o){try{var a=A[r](o),B=a.value}catch(A){return void n(A)}a.done?e(B):Promise.resolve(B).then(g,t)}function B(A){return function(){var e=this,n=arguments;return new Promise((function(g,t){var r=A.apply(e,n);function o(A){a(r,g,t,o,B,"next",A)}function B(A){a(r,g,t,o,B,"throw",A)}o(void 0)}))}}function c(){return G.apply(this,arguments)}function G(){return(G=B(regeneratorRuntime.mark((function A(){var e,g,t;return regeneratorRuntime.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(!(e=window.ethereum)||!e.isFrame){A.next=3;break}return A.abrupt("return",e);case 3:return A.next=5,n.e(215).then(n.t.bind(n,215,23));case 5:return g=A.sent,t=g.default,A.abrupt("return",t("frame"));case 8:case"end":return A.stop()}}),A)})))).apply(this,arguments)}const w=function(A){var e,n=A.preferred,t=A.label,o=A.iconSrc;return{name:t||"Frame",iconSrc:o||"data:image/png;base64,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",iconSrcSet:o||"data:image/png;base64,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",svg:A.svg,wallet:(e=B(regeneratorRuntime.mark((function A(e){var n,g;return regeneratorRuntime.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return n=e.createModernProviderInterface,A.next=3,c();case 3:return g=A.sent,A.abrupt("return",{provider:g,interface:r(r({},n(g)),{},{connect:function(){return g.request({method:"eth_requestAccounts"}).catch((function(A){if(A.message.includes("Unexpected end of JSON input"))throw new Error("Frame is not running");throw A}))},disconnect:g.close})});case 5:case"end":return A.stop()}}),A)}))),function(A){return e.apply(this,arguments)}),type:"injected",link:"https://frame.sh",installMessage:g.e,desktop:!0,mobile:!1,preferred:n}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1zd2FwLy4vbm9kZV9tb2R1bGVzL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL2NvbnRlbnQtNjEyYmQwNGIuanMiLCJ3ZWJwYWNrOi8vbXktc3dhcC8uL25vZGVfbW9kdWxlcy9ibmMtb25ib2FyZC9kaXN0L2VzbS9mcmFtZS1hM2Y0ZTVhNS5qcyJdLCJuYW1lcyI6WyJleHRlbnNpb25JbnN0YWxsTWVzc2FnZSIsImhlbHBlcnMiLCJjdXJyZW50V2FsbGV0Iiwic2VsZWN0ZWRXYWxsZXQiLCJjb25jYXQiLCJtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJ2YWx1ZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwicmVzb2x2ZSIsInJlamVjdCIsIl9uZXh0IiwiX3Rocm93IiwiYXJnIiwiaW5mbyIsImVycm9yIiwiZG9uZSIsIlByb21pc2UiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJmbiIsInNlbGYiLCJ0aGlzIiwiYXJncyIsImVyciIsInVuZGVmaW5lZCIsImdldFByb3ZpZGVyIiwiX2dldFByb3ZpZGVyIiwicmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUyIiwiaW5qZWN0ZWQiLCJfeWllbGQkaW1wb3J0IiwiZXRoUHJvdmlkZXIiLCJ3cmFwIiwiX2NvbnRleHQyIiwicHJldiIsIm5leHQiLCJ3aW5kb3ciLCJldGhlcmV1bSIsImlzRnJhbWUiLCJhYnJ1cHQiLCJzZW50Iiwic3RvcCIsIm9wdGlvbnMiLCJfd2FsbGV0IiwicHJlZmVycmVkIiwibGFiZWwiLCJpY29uU3JjIiwibmFtZSIsImljb25TcmNTZXQiLCJzdmciLCJ3YWxsZXQiLCJfY2FsbGVlIiwiY3JlYXRlTW9kZXJuUHJvdmlkZXJJbnRlcmZhY2UiLCJwcm92aWRlciIsIl9jb250ZXh0IiwiY29ubmVjdCIsInJlcXVlc3QiLCJtZXRob2QiLCJtZXNzYWdlIiwiaW5jbHVkZXMiLCJFcnJvciIsImRpc2Nvbm5lY3QiLCJjbG9zZSIsIl94IiwidHlwZSIsImxpbmsiLCJpbnN0YWxsTWVzc2FnZSIsImUiLCJkZXNrdG9wIiwibW9iaWxlIl0sIm1hcHBpbmdzIjoiNEhBQUEsSUFBSUEsRUFBMEIsU0FBaUNDLEdBQzdELElBQUlDLEVBQWdCRCxFQUFRQyxjQUN4QkMsRUFBaUJGLEVBQVFFLGVBRTdCLE9BQUlELEVBQ0ssd0lBQTBJRSxPQUFPRixFQUFlLDREQUE0REUsT0FBT0QsRUFBZ0Isd0xBQTBMQyxPQUFPRCxFQUFnQixxWUFFcGMsb0hBQXFIQyxPQUFPRCxFQUFnQiw2UUFBaVJDLE9BQTBCLFVBQW5CRCxFQUE2Qiw4U0FBZ1QsR0FBSSxxQkFJNXZCRSxFQUE2QixTQUFvQ0osR0FDbkUsSUFBSUUsRUFBaUJGLEVBQVFFLGVBQzdCLE1BQU8sMkVBQTZFQyxPQUFPRCxFQUFnQixxQ0FBcUNDLE9BQU9ELEVBQWdCLDhELDBFQ2J6SyxTQUFTRyxFQUFRQyxFQUFRQyxHQUFrQixJQUFJQyxFQUFPQyxPQUFPRCxLQUFLRixHQUFTLEdBQUlHLE9BQU9DLHNCQUF1QixDQUFFLElBQUlDLEVBQVVGLE9BQU9DLHNCQUFzQkosR0FBYUMsSUFBa0JJLEVBQVVBLEVBQVFDLFFBQU8sU0FBVUMsR0FBTyxPQUFPSixPQUFPSyx5QkFBeUJSLEVBQVFP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QUMvQyxPQUNFLE9BQVFBLEVBQVNwQixLQUFPb0IsRUFBU25CLE1BQy9CLEtBQUssRUFHSCxPQUZBaUIsRUFBZ0NqRixFQUFRaUYsOEJBQ3hDRSxFQUFTbkIsS0FBTyxFQUNUWCxJQUVULEtBQUssRUFFSCxPQURBNkIsRUFBV0MsRUFBU2QsS0FDYmMsRUFBU2YsT0FBTyxTQUFVLENBQy9CYyxTQUFVQSxFQUNWLFVBQWFoRSxFQUFjQSxFQUFjLEdBQUkrRCxFQUE4QkMsSUFBWSxHQUFJLENBQ3pGRSxRQUFTLFdBQ1AsT0FBT0YsRUFBU0csUUFBUSxDQUN0QkMsT0FBUSx3QkFDQSxPQUFFLFNBQVVuQyxHQUNwQixHQUFJQSxFQUFJb0MsUUFBUUMsU0FBUyxnQ0FDdkIsTUFBTSxJQUFJQyxNQUFNLHdCQUdsQixNQUFNdEMsTUFHVnVDLFdBQVlSLEVBQVNTLFVBSTNCLEtBQUssRUFDTCxJQUFLLE1BQ0gsT0FBT1IsRUFBU2IsVUFHckJVLE9BR0wsU0FBZ0JZLEdBQ2QsT0FBT3BCLEVBQVF2RCxNQUFNZ0MsS0FBTTVCLGFBSy9Cd0UsS0FBTSxXQUNOQyxLQUFNLG1CQUNOQyxlQUFnQixFQUFBQyxFQUNoQkMsU0FBUyxFQUNUQyxRQUFRLEVBQ1J6QixVQUFXQSIsImZpbGUiOiIzNTI1Lm1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UgPSBmdW5jdGlvbiBleHRlbnNpb25JbnN0YWxsTWVzc2FnZShoZWxwZXJzKSB7XG4gIHZhciBjdXJyZW50V2FsbGV0ID0gaGVscGVycy5jdXJyZW50V2FsbGV0LFxuICAgICAgc2VsZWN0ZWRXYWxsZXQgPSBoZWxwZXJzLnNlbGVjdGVkV2FsbGV0O1xuXG4gIGlmIChjdXJyZW50V2FsbGV0KSB7XG4gICAgcmV0dXJuIFwiXFxuICAgIDxwIHN0eWxlPVxcXCJmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDsgbWFyZ2luOiAwLjg4OXJlbSAwO1xcXCI+XFxuICAgIFdlIGhhdmUgZGV0ZWN0ZWQgdGhhdCB5b3UgYWxyZWFkeSBoYXZlXFxuICAgIDxiPlwiLmNvbmNhdChjdXJyZW50V2FsbGV0LCBcIjwvYj5cXG4gICAgaW5zdGFsbGVkLiBJZiB5b3Ugd291bGQgcHJlZmVyIHRvIHVzZVxcbiAgICA8Yj5cIikuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIjwvYj5cXG4gICAgaW5zdGVhZCwgdGhlbiBjbGljayBiZWxvdyB0byBpbnN0YWxsLlxcbiAgICA8L3A+XFxuICAgIDxwIHN0eWxlPVxcXCJmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDsgbWFyZ2luOiAwLjg4OXJlbSAwO1xcXCI+XFxuICAgIDxiPlRpcDo8L2I+XFxuICAgIElmIHlvdSBhbHJlYWR5IGhhdmUgXCIpLmNvbmNhdChzZWxlY3RlZFdhbGxldCwgXCIgaW5zdGFsbGVkLCBjaGVjayB5b3VyXFxuICAgIGJyb3dzZXIgZXh0ZW5zaW9uIHNldHRpbmdzIHRvIG1ha2Ugc3VyZSB0aGF0IHlvdSBoYXZlIGl0IGVuYWJsZWRcXG4gICAgYW5kIHRoYXQgeW91IGhhdmUgZGlzYWJsZWQgYW55IG90aGVyIGJyb3dzZXIgZXh0ZW5zaW9uIHdhbGxldHMuXFxuICAgIDxzcGFuXFxuICAgICAgY2xhc3M9XFxcImJuLW9uYm9hcmQtY2xpY2thYmxlXFxcIlxcbiAgICAgIHN0eWxlPVxcXCJjb2xvcjogIzRhOTBlMjsgZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxcIlxcbiAgICAgIG9uY2xpY2s9XFxcIndpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcXFwiPlxcbiAgICAgIFRoZW4gcmVmcmVzaCB0aGUgcGFnZS5cXG4gICAgPC9zcGFuPlxcbiAgICA8L3A+XFxuICAgIFwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJcXG4gICAgPHAgc3R5bGU9XFxcImZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0OyBtYXJnaW46IDAuODg5cmVtIDA7XFxcIj5cXG4gICAgWW91J2xsIG5lZWQgdG8gaW5zdGFsbCA8Yj5cIi5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiPC9iPiB0byBjb250aW51ZS4gT25jZSB5b3UgaGF2ZSBpdCBpbnN0YWxsZWQsIGdvIGFoZWFkIGFuZFxcbiAgICA8c3BhblxcbiAgICBjbGFzcz1cXFwiYm4tb25ib2FyZC1jbGlja2FibGVcXFwiXFxuICAgICAgc3R5bGU9XFxcImNvbG9yOiAjNGE5MGUyOyBmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDtcXFwiXFxuICAgICAgb25jbGljaz17d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO30+XFxuICAgICAgcmVmcmVzaCB0aGUgcGFnZS5cXG4gICAgPC9zcGFuPlxcbiAgICBcIikuY29uY2F0KHNlbGVjdGVkV2FsbGV0ID09PSAnT3BlcmEnID8gJzxicj48YnI+PGk+SGludDogSWYgeW91IGFscmVhZHkgaGF2ZSBPcGVyYSBpbnN0YWxsZWQsIG1ha2Ugc3VyZSB0aGF0IHlvdXIgd2ViMyB3YWxsZXQgaXMgPGEgc3R5bGU9XCJjb2xvcjogIzRhOTBlMjsgZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7XCIgY2xhc3M9XCJibi1vbmJvYXJkLWNsaWNrYWJsZVwiIGhyZWY9XCJodHRwczovL2hlbHAub3BlcmEuY29tL2VuL3RvdWNoL2NyeXB0by13YWxsZXQvXCIgcmVsPVwibm9yZWZlcnJlciBub29wZW5lclwiIHRhcmdldD1cIl9ibGFua1wiPmVuYWJsZWQ8L2E+PC9pPicgOiAnJywgXCJcXG4gICAgPC9wPlxcbiAgICBcIik7XG4gIH1cbn07XG5cbnZhciBtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZSA9IGZ1bmN0aW9uIG1vYmlsZVdhbGxldEluc3RhbGxNZXNzYWdlKGhlbHBlcnMpIHtcbiAgdmFyIHNlbGVjdGVkV2FsbGV0ID0gaGVscGVycy5zZWxlY3RlZFdhbGxldDtcbiAgcmV0dXJuIFwiXFxuICA8cCBzdHlsZT1cXFwiZm9udC1zaXplOiAwLjg4OXJlbTtcXFwiPlxcbiAgVGFwIHRoZSBidXR0b24gYmVsb3cgdG8gPGI+T3BlbiBcIi5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiPC9iPi4gUGxlYXNlIGFjY2VzcyB0aGlzIHNpdGUgb24gXCIpLmNvbmNhdChzZWxlY3RlZFdhbGxldCwgXCIncyBpbi1hcHAgYnJvd3NlciBmb3IgYSBzZWFtbGVzcyBleHBlcmllbmNlLlxcbiAgPC9wPlxcbiAgXCIpO1xufTtcblxuZXhwb3J0IHsgZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UgYXMgZSwgbW9iaWxlV2FsbGV0SW5zdGFsbE1lc3NhZ2UgYXMgbSB9OyIsImZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykgeyB0cnkgeyB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7IHZhciB2YWx1ZSA9IGluZm8udmFsdWU7IH0gY2F0Y2ggKGVycm9yKSB7IHJlamVjdChlcnJvcik7IHJldHVybjsgfSBpZiAoaW5mby5kb25lKSB7IHJlc29sdmUodmFsdWUpOyB9IGVsc2UgeyBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7IH0gfVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyB2YXIgc2VsZiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTsgZnVuY3Rpb24gX25leHQodmFsdWUpIHsgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpOyB9IGZ1bmN0aW9uIF90aHJvdyhlcnIpIHsgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7IH0gX25leHQodW5kZWZpbmVkKTsgfSk7IH07IH1cblxuaW1wb3J0IHsgZSBhcyBleHRlbnNpb25JbnN0YWxsTWVzc2FnZSB9IGZyb20gJy4vY29udGVudC02MTJiZDA0Yi5qcyc7XG52YXIgaW1nID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVBBQUFBRHZDQVlBQUFETTFWbmNBQUFIRFVsRVFWUjRuTzNkell0ZGR4M0g4VThlYkJLcVlndGFMS1JTN0Vyb2d3OVlkWk1hQTdVZzdhSStnQXZwb2hWRWNPRkd1cEptb1grQm9rWmFFTGVLVm1tN2lDVktXNmlvRkhSWEtLaW91R2tyVk5PbkpITGdqTVEwbVR1NU01TjdQdmU4WGpCa2s4ejg1dnZMZSs1djdweHpaOCtOTjkrU0xUaVc1TjRrSDBweVE1S3J0L0tQMkZIL1NmTGRKTWVObFEzN0YwemlzMG0ra2VRakpyWnk3MGp5VUpMRFNSNlkrU3dZWFNyZzl5WjVPTW1uRFdweTdrOXlMc21YNXo0SUxoN3diVWtlR3lObW1vWkg0RDBlaWJrdzRKdVRQSlBrME93bk0zMzNqeXNVOFl6dFBlOVR2eWJKS2ZGV0dTTCt3ZHlITUdmbkIveWpKTmZPZlNDRmhrZmdFM01md2x4dEJIdzB5V2ZtUG94aTk0dDRuallDL3ZiY0I3RUdIS2RuYU8vNHJQTkg1ejZJTmVFNFBUTkR3UGZNZlFocnhuRjZSb2FBYjUvN0VOYVFpR2RpK0Rud1RYTWZ3cG9hSW41L2t1OG5lU0hKMjhhTFA5ZzllOGEzbDVMOFBjbUx1ejNySWVEMzJOQzE5Y254alN2dmxTUi9HaStNK21tU3AzZGpCWHZINjJxQm5mWDJKQjlMOHZVa1Q0MFhTZDBwWU9oMEpNa1RTUjVKY25DblBvTzlXL2c3d002NUw4bXpTYTRYTUhTNlpmemUrTjNiWGIyQVlUWGVOeDZwdDBYQXNEckRTMVI5YXpzZlhjQ3dXZzl1NTFvTUFjUHFmWFBaRlFnWVZ1OEw0d3RxWERZQncrb05sN25ldGN3cUJBelRjR3laVlFnWXBtR3BKN0lFRE5PdzFFVWRBb1pwV0twRkFjTTBuRjFtRlFLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1l2dHQzcGFjVG5JaXljdEpEaGFzdDltclNkNlY1SUVraCtZK2pFVUV2TmliU2U1T2NuTHFDMTB6djBqeXVQK2ptM09FWHV5djRsMkprK1BzMllTQUZ6dWI1TURVRjdtR0RveXpaeE1DWG15dk9hMkV1VytCQVVFeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14QVVNeEFVTXhBVU14djM4R2l1MzFtL2VnMXhEd2MvWVBPZzBCZnlYSkdmc0hmVFllZ1Q4bFl1aXo4UVRXcjVNY0V6RjBPZjhaNkZQakkvRlpld2dkTHZ3UjB2QklmTlFqTVhTNDJNK0FIYWVoeEtVdTRuQ2NoZ0tiWFlYbE9BMFR0K2d5U3NkcG1MQ3RYQWZ0T0EwVHRkVWJHVGFPMDIvYVNOZ1ZTN1YxT1hjaURSSGZhZTlnVjd4em1YZDZ1YmNTUHBua3VQMkRIWGREa2k5ZTdqdGQ1bDdnSHpwS3c2NTRKTWtkbC9PT2x3bjRYSkxYN1Ivc3VLdVNuRXh5Wkt2dmVKbUFodyt5eDk3QnJ0ZzNmcXU2cFlpOW5BNU16OURscjdaeW5CWXdUTk8rclJ5bkJRelR0ZkE0TFdDWXRrMlAwd0tHNmJ2a2NWckEwT0dpeDJrQlE0KzNIS2NGREYzKzd6Z3RZT2l6YjN3ay9xQ0FvZE1ROFhjRURMMXVGVEQwZWxQQTBPdU1nS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnS0dZZ0tHWWdLR1lnQmM3Tzc1eDVaMHo4ODBKZUxGaFJxOU5mWkZyNlBUd3k3dm1Qb1JGQkx6WTRTVEhwcjdJTlhScmt1dm5Qb1JGOWs5N2VaTXd6T2pSSkNlU3ZKems0TndIc3N1RzA4N1ZTZTRiLzJRVEF0NmFRMG0rMXJCUTVzVVJHb29KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW9KR0lvSkdJb0pHSW90RS9BKzRjTTBMQlBpcTBuZXNIK3dlc3NFL004ay83SjNzSHJMQlB4NmtyL1pPMWk5WmIrWGZkcmV3ZW90Ry9EUDdCMnMzcklCL3liSjgvWVBWbXM3UHc0NmJ1OWd0YllUOEkrVC9ONyt3ZXBzOTRLTXp5YzVZLzlnTmJZYjhBdEo3clozc0JvN2NVbmtZMG51U1hMV0hzS1Z0VlBYTkQrYTVQWWtmN1IvY09YczVFMEp2MHR5VzVLSFhHb0pWOFNlZmRkY2Q5MU9mcUJ6U1U0bGVUakpuOGN2RU1NSE9HQS9ZY2U5dHVmR20yL1o3YkZlbStRRFk4aG54c2paWGNQekVWY2x1U25KVjVNY051KzE5UHlWQ0pqVkdyNkEvakxKeCszRDJubmNqZm5yNzhVa1I5eUFzcGFlRmZBOERDL0FjRFRKTTNNZnhKcjV1WURuWTdpUCt3NFJyNDNmSm5sT3dQUHl4aGl4NDNTL0IrUEY2V2JKY2JyZjhLVGtreEh3YkRsTzl4cWVsUHpTeHVvRlBGK08wMzFPajN2MjBzYktCVHh2anRNOS9wSGtFeGZlYnlCZ0hLZW43NGtrSHg2ZWRiNXdwUUltNXgybm56S05TUmx1RVBwY2tydkdSK0MzMkQvM0NmRS9HOGZwN3lXNTF4ZjNsZmgza3I4aytVT1NueVE1dWVrcWt2d1hPNVM3RmlRYUl5TUFBQUFBU1VWT1JLNUNZSUk9XCI7XG52YXIgaW1nJDEgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZUFBQUFIZUNBWUFBQUJEcE5oSUFBQVBOVWxFUVZSNG5PM2RlOHhrQjEzRzhXZmJwVVNsSUtWYWlyMVE2eVZDTDFFamxHaFMxQkpLRlVJSUVDNkNOeExBQkVUVWdCb2owU0FhWXdJeENocEZvaGl4cUZTS1dKVS9XaFJLR2tXclVMRWlGRnFqU0RHMHhjUmUySnJqbnJmZDFOM3Vlemx6bm5ubmZEN0paUDk3WitaM1p2ZTc4M3Ruempsd3p2a1haR0puSkxrNHlZVkp2aTdKWTVOOFZaSlRwNzRqV0VQM0pIbC9rajlJOGhzT0VIQXNCeWVhekVPVFBDUEpjNU44WTVKelRaeUZHdjVPZmNkNHV5VEpTNUxjN3NVQVBOQmVBL3lZSk05Szh1cnhuZTRCRTRiN1BDZkpseVY1UVpMYmpBVTQwZ203bk1id2p2ZUhrL3g1a2w5SmNvNzR3bEZkbHVRZFNVNHhIdUJJdXdud0U1SmNsZVNOU2M0elRUaXVTNVA4YnBLSEd4V3daU2NCSHQ3aHZqVEpYeVo1c2duQ2pnenZoSDgveVNPTURjZ09Bano4by9IbUpHL3h2M2pZTmV0bzREN2JDZkFRM044YjMvMENlMk1kRGZ5ZjR3WDR5OGUxMlhjWkYwekdPaHA0MEFBUFg1LzRuZkVmQzJCYTF0R3djQThXNEY5Szh2U2xEd2hXeURvYUZ1eFlBZjZCSkMvM3dvQ1ZzNDZHaFRwYWdCK1g1T2U5SUdBMjF0R3dRQThNOEVsSlhwZmtOQzhHbUpWMU5Dek1Bd1A4dFBIOHRjRDhyS05oUVk0TThIQmhodGM0K0ZCbEhRMExjV1NBaDZzYVBjbUJoenJyYUZpQXJRQS9KTWtQT2VDd05xeWpZY050QmZoYmszeXpndzFyeFRvYU50aFdnSWVWMThNY2FGZzcxdEd3b1U0WS8ySS93UUdHdFdVZERSdG9DUEJaQWd4cnp6b2FOc3dRNE1lUEYxNEExcHQxTkd5UUljRG5PNkN3YjJ5dG94L2xrTUgrSnNDdy93d1JmaytTWnpoMnNIOE5aNzg2dy9HRGZlZWlKSmNuK1hDU2E1SjhJc21COFFhYjVwWWsvelgrK2Rra2R5VTV0TitmNDRGenpyL2dEbDlCQW1DTkhScHZYMHp5dVNUWEo3azJ5UWVTM0RpR2VkODVlSnlMOGdOQTJ3bmpiV2pXWThiYjA4YkhkRU9TdjBweVJaS3I5dE9SRWw4QTlyUGhHdll2VGZKSFNUNlk1UHVUbkxnZm5vOEFBN0FKdm5TOG9OQmJrN3d2eVhldSszTVNZQUEyelpPVC9FV1NOeVg1eW5WOWJnSU13Q1lhK3ZiS01jUlBXY2ZuSjhBQWJMSUxrN3dyeWZldTIzTVVZQUEyM1hDNjViY2xlZTA2UFU4QkJtQXAzcERrTmV2eVhBVVlnQ1g1aFNTdldvZm5LOEFBTE0zUHJzTzUxQVVZZ0tVNU9jbXZqaWZ4cUJGZ0FKWm91QkRSTHpmUG1pWEFBQ3pWcFVtK3IvWGNCUmlBSmZ1WkpLYzFucjhBQTdCa1p5YjVzY2J6RjJBQWx1NkZTYjU2N2hrSU1BQkxkM3FTRjgwOUF3RUdnT1M3azV3eTV4d0VHQUNTYjBweTNweHpFR0FBT056RFMrYWNnd0FEd0dIUFRISmdybGtJTUFBYzlnMUp6cHByRmdJTUFJY2RUUExFdVdZaHdBQnd2NitkYXhZQ0RBRDNlL1Jjc3hCZ0FMaWZkOEFBVUhEeVhIY3B3QUJ3djBOenpVS0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnUUlBQm9FQ0FBYUJBZ0FHZ1FJQUJvRUNBQWFCQWdBR2dRSUFCb0VDQUFhQkFnQUdnNEtDaHN3SzNKcmszeVFIRFpRTnN2WlpQZFRDWmtnQXpwV3VTdkQ3SnpRTE1CdGw2TForWjVLZVNYT3pnTWdVQlppcnZTL0xzSkxlWktCdnFZMG11Uy9LSFNTNXhrTmtydndObUNuY2srUW54WlFGdUcxL3JkempZN0pVQU00Vi9UbktUU2JJUU40MnZlZGdUQVdZS2Q0Ky9KNE1sdUhkOHpjT2VDREJUT09BRFZ5eUkxenVURUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnUVlBQW9FR0FBS0JCZ0FDZ1FZQUFvRUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnUVlBQW9FR0FBS0JCZ0FDZ1FZQUFvRUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnUVlBQW9FR0FBS0JCZ0FDZ1FZQUFvRUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnUVlBQW9FR0FBS0JCZ0FDZ1FZQUFvRUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnUVlBQW9FR0FBS0JCZ0FDZ1FZQUFvRUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnUVlBQW9FR0FBS0JCZ0FDZ1FZQUFvRUdBQUtCQmdBQ2dRWUFBb0VHQUFLQkJnQUNnWUFuekE0QUZnWGtPQS84Zk1BV0JlUTRELzJzd0JZRjVEZ045bTVnQXdyeUhBNzBueVhuTUhnUGtNQWI0cnljdVNYR3Z1QURDUHJhOGgzWnprZVVrK1pPNEFzSHBIZmcvNDAwbWU0ME5aQUxCNkR6d1J4eTFKdnNjNkdnQlc2Mmhud3ZxVWRUUUFyTmF4VGtWcEhRMEFLL1JnNTRLMmpnYUFGVG5leFJpc293RmdCYlp6TlNUcmFBQ1kySFl2UjJnZERRQVQyc24xZ0syakFXQWlPNzBndjNVMEFFeGdwd0dPZFRRQTdOMXVBaHpyYUFEWW05MEdPTmJSQUxCN2V3bHdyS01CWUhmMkd1QllSd1BBemswUjRGaEhBOERPVEJYZ1dFY0R3UFpOR2VCWVJ3UEE5a3dkNEZoSEE3Q1AzVHZYUTE5RmdHTWREY0ErZGVKY0QzdFZBYzY0am41K2trK3U4RDRBWUVxbkpUbDlqb211TXNBWkkveWpTUTZ0K0g0QVlBcG5KN2xzamttdU9zQ0RLNU5jTWNQOUFNQmVIVXp5STBuT1hmVWs1d2p3UFdPQTc1bmh2Z0Jncng2ZjVPMUp6bHJsSk9jSThPRGpTVzZmNmI0QVlLOHVTdktPY1NXOUVuTUYrTkNjSCswR2dBazhhWHduZk1ZcWhqbFhnQS9NZEQ4QU1LVnZTL0xPVmF5ajV3b3dBT3hYSzFsSEN6QUFITi9rNjJnQkJvRHRtWFFkTGNBQXNIMlRyYU1GR0FCMlpwSjF0QUFEd003dGVSMHR3QUN3TzN0YVJ3c3dBT3plcnRmUkFnd0FlN09yZGJRQUE4RGU3WGdkTGNBQU1JMGRyYU1GR0FDbXMrMTF0QUFEd0xTMnRZNFdZQUNZM25IWDBRSU1BS3Z4b090b0FRYUExVG5tT2xxQUFXQzFqcnFPRm1BQVdMMy90NDRXWUFDWXg5WTYrc3dJTUFETWFsaEh2eVhKU1FJTUFQTzZMTW5UQlJnQTV2ZGlBUWFBK1gyTEFBUEEvQjRwd0FBd3YwTUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUxNRk80ZGJ3QnNrd0F6aFlja09XQ1NMTVNoSlBjNDJPeVZBRE9GcjAveVdKTmtJYjRreWRrT05uc2x3RXpoNUNSdlNQSUkwMlRERFp1ZW4wNXlwZ1BOWGgwMFFTWnlTWkkvU2ZMNkpEZVB2eE8ybG1ZVGJMMldUMG55aWlUUGMxU1pnZ0F6cFl2SDI2MEN6QWJaZWkyZjZxQXlKUUZtRmZ4REJYQWNmZ2NNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCUUlNQUFVQ0RBQUZBZ3dBQlFJTUFBVUNEQUFGQWd3QUJRSU1BQVVDREFBRkFnd0FCWE1GK0QrVDNPRUFBOEJoY3dYNDlpUjNtamtBSERaWGdHOGJid0N3ZUpreHdIY24rWXlKQThCaGMzNEk2Mi9NSEFBT216UEFWNXM1QUJ3Mlo0Q3ZTL0k1Y3dlQWVRTThmQXI2U2pNSGdIa0RmRytTZDVzNUFNeC9KcXdQSlBrSGN3ZGc2ZVlPOEhCR3JNdVhQblFBYUp3TCt1MUpibG44NUFGWXRFYUFQNVhrdDVZK2VBQ1dyWFUxcERjbXVXSHB3d2RndVZvQi9ueVMxM3JkQWJCVUp6N3l0Tk5hVC8zR0pJOUs4a1N2UGdBVzV1NzJCZmwvTHNuN0Z6ZDJBQmF2SGVEUEp2bkJKQjlmK29FQVlGbmFBYzRZMzJjbitjUWFQQllBbU1VNkJIaHdmWkpuZVNjTXdGS3NTNEF6UnZpWlNmNStEUjRMQUt6VU9nVjQ4TkVrVDAzeXpqVjRMQUN3TXMydklSM0xmeWQ1VjVJdmpGOVJlcWpERDhDR3VYc2RBenc0bE9TRFNhNUs4aFZKSHJjR2p3a0FwcksyQWQ3eUgrTTYrcCtTbkQ3ZVRseVBod1lBdTdiMkFkNHkvRzc0dDVOOEpNbWQ0eG0wSHI0ZUR3MEFkbXpmQkhqTHg1SmNrZVRLOGVMK3crK0pUMDd5c1BFRFpRZlc0MkVDd0lPNjg4QTU1MSt3MzBkMFVwS3prMXc0L3ZrMVNiNjRCbzhMVnVXTUpJOU9jbTZTVTAwWjlxVVBIOXlBNDNaWGtuOFpiN0FrRnlWNWJwS1hqSnNnWVArNFpkMitCd3hzMzRlU3ZIcU04TCtiRyt3ci95akFzUDhOWDlkN1FaSmJIVXZZTndRWU5zVFY0MFZOYm5GQVllME5KNXo2cUFERDVyZ215WXVzbzJIdFhaZmswd0lNbStWcTYyaFllME9BYnhkZzJEelcwYkMrdmpCK2JtUHRyb1lFVE1NNkd0YlQzNDRua2hKZzJHRFcwYkIrZm0wNERXVUVHRGFlZFRTc2oydVQvUEhXb3hGZzJIelcwYkFlZmpISlBWdVBSSUJoR2F5am9XdTR0TzZmSGZrSUJCaVd3em9hT2o2VDVIWGp0UXZ1SThDd0xOYlJNTCtmVEhMREErOVZnR0Y1cktOaFBtOU84dGFqM1pzQXd6SlpSOFBxWFpua3g0OTFMd0lNeTJVZERhdnozaVF2SGkrOGNGUUNETXRtSFEzVCs5TWt6MC95K1FmN3lRSU1XRWZEZEg0OXlRdUhpeTBjN3ljS01CRHJhTml6SWJndlMvTHlKTGR0NTRjSk1MREZPaHAyWi9pNzg1VHgzZSs5Mi8wSkFnd2N5VG9hdHU4alNWNlY1Tkx4R3I4N0lzREFBMWxIdzdFTjczQS9tZVFWU1o2YTVFMUo3dHpOdkE0YU1uQVVXK3ZvMzB4eXJnRkIvalhKM3lXNVBNbTdkeHZkSXdrd2NDeERoTDg5eVN2SEZkdDVKc1ZDREorRCtMY2tOeVc1TWNuMTQyWm91bC9OSlBsZlpLYUNsMVJaUTFJQUFBQUFTVVZPUks1Q1lJST1cIjtcblxuZnVuY3Rpb24gZ2V0UHJvdmlkZXIoKSB7XG4gIHJldHVybiBfZ2V0UHJvdmlkZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gX2dldFByb3ZpZGVyKCkge1xuICBfZ2V0UHJvdmlkZXIgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKCkge1xuICAgIHZhciBpbmplY3RlZCwgX3lpZWxkJGltcG9ydCwgZXRoUHJvdmlkZXI7XG5cbiAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaW5qZWN0ZWQgPSB3aW5kb3cuZXRoZXJldW07XG5cbiAgICAgICAgICAgIGlmICghKGluamVjdGVkICYmIGluamVjdGVkLmlzRnJhbWUpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIGluamVjdGVkKTtcblxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gNTtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnQoJ2V0aC1wcm92aWRlcicpO1xuXG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgX3lpZWxkJGltcG9ydCA9IF9jb250ZXh0Mi5zZW50O1xuICAgICAgICAgICAgZXRoUHJvdmlkZXIgPSBfeWllbGQkaW1wb3J0W1wiZGVmYXVsdFwiXTtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KFwicmV0dXJuXCIsIGV0aFByb3ZpZGVyKCdmcmFtZScpKTtcblxuICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIF9jYWxsZWUyKTtcbiAgfSkpO1xuICByZXR1cm4gX2dldFByb3ZpZGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGZyYW1lKG9wdGlvbnMpIHtcbiAgdmFyIHByZWZlcnJlZCA9IG9wdGlvbnMucHJlZmVycmVkLFxuICAgICAgbGFiZWwgPSBvcHRpb25zLmxhYmVsLFxuICAgICAgaWNvblNyYyA9IG9wdGlvbnMuaWNvblNyYyxcbiAgICAgIHN2ZyA9IG9wdGlvbnMuc3ZnO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGxhYmVsIHx8ICdGcmFtZScsXG4gICAgaWNvblNyYzogaWNvblNyYyB8fCBpbWcsXG4gICAgaWNvblNyY1NldDogaWNvblNyYyB8fCBpbWckMSxcbiAgICBzdmc6IHN2ZyxcbiAgICB3YWxsZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfd2FsbGV0ID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlKGhlbHBlcnMpIHtcbiAgICAgICAgdmFyIGNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlLCBwcm92aWRlcjtcbiAgICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlID0gaGVscGVycy5jcmVhdGVNb2Rlcm5Qcm92aWRlckludGVyZmFjZTtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0UHJvdmlkZXIoKTtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIgPSBfY29udGV4dC5zZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgXCJpbnRlcmZhY2VcIjogX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBjcmVhdGVNb2Rlcm5Qcm92aWRlckludGVyZmFjZShwcm92aWRlcikpLCB7fSwge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiBmdW5jdGlvbiBjb25uZWN0KCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2V0aF9yZXF1ZXN0QWNjb3VudHMnXG4gICAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm1lc3NhZ2UuaW5jbHVkZXMoJ1VuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZyYW1lIGlzIG5vdCBydW5uaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogcHJvdmlkZXIuY2xvc2VcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB3YWxsZXQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF93YWxsZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhbGxldDtcbiAgICB9KCksXG4gICAgdHlwZTogJ2luamVjdGVkJyxcbiAgICBsaW5rOiBcImh0dHBzOi8vZnJhbWUuc2hcIixcbiAgICBpbnN0YWxsTWVzc2FnZTogZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UsXG4gICAgZGVza3RvcDogdHJ1ZSxcbiAgICBtb2JpbGU6IGZhbHNlLFxuICAgIHByZWZlcnJlZDogcHJlZmVycmVkXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZyYW1lOyJdLCJzb3VyY2VSb290IjoiIn0=