(self.webpackChunkmy_swap=self.webpackChunkmy_swap||[]).push([[6368],{76522:(e,n,t)=>{"use strict";t.d(n,{e:()=>a,m:()=>i});var a=function(e){var n=e.currentWallet,t=e.selectedWallet;return n?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(n,"</b>\n    installed. If you would prefer to use\n    <b>").concat(t,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(t,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(t,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===t?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},i=function(e){var n=e.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n  Tap the button below to <b>Open '.concat(n,"</b>. Please access this site on ").concat(n,"'s in-app browser for a seamless experience.\n  </p>\n  ")}},56368:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>r});var a=t(76522);function i(e,n,t,a,i,r,o){try{var s=e[r](o),l=s.value}catch(e){return void t(e)}s.done?n(l):Promise.resolve(l).then(a,i)}const r=function(e){var n,t,r=e.preferred,o=e.label,s=e.iconSrc,l=e.svg,f=e.isMobile;return{name:o||"MetaMask",iconSrc:s||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAMAAACl6XjsAAABfVBMVEVHcEx/Rh2ARx2ESiLwiCLMu67cfCagZDOddlJ+Rx7pgiPlfyPshSN/Rxx+Rh2CSB6ASB2JTR7gkkl1SCbQciPUwLLMu6+BSB5/Rx2DSR5+RxzefR3ogCPlfiPGuLHhfiP2jCTvhyN/Rx3nfyPfo2/lfCTIuK7kfyP2jCPkfiPuhSTFtKjogSThfCR/Rx5+Rx3lfiPeeiTDs6koIR2DSh/ifCajWx6qYCDckVOBSR7jfiTyiCOYYTXLcCKpXiHEs6fDs6fCsKYjHBwhHx8iHR0iICB1a2ZyaGIiHyCPTx7ogSTlfyTwhyOASB7ziSTngCTrgyT2jCTthCT1iyPuhCX4jSSESh5/Rx6ITR/+kSTYbyDheSLjfSPBaiPacSDdcyCvYSK0ZCGTVSPGcSblhi/ngSPqgSTdu56mXSDaeSP6jiPmfSD5jSQcGhvimFdqUj/TbSJARUsyQE6tbDLOeyzZx7nayr7hsog7Nza/raDjjUF/VTjFtKhKNCB0amRMd0DeAAAASnRSTlMAe/oOkv4TAwgrpnA9n1n9vkYfHPv+xu2r9mgN6uI4Us5ji/n9Ln7G7pO61/K35ZXYiUji5s21zMnb0/r5aMipm2UkYjSGnPy0/l1QcU4AAALOSURBVHhehdJXXxpNFAbwBYIgoICCIKhgi91ETe/9fZ3ZXui92bvp5bPnzCwzK79c+Fxws3/mOXN2BSe+0Tnh1oBKTI7eqvypSUnaHP4XDIVeRn1cucKSJIUj4wMF6cVgYDr2KsrVXE4imUx6mEmHgoH786ZZ3b3H/usZAWW7R3fsAFFNhCrVwmaKdY4ylZdaqEgjI4yxUm7mpAjvjABjbt/QIIZJ1MF+Pu+eY3MMuwEwl2sfEidiBcdaeUl6yrcEkzks38IWMBnG2gUVTrIljSco4LUNGZxRaeZASW4X63Q5hznHyTGqpAfRwU5+WKGtaxC1SQsSKb+tfOyeTHWRDEyuNGhpf7me5EBjoYowFoEZ+gFx7pH+FYaTA0qBfSG6ErI2KcxZJMxVDhSkS1sV4twuNls0wVi4CYpEJ6yHwXEmpHJ5OxJTGNHhMLjH/BP0uQp2GpTwVhHY+orAExLt9ChxWhFWprYcFihaNKLDegZt7U4FuRpbPtbssONgRNECVjm6wYJFrR+5XK/VavVa9byO4L3qpWqMl/qznGlipV46b5xdturYIK//54sND7sAR3SnlfbZxeVFFYkw3MHV9dIQv8CAQ7qlXl+1kUoO78mMsQvwXiRbh8VjEenEqat9NlvUBmLJol2v6jDe89U0Vb7sDQa7k/UjxZSp04mjpw1ewBBRuV6qVbCCRFmzNNE0rOVZP2EZE9F0u10F10qQsr1hVTQ0WTSs7KwP2NA0wjxlUHWCmJRlo5jNELdlYidQaR92RINRp1P4vfPxnSAszis3XLkMD3Gn8+P0dGHh697e3vdvJyf/f4CrLqm8xFx/+IQ+jH/+QgK/wHbek9ZZwhSkq1MbwUW/f+buRJyIfn79+e/TuGBfomfi6UBmjH3NIL19Ffd6J2YEmhX92UqGbpEHzlzzeuNxL6ht9lmG0g5w5PbrtbWJN2/HyGB/AYd1QUewqrrRAAAAAElFTkSuQmCC",iconSrcSet:s||"data:image/png;base64,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",svg:l,wallet:(n=regeneratorRuntime.mark((function e(n){var t,a,i,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.getProviderName,a=n.createModernProviderInterface,i=n.createLegacyProviderInterface,r=window.ethereum||window.web3&&window.web3.currentProvider,e.abrupt("return",{provider:r,interface:r&&"MetaMask"===t(r)?"function"==typeof r.enable?a(r):i(r):null});case 3:case"end":return e.stop()}}),e)})),t=function(){var e=this,t=arguments;return new Promise((function(a,r){var o=n.apply(e,t);function s(e){i(o,a,r,s,l,"next",e)}function l(e){i(o,a,r,s,l,"throw",e)}s(void 0)}))},function(e){return t.apply(this,arguments)}),type:"injected",link:"https://metamask.app.link/dapp/".concat(window.location.host),installMessage:f?a.m:a.e,desktop:!0,mobile:!0,preferred:r}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1zd2FwLy4vbm9kZV9tb2R1bGVzL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL2NvbnRlbnQtNjEyYmQwNGIuanMiLCJ3ZWJwYWNrOi8vbXktc3dhcC8uL25vZGVfbW9kdWxlcy9ibmMtb25ib2FyZC9kaXN0L2VzbS9tZXRhbWFzay02MTI4OWFjZC5qcyJdLCJuYW1lcyI6WyJleHRlbnNpb25JbnN0YWxsTWVzc2FnZSIsImhlbHBlcnMiLCJjdXJyZW50V2FsbGV0Iiwic2VsZWN0ZWRXYWxsZXQiLCJjb25jYXQiLCJtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsInJlc29sdmUiLCJyZWplY3QiLCJfbmV4dCIsIl90aHJvdyIsImtleSIsImFyZyIsImluZm8iLCJ2YWx1ZSIsImVycm9yIiwiZG9uZSIsIlByb21pc2UiLCJ0aGVuIiwib3B0aW9ucyIsImZuIiwiX3dhbGxldCIsInByZWZlcnJlZCIsImxhYmVsIiwiaWNvblNyYyIsInN2ZyIsImlzTW9iaWxlIiwibmFtZSIsImljb25TcmNTZXQiLCJ3YWxsZXQiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImdldFByb3ZpZGVyTmFtZSIsImNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlIiwiY3JlYXRlTGVnYWN5UHJvdmlkZXJJbnRlcmZhY2UiLCJwcm92aWRlciIsIndyYXAiLCJfY29udGV4dCIsInByZXYiLCJuZXh0Iiwid2luZG93IiwiZXRoZXJldW0iLCJ3ZWIzIiwiY3VycmVudFByb3ZpZGVyIiwiYWJydXB0IiwiZW5hYmxlIiwic3RvcCIsInNlbGYiLCJ0aGlzIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiZXJyIiwidW5kZWZpbmVkIiwiX3giLCJ0eXBlIiwibGluayIsImxvY2F0aW9uIiwiaG9zdCIsImluc3RhbGxNZXNzYWdlIiwibSIsImUiLCJkZXNrdG9wIiwibW9iaWxlIl0sIm1hcHBpbmdzIjoiNEhBQUEsSUFBSUEsRUFBMEIsU0FBaUNDLEdBQzdELElBQUlDLEVBQWdCRCxFQUFRQyxjQUN4QkMsRUFBaUJGLEVBQVFFLGVBRTdCLE9BQUlELEVBQ0ssd0lBQTBJRSxPQUFPRixFQUFlLDREQUE0REUsT0FBT0QsRUFBZ0Isd0xBQTBMQyxPQUFPRCxFQUFnQixxWUFFcGMsb0hBQXFIQyxPQUFPRCxFQUFnQiw2UUFBaVJDLE9BQTBCLFVBQW5CRCxFQUE2Qiw4U0FBZ1QsR0FBSSxxQkFJNXZCRSxFQUE2QixTQUFvQ0osR0FDbkUsSUFBSUUsRUFBaUJGLEVBQVFFLGVBQzdCLE1BQU8sMkVBQTZFQyxPQUFPRCxFQUFnQixxQ0FBcUNDLE9BQU9ELEVBQWdCLDhELDBFQ2J6SyxTQUFTRyxFQUFtQkMsRUFBS0MsRUFBU0MsRUFBUUMsRUFBT0MsRUFBUUMsRUFBS0MsR0FBTyxJQUFNLElBQUlDLEVBQU9QLEVBQUlLLEdBQUtDLEdBQVVFLEVBQVFELEVBQUtDLE1BQVMsTUFBT0MsR0FBd0IsWUFBZlAsRUFBT08sR0FBc0JGLEVBQUtHLEtBQVFULEVBQVFPLEdBQWlCRyxRQUFRVixRQUFRTyxHQUFPSSxLQUFLVCxFQUFPQyxHQXdEN1AsUUFoREEsU0FBa0JTLEdBQ2hCLElBUHlCQyxFQWtCakJDLEVBWEpDLEVBQVlILEVBQVFHLFVBQ3BCQyxFQUFRSixFQUFRSSxNQUNoQkMsRUFBVUwsRUFBUUssUUFDbEJDLEVBQU1OLEVBQVFNLElBQ2RDLEVBQVdQLEVBQVFPLFNBQ3ZCLE1BQU8sQ0FDTEMsS0FBTUosR0FBUyxXQUNmQyxRQUFTQSxHQVhILGlxREFZTkksV0FBWUosR0FYSixxMUZBWVJDLElBQUtBLEVBQ0xJLFFBakJ1QlQsRUFrQnlCVSxtQkFBbUJDLE1BQUssU0FBU0MsRUFBUWhDLEdBQ3JGLElBQUlpQyxFQUFpQkMsRUFBK0JDLEVBQStCQyxFQUNuRixPQUFPTixtQkFBbUJPLE1BQUssU0FBa0JDLEdBQy9DLE9BQ0UsT0FBUUEsRUFBU0MsS0FBT0QsRUFBU0UsTUFDL0IsS0FBSyxFQUdILE9BRkFQLEVBQWtCakMsRUFBUWlDLGdCQUFpQkMsRUFBZ0NsQyxFQUFRa0MsOEJBQStCQyxFQUFnQ25DLEVBQVFtQyw4QkFDMUpDLEVBQVdLLE9BQU9DLFVBQVlELE9BQU9FLE1BQVFGLE9BQU9FLEtBQUtDLGdCQUNsRE4sRUFBU08sT0FBTyxTQUFVLENBQy9CVCxTQUFVQSxFQUNWLFVBQWFBLEdBQTBDLGFBQTlCSCxFQUFnQkcsR0FBc0QsbUJBQXBCQSxFQUFTVSxPQUF3QlosRUFBOEJFLEdBQVlELEVBQThCQyxHQUFZLE9BR3BNLEtBQUssRUFDTCxJQUFLLE1BQ0gsT0FBT0UsRUFBU1MsVUFHckJmLE1BbEJEWCxFQWxCOEIsV0FBYyxJQUFJMkIsRUFBT0MsS0FBTUMsRUFBT0MsVUFBVyxPQUFPLElBQUlsQyxTQUFRLFNBQVVWLEVBQVNDLEdBQVUsSUFBSUYsRUFBTWMsRUFBR2dDLE1BQU1KLEVBQU1FLEdBQU8sU0FBU3pDLEVBQU1LLEdBQVNULEVBQW1CQyxFQUFLQyxFQUFTQyxFQUFRQyxFQUFPQyxFQUFRLE9BQVFJLEdBQVUsU0FBU0osRUFBTzJDLEdBQU9oRCxFQUFtQkMsRUFBS0MsRUFBU0MsRUFBUUMsRUFBT0MsRUFBUSxRQUFTMkMsR0FBUTVDLE9BQU02QyxPQXVDM1csU0FBZ0JDLEdBQ2QsT0FBT2xDLEVBQVErQixNQUFNSCxLQUFNRSxhQUsvQkssS0FBTSxXQUNOQyxLQUFNLGtDQUFrQ3RELE9BQU9zQyxPQUFPaUIsU0FBU0MsTUFDL0RDLGVBQWdCbEMsRUFBVyxFQUFBbUMsRUFBNkIsRUFBQUMsRUFDeERDLFNBQVMsRUFDVEMsUUFBUSxFQUNSMUMsVUFBV0EiLCJmaWxlIjoiNjM2OC5tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlID0gZnVuY3Rpb24gZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UoaGVscGVycykge1xuICB2YXIgY3VycmVudFdhbGxldCA9IGhlbHBlcnMuY3VycmVudFdhbGxldCxcbiAgICAgIHNlbGVjdGVkV2FsbGV0ID0gaGVscGVycy5zZWxlY3RlZFdhbGxldDtcblxuICBpZiAoY3VycmVudFdhbGxldCkge1xuICAgIHJldHVybiBcIlxcbiAgICA8cCBzdHlsZT1cXFwiZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7IG1hcmdpbjogMC44ODlyZW0gMDtcXFwiPlxcbiAgICBXZSBoYXZlIGRldGVjdGVkIHRoYXQgeW91IGFscmVhZHkgaGF2ZVxcbiAgICA8Yj5cIi5jb25jYXQoY3VycmVudFdhbGxldCwgXCI8L2I+XFxuICAgIGluc3RhbGxlZC4gSWYgeW91IHdvdWxkIHByZWZlciB0byB1c2VcXG4gICAgPGI+XCIpLmNvbmNhdChzZWxlY3RlZFdhbGxldCwgXCI8L2I+XFxuICAgIGluc3RlYWQsIHRoZW4gY2xpY2sgYmVsb3cgdG8gaW5zdGFsbC5cXG4gICAgPC9wPlxcbiAgICA8cCBzdHlsZT1cXFwiZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7IG1hcmdpbjogMC44ODlyZW0gMDtcXFwiPlxcbiAgICA8Yj5UaXA6PC9iPlxcbiAgICBJZiB5b3UgYWxyZWFkeSBoYXZlIFwiKS5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiIGluc3RhbGxlZCwgY2hlY2sgeW91clxcbiAgICBicm93c2VyIGV4dGVuc2lvbiBzZXR0aW5ncyB0byBtYWtlIHN1cmUgdGhhdCB5b3UgaGF2ZSBpdCBlbmFibGVkXFxuICAgIGFuZCB0aGF0IHlvdSBoYXZlIGRpc2FibGVkIGFueSBvdGhlciBicm93c2VyIGV4dGVuc2lvbiB3YWxsZXRzLlxcbiAgICA8c3BhblxcbiAgICAgIGNsYXNzPVxcXCJibi1vbmJvYXJkLWNsaWNrYWJsZVxcXCJcXG4gICAgICBzdHlsZT1cXFwiY29sb3I6ICM0YTkwZTI7IGZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcXCJcXG4gICAgICBvbmNsaWNrPVxcXCJ3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XFxcIj5cXG4gICAgICBUaGVuIHJlZnJlc2ggdGhlIHBhZ2UuXFxuICAgIDwvc3Bhbj5cXG4gICAgPC9wPlxcbiAgICBcIik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiXFxuICAgIDxwIHN0eWxlPVxcXCJmb250LXNpemU6IDAuODg5cmVtOyBmb250LWZhbWlseTogaW5oZXJpdDsgbWFyZ2luOiAwLjg4OXJlbSAwO1xcXCI+XFxuICAgIFlvdSdsbCBuZWVkIHRvIGluc3RhbGwgPGI+XCIuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIjwvYj4gdG8gY29udGludWUuIE9uY2UgeW91IGhhdmUgaXQgaW5zdGFsbGVkLCBnbyBhaGVhZCBhbmRcXG4gICAgPHNwYW5cXG4gICAgY2xhc3M9XFxcImJuLW9uYm9hcmQtY2xpY2thYmxlXFxcIlxcbiAgICAgIHN0eWxlPVxcXCJjb2xvcjogIzRhOTBlMjsgZm9udC1zaXplOiAwLjg4OXJlbTsgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxcIlxcbiAgICAgIG9uY2xpY2s9e3dpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTt9PlxcbiAgICAgIHJlZnJlc2ggdGhlIHBhZ2UuXFxuICAgIDwvc3Bhbj5cXG4gICAgXCIpLmNvbmNhdChzZWxlY3RlZFdhbGxldCA9PT0gJ09wZXJhJyA/ICc8YnI+PGJyPjxpPkhpbnQ6IElmIHlvdSBhbHJlYWR5IGhhdmUgT3BlcmEgaW5zdGFsbGVkLCBtYWtlIHN1cmUgdGhhdCB5b3VyIHdlYjMgd2FsbGV0IGlzIDxhIHN0eWxlPVwiY29sb3I6ICM0YTkwZTI7IGZvbnQtc2l6ZTogMC44ODlyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0O1wiIGNsYXNzPVwiYm4tb25ib2FyZC1jbGlja2FibGVcIiBocmVmPVwiaHR0cHM6Ly9oZWxwLm9wZXJhLmNvbS9lbi90b3VjaC9jcnlwdG8td2FsbGV0L1wiIHJlbD1cIm5vcmVmZXJyZXIgbm9vcGVuZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5lbmFibGVkPC9hPjwvaT4nIDogJycsIFwiXFxuICAgIDwvcD5cXG4gICAgXCIpO1xuICB9XG59O1xuXG52YXIgbW9iaWxlV2FsbGV0SW5zdGFsbE1lc3NhZ2UgPSBmdW5jdGlvbiBtb2JpbGVXYWxsZXRJbnN0YWxsTWVzc2FnZShoZWxwZXJzKSB7XG4gIHZhciBzZWxlY3RlZFdhbGxldCA9IGhlbHBlcnMuc2VsZWN0ZWRXYWxsZXQ7XG4gIHJldHVybiBcIlxcbiAgPHAgc3R5bGU9XFxcImZvbnQtc2l6ZTogMC44ODlyZW07XFxcIj5cXG4gIFRhcCB0aGUgYnV0dG9uIGJlbG93IHRvIDxiPk9wZW4gXCIuY29uY2F0KHNlbGVjdGVkV2FsbGV0LCBcIjwvYj4uIFBsZWFzZSBhY2Nlc3MgdGhpcyBzaXRlIG9uIFwiKS5jb25jYXQoc2VsZWN0ZWRXYWxsZXQsIFwiJ3MgaW4tYXBwIGJyb3dzZXIgZm9yIGEgc2VhbWxlc3MgZXhwZXJpZW5jZS5cXG4gIDwvcD5cXG4gIFwiKTtcbn07XG5cbmV4cG9ydCB7IGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlIGFzIGUsIG1vYmlsZVdhbGxldEluc3RhbGxNZXNzYWdlIGFzIG0gfTsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTsgfSB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50czsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpOyBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7IH0gZnVuY3Rpb24gX3Rocm93KGVycikgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTsgfSBfbmV4dCh1bmRlZmluZWQpOyB9KTsgfTsgfVxuXG5pbXBvcnQgeyBtIGFzIG1vYmlsZVdhbGxldEluc3RhbGxNZXNzYWdlLCBlIGFzIGV4dGVuc2lvbkluc3RhbGxNZXNzYWdlIH0gZnJvbSAnLi9jb250ZW50LTYxMmJkMDRiLmpzJztcbnZhciBpbWcgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ1lBQUFBb0NBTUFBQUNsNlhqc0FBQUJmVkJNVkVWSGNFeC9SaDJBUngyRVNpTHdpQ0xNdTY3Y2ZDYWdaRE9kZGxKK1J4N3BnaVBsZnlQc2hTTi9SeHgrUmgyQ1NCNkFTQjJKVFI3Z2trbDFTQ2JRY2lQVXdMTE11NitCU0I1L1J4MkRTUjUrUnh6ZWZSM29nQ1BsZmlQR3VMSGhmaVAyakNUdmh5Ti9SeDNuZnlQZm8yL2xmQ1RJdUs3a2Z5UDJqQ1BrZmlQdWhTVEZ0S2pvZ1NUaGZDUi9SeDUrUngzbGZpUGVlaVREczZrb0lSMkRTaC9pZkNhald4NnFZQ0Rja1ZPQlNSN2pmaVR5aUNPWVlUWExjQ0twWGlIRXM2ZkRzNmZDc0tZakhCd2hIeDhpSFIwaUlDQjFhMlp5YUdJaUh5Q1BUeDdvZ1NUbGZ5VHdoeU9BU0I3emlTVG5nQ1RyZ3lUMmpDVHRoQ1QxaXlQdWhDWDRqU1NFU2g1L1J4NklUUi8ra1NUWWJ5RGhlU0xqZlNQQmFpUGFjU0RkY3lDdllTSzBaQ0dUVlNQR2NTYmxoaS9uZ1NQcWdTVGR1NTZtWFNEYWVTUDZqaVBtZlNENWpTUWNHaHZpbUZkcVVqL1RiU0pBUlVzeVFFNnRiRExPZXl6Wng3bmF5cjdoc29nN056YS9yYURqalVGL1ZUakZ0S2hLTkNCMGFtUk1kMERlQUFBQVNuUlNUbE1BZS9vT2t2NFRBd2dycG5BOW4xbjl2a1lmSFB2K3h1MnI5bWdONnVJNFVzNWppL245TG43RzdwTzYxL0szNVpYWWlVamk1czIxek1uYjAvcjVhTWlwbTJVa1lqU0duUHkwL2wxUWNVNEFBQUxPU1VSQlZIaGVoZEpYWHhwTkZBYndCWUlnb0lDQ0lLaGdpOTFFVGUvOWZaM1pYdWk5MmJ2cDViUG56Q3d6Szc5YytGeHdzMy9tT1hOMkJTZSswVG5oMW9CS1RJN2VxdnlwU1VuYUhQNFhESVZlUm4xY3VjS1NKSVVqNHdNRjZjVmdZRHIyS3NyVlhFNGltVXg2bUVtSGdvSDc4NlpaM2IzSC91c1pBV1c3UjNmc0FGRk5oQ3JWd21hS2RZNHlsWmRhcUVnakk0eXhVbTdtcEFqdmpBQmpidC9RSUlaSjFNRitQdStlWTNNTXV3RXdsMnNmRWlkaUJjZGFlVWw2eXJjRWt6a3MzOElXTUJuRzJnVVZUcklsalNjbzRMVU5HWnhSYWVaQVNXNFg2M1E1aHpuSHlUR3FwQWZSd1U1K1dLR3RheEMxU1FzU0tiK3RmT3llVEhXUkRFeXVOR2hwZjdtZTVFQmpvWW93Rm9FWitnRng3cEgrRllhVEEwcUJmU0c2RXJJMktjeFpKTXhWRGhTa1Mxc1Y0dHd1TmxzMHdWaTRDWXBFSjZ5SHdYRW1wSEo1T3hKVEdOSGhNTGpIL0JQMHVRcDJHcFR3VmhIWStvckFFeEx0OUNoeFdoRldwclljRmloYU5LTERlZ1p0N1U0RnVScGJQdGJzc09OZ1JORUNWam02d1lKRnJSKzVYSy9WYXZWYTlieU80TDNxcFdxTWwvcXpuR2xpcFY0NmI1eGR0dXJZSUsvLzU0c05EN3NBUjNTbmxmYlp4ZVZGRllrdzNNSFY5ZElRdjhDQVE3cWxYbCsxa1VvTzc4bU1zUXZ3WGlSYmg4VmpFZW5FcWF0OU5sdlVCbUxKb2wydjZqRGU4OVUwVmI3c0RRYTdrL1VqeFpTcDA0bWpwdzFld0JCUnVWNnFWYkNDUkZtek5ORTByT1ZaUDJFWkU5RjB1MTBGMTBxUXNyMWhWVFEwV1RTczdLd1AyTkEwd2p4bFVIV0NtSlJsbzVqTkVMZGxZaWRRYVI5MlJJTlJwMVA0dmZQeG5TQXN6aXMzWExrTUQzR244K1AwZEdIaDY5N2UzdmR2SnlmL2Y0Q3JMcW04eEZ4LytJUStqSC8rUWdLL3dIYmVrOVpad2hTa3ExTWJ3VVcvZitidVJKeUlmbjc5K2UvVHVHQmZvbWZpNlVCbWpIM05JTDE5RmZkNkoyWUVtaFg5MlVxR2JwRUh6bHp6ZXVOeEw2aHQ5bG1HMGc1dzVQYnJ0YldKTjIvSHlHQi9BWWQxUVVld3FyclJBQUFBQUVsRlRrU3VRbUNDXCI7XG52YXIgaW1nJDEgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRXdBQUFCUUNBTUFBQUNFWFdQNUFBQUJmVkJNVkVWSGNFemZmU0wzakNPQVNCM2hmU0xrZ0NKeFF5S2RXMFFoSGg2aFpqOXFQeUIvUngzamZpU0JTUitBUngzdmh5TjlSaHg4Umh0L1JoMS9SeDNqZlNQcGdpSi9SaHptZ1NQbWdDUEh0cXFBUngxK1J4eCtSeDErUmgxOFJCemlmeVBrZmlQRHNxakNzcWJFczZuRnRhem1meU45UmgzMWl5UGxmaU84czdIY2VpVEFzS1hrZlNPQlNCekZ0YWpzampmYWVpWGlmU0xHdGFqb2d5SWdIaDR2SlI3ZmZDZkRzcWJEc2FhVFV4NGhIeDhpSHg4b0l5UERzYWFYaW9LOWFDQmFPeC9QY3lqWng3bllieURIdHFyZGRTRWlIeC8ra0NUamVpTGJjU0RMdXE3Z2VDTGF5cjNRdnJFbFBGSFd4TFlhR1JyYXc3QnpWRDAyUVUza2hqTGhtbHpidFpiZ3EzMWRVMHFkWVRMZm9tempqMFZLU1VodVpWK1JaVHFQV2pTTGYzZW1tSTZBU0I3bGZ5VG5nQ1I5Umg2RlNoNkRTUjdvZ1NTTVR4N0pjU1BzZ3lUNGpTVHFnaVRmZlNTdFlDQzFaaVdoV1IrYVZoLzFpeVR6aWlUd2hpU1ZWQisvYWlMWGVTVGxmaVB4aUNUdWhTVDZqaVQyakNUVWJ5SGNxbFJrQUFBQVFuUlNUbE1BRS9EbEl6Z1ZBNFlKSS9ES1d2cW1hMHZQczVWUU8ybTY1dHZDa1lNeFJmQnQvWTVLNTNmaCtCcTBMZUtucmRLaTNNV0dSdm5BdjlMRDNiSm11Y3pEMDlBMC80UzRBQUFHWEVsRVFWUjRYcXlXeVc2alFCQ0dIU0ViQVRGamcrSkUzaVluS3hyRjBrZzV6V25lcFhkMjcyc3l6ejRtRUxwcEdweUR2eU9IVDFWL2QxWFRVdE54Sm5yclJwZ3VzYnUzY3dHZ1RXL2k2anNYRjZERHdTMWNRd0pTeUtqemJjSGQ0OStCMHFWUmtFRm0zOURvZDNjUHYxNmZmYzFVdUxvV0JRWGRhd1cxMjIrdkNERzQ5MllxbHcwRXJJYllqUGJENHhQYUJnaXlPTUdrWDNWTlNpNUF0UnBiKyszMy9YT3dEZUFGNXErd0t0K3hUVUVKT2pJVllUL2R2OElnWURERDl6QWc4MHJoRXdvcS9Ia3I4K1ArK1lWRkRPVW1kTnhmWE1DUzA5VW5wT3JDWHZ3ZWlnUUlRUTZMazg4R25NbzhXa0FCVGpZZkFtRUFCZGhoaVVIS1dDNnNSNEVLN0grSWJJWENVQnBYaWxXSmZ3alVlSkVvMjNCWkZsZEtwY3UrRFdwSVF0SEdjaFdLRjdUMmNvOW9uWXdjM2dWWlVNUUZ2ckRsTHFkYXJRenZtRkRiT1hmdE1NaWhjME9LM3lXZ0ZweXN1VzJUdWxBV1Z3WWRxQXRUZzhtQnk5WU13dU9DQ0s2aEtkOExBaHJBeXpPWFJTaU5pME42ZXRuVjRmR3IyYTk1YVA5MkdIQ29MUytNL2hVWDNwMzREQ3h4cVRCSE9rdGpUSnBkbnMvNzNQaEV0Tm55S0JuejVzcm9IakdoejRVWU1IVU4rYzF0bGkwUVJLZENkb0lMTVJVeUx0c01yZGwxaEJDZVEyRThGMkpwVnZtRkhkaE5nU1V3aGZlNVlmQ1lZTDdhZTRhNFlGMnQyWlZ4Q3ZsNElzRm16UVNaM3RjYVJ5bk9GODU1TGV3MEZCY1hoTnFsMTZRejBlemF1eDhYNjM1VG5FRDZpZHZrQjZDcjBSclhnUzlEZnA1UjZvNVhPQituOHBTUEhVdnRXZ2t1R0gzMUdXWnJLTjlDcEZTWWJzNDBVdS9pbFB1RTZMREN2REtPMmJQb1ZSYzhDMnNvcysxdzlmOUduN3FnaWllNVlGVFozYjZIcWZ4RFlyaEVOZHdNU3B6NFJCVTJ1OWVTbURvVm04SUZnNUR2N2d6a3oxc1Z6Q0c1N29Kb3pmdk1lZm5aVXRvSXBaUmtVTS8vMzRqWjlhYU5SR0U0SUZQS2loVTNvSWFyQUtFaUpGSFNoSDZwM1YzdHhpSDRJMEFMU1FqWnROM1Z6SVVWZXlvazIxM3N3ZnoydFFmUGdFZGpkaCtCZkFFOGVzOGNuV05rQ0FTNE5KcEw5YlhNam9CaTREQjhId3RkSHFJeTM0dGxMMFd1dmRZaTJBUnhIbTZrSENPV25RbGMrVkl2U09BTFpSNnJFM3NyV1ZFZ2sxcFV0ajJhYVhPSHRpdVFWWmhyZXpUb0ovOE5RWUVzdzZwazJPYXFzQ1FLWmhPbEtMcmUxUS96T3p5NXJCWHcrRjc0NVFTcXFzb0tyVk9SWlhrcHkzODg0MTM1RGduRzRTcXF6RkRWNmJkbGVGWGlPaTJreXJPUjJxMzl4TXN5TFJxTTY2aE9kZXBzTkI3UElobW13YnZ5ZER4VERuN202NnhRRjIrRDNpcmRQNlB4WURDNFg4cGRqOTZsTEYzK05oak53U3MrV1VrZ1kxdFFVWmZUU0RVWWo2ZXF6dnBwZWN2UitPdDN5SGRBSXNjdnhJVWVnUE92by92SHlQZjRwRUJneGpKM09aMzNzRkhrWktXQVJFL05obm85Ni92VGJEcDZISVV5Zy9WVENZMklHNEhNS1IxTGNUWlMyYUxYVytBNTJTWHJGaWlXZzk0bVpTOVlsV0liOEdobGk0V05BWUF1L1VSM0xYUW9udkYwbTJFbjZtWTl3SjV0dnVKbWZCRnNCeHZPWm9mUk9odkN1Snlza2daTHgvYzMzVkdwT003cUptV1ozZitXdWFiUE53WEhZajhoeTIwdjBuYXcxMVVWYUdDSGhHR0xsbFphMmhpblFpY3RtR1VGam92SU9IVkJCSElkMjJJTEtyWloyYzdhbHNsYVlnSUhJenJuT2dRRWFQcE9FUHR3YkZ0a0src3FYUk5IbUJ4STZjcVVMbUI0RUdGbnBmTU5rN2RKQjBDSXQzYkpYdUlEQUJISlpEa21KclplSzBmUDdCQ2wyMWd3SG9oOE83QnN2TEl0V2hLOVlacEFqS2V5WUNJTU0yeXY3OXBrYkUvamZTdWRJU0JHaVU4ZnBJR3c0L3VCTlgrYS9majlkWUdNNWdzTVV0REp3dlpTZ2hNTTA1Mjl1ZnIwNmVycTQydlN6NW9CdGpSQkVWdkF6WiszdDdjUGs3dTcrOUFVOFp4RTJ6VkIrckdwSHYxMXhNMU42SGg0bUV6dVBrY01MeTZ1dFZqMlpuVnNIUUJUYlRvd2lJSEcrSHl4NGpxK3JtWFBWNE9RT3hhM0FHSmNlM3M2bVVTTzY0aUw4RVhoWlIvby9iTUVCU2JUclhVcXVVSzd1Vi9sSGJ3czVPb1h1bXIzRHBJMkNLRlJLK2R5VWZEd2ZkVGN2K3ozaHlrMjdjdmpsNy8rL3UwWlc5ekZ0UXdhQ05TT3kxS21zTG5aMjgxZnE1ZjlvVUE0MUJxTmhsYXRieXhiZzA0SkJpK0xaV2xIUlAxZHRkRVBFMjRxaC8xTFF1aGlTRFZJOXBWeHZOdlpTMytvZlZRL3FXcDlUYU5DcXRMMkUwOFB5aVkwaldLbklsR1RrSHcrSDU1ZmxTaTBmcDljRzh6RjJBTm41WnhFajJtcnNIRFVmQmNhMW1nbi9ITWxjdUQvbDBLNy9yNzYvdno4L0dTLzNteTNtZXRmUTRTWGZVaVcrMDBBQUFBQVNVVk9SSzVDWUlJPVwiO1xuXG5mdW5jdGlvbiBtZXRhbWFzayhvcHRpb25zKSB7XG4gIHZhciBwcmVmZXJyZWQgPSBvcHRpb25zLnByZWZlcnJlZCxcbiAgICAgIGxhYmVsID0gb3B0aW9ucy5sYWJlbCxcbiAgICAgIGljb25TcmMgPSBvcHRpb25zLmljb25TcmMsXG4gICAgICBzdmcgPSBvcHRpb25zLnN2ZyxcbiAgICAgIGlzTW9iaWxlID0gb3B0aW9ucy5pc01vYmlsZTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBsYWJlbCB8fCAnTWV0YU1hc2snLFxuICAgIGljb25TcmM6IGljb25TcmMgfHwgaW1nLFxuICAgIGljb25TcmNTZXQ6IGljb25TcmMgfHwgaW1nJDEsXG4gICAgc3ZnOiBzdmcsXG4gICAgd2FsbGV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3dhbGxldCA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShoZWxwZXJzKSB7XG4gICAgICAgIHZhciBnZXRQcm92aWRlck5hbWUsIGNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlLCBjcmVhdGVMZWdhY3lQcm92aWRlckludGVyZmFjZSwgcHJvdmlkZXI7XG4gICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBnZXRQcm92aWRlck5hbWUgPSBoZWxwZXJzLmdldFByb3ZpZGVyTmFtZSwgY3JlYXRlTW9kZXJuUHJvdmlkZXJJbnRlcmZhY2UgPSBoZWxwZXJzLmNyZWF0ZU1vZGVyblByb3ZpZGVySW50ZXJmYWNlLCBjcmVhdGVMZWdhY3lQcm92aWRlckludGVyZmFjZSA9IGhlbHBlcnMuY3JlYXRlTGVnYWN5UHJvdmlkZXJJbnRlcmZhY2U7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIgPSB3aW5kb3cuZXRoZXJldW0gfHwgd2luZG93LndlYjMgJiYgd2luZG93LndlYjMuY3VycmVudFByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgXCJpbnRlcmZhY2VcIjogcHJvdmlkZXIgJiYgZ2V0UHJvdmlkZXJOYW1lKHByb3ZpZGVyKSA9PT0gJ01ldGFNYXNrJyA/IHR5cGVvZiBwcm92aWRlci5lbmFibGUgPT09ICdmdW5jdGlvbicgPyBjcmVhdGVNb2Rlcm5Qcm92aWRlckludGVyZmFjZShwcm92aWRlcikgOiBjcmVhdGVMZWdhY3lQcm92aWRlckludGVyZmFjZShwcm92aWRlcikgOiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIF9jYWxsZWUpO1xuICAgICAgfSkpO1xuXG4gICAgICBmdW5jdGlvbiB3YWxsZXQoX3gpIHtcbiAgICAgICAgcmV0dXJuIF93YWxsZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhbGxldDtcbiAgICB9KCksXG4gICAgdHlwZTogJ2luamVjdGVkJyxcbiAgICBsaW5rOiBcImh0dHBzOi8vbWV0YW1hc2suYXBwLmxpbmsvZGFwcC9cIi5jb25jYXQod2luZG93LmxvY2F0aW9uLmhvc3QpLFxuICAgIGluc3RhbGxNZXNzYWdlOiBpc01vYmlsZSA/IG1vYmlsZVdhbGxldEluc3RhbGxNZXNzYWdlIDogZXh0ZW5zaW9uSW5zdGFsbE1lc3NhZ2UsXG4gICAgZGVza3RvcDogdHJ1ZSxcbiAgICBtb2JpbGU6IHRydWUsXG4gICAgcHJlZmVycmVkOiBwcmVmZXJyZWRcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWV0YW1hc2s7Il0sInNvdXJjZVJvb3QiOiIifQ==