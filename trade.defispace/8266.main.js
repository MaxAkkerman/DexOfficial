(self.webpackChunkmy_swap=self.webpackChunkmy_swap||[]).push([[8266],{64415:(e,r,i)=>{"use strict";i.r(r),i.d(r,{generateAddresses:()=>d,isValidPath:()=>f});var n=i(22751),u=i(49840),a=i.n(u),s=i(48764),t=n.publicToAddress,c=n.toChecksumAddress;function d(e,r){var i=e.publicKey,n=e.chainCode,u=e.path,d=new(a());d.publicKey=new s.Buffer(i,"hex"),d.chainCode=new s.Buffer(n,"hex");for(var f=[],h=r;h<5+r;h++){var o=d.deriveChild(h),l=t(o.publicKey,!0).toString("hex");f.push({dPath:"".concat(u,"/").concat(h),address:c("0x".concat(l))})}return f}function f(e){var r=e.split("/");if("m"!==r[0])return!1;if("44'"!==r[1])return!1;if(!["60'","1'","73799'","246'"].includes(r[2]))return!1;if(void 0===r[3]||"0'"===r[3])return!0;var i=Number(r[3].slice(0,-1));if(isNaN(i)||i<0||"'"!==r[3].slice(-1))return!1;if(void 0===r[4])return!0;var n=Number(r[4]);if(isNaN(n)||n<0)return!1;if(void 0===r[5])return!0;var u=Number(r[5]);return!(isNaN(u)||u<0)}},80950:()=>{},8623:()=>{},7748:()=>{},56619:()=>{},77108:()=>{}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1zd2FwLy4vbm9kZV9tb2R1bGVzL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL2hkLXdhbGxldC01MTAxODgxNC5qcyJdLCJuYW1lcyI6WyJwdWJsaWNUb0FkZHJlc3MiLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdlbmVyYXRlQWRkcmVzc2VzIiwiYWNjb3VudCIsIm9mZnNldCIsInB1YmxpY0tleSIsImNoYWluQ29kZSIsInBhdGgiLCJoZGsiLCJCdWZmZXIiLCJhZGRyZXNzZXMiLCJpIiwiZGtleSIsImRlcml2ZUNoaWxkIiwiYWRkcmVzcyIsInRvU3RyaW5nIiwicHVzaCIsImRQYXRoIiwiY29uY2F0IiwiaXNWYWxpZFBhdGgiLCJwYXJ0cyIsInNwbGl0IiwiaW5jbHVkZXMiLCJ1bmRlZmluZWQiLCJhY2NvdW50RmllbGROdW1iZXIiLCJOdW1iZXIiLCJzbGljZSIsImlzTmFOIiwiY2hhbmdlRmllbGROdW1iZXIiLCJhZGRyZXNzRmllbGROdW1iZXIiXSwibWFwcGluZ3MiOiIyTUFHSUEsRUFBa0Isa0JBQ2xCQyxFQUFvQixvQkFHeEIsU0FBU0MsRUFBa0JDLEVBQVNDLEdBQ2xDLElBQUlDLEVBQVlGLEVBQVFFLFVBQ3BCQyxFQUFZSCxFQUFRRyxVQUNwQkMsRUFBT0osRUFBUUksS0FDZkMsRUFBTSxJQUFJLEtBQ2RBLEVBQUlILFVBQVksSUFBSSxFQUFBSSxPQUFPSixFQUFXLE9BQ3RDRyxFQUFJRixVQUFZLElBQUksRUFBQUcsT0FBT0gsRUFBVyxPQUd0QyxJQUZBLElBQUlJLEVBQVksR0FFUEMsRUFBSVAsRUFBUU8sRUFYTCxFQVd1QlAsRUFBUU8sSUFBSyxDQUNsRCxJQUFJQyxFQUFPSixFQUFJSyxZQUFZRixHQUN2QkcsRUFBVWQsRUFBZ0JZLEVBQUtQLFdBQVcsR0FBTVUsU0FBUyxPQUM3REwsRUFBVU0sS0FBSyxDQUNiQyxNQUFPLEdBQUdDLE9BQU9YLEVBQU0sS0FBS1csT0FBT1AsR0FDbkNHLFFBQVNiLEVBQWtCLEtBQUtpQixPQUFPSixNQUkzQyxPQUFPSixFQUdULFNBQVNTLEVBQVlaLEdBQ25CLElBQUlhLEVBQVFiLEVBQUtjLE1BQU0sS0FFdkIsR0FBaUIsTUFBYkQsRUFBTSxHQUNSLE9BQU8sRUFHVCxHQUFpQixRQUFiQSxFQUFNLEdBQ1IsT0FBTyxFQUdULElBQUssQ0FBQyxNQUFPLEtBQU0sU0FBVSxRQUFRRSxTQUFTRixFQUFNLElBQ2xELE9BQU8sRUFHVCxRQUFpQkcsSUFBYkgsRUFBTSxJQUFpQyxPQUFiQSxFQUFNLEdBQ2xDLE9BQU8sRUFHVCxJQUFJSSxFQUFxQkMsT0FBT0wsRUFBTSxHQUFHTSxNQUFNLEdBQUksSUFFbkQsR0FBSUMsTUFBTUgsSUFBdUJBLEVBQXFCLEdBQTRCLE1BQXZCSixFQUFNLEdBQUdNLE9BQU8sR0FDekUsT0FBTyxFQUdULFFBQWlCSCxJQUFiSCxFQUFNLEdBQ1IsT0FBTyxFQUdULElBQUlRLEVBQW9CSCxPQUFPTCxFQUFNLElBRXJDLEdBQUlPLE1BQU1DLElBQXNCQSxFQUFvQixFQUNsRCxPQUFPLEVBR1QsUUFBaUJMLElBQWJILEVBQU0sR0FDUixPQUFPLEVBR1QsSUFBSVMsRUFBcUJKLE9BQU9MLEVBQU0sSUFFdEMsUUFBSU8sTUFBTUUsSUFBdUJBLEVBQXFCLEsiLCJmaWxlIjoiODI2Ni5tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRoVXRpbCBmcm9tICdldGhlcmV1bWpzLXV0aWwnO1xuaW1wb3J0IEhES2V5IGZyb20gJ2hka2V5JztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG52YXIgcHVibGljVG9BZGRyZXNzID0gZXRoVXRpbC5wdWJsaWNUb0FkZHJlc3MsXG4gICAgdG9DaGVja3N1bUFkZHJlc3MgPSBldGhVdGlsLnRvQ2hlY2tzdW1BZGRyZXNzO1xudmFyIG51bWJlclRvR2V0ID0gNTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVBZGRyZXNzZXMoYWNjb3VudCwgb2Zmc2V0KSB7XG4gIHZhciBwdWJsaWNLZXkgPSBhY2NvdW50LnB1YmxpY0tleSxcbiAgICAgIGNoYWluQ29kZSA9IGFjY291bnQuY2hhaW5Db2RlLFxuICAgICAgcGF0aCA9IGFjY291bnQucGF0aDtcbiAgdmFyIGhkayA9IG5ldyBIREtleSgpO1xuICBoZGsucHVibGljS2V5ID0gbmV3IEJ1ZmZlcihwdWJsaWNLZXksICdoZXgnKTtcbiAgaGRrLmNoYWluQ29kZSA9IG5ldyBCdWZmZXIoY2hhaW5Db2RlLCAnaGV4Jyk7XG4gIHZhciBhZGRyZXNzZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gb2Zmc2V0OyBpIDwgbnVtYmVyVG9HZXQgKyBvZmZzZXQ7IGkrKykge1xuICAgIHZhciBka2V5ID0gaGRrLmRlcml2ZUNoaWxkKGkpO1xuICAgIHZhciBhZGRyZXNzID0gcHVibGljVG9BZGRyZXNzKGRrZXkucHVibGljS2V5LCB0cnVlKS50b1N0cmluZygnaGV4Jyk7XG4gICAgYWRkcmVzc2VzLnB1c2goe1xuICAgICAgZFBhdGg6IFwiXCIuY29uY2F0KHBhdGgsIFwiL1wiKS5jb25jYXQoaSksXG4gICAgICBhZGRyZXNzOiB0b0NoZWNrc3VtQWRkcmVzcyhcIjB4XCIuY29uY2F0KGFkZHJlc3MpKVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGFkZHJlc3Nlcztcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFBhdGgocGF0aCkge1xuICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcvJyk7XG5cbiAgaWYgKHBhcnRzWzBdICE9PSAnbScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGFydHNbMV0gIT09IFwiNDQnXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIVtcIjYwJ1wiLCBcIjEnXCIsIFwiNzM3OTknXCIsIFwiMjQ2J1wiXS5pbmNsdWRlcyhwYXJ0c1syXSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGFydHNbM10gPT09IHVuZGVmaW5lZCB8fCBwYXJ0c1szXSA9PT0gXCIwJ1wiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgYWNjb3VudEZpZWxkTnVtYmVyID0gTnVtYmVyKHBhcnRzWzNdLnNsaWNlKDAsIC0xKSk7XG5cbiAgaWYgKGlzTmFOKGFjY291bnRGaWVsZE51bWJlcikgfHwgYWNjb3VudEZpZWxkTnVtYmVyIDwgMCB8fCBwYXJ0c1szXS5zbGljZSgtMSkgIT09IFwiJ1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHBhcnRzWzRdID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBjaGFuZ2VGaWVsZE51bWJlciA9IE51bWJlcihwYXJ0c1s0XSk7XG5cbiAgaWYgKGlzTmFOKGNoYW5nZUZpZWxkTnVtYmVyKSB8fCBjaGFuZ2VGaWVsZE51bWJlciA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGFydHNbNV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIGFkZHJlc3NGaWVsZE51bWJlciA9IE51bWJlcihwYXJ0c1s1XSk7XG5cbiAgaWYgKGlzTmFOKGFkZHJlc3NGaWVsZE51bWJlcikgfHwgYWRkcmVzc0ZpZWxkTnVtYmVyIDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgeyBnZW5lcmF0ZUFkZHJlc3NlcywgaXNWYWxpZFBhdGggfTsiXSwic291cmNlUm9vdCI6IiJ9