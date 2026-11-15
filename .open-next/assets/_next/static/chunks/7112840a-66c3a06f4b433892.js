"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[16],{19:function(e,t,s){s.d(t,{IO:function(){return nK},Xo:function(){return nz},ad:function(){return nL},cf:function(){return nX},hJ:function(){return nE}});var n,r,i=s(5816),a=s(8463),o=s(3333),l=s(4444),u=s(3510);s(3454);let h="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}c.UNAUTHENTICATED=new c(null),c.GOOGLE_CREDENTIALS=new c("google-credentials-uid"),c.FIRST_PARTY=new c("first-party-uid"),c.MOCK_USER=new c("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let d="9.13.0",f=new o.Yd("@firebase/firestore");function m(){return f.logLevel}function g(e,...t){if(f.logLevel<=o.in.DEBUG){let s=t.map(w);f.debug(`Firestore (${d}): ${e}`,...s)}}function p(e,...t){if(f.logLevel<=o.in.ERROR){let s=t.map(w);f.error(`Firestore (${d}): ${e}`,...s)}}function y(e,...t){if(f.logLevel<=o.in.WARN){let s=t.map(w);f.warn(`Firestore (${d}): ${e}`,...s)}}function w(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e="Unexpected state"){let t=`FIRESTORE (${d}) INTERNAL ASSERTION FAILED: `+e;throw p(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class T extends l.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class S{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(c.UNAUTHENTICATED))}shutdown(){}}class A{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class _{constructor(e){this.t=e,this.currentUser=c.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let s=this.i,n=e=>this.i!==s?(s=this.i,t(e)):Promise.resolve(),r=new C;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new C,e.enqueueRetryable(()=>n(this.currentUser))};let i=()=>{let t=r;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{g("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),i()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(g("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new C)}},0),i()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(g("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||v(),new I(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||v(),new c(e)}}class k{constructor(e,t,s,n){this.h=e,this.l=t,this.m=s,this.g=n,this.type="FirstParty",this.user=c.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():("object"==typeof this.h&&null!==this.h&&this.h.auth&&this.h.auth.getAuthHeaderValueForFirstParty||v(),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class N{constructor(e,t,s,n){this.h=e,this.l=t,this.m=s,this.g=n}getToken(){return Promise.resolve(new k(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(c.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class D{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class b{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){let s=e=>{null!=e.error&&g("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let s=e.token!==this.A;return this.A=e.token,g("FirebaseAppCheckTokenProvider",`Received ${s?"new":"existing"} token.`),s?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>s(t))};let n=e=>{g("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.T.getImmediate({optional:!0});e?n(e):g("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||v(),this.A=e.token,new D(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static R(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,s="";for(;s.length<20;){let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),s=new Uint8Array(40);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(s);else for(let e=0;e<40;e++)s[e]=Math.floor(256*Math.random());return s}(0);for(let r=0;r<n.length;++r)s.length<20&&n[r]<t&&(s+=e.charAt(n[r]%e.length))}return s}}function R(e,t){return e<t?-1:e>t?1:0}function x(e,t,s){return e.length===t.length&&e.every((e,n)=>s(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new T(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new T(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return V.fromMillis(Date.now())}static fromDate(e){return V.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new V(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?R(this.nanoseconds,e.nanoseconds):R(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.timestamp=e}static fromTimestamp(e){return new M(e)}static min(){return new M(new V(0,0))}static max(){return new M(new V(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t,s){void 0===t?t=0:t>e.length&&v(),void 0===s?s=e.length-t:s>e.length-t&&v(),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return 0===O.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof O?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let s=Math.min(e.length,t.length);for(let n=0;n<s;n++){let s=e.get(n),r=t.get(n);if(s<r)return -1;if(s>r)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class U extends O{construct(e,t,s){return new U(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let s of e){if(s.indexOf("//")>=0)throw new T(E.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(e=>e.length>0))}return new U(t)}static emptyPath(){return new U([])}}let F=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class P extends O{construct(e,t,s){return new P(e,t,s)}static isValidIdentifier(e){return F.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),P.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new P(["__name__"])}static fromServerFormat(e){let t=[],s="",n=0,r=()=>{if(0===s.length)throw new T(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""},i=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new T(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new T(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=t,n+=2}else"`"===t?i=!i:"."!==t||i?s+=t:r(),n++}if(r(),i)throw new T(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new P(t)}static emptyPath(){return new P([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(U.fromString(e))}static fromName(e){return new q(U.fromString(e).popFirst(5))}static empty(){return new q(U.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===U.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return U.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new U(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,t,s,n){this.indexId=e,this.collectionGroup=t,this.fields=s,this.indexState=n}}B.UNKNOWN_ID=-1;class K{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new K(M.min(),q.empty(),-1)}static max(){return new K(M.max(),q.empty(),-1)}}class Q{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z(e){if(e.code!==E.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;g("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&v(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new G((s,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(s,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(s,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof G?t:G.resolve(t)}catch(e){return G.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):G.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):G.reject(t)}static resolve(e){return new G((t,s)=>{t(e)})}static reject(e){return new G((t,s)=>{s(e)})}static waitFor(e){return new G((t,s)=>{let n=0,r=0,i=!1;e.forEach(e=>{++n,e.next(()=>{++r,i&&r===n&&t()},e=>s(e))}),i=!0,r===n&&t()})}static or(e){let t=G.resolve(!1);for(let s of e)t=t.next(e=>e?G.resolve(e):s());return t}static forEach(e,t){let s=[];return e.forEach((e,n)=>{s.push(t.call(this,e,n))}),this.waitFor(s)}static mapArray(e,t){return new G((s,n)=>{let r=e.length,i=Array(r),a=0;for(let o=0;o<r;o++){let l=o;t(e[l]).next(e=>{i[l]=e,++a===r&&s(i)},e=>n(e))}})}static doWhile(e,t){return new G((s,n)=>{let r=()=>{!0===e()?t().next(()=>{r()},n):s()};r()})}}function $(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ct&&this.ct(e),e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e){let t=0;for(let s in e)Object.prototype.hasOwnProperty.call(e,s)&&t++;return t}function W(e,t){for(let s in e)Object.prototype.hasOwnProperty.call(e,s)&&t(s,e[s])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */j.at=-1;class Y{constructor(e,t){this.comparator=e,this.root=t||J.EMPTY}insert(e,t){return new Y(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,J.BLACK,null,null))}remove(e){return new Y(this.comparator,this.root.remove(e,this.comparator).copy(null,null,J.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let s=this.comparator(e,t.key);if(0===s)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){let n=this.comparator(e,s.key);if(0===n)return t+s.left.size;n<0?s=s.left:(t+=s.left.size+1,s=s.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){let e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new X(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new X(this.root,e,this.comparator,!1)}getReverseIterator(){return new X(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new X(this.root,e,this.comparator,!0)}}class X{constructor(e,t,s,n){this.isReverse=n,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?s(e.key,t):1,t&&n&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(0===r){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class J{constructor(e,t,s,n,r){this.key=e,this.value=t,this.color=null!=s?s:J.RED,this.left=null!=n?n:J.EMPTY,this.right=null!=r?r:J.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,n,r){return new J(null!=e?e:this.key,null!=t?t:this.value,null!=s?s:this.color,null!=n?n:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let n=this,r=s(e,n.key);return(n=r<0?n.copy(null,null,null,n.left.insert(e,t,s),null):0===r?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,s))).fixUp()}removeMin(){if(this.left.isEmpty())return J.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let s,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return J.EMPTY;s=n.right.min(),n=n.copy(s.key,s.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,J.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,J.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw v();let e=this.left.check();if(e!==this.right.check())throw v();return e+(this.isRed()?0:1)}}J.EMPTY=null,J.RED=!0,J.BLACK=!1,J.EMPTY=new class{constructor(){this.size=0}get key(){throw v()}get value(){throw v()}get color(){throw v()}get left(){throw v()}get right(){throw v()}copy(e,t,s,n,r){return this}insert(e,t,s){return new J(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.comparator=e,this.data=new Y(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){let s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){let n=s.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let s;for(s=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ee(this.data.getIterator())}getIteratorFrom(e){return new ee(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Z)||this.size!==e.size)return!1;let t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=s.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new Z(this.comparator);return t.data=e,t}}class ee{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.fields=e,e.sort(P.comparator)}static empty(){return new et([])}unionWith(e){let t=new Z(P.comparator);for(let e of this.fields)t=t.add(e);for(let s of e)t=t.add(s);return new et(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return x(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e){this.binaryString=e}static fromBase64String(e){return new es(atob(e))}static fromUint8Array(e){return new es(function(e){let t="";for(let s=0;s<e.length;++s)t+=String.fromCharCode(e[s]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return R(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}es.EMPTY_BYTE_STRING=new es("");let en=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function er(e){if(e||v(),"string"==typeof e){let t=0,s=en.exec(e);if(s||v(),s[1]){let e=s[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:ei(e.seconds),nanos:ei(e.nanos)}}function ei(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function ea(e){return"string"==typeof e?es.fromBase64String(e):es.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(e){var t,s;return"server_timestamp"===(null===(s=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===s?void 0:s.stringValue)}function el(e){let t=er(e.mapValue.fields.__local_write_time__.timestampValue);return new V(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,s,n,r,i,a,o){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=n,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.useFetchStreams=o}}class eh{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new eh("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof eh&&e.projectId===this.projectId&&e.database===this.database}}function ec(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ed={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function ef(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?eo(e)?4:eA(e)?9007199254740991:10:v()}function em(e,t){if(e===t)return!0;let s=ef(e);if(s!==ef(t))return!1;switch(s){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return el(e).isEqual(el(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let s=er(e.timestampValue),n=er(t.timestampValue);return s.seconds===n.seconds&&s.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return ea(e.bytesValue).isEqual(ea(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return ei(e.geoPointValue.latitude)===ei(t.geoPointValue.latitude)&&ei(e.geoPointValue.longitude)===ei(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return ei(e.integerValue)===ei(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let s=ei(e.doubleValue),n=ei(t.doubleValue);return s===n?ec(s)===ec(n):isNaN(s)&&isNaN(n)}return!1}(e,t);case 9:return x(e.arrayValue.values||[],t.arrayValue.values||[],em);case 10:return function(e,t){let s=e.mapValue.fields||{},n=t.mapValue.fields||{};if(H(s)!==H(n))return!1;for(let e in s)if(s.hasOwnProperty(e)&&(void 0===n[e]||!em(s[e],n[e])))return!1;return!0}(e,t);default:return v()}}function eg(e,t){return void 0!==(e.values||[]).find(e=>em(e,t))}function ep(e,t){if(e===t)return 0;let s=ef(e),n=ef(t);if(s!==n)return R(s,n);switch(s){case 0:case 9007199254740991:return 0;case 1:return R(e.booleanValue,t.booleanValue);case 2:return function(e,t){let s=ei(e.integerValue||e.doubleValue),n=ei(t.integerValue||t.doubleValue);return s<n?-1:s>n?1:s===n?0:isNaN(s)?isNaN(n)?0:-1:1}(e,t);case 3:return ey(e.timestampValue,t.timestampValue);case 4:return ey(el(e),el(t));case 5:return R(e.stringValue,t.stringValue);case 6:return function(e,t){let s=ea(e),n=ea(t);return s.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let s=e.split("/"),n=t.split("/");for(let e=0;e<s.length&&e<n.length;e++){let t=R(s[e],n[e]);if(0!==t)return t}return R(s.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let s=R(ei(e.latitude),ei(t.latitude));return 0!==s?s:R(ei(e.longitude),ei(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let s=e.values||[],n=t.values||[];for(let e=0;e<s.length&&e<n.length;++e){let t=ep(s[e],n[e]);if(t)return t}return R(s.length,n.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===ed.mapValue&&t===ed.mapValue)return 0;if(e===ed.mapValue)return 1;if(t===ed.mapValue)return -1;let s=e.fields||{},n=Object.keys(s),r=t.fields||{},i=Object.keys(r);n.sort(),i.sort();for(let e=0;e<n.length&&e<i.length;++e){let t=R(n[e],i[e]);if(0!==t)return t;let a=ep(s[n[e]],r[i[e]]);if(0!==a)return a}return R(n.length,i.length)}(e.mapValue,t.mapValue);default:throw v()}}function ey(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return R(e,t);let s=er(e),n=er(t),r=R(s.seconds,n.seconds);return 0!==r?r:R(s.nanos,n.nanos)}function ew(e){var t,s;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=er(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?ea(e.bytesValue).toBase64():"referenceValue"in e?(s=e.referenceValue,q.fromName(s).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",s=!0;for(let n of e.values||[])s?s=!1:t+=",",t+=ew(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),s="{",n=!0;for(let r of t)n?n=!1:s+=",",s+=`${r}:${ew(e.fields[r])}`;return s+"}"}(e.mapValue):v()}function ev(e){return!!e&&"integerValue"in e}function eE(e){return!!e&&"arrayValue"in e}function eT(e){return!!e&&"nullValue"in e}function eC(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function eI(e){return!!e&&"mapValue"in e}function eS(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return W(e.mapValue.fields,(e,s)=>t.mapValue.fields[e]=eS(s)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let s=0;s<(e.arrayValue.values||[]).length;++s)t.arrayValue.values[s]=eS(e.arrayValue.values[s]);return t}return Object.assign({},e)}function eA(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e){this.value=e}static empty(){return new e_({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(!eI(t=(t.mapValue.fields||{})[e.get(s)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=eS(t)}setAll(e){let t=P.emptyPath(),s={},n=[];e.forEach((e,r)=>{if(!t.isImmediateParentOf(r)){let e=this.getFieldsMap(t);this.applyChanges(e,s,n),s={},n=[],t=r.popLast()}e?s[r.lastSegment()]=eS(e):n.push(r.lastSegment())});let r=this.getFieldsMap(t);this.applyChanges(r,s,n)}delete(e){let t=this.field(e.popLast());eI(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return em(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let n=t.mapValue.fields[e.get(s)];eI(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,s){for(let n of(W(t,(t,s)=>e[t]=s),s))delete e[n]}clone(){return new e_(eS(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e,t,s,n,r,i){this.key=e,this.documentType=t,this.version=s,this.readTime=n,this.data=r,this.documentState=i}static newInvalidDocument(e){return new ek(e,0,M.min(),M.min(),e_.empty(),0)}static newFoundDocument(e,t,s){return new ek(e,1,t,M.min(),s,0)}static newNoDocument(e,t){return new ek(e,2,t,M.min(),e_.empty(),0)}static newUnknownDocument(e,t){return new ek(e,3,t,M.min(),e_.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=e_.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=e_.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof ek&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ek(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eN{constructor(e,t=null,s=[],n=[],r=null,i=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=n,this.limit=r,this.startAt=i,this.endAt=a,this.ht=null}}function eD(e,t=null,s=[],n=[],r=null,i=null,a=null){return new eN(e,t,s,n,r,i,a)}function eb(e){if(null===e.ht){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>e.field.canonicalString()+e.op.toString()+ew(e.value)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>ew(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>ew(e)).join(",")),e.ht=t}return e.ht}function eL(e,t){var s,n,r,i;if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let s=0;s<e.orderBy.length;s++)if(r=e.orderBy[s],i=t.orderBy[s],!(r.dir===i.dir&&r.field.isEqual(i.field)))return!1;if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(s=e.filters[r],n=t.filters[r],s.op!==n.op||!s.field.isEqual(n.field)||!em(s.value,n.value))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eG(e.startAt,t.startAt)&&eG(e.endAt,t.endAt)}function eR(e){return q.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}class ex extends class{}{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?"in"===t||"not-in"===t?this.lt(e,t,s):new eV(e,t,s):"array-contains"===t?new eF(e,s):"in"===t?new eP(e,s):"not-in"===t?new eq(e,s):"array-contains-any"===t?new eB(e,s):new ex(e,t,s)}static lt(e,t,s){return"in"===t?new eM(e,s):new eO(e,s)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.ft(ep(t,this.value)):null!==t&&ef(this.value)===ef(t)&&this.ft(ep(t,this.value))}ft(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return v()}}dt(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class eV extends ex{constructor(e,t,s){super(e,t,s),this.key=q.fromName(s.referenceValue)}matches(e){let t=q.comparator(e.key,this.key);return this.ft(t)}}class eM extends ex{constructor(e,t){super(e,"in",t),this.keys=eU("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class eO extends ex{constructor(e,t){super(e,"not-in",t),this.keys=eU("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function eU(e,t){var s;return((null===(s=t.arrayValue)||void 0===s?void 0:s.values)||[]).map(e=>q.fromName(e.referenceValue))}class eF extends ex{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return eE(t)&&eg(t.arrayValue,this.value)}}class eP extends ex{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eg(this.value.arrayValue,t)}}class eq extends ex{constructor(e,t){super(e,"not-in",t)}matches(e){if(eg(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!eg(this.value.arrayValue,t)}}class eB extends ex{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!eE(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eg(this.value.arrayValue,e))}}class eK{constructor(e,t){this.position=e,this.inclusive=t}}class eQ{constructor(e,t="asc"){this.field=e,this.dir=t}}function ez(e,t,s){let n=0;for(let r=0;r<e.position.length;r++){let i=t[r],a=e.position[r];if(n=i.field.isKeyField()?q.comparator(q.fromName(a.referenceValue),s.key):ep(a,s.data.field(i.field)),"desc"===i.dir&&(n*=-1),0!==n)break}return n}function eG(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let s=0;s<e.position.length;s++)if(!em(e.position[s],t.position[s]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e${constructor(e,t=null,s=[],n=[],r=null,i="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=n,this.limit=r,this.limitType=i,this.startAt=a,this.endAt=o,this._t=null,this.wt=null,this.startAt,this.endAt}}function ej(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function eH(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function eW(e){for(let t of e.filters)if(t.dt())return t.field;return null}function eY(e){if(null===e._t){e._t=[];let t=eW(e),s=eH(e);if(null!==t&&null===s)t.isKeyField()||e._t.push(new eQ(t)),e._t.push(new eQ(P.keyField(),"asc"));else{let t=!1;for(let s of e.explicitOrderBy)e._t.push(s),s.field.isKeyField()&&(t=!0);if(!t){let t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e._t.push(new eQ(P.keyField(),t))}}}return e._t}function eX(e){if(!e.wt){if("F"===e.limitType)e.wt=eD(e.path,e.collectionGroup,eY(e),e.filters,e.limit,e.startAt,e.endAt);else{let t=[];for(let s of eY(e)){let e="desc"===s.dir?"asc":"desc";t.push(new eQ(s.field,e))}let s=e.endAt?new eK(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new eK(e.startAt.position,e.startAt.inclusive):null;e.wt=eD(e.path,e.collectionGroup,t,e.filters,e.limit,s,n)}}return e.wt}function eJ(e,t,s){return new e$(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,s,e.startAt,e.endAt)}function eZ(e,t){return eL(eX(e),eX(t))&&e.limitType===t.limitType}function e0(e){return`${eb(eX(e))}|lt:${e.limitType}`}function e1(e){var t;let s;return`Query(target=${s=(t=eX(e)).path.canonicalString(),null!==t.collectionGroup&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(e=>`${e.field.canonicalString()} ${e.op} ${ew(e.value)}`).join(", ")}]`),null==t.limit||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(s+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>ew(e)).join(",")),t.endAt&&(s+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>ew(e)).join(",")),`Target(${s})`}; limitType=${e.limitType})`}function e2(e,t){return t.isFoundDocument()&&function(e,t){let s=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(s):q.isDocumentKey(e.path)?e.path.isEqual(s):e.path.isImmediateParentOf(s)}(e,t)&&function(e,t){for(let s of e.explicitOrderBy)if(!s.field.isKeyField()&&null===t.data.field(s.field))return!1;return!0}(e,t)&&function(e,t){for(let s of e.filters)if(!s.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,s){let n=ez(e,t,s);return e.inclusive?n<=0:n<0}(e.startAt,eY(e),t))&&(!e.endAt||!!function(e,t,s){let n=ez(e,t,s);return e.inclusive?n>=0:n>0}(e.endAt,eY(e),t))}function e4(e){return(t,s)=>{let n=!1;for(let r of eY(e)){let e=function(e,t,s){let n=e.field.isKeyField()?q.comparator(t.key,s.key):function(e,t,s){let n=t.data.field(e),r=s.data.field(e);return null!==n&&null!==r?ep(n,r):v()}(e.field,t,s);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return v()}}(r,t,s);if(0!==e)return e;n=n||r.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3{constructor(){this._=void 0}}class e9 extends e3{}class e5 extends e3{constructor(e){super(),this.elements=e}}function e6(e,t){let s=ts(t);for(let t of e.elements)s.some(e=>em(e,t))||s.push(t);return{arrayValue:{values:s}}}class e8 extends e3{constructor(e){super(),this.elements=e}}function e7(e,t){let s=ts(t);for(let t of e.elements)s=s.filter(e=>!em(e,t));return{arrayValue:{values:s}}}class te extends e3{constructor(e,t){super(),this.It=e,this.yt=t}}function tt(e){return ei(e.integerValue||e.doubleValue)}function ts(e){return eE(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class tn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tn}static exists(e){return new tn(void 0,e)}static updateTime(e){return new tn(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tr(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class ti{}function ta(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new tm(e.key,tn.none()):new tu(e.key,e.data,tn.none());{let s=e.data,n=e_.empty(),r=new Z(P.comparator);for(let e of t.fields)if(!r.has(e)){let t=s.field(e);null===t&&e.length>1&&(e=e.popLast(),t=s.field(e)),null===t?n.delete(e):n.set(e,t),r=r.add(e)}return new th(e.key,n,new et(r.toArray()),tn.none())}}function to(e,t,s,n){return e instanceof tu?function(e,t,s,n){if(!tr(e.precondition,t))return s;let r=e.value.clone(),i=tf(e.fieldTransforms,n,t);return r.setAll(i),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null}(e,t,s,n):e instanceof th?function(e,t,s,n){if(!tr(e.precondition,t))return s;let r=tf(e.fieldTransforms,n,t),i=t.data;return(i.setAll(tc(e)),i.setAll(r),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===s)?null:s.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,s,n):tr(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):s}function tl(e,t){var s,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(s=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===s&&void 0===n||!(!s||!n)&&x(s,n,(e,t)=>{var s,n;return e.field.isEqual(t.field)&&(s=e.transform,n=t.transform,s instanceof e5&&n instanceof e5||s instanceof e8&&n instanceof e8?x(s.elements,n.elements,em):s instanceof te&&n instanceof te?em(s.yt,n.yt):s instanceof e9&&n instanceof e9)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class tu extends ti{constructor(e,t,s,n=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class th extends ti{constructor(e,t,s,n,r=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=n,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function tc(e){let t=new Map;return e.fieldMask.fields.forEach(s=>{if(!s.isEmpty()){let n=e.data.field(s);t.set(s,n)}}),t}function td(e,t,s){var n;let r=new Map;e.length===s.length||v();for(let i=0;i<s.length;i++){let a=e[i],o=a.transform,l=t.data.field(a.field);r.set(a.field,(n=s[i],o instanceof e5?e6(o,l):o instanceof e8?e7(o,l):n))}return r}function tf(e,t,s){let n=new Map;for(let r of e){let e=r.transform,i=s.data.field(r.field);n.set(r.field,e instanceof e9?function(e,t){let s={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(s.fields.__previous_value__=t),{mapValue:s}}(t,i):e instanceof e5?e6(e,i):e instanceof e8?e7(e,i):function(e,t){var s,n;let r=(s=e,n=t,s instanceof te?ev(n)||n&&"doubleValue"in n?n:{integerValue:0}:null),i=tt(r)+tt(e.yt);return ev(r)&&ev(e.yt)?{integerValue:""+i}:/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){if(e.gt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ec(t)?"-0":t}}(e.It,i)}(e,i))}return n}class tm extends ti{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e){this.count=e}}function tp(e){if(void 0===e)return p("GRPC error has no .code"),E.UNKNOWN;switch(e){case n.OK:return E.OK;case n.CANCELLED:return E.CANCELLED;case n.UNKNOWN:return E.UNKNOWN;case n.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case n.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case n.INTERNAL:return E.INTERNAL;case n.UNAVAILABLE:return E.UNAVAILABLE;case n.UNAUTHENTICATED:return E.UNAUTHENTICATED;case n.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case n.NOT_FOUND:return E.NOT_FOUND;case n.ALREADY_EXISTS:return E.ALREADY_EXISTS;case n.PERMISSION_DENIED:return E.PERMISSION_DENIED;case n.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case n.ABORTED:return E.ABORTED;case n.OUT_OF_RANGE:return E.OUT_OF_RANGE;case n.UNIMPLEMENTED:return E.UNIMPLEMENTED;case n.DATA_LOSS:return E.DATA_LOSS;default:return v()}}(r=n||(n={}))[r.OK=0]="OK",r[r.CANCELLED=1]="CANCELLED",r[r.UNKNOWN=2]="UNKNOWN",r[r.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",r[r.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",r[r.NOT_FOUND=5]="NOT_FOUND",r[r.ALREADY_EXISTS=6]="ALREADY_EXISTS",r[r.PERMISSION_DENIED=7]="PERMISSION_DENIED",r[r.UNAUTHENTICATED=16]="UNAUTHENTICATED",r[r.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",r[r.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",r[r.ABORTED=10]="ABORTED",r[r.OUT_OF_RANGE=11]="OUT_OF_RANGE",r[r.UNIMPLEMENTED=12]="UNIMPLEMENTED",r[r.INTERNAL=13]="INTERNAL",r[r.UNAVAILABLE=14]="UNAVAILABLE",r[r.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),s=this.inner[t];if(void 0!==s){for(let[t,n]of s)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let s=this.mapKeyFn(e),n=this.inner[s];if(void 0===n)return this.inner[s]=[[e,t]],void this.innerSize++;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return void(n[s]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),s=this.inner[t];if(void 0===s)return!1;for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],e))return 1===s.length?delete this.inner[t]:s.splice(n,1),this.innerSize--,!0;return!1}forEach(e){W(this.inner,(t,s)=>{for(let[t,n]of s)e(t,n)})}isEmpty(){return function(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tw=new Y(q.comparator),tv=new Y(q.comparator);function tE(...e){let t=tv;for(let s of e)t=t.insert(s.key,s);return t}function tT(){return new ty(e=>e.toString(),(e,t)=>e.isEqual(t))}new Y(q.comparator);let tC=new Z(q.comparator);function tI(...e){let t=tC;for(let s of e)t=t.add(s);return t}let tS=new Z(R);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e,t,s,n,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=n,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,s){let n=new Map;return n.set(e,t_.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new tA(M.min(),n,tS,tw,tI())}}class t_{constructor(e,t,s,n,r){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=n,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new t_(s,t,tI(),tI(),tI())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(e,t,s,n){this.Tt=e,this.removedTargetIds=t,this.key=s,this.Et=n}}class tN{constructor(e,t){this.targetId=e,this.At=t}}class tD{constructor(e,t,s=es.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=n}}class tb{constructor(){this.Rt=0,this.bt=tx(),this.Pt=es.EMPTY_BYTE_STRING,this.vt=!1,this.Vt=!0}get current(){return this.vt}get resumeToken(){return this.Pt}get St(){return 0!==this.Rt}get Dt(){return this.Vt}Ct(e){e.approximateByteSize()>0&&(this.Vt=!0,this.Pt=e)}xt(){let e=tI(),t=tI(),s=tI();return this.bt.forEach((n,r)=>{switch(r){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:s=s.add(n);break;default:v()}}),new t_(this.Pt,this.vt,e,t,s)}Nt(){this.Vt=!1,this.bt=tx()}kt(e,t){this.Vt=!0,this.bt=this.bt.insert(e,t)}Ot(e){this.Vt=!0,this.bt=this.bt.remove(e)}Mt(){this.Rt+=1}Ft(){this.Rt-=1}$t(){this.Vt=!0,this.vt=!0}}class tL{constructor(e){this.Bt=e,this.Lt=new Map,this.Ut=tw,this.qt=tR(),this.Kt=new Z(R)}Gt(e){for(let t of e.Tt)e.Et&&e.Et.isFoundDocument()?this.Qt(t,e.Et):this.jt(t,e.key,e.Et);for(let t of e.removedTargetIds)this.jt(t,e.key,e.Et)}Wt(e){this.forEachTarget(e,t=>{let s=this.zt(t);switch(e.state){case 0:this.Ht(t)&&s.Ct(e.resumeToken);break;case 1:s.Ft(),s.St||s.Nt(),s.Ct(e.resumeToken);break;case 2:s.Ft(),s.St||this.removeTarget(t);break;case 3:this.Ht(t)&&(s.$t(),s.Ct(e.resumeToken));break;case 4:this.Ht(t)&&(this.Jt(t),s.Ct(e.resumeToken));break;default:v()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Lt.forEach((e,s)=>{this.Ht(s)&&t(s)})}Yt(e){let t=e.targetId,s=e.At.count,n=this.Xt(t);if(n){let e=n.target;if(eR(e)){if(0===s){let s=new q(e.path);this.jt(t,s,ek.newNoDocument(s,M.min()))}else 1===s||v()}else this.Zt(t)!==s&&(this.Jt(t),this.Kt=this.Kt.add(t))}}te(e){let t=new Map;this.Lt.forEach((s,n)=>{let r=this.Xt(n);if(r){if(s.current&&eR(r.target)){let t=new q(r.target.path);null!==this.Ut.get(t)||this.ee(n,t)||this.jt(n,t,ek.newNoDocument(t,e))}s.Dt&&(t.set(n,s.xt()),s.Nt())}});let s=tI();this.qt.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.Xt(e);return!t||2===t.purpose||(n=!1,!1)}),n&&(s=s.add(e))}),this.Ut.forEach((t,s)=>s.setReadTime(e));let n=new tA(e,t,this.Kt,this.Ut,s);return this.Ut=tw,this.qt=tR(),this.Kt=new Z(R),n}Qt(e,t){if(!this.Ht(e))return;let s=this.ee(e,t.key)?2:0;this.zt(e).kt(t.key,s),this.Ut=this.Ut.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ne(t.key).add(e))}jt(e,t,s){if(!this.Ht(e))return;let n=this.zt(e);this.ee(e,t)?n.kt(t,1):n.Ot(t),this.qt=this.qt.insert(t,this.ne(t).delete(e)),s&&(this.Ut=this.Ut.insert(t,s))}removeTarget(e){this.Lt.delete(e)}Zt(e){let t=this.zt(e).xt();return this.Bt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Mt(e){this.zt(e).Mt()}zt(e){let t=this.Lt.get(e);return t||(t=new tb,this.Lt.set(e,t)),t}ne(e){let t=this.qt.get(e);return t||(t=new Z(R),this.qt=this.qt.insert(e,t)),t}Ht(e){let t=null!==this.Xt(e);return t||g("WatchChangeAggregator","Detected inactive target",e),t}Xt(e){let t=this.Lt.get(e);return t&&t.St?null:this.Bt.se(e)}Jt(e){this.Lt.set(e,new tb),this.Bt.getRemoteKeysForTarget(e).forEach(t=>{this.jt(e,t,null)})}ee(e,t){return this.Bt.getRemoteKeysForTarget(e).has(t)}}function tR(){return new Y(q.comparator)}function tx(){return new Y(q.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tV={asc:"ASCENDING",desc:"DESCENDING"},tM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class tO{constructor(e,t){this.databaseId=e,this.gt=t}}function tU(e){return e||v(),M.fromTimestamp(function(e){let t=er(e);return new V(t.seconds,t.nanos)}(e))}function tF(e){let t=U.fromString(e);return tG(t)||v(),t}function tP(e,t){let s=tF(t);if(s.get(1)!==e.databaseId.projectId)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+s.get(1)+" vs "+e.databaseId.projectId);if(s.get(3)!==e.databaseId.database)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+s.get(3)+" vs "+e.databaseId.database);return new q(tK(s))}function tq(e,t){var s;return new U(["projects",(s=e.databaseId).projectId,"databases",s.database]).child("documents").child(t).canonicalString()}function tB(e){return new U(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function tK(e){return e.length>4&&"documents"===e.get(4)||v(),e.popFirst(5)}function tQ(e){return{fieldPath:e.canonicalString()}}function tz(e){return P.fromServerFormat(e.fieldPath)}function tG(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t${constructor(e,t,s,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=n}applyToRemoteDocument(e,t){let s=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let r=this.mutations[t];if(r.key.isEqual(e.key)){var n;n=s[t],r instanceof tu?function(e,t,s){let n=e.value.clone(),r=td(e.fieldTransforms,t,s.transformResults);n.setAll(r),t.convertToFoundDocument(s.version,n).setHasCommittedMutations()}(r,e,n):r instanceof th?function(e,t,s){if(!tr(e.precondition,t))return void t.convertToUnknownDocument(s.version);let n=td(e.fieldTransforms,t,s.transformResults),r=t.data;r.setAll(tc(e)),r.setAll(n),t.convertToFoundDocument(s.version,r).setHasCommittedMutations()}(r,e,n):function(e,t,s){t.convertToNoDocument(s.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let s of this.baseMutations)s.key.isEqual(e.key)&&(t=to(s,e,t,this.localWriteTime));for(let s of this.mutations)s.key.isEqual(e.key)&&(t=to(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let s=tT();return this.mutations.forEach(n=>{let r=e.get(n.key),i=r.overlayedDocument,a=this.applyToLocalView(i,r.mutatedFields),o=ta(i,a=t.has(n.key)?null:a);null!==o&&s.set(n.key,o),i.isValidDocument()||i.convertToNoDocument(M.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tI())}isEqual(e){return this.batchId===e.batchId&&x(this.mutations,e.mutations,(e,t)=>tl(e,t))&&x(this.baseMutations,e.baseMutations,(e,t)=>tl(e,t))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tj{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tH{constructor(e,t,s,n,r=M.min(),i=M.min(),a=es.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=n,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=a}withSequenceNumber(e){return new tH(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new tH(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new tH(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tW{constructor(e){this.re=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tY{constructor(){}ce(e,t){this.ae(e,t),t.he()}ae(e,t){if("nullValue"in e)this.le(t,5);else if("booleanValue"in e)this.le(t,10),t.fe(e.booleanValue?1:0);else if("integerValue"in e)this.le(t,15),t.fe(ei(e.integerValue));else if("doubleValue"in e){let s=ei(e.doubleValue);isNaN(s)?this.le(t,13):(this.le(t,15),ec(s)?t.fe(0):t.fe(s))}else if("timestampValue"in e){let s=e.timestampValue;this.le(t,20),"string"==typeof s?t.de(s):(t.de(`${s.seconds||""}`),t.fe(s.nanos||0))}else if("stringValue"in e)this._e(e.stringValue,t),this.we(t);else if("bytesValue"in e)this.le(t,30),t.me(ea(e.bytesValue)),this.we(t);else if("referenceValue"in e)this.ge(e.referenceValue,t);else if("geoPointValue"in e){let s=e.geoPointValue;this.le(t,45),t.fe(s.latitude||0),t.fe(s.longitude||0)}else"mapValue"in e?eA(e)?this.le(t,Number.MAX_SAFE_INTEGER):(this.ye(e.mapValue,t),this.we(t)):"arrayValue"in e?(this.pe(e.arrayValue,t),this.we(t)):v()}_e(e,t){this.le(t,25),this.Ie(e,t)}Ie(e,t){t.de(e)}ye(e,t){let s=e.fields||{};for(let e of(this.le(t,55),Object.keys(s)))this._e(e,t),this.ae(s[e],t)}pe(e,t){let s=e.values||[];for(let e of(this.le(t,50),s))this.ae(e,t)}ge(e,t){this.le(t,37),q.fromName(e).path.forEach(e=>{this.le(t,60),this.Ie(e,t)})}le(e,t){e.fe(t)}we(e){e.fe(2)}}tY.Te=new tY;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tX{constructor(){this.Ye=new tJ}addToCollectionParentIndex(e,t){return this.Ye.add(t),G.resolve()}getCollectionParents(e,t){return G.resolve(this.Ye.getEntries(t))}addFieldIndex(e,t){return G.resolve()}deleteFieldIndex(e,t){return G.resolve()}getDocumentsMatchingTarget(e,t){return G.resolve(null)}getIndexType(e,t){return G.resolve(0)}getFieldIndexes(e,t){return G.resolve([])}getNextCollectionGroupToUpdate(e){return G.resolve(null)}getMinOffset(e,t){return G.resolve(K.min())}getMinOffsetFromCollectionGroup(e,t){return G.resolve(K.min())}updateCollectionGroup(e,t,s){return G.resolve()}updateIndexEntries(e,t){return G.resolve()}}class tJ{constructor(){this.index={}}add(e){let t=e.lastSegment(),s=e.popLast(),n=this.index[t]||new Z(U.comparator),r=!n.has(s);return this.index[t]=n.add(s),r}has(e){let t=e.lastSegment(),s=e.popLast(),n=this.index[t];return n&&n.has(s)}getEntries(e){return(this.index[e]||new Z(U.comparator)).toArray()}}new Uint8Array(0);class tZ{constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}static withCacheSize(e){return new tZ(e,tZ.DEFAULT_COLLECTION_PERCENTILE,tZ.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tZ.DEFAULT_COLLECTION_PERCENTILE=10,tZ.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,tZ.DEFAULT=new tZ(41943040,tZ.DEFAULT_COLLECTION_PERCENTILE,tZ.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),tZ.DISABLED=new tZ(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new t0(0)}static vn(){return new t0(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t1{constructor(){this.changes=new ty(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ek.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let s=this.changes.get(t);return void 0!==s?G.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t2{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t4{constructor(e,t,s,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=n}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(s=n,this.getBaseDocument(e,t,s))).next(e=>(null!==s&&to(s.mutation,e,et.empty(),V.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tI()).next(()=>t))}getLocalViewOfDocuments(e,t,s=tI()){let n=tT();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,s).next(e=>{let t=tE();return e.forEach((e,s)=>{t=t.insert(e,s.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let s=tT();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,tI()))}populateOverlays(e,t,s){let n=[];return s.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,s)=>{t.set(e,s)})})}computeViews(e,t,s,n){let r=tw,i=tT(),a=tT();return t.forEach((e,t)=>{let a=s.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof th)?r=r.insert(t.key,t):void 0!==a&&(i.set(t.key,a.mutation.getFieldMask()),to(a.mutation,t,a.mutation.getFieldMask(),V.now()))}),this.recalculateAndSaveOverlays(e,r).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>{var s;return a.set(e,new t2(t,null!==(s=i.get(e))&&void 0!==s?s:null))}),a))}recalculateAndSaveOverlays(e,t){let s=tT(),n=new Y((e,t)=>e-t),r=tI();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let r of e)r.keys().forEach(e=>{let i=t.get(e);if(null===i)return;let a=s.get(e)||et.empty();a=r.applyToLocalView(i,a),s.set(e,a);let o=(n.get(r.batchId)||tI()).add(e);n=n.insert(r.batchId,o)})}).next(()=>{let i=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,l=n.value,u=tT();l.forEach(e=>{if(!r.has(e)){let n=ta(t.get(e),s.get(e));null!==n&&u.set(e,n),r=r.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,o,u))}return G.waitFor(i)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,s){return q.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):null!==t.collectionGroup?this.getDocumentsMatchingCollectionGroupQuery(e,t,s):this.getDocumentsMatchingCollectionQuery(e,t,s)}getNextDocuments(e,t,s,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,n).next(r=>{let i=n-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,n-r.size):G.resolve(tT()),a=-1,o=r;return i.next(t=>G.forEach(t,(t,s)=>(a<s.largestBatchId&&(a=s.largestBatchId),r.get(t)?G.resolve():this.getBaseDocument(e,t,s).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,r)).next(()=>this.computeViews(e,o,t,tI())).next(e=>{let t;return{batchId:a,changes:(t=tv,e.forEach((e,s)=>t=t.insert(e,s.overlayedDocument)),t)}}))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(e=>{let t=tE();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,s){let n=t.collectionGroup,r=tE();return this.indexManager.getCollectionParents(e,n).next(i=>G.forEach(i,i=>{let a=new e$(i.child(n),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,a,s).next(e=>{e.forEach((e,t)=>{r=r.insert(e,t)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,t,s){let n;return this.remoteDocumentCache.getAllFromCollection(e,t.path,s).next(r=>(n=r,this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId))).next(e=>{e.forEach((e,t)=>{let s=t.getKey();null===n.get(s)&&(n=n.insert(s,ek.newInvalidDocument(s)))});let s=tE();return n.forEach((n,r)=>{let i=e.get(n);void 0!==i&&to(i.mutation,r,et.empty(),V.now()),e2(t,r)&&(s=s.insert(n,r))}),s})}getBaseDocument(e,t,s){return null===s||1===s.mutation.type?this.remoteDocumentCache.getEntry(e,t):G.resolve(ek.newInvalidDocument(t))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t3{constructor(e){this.It=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,t){return G.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){return this.Zn.set(t.id,{id:t.id,version:t.version,createTime:tU(t.createTime)}),G.resolve()}getNamedQuery(e,t){return G.resolve(this.ts.get(t))}saveNamedQuery(e,t){return this.ts.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let s,n=function(e){let t=tF(e);return 4===t.length?U.emptyPath():tK(t)}(e.parent),r=e.structuredQuery,i=r.from?r.from.length:0,a=null;if(i>0){1===i||v();let e=r.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];r.where&&(o=function e(t){return t?void 0!==t.unaryFilter?[function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=tz(e.unaryFilter.field);return ex.create(t,"==",{doubleValue:NaN});case"IS_NULL":let s=tz(e.unaryFilter.field);return ex.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=tz(e.unaryFilter.field);return ex.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let r=tz(e.unaryFilter.field);return ex.create(r,"!=",{nullValue:"NULL_VALUE"});default:return v()}}(t)]:void 0!==t.fieldFilter?[ex.create(tz(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return v()}}(t.fieldFilter.op),t.fieldFilter.value)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map(t=>e(t)).reduce((e,t)=>e.concat(t)):v():[]}(r.where));let l=[];r.orderBy&&(l=r.orderBy.map(e=>new eQ(tz(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;r.limit&&(u=null==(s="object"==typeof(t=r.limit)?t.value:t)?null:s);let h=null;r.startAt&&(h=function(e){let t=!!e.before;return new eK(e.values||[],t)}(r.startAt));let c=null;return r.endAt&&(c=function(e){let t=!e.before;return new eK(e.values||[],t)}(r.endAt)),new e$(n,a,l,o,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?eJ(t,t.limit,"L"):t}(t.bundledQuery),readTime:tU(t.readTime)}),G.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t9{constructor(){this.overlays=new Y(q.comparator),this.es=new Map}getOverlay(e,t){return G.resolve(this.overlays.get(t))}getOverlays(e,t){let s=tT();return G.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&s.set(t,e)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((s,n)=>{this.ue(e,t,n)}),G.resolve()}removeOverlaysForBatchId(e,t,s){let n=this.es.get(s);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.es.delete(s)),G.resolve()}getOverlaysForCollection(e,t,s){let n=tT(),r=t.length+1,i=new q(t.child("")),a=this.overlays.getIteratorFrom(i);for(;a.hasNext();){let e=a.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===r&&e.largestBatchId>s&&n.set(e.getKey(),e)}return G.resolve(n)}getOverlaysForCollectionGroup(e,t,s,n){let r=new Y((e,t)=>e-t),i=this.overlays.getIterator();for(;i.hasNext();){let e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>s){let t=r.get(e.largestBatchId);null===t&&(t=tT(),r=r.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tT(),o=r.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return G.resolve(a)}ue(e,t,s){let n=this.overlays.get(s.key);if(null!==n){let e=this.es.get(n.largestBatchId).delete(s.key);this.es.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(s.key,new tj(t,s));let r=this.es.get(t);void 0===r&&(r=tI(),this.es.set(t,r)),this.es.set(t,r.add(s.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t5{constructor(){this.ns=new Z(t6.ss),this.rs=new Z(t6.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,t){let s=new t6(e,t);this.ns=this.ns.add(s),this.rs=this.rs.add(s)}us(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.cs(new t6(e,t))}hs(e,t){e.forEach(e=>this.removeReference(e,t))}ls(e){let t=new q(new U([])),s=new t6(t,e),n=new t6(t,e+1),r=[];return this.rs.forEachInRange([s,n],e=>{this.cs(e),r.push(e.key)}),r}fs(){this.ns.forEach(e=>this.cs(e))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){let t=new q(new U([])),s=new t6(t,e),n=new t6(t,e+1),r=tI();return this.rs.forEachInRange([s,n],e=>{r=r.add(e.key)}),r}containsKey(e){let t=new t6(e,0),s=this.ns.firstAfterOrEqual(t);return null!==s&&e.isEqual(s.key)}}class t6{constructor(e,t){this.key=e,this._s=t}static ss(e,t){return q.comparator(e.key,t.key)||R(e._s,t._s)}static os(e,t){return R(e._s,t._s)||q.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t8{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new Z(t6.ss)}checkEmpty(e){return G.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,s,n){let r=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let i=new t$(r,t,s,n);for(let t of(this.mutationQueue.push(i),n))this.gs=this.gs.add(new t6(t.key,r)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return G.resolve(i)}lookupMutationBatch(e,t){return G.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){let s=this.ps(t+1),n=s<0?0:s;return G.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return G.resolve(0===this.mutationQueue.length?-1:this.ws-1)}getAllMutationBatches(e){return G.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let s=new t6(t,0),n=new t6(t,Number.POSITIVE_INFINITY),r=[];return this.gs.forEachInRange([s,n],e=>{let t=this.ys(e._s);r.push(t)}),G.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new Z(R);return t.forEach(e=>{let t=new t6(e,0),n=new t6(e,Number.POSITIVE_INFINITY);this.gs.forEachInRange([t,n],e=>{s=s.add(e._s)})}),G.resolve(this.Is(s))}getAllMutationBatchesAffectingQuery(e,t){let s=t.path,n=s.length+1,r=s;q.isDocumentKey(r)||(r=r.child(""));let i=new t6(new q(r),0),a=new Z(R);return this.gs.forEachWhile(e=>{let t=e.key.path;return!!s.isPrefixOf(t)&&(t.length===n&&(a=a.add(e._s)),!0)},i),G.resolve(this.Is(a))}Is(e){let t=[];return e.forEach(e=>{let s=this.ys(e);null!==s&&t.push(s)}),t}removeMutationBatch(e,t){0===this.Ts(t.batchId,"removed")||v(),this.mutationQueue.shift();let s=this.gs;return G.forEach(t.mutations,n=>{let r=new t6(n.key,t.batchId);return s=s.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.gs=s})}An(e){}containsKey(e,t){let s=new t6(t,0),n=this.gs.firstAfterOrEqual(s);return G.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,G.resolve()}Ts(e,t){return this.ps(e)}ps(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}ys(e){let t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t7{constructor(e){this.Es=e,this.docs=new Y(q.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let s=t.key,n=this.docs.get(s),r=n?n.size:0,i=this.Es(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let s=this.docs.get(t);return G.resolve(s?s.document.mutableCopy():ek.newInvalidDocument(t))}getEntries(e,t){let s=tw;return t.forEach(e=>{let t=this.docs.get(e);s=s.insert(e,t?t.document.mutableCopy():ek.newInvalidDocument(e))}),G.resolve(s)}getAllFromCollection(e,t,s){let n=tw,r=new q(t.child("")),i=this.docs.getIteratorFrom(r);for(;i.hasNext();){let{key:e,value:{document:r}}=i.getNext();if(!t.isPrefixOf(e.path))break;e.path.length>t.length+1||0>=function(e,t){let s=e.readTime.compareTo(t.readTime);return 0!==s?s:0!==(s=q.comparator(e.documentKey,t.documentKey))?s:R(e.largestBatchId,t.largestBatchId)}(new K(r.readTime,r.key,-1),s)||(n=n.insert(r.key,r.mutableCopy()))}return G.resolve(n)}getAllFromCollectionGroup(e,t,s,n){v()}As(e,t){return G.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new se(this)}getSize(e){return G.resolve(this.size)}}class se extends t1{constructor(e){super(),this.Yn=e}applyChanges(e){let t=[];return this.changes.forEach((s,n)=>{n.isValidDocument()?t.push(this.Yn.addEntry(e,n)):this.Yn.removeEntry(s)}),G.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.persistence=e,this.Rs=new ty(e=>eb(e),eL),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.bs=0,this.Ps=new t5,this.targetCount=0,this.vs=t0.Pn()}forEachTarget(e,t){return this.Rs.forEach((e,s)=>t(s)),G.resolve()}getLastRemoteSnapshotVersion(e){return G.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return G.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),G.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.bs&&(this.bs=t),G.resolve()}Dn(e){this.Rs.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.vs=new t0(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,G.resolve()}updateTargetData(e,t){return this.Dn(t),G.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,G.resolve()}removeTargets(e,t,s){let n=0,r=[];return this.Rs.forEach((i,a)=>{a.sequenceNumber<=t&&null===s.get(a.targetId)&&(this.Rs.delete(i),r.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),G.waitFor(r).next(()=>n)}getTargetCount(e){return G.resolve(this.targetCount)}getTargetData(e,t){let s=this.Rs.get(t)||null;return G.resolve(s)}addMatchingKeys(e,t,s){return this.Ps.us(t,s),G.resolve()}removeMatchingKeys(e,t,s){this.Ps.hs(t,s);let n=this.persistence.referenceDelegate,r=[];return n&&t.forEach(t=>{r.push(n.markPotentiallyOrphaned(e,t))}),G.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),G.resolve()}getMatchingKeysForTargetId(e,t){let s=this.Ps.ds(t);return G.resolve(s)}containsKey(e,t){return G.resolve(this.Ps.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,t){this.Vs={},this.overlays={},this.Ss=new j(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new st(this),this.indexManager=new tX,this.remoteDocumentCache=new t7(e=>this.referenceDelegate.xs(e)),this.It=new tW(t),this.Ns=new t3(this.It)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new t9,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.Vs[e.toKey()];return s||(s=new t8(t,this.referenceDelegate),this.Vs[e.toKey()]=s),s}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,s){g("MemoryPersistence","Starting transaction:",e);let n=new sn(this.Ss.next());return this.referenceDelegate.ks(),s(n).next(e=>this.referenceDelegate.Os(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Ms(e,t){return G.or(Object.values(this.Vs).map(s=>()=>s.containsKey(e,t)))}}class sn extends Q{constructor(e){super(),this.currentSequenceNumber=e}}class sr{constructor(e){this.persistence=e,this.Fs=new t5,this.$s=null}static Bs(e){return new sr(e)}get Ls(){if(this.$s)return this.$s;throw v()}addReference(e,t,s){return this.Fs.addReference(s,t),this.Ls.delete(s.toString()),G.resolve()}removeReference(e,t,s){return this.Fs.removeReference(s,t),this.Ls.add(s.toString()),G.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),G.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach(e=>this.Ls.add(e.toString()));let s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Ls.add(e.toString()))}).next(()=>s.removeTargetData(e,t))}ks(){this.$s=new Set}Os(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return G.forEach(this.Ls,s=>{let n=q.fromPath(s);return this.Us(e,n).next(e=>{e||t.removeEntry(n,M.min())})}).next(()=>(this.$s=null,t.apply(e)))}updateLimboDocument(e,t){return this.Us(e,t).next(e=>{e?this.Ls.delete(t.toString()):this.Ls.add(t.toString())})}xs(e){return 0}Us(e,t){return G.or([()=>G.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,t,s,n){this.targetId=e,this.fromCache=t,this.Si=s,this.Di=n}static Ci(e,t){let s=tI(),n=tI();for(let e of t.docChanges)switch(e.type){case 0:s=s.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new si(e,t.fromCache,s,n)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(){this.xi=!1}initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,s,n){return this.ki(e,t).next(r=>r||this.Oi(e,t,n,s)).next(s=>s||this.Mi(e,t))}ki(e,t){if(ej(t))return G.resolve(null);let s=eX(t);return this.indexManager.getIndexType(e,s).next(n=>0===n?null:(null!==t.limit&&1===n&&(s=eX(t=eJ(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,s).next(n=>{let r=tI(...n);return this.Ni.getDocuments(e,r).next(n=>this.indexManager.getMinOffset(e,s).next(s=>{let i=this.Fi(t,n);return this.$i(t,i,r,s.readTime)?this.ki(e,eJ(t,null,"F")):this.Bi(e,i,t,s)}))})))}Oi(e,t,s,n){return ej(t)||n.isEqual(M.min())?this.Mi(e,t):this.Ni.getDocuments(e,s).next(r=>{let i=this.Fi(t,r);return this.$i(t,i,s,n)?this.Mi(e,t):(m()<=o.in.DEBUG&&g("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),e1(t)),this.Bi(e,i,t,function(e,t){let s=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1;return new K(M.fromTimestamp(1e9===n?new V(s+1,0):new V(s,n)),q.empty(),-1)}(n,0)))})}Fi(e,t){let s=new Z(e4(e));return t.forEach((t,n)=>{e2(e,n)&&(s=s.add(n))}),s}$i(e,t,s,n){if(null===e.limit)return!1;if(s.size!==t.size)return!0;let r="F"===e.limitType?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(n)>0)}Mi(e,t){return m()<=o.in.DEBUG&&g("QueryEngine","Using full collection scan to execute query:",e1(t)),this.Ni.getDocumentsMatchingQuery(e,t,K.min())}Bi(e,t,s,n){return this.Ni.getDocumentsMatchingQuery(e,s,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t,s,n){this.persistence=e,this.Li=t,this.It=n,this.Ui=new Y(R),this.qi=new ty(e=>eb(e),eL),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(s)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new t4(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ui))}}async function sl(e,t){return await e.persistence.runTransaction("Handle user change","readonly",s=>{let n;return e.mutationQueue.getAllMutationBatches(s).next(r=>(n=r,e.Qi(t),e.mutationQueue.getAllMutationBatches(s))).next(t=>{let r=[],i=[],a=tI();for(let e of n)for(let t of(r.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(s,a).next(e=>({ji:e,removedBatchIds:r,addedBatchIds:i}))})})}function su(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Cs.getLastRemoteSnapshotVersion(t))}async function sh(e,t,s){let n=e.Ui.get(t);try{s||await e.persistence.runTransaction("Release target",s?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!$(e))throw e;g("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}e.Ui=e.Ui.remove(t),e.qi.delete(n.target)}function sc(e,t,s){let n=M.min(),r=tI();return e.persistence.runTransaction("Execute query","readonly",i=>(function(e,t,s){let n=e.qi.get(s);return void 0!==n?G.resolve(e.Ui.get(n)):e.Cs.getTargetData(t,s)})(e,i,eX(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.Cs.getMatchingKeysForTargetId(i,t.targetId).next(e=>{r=e})}).next(()=>e.Li.getDocumentsMatchingQuery(i,t,s?n:M.min(),s?r:tI())).next(s=>{var n;let i;return n=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),i=e.Ki.get(n)||M.min(),s.forEach((e,t)=>{t.readTime.compareTo(i)>0&&(i=t.readTime)}),e.Ki.set(n,i),{documents:s,Hi:r}}))}class sd{constructor(){this.activeTargetIds=tS}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class sf{constructor(){this.Lr=new sd,this.Ur={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e){return this.Lr.er(e),this.Ur[e]||"not-current"}updateQueryState(e,t,s){this.Ur[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.Ur[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new sd,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{qr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}qr(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){for(let e of(g("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.Wr))e(0)}jr(){for(let e of(g("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.Wr))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,t,s,n,r){let i=this.ho(e,t);g("RestConnection","Sending: ",i,s);let a={};return this.lo(a,n,r),this.fo(e,i,a,s).then(e=>(g("RestConnection","Received: ",e),e),t=>{throw y("RestConnection",`${e} failed with error: `,t,"url: ",i,"request:",s),t})}_o(e,t,s,n,r,i){return this.ao(e,t,s,n,r)}lo(e,t,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+d,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,s)=>e[s]=t),s&&s.headers.forEach((t,s)=>e[s]=t)}ho(e,t){let s=sp[e];return`${this.oo}/v1/${t}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,t,s,n){return new Promise((r,i)=>{let a=new u.JJ;a.setWithCredentials(!0),a.listenOnce(u.tw.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case u.jK.NO_ERROR:let t=a.getResponseJson();g("Connection","XHR received:",JSON.stringify(t)),r(t);break;case u.jK.TIMEOUT:g("Connection",'RPC "'+e+'" timed out'),i(new T(E.DEADLINE_EXCEEDED,"Request time out"));break;case u.jK.HTTP_ERROR:let s=a.getStatus();if(g("Connection",'RPC "'+e+'" failed with status:',s,"response text:",a.getResponseText()),s>0){let e=a.getResponseJson().error;if(e&&e.status&&e.message){let t=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(E).indexOf(t)>=0?t:E.UNKNOWN}(e.status);i(new T(t,e.message))}else i(new T(E.UNKNOWN,"Server responded with status "+a.getStatus()))}else i(new T(E.UNAVAILABLE,"Connection failed."));break;default:v()}}finally{g("Connection",'RPC "'+e+'" completed.')}});let o=JSON.stringify(n);a.send(t,"POST",o,s,15)})}wo(e,t,s){let r=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=(0,u.UE)(),a=(0,u.FJ)(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new u.zI({})),this.lo(o.initMessageHeaders,t,s),o.encodeInitMessageHeaders=!0;let l=r.join("");g("Connection","Creating WebChannel: "+l,o);let h=i.createWebChannel(l,o),c=!1,d=!1,f=new sy({Hr:e=>{d?g("Connection","Not sending because WebChannel is closed:",e):(c||(g("Connection","Opening WebChannel transport."),h.open(),c=!0),g("Connection","WebChannel sending:",e),h.send(e))},Jr:()=>h.close()}),m=(e,t,s)=>{e.listen(t,e=>{try{s(e)}catch(e){setTimeout(()=>{throw e},0)}})};return m(h,u.ii.EventType.OPEN,()=>{d||g("Connection","WebChannel transport opened.")}),m(h,u.ii.EventType.CLOSE,()=>{d||(d=!0,g("Connection","WebChannel transport closed"),f.io())}),m(h,u.ii.EventType.ERROR,e=>{d||(d=!0,y("Connection","WebChannel transport errored:",e),f.io(new T(E.UNAVAILABLE,"The operation could not be completed")))}),m(h,u.ii.EventType.MESSAGE,e=>{var t;if(!d){let s=e.data[0];s||v();let r=s.error||(null===(t=s[0])||void 0===t?void 0:t.error);if(r){g("Connection","WebChannel received error:",r);let e=r.status,t=function(e){let t=n[e];if(void 0!==t)return tp(t)}(e),s=r.message;void 0===t&&(t=E.INTERNAL,s="Unknown error status: "+e+" with message "+r.message),d=!0,f.io(new T(t,s)),h.close()}else g("Connection","WebChannel received:",s),f.ro(s)}}),m(a,u.ju.STAT_EVENT,e=>{e.stat===u.kN.PROXY?g("Connection","Detected buffering proxy"):e.stat===u.kN.NOPROXY&&g("Connection","Detected no buffering proxy")}),setTimeout(()=>{f.so()},0),f}}function sv(){return"undefined"!=typeof document?document:null}class sE{constructor(e,t,s=1e3,n=1.5,r=6e4){this.Hs=e,this.timerId=t,this.mo=s,this.yo=n,this.po=r,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();let t=Math.floor(this.Io+this.bo()),s=Math.max(0,Date.now()-this.Eo),n=Math.max(0,t-s);n>0&&g("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,n,()=>(this.Eo=Date.now(),e())),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){null!==this.To&&(this.To.skipDelay(),this.To=null)}cancel(){null!==this.To&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e,t,s,n,r,i,a,o){this.Hs=e,this.vo=s,this.Vo=n,this.connection=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new sE(e,t)}No(){return 1===this.state||5===this.state||this.ko()}ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&null===this.Do&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,()=>this.$o()))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}Uo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.Uo(),this.xo.cancel(),this.So++,4!==e?this.xo.reset():t&&t.code===E.RESOURCE_EXHAUSTED?(p(t.toString()),p("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===E.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.qo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}qo(){}auth(){this.state=1;let e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,s])=>{this.So===t&&this.Go(e,s)},t=>{e(()=>{let e=new T(E.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Qo(e)})})}Go(e,t){let s=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr(()=>{s(()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,()=>(this.ko()&&(this.state=3),Promise.resolve())),this.listener.Yr()))}),this.stream.Zr(e=>{s(()=>this.Qo(e))}),this.stream.onMessage(e=>{s(()=>this.onMessage(e))})}Oo(){this.state=5,this.xo.Ro(async()=>{this.state=0,this.start()})}Qo(e){return g("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget(()=>this.So===e?t():(g("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sC extends sT{constructor(e,t,s,n,r,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,n,i),this.It=r}jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();let t=function(e,t){let s;if("targetChange"in t){var n,r;t.targetChange;let i="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:v(),a=t.targetChange.targetIds||[],o=(r=t.targetChange.resumeToken,e.gt?(void 0===r||"string"==typeof r||v(),es.fromBase64String(r||"")):(void 0===r||r instanceof Uint8Array||v(),es.fromUint8Array(r||new Uint8Array))),l=t.targetChange.cause;s=new tD(i,a,o,l&&new T(void 0===l.code?E.UNKNOWN:tp(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let r=tP(e,n.document.name),i=tU(n.document.updateTime),a=new e_({mapValue:{fields:n.document.fields}}),o=ek.newFoundDocument(r,i,a);s=new tk(n.targetIds||[],n.removedTargetIds||[],o.key,o)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let r=tP(e,n.document),i=n.readTime?tU(n.readTime):M.min(),a=ek.newNoDocument(r,i);s=new tk([],n.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let r=tP(e,n.document);s=new tk([],n.removedTargetIds||[],r,null)}else{if(!("filter"in t))return v();{t.filter;let e=t.filter;e.targetId;let n=new tg(e.count||0);s=new tN(e.targetId,n)}}return s}(this.It,e),s=function(e){if(!("targetChange"in e))return M.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?M.min():t.readTime?tU(t.readTime):M.min()}(e);return this.listener.Wo(t,s)}zo(e){let t={};t.database=tB(this.It),t.addTarget=function(e,t){var s,n;let r;let i=t.target;return(r=eR(i)?{documents:{documents:[tq(e,i.path)]}}:{query:function(e,t){var s,n,r;let i={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i.parent=tq(e,a),i.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i.parent=tq(e,a.popLast()),i.structuredQuery.from=[{collectionId:a.lastSegment()}]);let o=function(e){if(0===e.length)return;let t=e.map(e=>(function(e){if("=="===e.op){if(eC(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NAN"}};if(eT(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(eC(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NOT_NAN"}};if(eT(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:tQ(e.field),op:tM[e.op],value:e.value}}})(e));return 1===t.length?t[0]:{compositeFilter:{op:"AND",filters:t}}}(t.filters);o&&(i.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:tQ(e.field),direction:tV[e.dir]}))}(t.orderBy);l&&(i.structuredQuery.orderBy=l);let u=(n=t.limit,e.gt||null==n?n:{value:n});return null!==u&&(i.structuredQuery.limit=u),t.startAt&&(i.structuredQuery.startAt={before:(s=t.startAt).inclusive,values:s.position}),t.endAt&&(i.structuredQuery.endAt={before:!(r=t.endAt).inclusive,values:r.position}),i}(e,i)}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0?r.resumeToken=(s=t.resumeToken,e.gt?s.toBase64():s.toUint8Array()):t.snapshotVersion.compareTo(M.min())>0&&(r.readTime=(n=t.snapshotVersion.toTimestamp(),e.gt?`${new Date(1e3*n.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+n.nanoseconds).slice(-9)}Z`:{seconds:""+n.seconds,nanos:n.nanoseconds})),r}(this.It,e);let s=function(e,t){let s=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return v()}}(0,t.purpose);return null==s?null:{"goog-listen-tags":s}}(this.It,e);s&&(t.labels=s),this.Bo(t)}Ho(e){let t={};t.database=tB(this.It),t.removeTarget=e,this.Bo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI extends class{}{constructor(e,t,s,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.It=n,this.nu=!1}su(){if(this.nu)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,s){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([n,r])=>this.connection.ao(e,t,s,n,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}_o(e,t,s,n){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection._o(e,t,s,r,i,n)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}terminate(){this.nu=!0}}class sS{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}uu(){0===this.iu&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve())))}hu(e){"Online"===this.state?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.cu("Offline")))}set(e){this.lu(),this.iu=0,"Online"===e&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(p(t),this.ou=!1):g("OnlineStateTracker",t)}lu(){null!==this.ru&&(this.ru.cancel(),this.ru=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(e,t,s,n,r){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=r,this.mu.qr(e=>{s.enqueueAndForget(async()=>{sV(this)&&(g("RemoteStore","Restarting streams for network reachability change."),await async function(e){e._u.add(4),await sk(e),e.gu.set("Unknown"),e._u.delete(4),await s_(e)}(this))})}),this.gu=new sS(s,n)}}async function s_(e){if(sV(e))for(let t of e.wu)await t(!0)}async function sk(e){for(let t of e.wu)await t(!1)}function sN(e,t){e.du.has(t.targetId)||(e.du.set(t.targetId,t),sx(e)?sR(e):sB(e).ko()&&sb(e,t))}function sD(e,t){let s=sB(e);e.du.delete(t),s.ko()&&sL(e,t),0===e.du.size&&(s.ko()?s.Fo():sV(e)&&e.gu.set("Unknown"))}function sb(e,t){e.yu.Mt(t.targetId),sB(e).zo(t)}function sL(e,t){e.yu.Mt(t),sB(e).Ho(t)}function sR(e){e.yu=new tL({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),se:t=>e.du.get(t)||null}),sB(e).start(),e.gu.uu()}function sx(e){return sV(e)&&!sB(e).No()&&e.du.size>0}function sV(e){return 0===e._u.size}async function sM(e){e.du.forEach((t,s)=>{sb(e,t)})}async function sO(e,t){e.yu=void 0,sx(e)?(e.gu.hu(t),sR(e)):e.gu.set("Unknown")}async function sU(e,t,s){if(e.gu.set("Online"),t instanceof tD&&2===t.state&&t.cause)try{await async function(e,t){let s=t.cause;for(let n of t.targetIds)e.du.has(n)&&(await e.remoteSyncer.rejectListen(n,s),e.du.delete(n),e.yu.removeTarget(n))}(e,t)}catch(s){g("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),s),await sF(e,s)}else if(t instanceof tk?e.yu.Gt(t):t instanceof tN?e.yu.Yt(t):e.yu.Wt(t),!s.isEqual(M.min()))try{let t=await su(e.localStore);s.compareTo(t)>=0&&await function(e,t){let s=e.yu.te(t);return s.targetChanges.forEach((s,n)=>{if(s.resumeToken.approximateByteSize()>0){let r=e.du.get(n);r&&e.du.set(n,r.withResumeToken(s.resumeToken,t))}}),s.targetMismatches.forEach(t=>{let s=e.du.get(t);if(!s)return;e.du.set(t,s.withResumeToken(es.EMPTY_BYTE_STRING,s.snapshotVersion)),sL(e,t);let n=new tH(s.target,t,1,s.sequenceNumber);sb(e,n)}),e.remoteSyncer.applyRemoteEvent(s)}(e,s)}catch(t){g("RemoteStore","Failed to raise snapshot:",t),await sF(e,t)}}async function sF(e,t,s){if(!$(t))throw t;e._u.add(1),await sk(e),e.gu.set("Offline"),s||(s=()=>su(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{g("RemoteStore","Retrying IndexedDB access"),await s(),e._u.delete(1),await s_(e)})}async function sP(e,t){e.asyncQueue.verifyOperationInProgress(),g("RemoteStore","RemoteStore received new credentials");let s=sV(e);e._u.add(3),await sk(e),s&&e.gu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e._u.delete(3),await s_(e)}async function sq(e,t){t?(e._u.delete(2),await s_(e)):t||(e._u.add(2),await sk(e),e.gu.set("Unknown"))}function sB(e){var t,s,n;return e.pu||(e.pu=(t=e.datastore,s=e.asyncQueue,n={Yr:sM.bind(null,e),Zr:sO.bind(null,e),Wo:sU.bind(null,e)},t.su(),new sC(s,t.connection,t.authCredentials,t.appCheckCredentials,t.It,n)),e.wu.push(async t=>{t?(e.pu.Mo(),sx(e)?sR(e):e.gu.set("Unknown")):(await e.pu.stop(),e.yu=void 0)})),e.pu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sK{constructor(e,t,s,n,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=n,this.removalCallback=r,this.deferred=new C,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,s,n,r){let i=new sK(e,t,Date.now()+s,n,r);return i.start(s),i}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new T(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function sQ(e,t){if(p("AsyncQueue",`${t}: ${e}`),$(e))return new T(E.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sz{constructor(e){this.comparator=e?(t,s)=>e(t,s)||q.comparator(t.key,s.key):(e,t)=>q.comparator(e.key,t.key),this.keyedMap=tE(),this.sortedSet=new Y(this.comparator)}static emptySet(e){return new sz(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof sz)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=s.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let s=new sz;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sG{constructor(){this.Tu=new Y(q.comparator)}track(e){let t=e.doc.key,s=this.Tu.get(t);s?0!==e.type&&3===s.type?this.Tu=this.Tu.insert(t,e):3===e.type&&1!==s.type?this.Tu=this.Tu.insert(t,{type:s.type,doc:e.doc}):2===e.type&&2===s.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===s.type?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===s.type?this.Tu=this.Tu.remove(t):1===e.type&&2===s.type?this.Tu=this.Tu.insert(t,{type:1,doc:s.doc}):0===e.type&&1===s.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):v():this.Tu=this.Tu.insert(t,e)}Eu(){let e=[];return this.Tu.inorderTraversal((t,s)=>{e.push(s)}),e}}class s${constructor(e,t,s,n,r,i,a,o,l){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=n,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,s,n,r){let i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new s$(e,t,sz.emptySet(t),i,s,n,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&eZ(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==s[e].type||!t[e].doc.isEqual(s[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sj{constructor(){this.Au=void 0,this.listeners=[]}}class sH{constructor(){this.queries=new ty(e=>e0(e),eZ),this.onlineState="Unknown",this.Ru=new Set}}async function sW(e,t){let s=t.query,n=!1,r=e.queries.get(s);if(r||(n=!0,r=new sj),n)try{r.Au=await e.onListen(s)}catch(s){let e=sQ(s,`Initialization of query '${e1(t.query)}' failed`);return void t.onError(e)}e.queries.set(s,r),r.listeners.push(t),t.bu(e.onlineState),r.Au&&t.Pu(r.Au)&&sZ(e)}async function sY(e,t){let s=t.query,n=!1,r=e.queries.get(s);if(r){let e=r.listeners.indexOf(t);e>=0&&(r.listeners.splice(e,1),n=0===r.listeners.length)}if(n)return e.queries.delete(s),e.onUnlisten(s)}function sX(e,t){let s=!1;for(let n of t){let t=n.query,r=e.queries.get(t);if(r){for(let e of r.listeners)e.Pu(n)&&(s=!0);r.Au=n}}s&&sZ(e)}function sJ(e,t,s){let n=e.queries.get(t);if(n)for(let e of n.listeners)e.onError(s);e.queries.delete(t)}function sZ(e){e.Ru.forEach(e=>{e.next()})}class s0{constructor(e,t,s){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=s||{}}Pu(e){if(!this.options.includeMetadataChanges){let t=[];for(let s of e.docChanges)3!==s.type&&t.push(s);e=new s$(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),t=!0):this.Cu(e,this.onlineState)&&(this.xu(e),t=!0),this.Su=e,t}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){return!e.fromCache||(!this.options.Nu||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Du(e){if(e.docChanges.length>0)return!0;let t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}xu(e){e=s$.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s1{constructor(e){this.key=e}}class s2{constructor(e){this.key=e}}class s4{constructor(e,t){this.query=e,this.Uu=t,this.qu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=tI(),this.mutatedKeys=tI(),this.Gu=e4(e),this.Qu=new sz(this.Gu)}get ju(){return this.Uu}Wu(e,t){let s=t?t.zu:new sG,n=t?t.Qu:this.Qu,r=t?t.mutatedKeys:this.mutatedKeys,i=n,a=!1,o="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=e2(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(s.track({type:3,doc:h}),f=!0):this.Hu(u,h)||(s.track({type:2,doc:h}),f=!0,(o&&this.Gu(h,o)>0||l&&0>this.Gu(h,l))&&(a=!0)):!u&&h?(s.track({type:0,doc:h}),f=!0):u&&!h&&(s.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(i=i.add(h),r=d?r.add(e):r.delete(e)):(i=i.delete(e),r=r.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){let e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),r=r.delete(e.key),s.track({type:1,doc:e})}return{Qu:i,zu:s,$i:a,mutatedKeys:r}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s){let n=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;let r=e.zu.Eu();r.sort((e,t)=>(function(e,t){let s=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return v()}};return s(e)-s(t)})(e.type,t.type)||this.Gu(e.doc,t.doc)),this.Ju(s);let i=t?this.Yu():[],a=0===this.Ku.size&&this.current?1:0,o=a!==this.qu;return(this.qu=a,0!==r.length||o)?{snapshot:new s$(this.query,e.Qu,n,r,e.mutatedKeys,0===a,o,!1,!!s&&s.resumeToken.approximateByteSize()>0),Xu:i}:{Xu:i}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new sG,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.Uu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach(e=>this.Uu=this.Uu.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Uu=this.Uu.delete(e)),this.current=e.current)}Yu(){if(!this.current)return[];let e=this.Ku;this.Ku=tI(),this.Qu.forEach(e=>{this.Zu(e.key)&&(this.Ku=this.Ku.add(e.key))});let t=[];return e.forEach(e=>{this.Ku.has(e)||t.push(new s2(e))}),this.Ku.forEach(s=>{e.has(s)||t.push(new s1(s))}),t}tc(e){this.Uu=e.Hi,this.Ku=tI();let t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return s$.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,0===this.qu,this.hasCachedResults)}}class s3{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class s9{constructor(e){this.key=e,this.nc=!1}}class s5{constructor(e,t,s,n,r,i){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=n,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.sc={},this.ic=new ty(e=>e0(e),eZ),this.rc=new Map,this.oc=new Set,this.uc=new Y(q.comparator),this.cc=new Map,this.ac=new t5,this.hc={},this.lc=new Map,this.fc=t0.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return!0===this.dc}}async function s6(e,t){var s,n;let r,i;let a=(e.remoteStore.remoteSyncer.applyRemoteEvent=ne.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=nu.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ns.bind(null,e),e.sc.Wo=sX.bind(null,e.eventManager),e.sc.wc=sJ.bind(null,e.eventManager),e),o=a.ic.get(t);if(o)r=o.targetId,a.sharedClientState.addLocalQueryTarget(r),i=o.view.ec();else{let e=await (s=a.localStore,n=eX(t),s.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return s.Cs.getTargetData(e,n).next(r=>r?(t=r,G.resolve(t)):s.Cs.allocateTargetId(e).next(r=>(t=new tH(n,r,0,e.currentSequenceNumber),s.Cs.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=s.Ui.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(s.Ui=s.Ui.insert(e.targetId,e),s.qi.set(n,e.targetId)),e}));a.isPrimaryClient&&sN(a.remoteStore,e);let o=a.sharedClientState.addLocalQueryTarget(e.targetId);r=e.targetId,i=await s8(a,t,r,"current"===o,e.resumeToken)}return i}async function s8(e,t,s,n,r){e._c=(t,s,n)=>(async function(e,t,s,n){let r=t.view.Wu(s);r.$i&&(r=await sc(e.localStore,t.query,!1).then(({documents:e})=>t.view.Wu(e,r)));let i=n&&n.targetChanges.get(t.targetId),a=t.view.applyChanges(r,e.isPrimaryClient,i);return ni(e,t.targetId,a.Xu),a.snapshot})(e,t,s,n);let i=await sc(e.localStore,t,!0),a=new s4(t,i.Hi),o=a.Wu(i.documents),l=t_.createSynthesizedTargetChangeForCurrentChange(s,n&&"Offline"!==e.onlineState,r),u=a.applyChanges(o,e.isPrimaryClient,l);ni(e,s,u.Xu);let h=new s3(t,s,a);return e.ic.set(t,h),e.rc.has(s)?e.rc.get(s).push(t):e.rc.set(s,[t]),u.snapshot}async function s7(e,t){let s=e.ic.get(t),n=e.rc.get(s.targetId);if(n.length>1)return e.rc.set(s.targetId,n.filter(e=>!eZ(e,t))),void e.ic.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(s.targetId),e.sharedClientState.isActiveQueryTarget(s.targetId)||await sh(e.localStore,s.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(s.targetId),sD(e.remoteStore,s.targetId),nn(e,s.targetId)}).catch(z)):(nn(e,s.targetId),await sh(e.localStore,s.targetId,!0))}async function ne(e,t){try{let s=await function(e,t){let s=t.snapshotVersion,n=e.Ui;return e.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{var i;let a,o;let l=e.Gi.newChangeBuffer({trackRemovals:!0});n=e.Ui;let u=[];t.targetChanges.forEach((i,a)=>{var o;let l=n.get(a);if(!l)return;u.push(e.Cs.removeMatchingKeys(r,i.removedDocuments,a).next(()=>e.Cs.addMatchingKeys(r,i.addedDocuments,a)));let h=l.withSequenceNumber(r.currentSequenceNumber);t.targetMismatches.has(a)?h=h.withResumeToken(es.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):i.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(i.resumeToken,s)),n=n.insert(a,h),o=h,(0===l.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size>0)&&u.push(e.Cs.updateTargetData(r,h))});let h=tw,c=tI();if(t.documentUpdates.forEach(s=>{t.resolvedLimboDocuments.has(s)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(r,s))}),u.push((i=t.documentUpdates,a=tI(),o=tI(),i.forEach(e=>a=a.add(e)),l.getEntries(r,a).next(e=>{let t=tw;return i.forEach((s,n)=>{let r=e.get(s);n.isFoundDocument()!==r.isFoundDocument()&&(o=o.add(s)),n.isNoDocument()&&n.version.isEqual(M.min())?(l.removeEntry(s,n.readTime),t=t.insert(s,n)):!r.isValidDocument()||n.version.compareTo(r.version)>0||0===n.version.compareTo(r.version)&&r.hasPendingWrites?(l.addEntry(n),t=t.insert(s,n)):g("LocalStore","Ignoring outdated watch update for ",s,". Current version:",r.version," Watch version:",n.version)}),{Wi:t,zi:o}})).next(e=>{h=e.Wi,c=e.zi})),!s.isEqual(M.min())){let t=e.Cs.getLastRemoteSnapshotVersion(r).next(t=>e.Cs.setTargetsMetadata(r,r.currentSequenceNumber,s));u.push(t)}return G.waitFor(u).next(()=>l.apply(r)).next(()=>e.localDocuments.getLocalViewOfDocuments(r,h,c)).next(()=>h)}).then(t=>(e.Ui=n,t))}(e.localStore,t);t.targetChanges.forEach((t,s)=>{let n=e.cc.get(s);n&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||v(),t.addedDocuments.size>0?n.nc=!0:t.modifiedDocuments.size>0?n.nc||v():t.removedDocuments.size>0&&(n.nc||v(),n.nc=!1))}),await no(e,s,t)}catch(e){await z(e)}}function nt(e,t,s){var n;if(e.isPrimaryClient&&0===s||!e.isPrimaryClient&&1===s){let s;let r=[];e.ic.forEach((e,s)=>{let n=s.view.bu(t);n.snapshot&&r.push(n.snapshot)}),(n=e.eventManager).onlineState=t,s=!1,n.queries.forEach((e,n)=>{for(let e of n.listeners)e.bu(t)&&(s=!0)}),s&&sZ(n),r.length&&e.sc.Wo(r),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function ns(e,t,s){e.sharedClientState.updateQueryState(t,"rejected",s);let n=e.cc.get(t),r=n&&n.key;if(r){let s=new Y(q.comparator);s=s.insert(r,ek.newNoDocument(r,M.min()));let n=tI().add(r),i=new tA(M.min(),new Map,new Z(R),s,n);await ne(e,i),e.uc=e.uc.remove(r),e.cc.delete(t),na(e)}else await sh(e.localStore,t,!1).then(()=>nn(e,t,s)).catch(z)}function nn(e,t,s=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.rc.get(t)))e.ic.delete(n),s&&e.sc.wc(n,s);e.rc.delete(t),e.isPrimaryClient&&e.ac.ls(t).forEach(t=>{e.ac.containsKey(t)||nr(e,t)})}function nr(e,t){e.oc.delete(t.path.canonicalString());let s=e.uc.get(t);null!==s&&(sD(e.remoteStore,s),e.uc=e.uc.remove(t),e.cc.delete(s),na(e))}function ni(e,t,s){for(let n of s)n instanceof s1?(e.ac.addReference(n.key,t),function(e,t){let s=t.key,n=s.path.canonicalString();e.uc.get(s)||e.oc.has(n)||(g("SyncEngine","New document in limbo: "+s),e.oc.add(n),na(e))}(e,n)):n instanceof s2?(g("SyncEngine","Document no longer in limbo: "+n.key),e.ac.removeReference(n.key,t),e.ac.containsKey(n.key)||nr(e,n.key)):v()}function na(e){for(;e.oc.size>0&&e.uc.size<e.maxConcurrentLimboResolutions;){let t=e.oc.values().next().value;e.oc.delete(t);let s=new q(U.fromString(t)),n=e.fc.next();e.cc.set(n,new s9(s)),e.uc=e.uc.insert(s,n),sN(e.remoteStore,new tH(eX(new e$(s.path)),n,2,j.at))}}async function no(e,t,s){let n=[],r=[],i=[];e.ic.isEmpty()||(e.ic.forEach((a,o)=>{i.push(e._c(o,t,s).then(t=>{if((t||s)&&e.isPrimaryClient&&e.sharedClientState.updateQueryState(o.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){n.push(t);let e=si.Ci(o.targetId,t);r.push(e)}}))}),await Promise.all(i),e.sc.Wo(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",s=>G.forEach(t,t=>G.forEach(t.Si,n=>e.persistence.referenceDelegate.addReference(s,t.targetId,n)).next(()=>G.forEach(t.Di,n=>e.persistence.referenceDelegate.removeReference(s,t.targetId,n)))))}catch(e){if(!$(e))throw e;g("LocalStore","Failed to update sequence numbers: "+e)}for(let s of t){let t=s.targetId;if(!s.fromCache){let s=e.Ui.get(t),n=s.snapshotVersion,r=s.withLastLimboFreeSnapshotVersion(n);e.Ui=e.Ui.insert(t,r)}}}(e.localStore,r))}async function nl(e,t){var s;if(!e.currentUser.isEqual(t)){g("SyncEngine","User change. New user:",t.toKey());let n=await sl(e.localStore,t);e.currentUser=t,s="'waitForPendingWrites' promise is rejected due to a user change.",e.lc.forEach(e=>{e.forEach(e=>{e.reject(new T(E.CANCELLED,s))})}),e.lc.clear(),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await no(e,n.ji)}}function nu(e,t){let s=e.cc.get(t);if(s&&s.nc)return tI().add(s.key);{let s=tI(),n=e.rc.get(t);if(!n)return s;for(let t of n){let n=e.ic.get(t);s=s.unionWith(n.view.ju)}return s}}class nh{constructor(){this.synchronizeTabs=!1}async initialize(e){this.It=new tO(e.databaseInfo.databaseId,!0),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){var t;return t=this.persistence,new so(t,new sa,e.initialUser,this.It)}yc(e){return new ss(sr.Bs,this.It)}gc(e){return new sf}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class nc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>nt(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=nl.bind(null,this.syncEngine),await sq(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new sH}createDatastore(e){let t=new tO(e.databaseInfo.databaseId,!0),s=new sw(e.databaseInfo);return new sI(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){var t;return t=this.localStore,new sA(t,this.datastore,e.asyncQueue,e=>nt(this.syncEngine,e,0),sg.C()?new sg:new sm)}createSyncEngine(e,t){return function(e,t,s,n,r,i,a){let o=new s5(e,t,s,n,r,i);return a&&(o.dc=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){g("RemoteStore","RemoteStore shutting down."),e._u.add(5),await sk(e),e.mu.shutdown(),e.gu.set("Unknown")}(this.remoteStore)}}function nd(e){if(q.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function nf(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new T(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let s=function(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let s=(t=e).constructor?t.constructor.name:null;return s?`a custom ${s} object`:"an object"}}return"function"==typeof e?"a function":v()}(e);throw new T(E.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${s}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nm=new Map;class ng{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new T(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new T(E.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(e,t,s,n){if(!0===t&&!0===n)throw new T(E.INVALID_ARGUMENT,`${e} and ${s} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e,t,s,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ng({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new T(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new T(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ng(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new S;switch(e.type){case"gapi":return new N(e.client,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new T(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=nm.get(e);t&&(g("ComponentProvider","Removing Datastore"),nm.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nv(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ny(this.firestore,e,this._key)}}class nw{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new nw(this.firestore,e,this._query)}}class nv extends nw{constructor(e,t,s){super(e,t,new e$(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ny(this.firestore,null,new q(e))}withConverter(e){return new nv(this.firestore,e,this._path)}}function nE(e,t,...s){if(e=(0,l.m9)(e),/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,s){if(!s)throw new T(E.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}("collection","path",t),e instanceof np){let n=U.fromString(t,...s);return nd(n),new nv(e,null,n)}{if(!(e instanceof ny||e instanceof nv))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(U.fromString(t,...s));return nd(n),new nv(e.firestore,null,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):p("Uncaught Error in snapshot listener:",e)}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nC{constructor(e,t,s,n){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=n,this.user=c.UNAUTHENTICATED,this.clientId=L.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async e=>{g("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(s,e=>(g("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new C;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(s){let t=sQ(s,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function nI(e,t){e.asyncQueue.verifyOperationInProgress(),g("FirestoreClient","Initializing OfflineComponentProvider");let s=await e.getConfiguration();await t.initialize(s);let n=s.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await sl(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function nS(e,t){e.asyncQueue.verifyOperationInProgress();let s=await nA(e);g("FirestoreClient","Initializing OnlineComponentProvider");let n=await e.getConfiguration();await t.initialize(s,n),e.setCredentialChangeListener(e=>sP(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,s)=>sP(t.remoteStore,s)),e.onlineComponents=t}async function nA(e){return e.offlineComponents||(g("FirestoreClient","Using default OfflineComponentProvider"),await nI(e,new nh)),e.offlineComponents}async function n_(e){return e.onlineComponents||(g("FirestoreClient","Using default OnlineComponentProvider"),await nS(e,new nc)),e.onlineComponents}async function nk(e){let t=await n_(e),s=t.eventManager;return s.onListen=s6.bind(null,t.syncEngine),s.onUnlisten=s7.bind(null,t.syncEngine),s}class nN{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.Uc=!1,this.qc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new sE(this,"async_queue_retry"),this.Wc=()=>{let e=sv();e&&g("AsyncQueue","Visibility state changed to "+e.visibilityState),this.xo.Po()};let e=sv();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.Uc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.Uc){this.Uc=!0,this.Qc=e||!1;let t=sv();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.Uc)return new Promise(()=>{});let t=new C;return this.Hc(()=>this.Uc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Lc.push(e),this.Jc()))}async Jc(){if(0!==this.Lc.length){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!$(e))throw e;g("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro(()=>this.Jc())}}Hc(e){let t=this.Bc.then(()=>(this.Gc=!0,e().catch(e=>{let t;throw this.Kc=e,this.Gc=!1,p("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this.Gc=!1,e))));return this.Bc=t,t}enqueueAfterDelay(e,t,s){this.zc(),this.jc.indexOf(e)>-1&&(t=0);let n=sK.createAndSchedule(this,e,t,s,e=>this.Yc(e));return this.qc.push(n),n}zc(){this.Kc&&v()}verifyOperationInProgress(){}async Xc(){let e;do e=this.Bc,await e;while(e!==this.Bc)}Zc(e){for(let t of this.qc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then(()=>{for(let t of(this.qc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.qc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Xc()})}ea(e){this.jc.push(e)}Yc(e){let t=this.qc.indexOf(e);this.qc.splice(t,1)}}function nD(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let s of t)if(s in e&&"function"==typeof e[s])return!0;return!1}(e,["next","error","complete"])}class nb extends np{constructor(e,t,s,n){super(e,t,s,n),this.type="firestore",this._queue=new nN,this._persistenceKey=(null==n?void 0:n.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||nR(this),this._firestoreClient.terminate()}}function nL(e,t){let s="object"==typeof e?e:(0,i.Mq)(),n=(0,i.qX)(s,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!n._initialized){let e=(0,l.P0)("firestore");e&&function(e,t,s,n={}){var r;let i=(e=nf(e,np))._getSettings();if("firestore.googleapis.com"!==i.host&&i.host!==t&&y("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},i),{host:`${t}:${s}`,ssl:!1})),n.mockUserToken){let t,s;if("string"==typeof n.mockUserToken)t=n.mockUserToken,s=c.MOCK_USER;else{t=(0,l.Sg)(n.mockUserToken,null===(r=e._app)||void 0===r?void 0:r.options.projectId);let i=n.mockUserToken.sub||n.mockUserToken.user_id;if(!i)throw new T(E.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");s=new c(i)}e._authCredentials=new A(new I(t,s))}}(n,...e)}return n}function nR(e){var t,s;let n=e._freezeSettings(),r=(s=e._databaseId,new eu(s,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n.host,n.ssl,n.experimentalForceLongPolling,n.experimentalAutoDetectLongPolling,n.useFetchStreams));e._firestoreClient=new nC(e._authCredentials,e._appCheckCredentials,e._queue,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nx(es.fromBase64String(e))}catch(e){throw new T(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new nx(es.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new T(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new P(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nM{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new T(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new T(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return R(this._lat,e._lat)||R(this._long,e._long)}}let nO=RegExp("[~\\*/\\[\\]]");function nU(e,t,s,n,r){let i=n&&!n.isEmpty(),a=void 0!==r,o=`Function ${t}() called with invalid data`;s&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${r}`),l+=")"),new T(E.INVALID_ARGUMENT,o+e+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nF{constructor(e,t,s,n,r){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=n,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new ny(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new nP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(nq("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class nP extends nF{data(){return super.data()}}function nq(e,t){return"string"==typeof t?function(e,t,s){if(t.search(nO)>=0)throw nU(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,void 0);try{return new nV(...t.split("."))._internalPath}catch(s){throw nU(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,void 0)}}(e,t):t instanceof nV?t._internalPath:t._delegate._internalPath}class nB{}function nK(e,...t){for(let s of t)e=s._apply(e);return e}class nQ extends nB{constructor(e,t){super(),this.ma=e,this.pa=t,this.type="orderBy"}_apply(e){let t=function(e,t,s){if(null!==e.startAt)throw new T(E.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new T(E.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");let n=new eQ(t,s);return function(e,t){if(null===eH(e)){let s=eW(e);null!==s&&function(e,t,s){if(!s.isEqual(t))throw new T(E.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${s.toString()}' instead.`)}(0,s,t.field)}}(e,n),n}(e._query,this.ma,this.pa);return new nw(e.firestore,e.converter,function(e,t){let s=e.explicitOrderBy.concat([t]);return new e$(e.path,e.collectionGroup,s,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function nz(e,t="asc"){return new nQ(nq("orderBy",e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nG{convertValue(e,t="none"){switch(ef(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ei(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ea(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw v()}}convertObject(e,t){let s={};return W(e.fields,(e,n)=>{s[e]=this.convertValue(n,t)}),s}convertGeoPoint(e){return new nM(ei(e.latitude),ei(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let s=function e(t){let s=t.mapValue.fields.__previous_value__;return eo(s)?e(s):s}(e);return null==s?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(el(e));default:return null}}convertTimestamp(e){let t=er(e);return new V(t.seconds,t.nanos)}convertDocumentKey(e,t){let s=U.fromString(e);tG(s)||v();let n=new eh(s.get(1),s.get(3)),r=new q(s.popFirst(5));return n.isEqual(t)||p(`Document ${r} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n${constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class nj extends nF{constructor(e,t,s,n,r,i){super(e,t,s,n,i),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new nH(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let s=this._document.data.field(nq("DocumentSnapshot.get",e));if(null!==s)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}}class nH extends nj{data(e={}){return super.data(e)}}class nW{constructor(e,t,s,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new n$(n.hasPendingWrites,n.fromCache),this.query=s}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new nH(this._firestore,this._userDataWriter,s.key,s,new n$(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new T(E.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(s=>{let n=new nH(e._firestore,e._userDataWriter,s.doc.key,s.doc,new n$(e._snapshot.mutatedKeys.has(s.doc.key),e._snapshot.fromCache),e.query.converter);return s.doc,{type:"added",doc:n,oldIndex:-1,newIndex:t++}})}{let s=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new nH(e._firestore,e._userDataWriter,t.doc.key,t.doc,new n$(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),r=-1,i=-1;return 0!==t.type&&(r=s.indexOf(t.doc.key),s=s.delete(t.doc.key)),1!==t.type&&(i=(s=s.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return v()}}(t.type),doc:n,oldIndex:r,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}class nY extends nG{constructor(e){super(),this.firestore=e}convertBytes(e){return new nx(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new ny(this.firestore,null,t)}}function nX(e,...t){var s,n,r,i;let a,o,u;e=(0,l.m9)(e);let h={includeMetadataChanges:!1},c=0;"object"!=typeof t[0]||nD(t[c])||(h=t[c],c++);let d={includeMetadataChanges:h.includeMetadataChanges};if(nD(t[c])){let e=t[c];t[c]=null===(s=e.next)||void 0===s?void 0:s.bind(e),t[c+1]=null===(n=e.error)||void 0===n?void 0:n.bind(e),t[c+2]=null===(r=e.complete)||void 0===r?void 0:r.bind(e)}if(e instanceof ny)o=nf(e.firestore,nb),u=new e$(e._key.path),a={next:s=>{t[c]&&t[c](function(e,t,s){let n=s.docs.get(t._key),r=new nY(e);return new nj(e,r,t._key,n,new n$(s.hasPendingWrites,s.fromCache),t.converter)}(o,e,s))},error:t[c+1],complete:t[c+2]};else{let s=nf(e,nw);o=nf(s.firestore,nb),u=s._query;let n=new nY(o);a={next:e=>{t[c]&&t[c](new nW(o,n,s,e))},error:t[c+1],complete:t[c+2]},/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new T(E.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query)}return function(e,t,s,n){let r=new nT(n),i=new s0(t,r,s);return e.asyncQueue.enqueueAndForget(async()=>sW(await nk(e),i)),()=>{r.bc(),e.asyncQueue.enqueueAndForget(async()=>sY(await nk(e),i))}}(((i=o)._firestoreClient||nR(i),i._firestoreClient.verifyNotTerminated(),i._firestoreClient),u,d,a)}!function(e,t=!0){d=i.Jn,(0,i.Xd)(new a.wA("firestore",(e,{instanceIdentifier:s,options:n})=>{let r=e.getProvider("app").getImmediate(),i=new nb(new _(e.getProvider("auth-internal")),new b(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new T(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eh(e.options.projectId,t)}(r,s),r);return n=Object.assign({useFetchStreams:t},n),i._setSettings(n),i},"PUBLIC").setMultipleInstances(!0)),(0,i.KN)(h,"3.7.2",void 0),(0,i.KN)(h,"3.7.2","esm2017")}()}}]);