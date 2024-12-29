"use strict";const t=(t,e=!1)=>{if(e){if("string"==typeof t&&"."===t[0]){return{nodeId:"self",propIds:t.split(".").slice(1)}}return{value:t}}if("string"==typeof t){const e=/^:(.*)$/,s=t.match(e);if(!s)return{value:t};const i=s[1].split(".");return 1==i.length?{nodeId:i[0]}:{nodeId:i[0],propIds:i.slice(1)}}return{value:t}};function e(t,e,s=!1){if(!t){if(!s)throw new Error(e);console.warn("warn: "+e)}}const s=t=>null!==t&&"object"==typeof t,i=t=>null==t,n="Intentional Error for Debugging",r={name:"defaultAgentInfo",samples:[{inputs:[],params:{},result:{}}],description:"",category:[],author:"",repository:"",license:""},o=t=>{const e=[];return Object.keys(t).forEach((s=>{e.push([s]),Object.keys(t[s]).length>0&&o(t[s]).forEach((t=>{e.push([s,...t])}))})),e},a=(t,e)=>o({[t]:h(e)}).map((t=>":"+t.join("."))),h=t=>null==t||"string"==typeof t?{}:Array.isArray(t)?Array.from(t.keys()).reduce(((e,s)=>(e["$"+String(s)]=h(t[s]),e)),{}):Object.keys(t).reduce(((e,s)=>(e[s]=h(t[s]),e)),{}),u=t=>!!(Array.isArray(t)?0!==t.length:t),d=t=>s(t)&&!Array.isArray(t)&&Object.keys(t||{}).length>0,c=e=>{if(Array.isArray(e))return e.map((t=>c(t))).flat();if(s(e))return Object.values(e).map((t=>c(t))).flat();if("string"==typeof e){const t=[...e.matchAll(/\${(:[^}]+)}/g)].map((t=>t[1]));if(t.length>0)return c(t)}return t(e)},p=t=>t.filter((t=>t.nodeId)).map((t=>t.nodeId));var l;exports.NodeState=void 0,(l=exports.NodeState||(exports.NodeState={})).Waiting="waiting",l.Queued="queued",l.Executing="executing",l.ExecutingServer="executing-server",l.Failed="failed",l.TimedOut="timed-out",l.Completed="completed",l.Injected="injected",l.Skipped="skipped";class g{constructor(t){this.nodeId=t,this.state=exports.NodeState.Waiting}initForComputedNode(t,e){this.agentId=t.getAgentId(),this.params=t.params,e.appendLog(this)}onInjected(t,e,s){const i="endTime"in this;this.result=t.result,this.state=t.state,this.endTime=Date.now(),this.injectFrom=s,e.setLoopLog(this),i?e.updateLog(this):e.appendLog(this)}onComplete(t,e,s){this.result=t.result,this.resultKeys=a(this.agentId||"",t.result),this.state=t.state,this.endTime=Date.now(),e.setLoopLog(this),s.length>0&&(this.log=s),e.updateLog(this)}beforeExecute(t,e,s,i){this.state=t.state,this.retryCount=t.retryCount>0?t.retryCount:void 0,this.startTime=s,this.inputs=p(t.dataSources),this.inputsData=i.length>0?i:void 0,e.setLoopLog(this),e.appendLog(this)}beforeAddTask(t,e){this.state=t.state,e.setLoopLog(this),e.appendLog(this)}onError(t,e,s){this.state=t.state,this.errorMessage=s,this.endTime=Date.now(),e.setLoopLog(this),e.updateLog(this)}onSkipped(t,e){this.state=t.state,e.setLoopLog(this),e.updateLog(this)}}const f=/^[a-zA-Z]+\([^)]*\)$/,y=[(t,e)=>{if(Array.isArray(t)){if("length()"===e)return t.length;if("flat()"===e)return t.flat();if("toJSON()"===e)return JSON.stringify(t);if("isEmpty()"===e)return 0===t.length;const s=e.match(/^join\(([,-\s]?)\)$/);if(s&&Array.isArray(s))return t.join(s[1]??"")}},(t,e)=>{if(s(t)){if("keys()"===e)return Object.keys(t);if("values()"===e)return Object.values(t);if("toJSON()"===e)return JSON.stringify(t)}},(t,e)=>{if("string"==typeof t){if("codeBlock()"===e){const e=("\n"+t).match(/\n```[a-zA-z]*([\s\S]*?)\n```/);if(e)return e[1]}if("jsonParse()"===e)return JSON.parse(t);if("toNumber()"===e){const e=Number(t);if(!isNaN(e))return e}if("trim()"===e)return t.trim();if("toLowerCase()"===e)return t.toLowerCase();if("toUpperCase()"===e)return t.toUpperCase()}},(t,e)=>{if(void 0!==t&&Number.isFinite(t)){if("toString()"===e)return String(t);const s=/^add\((-?\d+)\)$/,i=e.match(s);if(i)return Number(t)+Number(i[1])}},(t,e)=>{if("boolean"==typeof t&&"not()"===e)return!t}],m=(t,e,n)=>{if(!i(t)&&e&&e.length>0){const r=((t,e,n)=>{if(e.match(f))for(const s of n){const n=s(t,e);if(!i(n))return n}if(Array.isArray(t)){const s=/^\$(\d+)$/,i=e.match(s);if(i)return t[parseInt(i[1],10)];if("$last"===e)return t[t.length-1]}else if(s(t)&&e in t)return t[e]})(t,e[0],n);return void 0===r&&console.error(`prop: ${e.join(".")} is not hit`),e.length>1?m(r,e.slice(1),n):r}return t},I=(t,e,s=[])=>e.nodeId?m(t,e.propIds,s):e.value,w=(e,s,i,n=!1)=>{if(Array.isArray(e))return e.map((t=>w(t,s,i,n)));if(d(e))return b(e,s,i,n);if("string"==typeof e){const t=[...e.matchAll(/\${(:[^}]+)}/g)].map((t=>t[1]));if(t.length>0){const r=w(t,s,i,n);return Array.from(t.keys()).reduce(((e,s)=>e.replaceAll("${"+t[s]+"}",r[s])),e)}}return N(t(e,n),s,i)},b=(t,e,s,i=!1)=>Object.keys(t).reduce(((n,r)=>{const o=t[r];return n[r]=d(o)?b(o,e,s,i):w(o,e,s,i),n}),{}),N=(t,e,s)=>{const{result:i}=t.nodeId?e[t.nodeId]:{result:void 0};return I(i,t,s)},v=t=>Array.isArray(t)?t.map((t=>v(t))).filter((t=>!i(t))):s(t)?Object.keys(t).reduce(((e,s)=>{const n=v(t[s]);return i(n)||(e[s]=n),e}),{}):t;class k{constructor(t,e){this.waitlist=new Set,this.state=exports.NodeState.Waiting,this.result=void 0,this.nodeId=t,this.graph=e,this.log=new g(t),this.console={}}asString(){return`${this.nodeId}: ${this.state} ${[...this.waitlist]}`}onSetResult(){this.waitlist.forEach((t=>{const e=this.graph.nodes[t];e.isComputedNode&&(e.removePending(this.nodeId),this.graph.pushQueueIfReadyAndRunning(e))}))}afterConsoleLog(t){!1!==this.console&&(!0===this.console||!0===this.console.after?console.log("string"==typeof t?t:JSON.stringify(t,null,2)):this.console.after&&(s(this.console.after)?console.log(JSON.stringify(b(this.console.after,{self:{result:t}},this.graph.propFunctions,!0),null,2)):console.log(this.console.after)))}}class S extends k{constructor(s,i,n,r){if(super(i,r),this.retryCount=0,this.dataSources=[],this.isSkip=!1,this.isStaticNode=!1,this.isComputedNode=!0,this.graphId=s,this.params=n.params??{},this.console=n.console??{},this.filterParams=n.filterParams??{},this.passThrough=n.passThrough,this.retryLimit=n.retry??r.retryLimit??0,this.timeout=n.timeout,this.isResult=n.isResult??!1,this.priority=n.priority??0,e(["function","string"].includes(typeof n.agent),"agent must be either string or function"),"string"==typeof n.agent)this.agentId=n.agent;else{const t=n.agent;this.agentFunction=async({namedInputs:e,params:s})=>t(e,s)}if(this.config=this.agentId?n.graph?this.graph.config:(this.graph.config??{})[this.agentId]??{}:{},this.anyInput=n.anyInput??!1,this.inputs=n.inputs,this.output=n.output,this.dataSources=[...n.inputs?c(n.inputs).flat(10):[],...n.params?c(n.params).flat(10):[],...this.agentId?[t(this.agentId)]:[]],n.inputs&&Array.isArray(n.inputs))throw new Error(`array inputs have been deprecated. nodeId: ${i}: see https://github.com/receptron/graphai/blob/main/docs/NamedInputs.md`);this.pendings=new Set(p(this.dataSources)),n.graph&&(this.nestedGraph="string"==typeof n.graph?this.addPendingNode(n.graph):n.graph),n.graphLoader&&r.graphLoader&&(this.nestedGraph=r.graphLoader(n.graphLoader)),n.if&&(this.ifSource=this.addPendingNode(n.if)),n.unless&&(this.unlessSource=this.addPendingNode(n.unless)),n.defaultValue&&(this.defaultValue=n.defaultValue),this.isSkip=!1,this.log.initForComputedNode(this,r)}getAgentId(){return this.agentId??"__custom__function"}addPendingNode(s){const i=t(s);return e(!!i.nodeId,`Invalid data source ${s}`),this.pendings.add(i.nodeId),i}isReadyNode(){return this.state===exports.NodeState.Waiting&&0===this.pendings.size&&(this.isSkip=!!(this.ifSource&&!u(this.graph.resultOf(this.ifSource))||this.unlessSource&&u(this.graph.resultOf(this.unlessSource))),!this.isSkip||void 0!==this.defaultValue||(this.state=exports.NodeState.Skipped,this.log.onSkipped(this,this.graph),!1))}retry(t,e){this.state=t,this.log.onError(this,this.graph,e.message),this.retryCount<this.retryLimit?(this.retryCount++,this.execute()):(this.result=void 0,this.error=e,this.transactionId=void 0,this.graph.onExecutionComplete(this))}checkDataAvailability(){return Object.values(this.graph.resultsOf(this.inputs)).flat().some((t=>void 0!==t))}beforeAddTask(){this.state=exports.NodeState.Queued,this.log.beforeAddTask(this,this.graph)}removePending(t){this.anyInput?this.checkDataAvailability()&&this.pendings.clear():this.pendings.delete(t)}isCurrentTransaction(t){return this.transactionId===t}executeTimeout(t){this.state===exports.NodeState.Executing&&this.isCurrentTransaction(t)&&(console.warn(`-- timeout ${this.timeout} with ${this.nodeId}`),this.retry(exports.NodeState.TimedOut,Error("Timeout")))}shouldApplyAgentFilter(t,e){return!!(t.agentIds&&Array.isArray(t.agentIds)&&t.agentIds.length>0&&e&&t.agentIds.includes(e))||(!!(t.nodeIds&&Array.isArray(t.nodeIds)&&t.nodeIds.length>0&&t.nodeIds.includes(this.nodeId))||!t.agentIds&&!t.nodeIds)}agentFilterHandler(t,e,s){let i=0;const n=t=>{const r=this.graph.agentFilters[i++];return r?this.shouldApplyAgentFilter(r,s)?(r.filterParams&&(t.filterParams={...r.filterParams,...t.filterParams}),r.agent(t,n)):n(t):e(t)};return n(t)}async execute(){if(this.isSkip)return void this.afterExecute(this.defaultValue,[]);const e=this.graph.resultsOf(this.inputs,this.anyInput),s=this.agentId?this.graph.resultOf(t(this.agentId)):this.agentId,i=Date.now();this.prepareExecute(i,Object.values(e)),this.timeout&&this.timeout>0&&setTimeout((()=>{this.executeTimeout(i)}),this.timeout);try{const t=this.agentFunction??this.graph.getAgentFunctionInfo(s).agent,n=[],r=this.getContext(e,n,s);this.nestedGraph&&(this.graph.taskManager.prepareForNesting(),r.forNestedGraph={graphData:"nodes"in this.nestedGraph?this.nestedGraph:this.graph.resultOf(this.nestedGraph),agents:this.graph.agentFunctionInfoDictionary,graphOptions:{agentFilters:this.graph.agentFilters,taskManager:this.graph.taskManager,bypassAgentIds:this.graph.bypassAgentIds,config:this.config,graphLoader:this.graph.graphLoader},onLogCallback:this.graph.onLogCallback}),this.beforeConsoleLog(r);const o=await this.agentFilterHandler(r,t,s);if(this.afterConsoleLog(o),this.nestedGraph&&this.graph.taskManager.restoreAfterNesting(),!this.isCurrentTransaction(i))return void console.log(`-- transactionId mismatch with ${this.nodeId} (probably timeout)`);this.afterExecute(o,n)}catch(t){this.errorProcess(t,i,e)}}afterExecute(t,e){this.state=exports.NodeState.Completed,this.result=this.getResult(t),this.output&&(this.result=b(this.output,{self:this},this.graph.propFunctions,!0)),this.log.onComplete(this,this.graph,e),this.onSetResult(),this.graph.onExecutionComplete(this)}prepareExecute(t,e){this.state=exports.NodeState.Executing,this.log.beforeExecute(this,this.graph,t,e),this.transactionId=t}errorProcess(t,e,s){t instanceof Error&&t.message!==n&&(console.error(`<-- NodeId: ${this.nodeId}, Agent: ${this.agentId}`),console.error({namedInputs:s}),console.error(t),console.error("--\x3e")),this.isCurrentTransaction(e)?t instanceof Error?this.retry(exports.NodeState.Failed,t):(console.error(`-- NodeId: ${this.nodeId}: Unknown error was caught`),this.retry(exports.NodeState.Failed,Error("Unknown"))):console.warn(`-- transactionId mismatch with ${this.nodeId} (not timeout)`)}getContext(t,e,s){return{params:this.graph.resultsOf(this.params),namedInputs:t,inputSchema:this.agentFunction?void 0:this.graph.getAgentFunctionInfo(s)?.inputs,debugInfo:this.getDebugInfo(s),cacheType:this.agentFunction?void 0:this.graph.getAgentFunctionInfo(s)?.cacheType,filterParams:this.filterParams,agentFilters:this.graph.agentFilters,config:this.config,log:e}}getResult(t){if(t&&this.passThrough){if(s(t)&&!Array.isArray(t))return{...t,...this.passThrough};if(Array.isArray(t))return t.map((t=>s(t)&&!Array.isArray(t)?{...t,...this.passThrough}:t))}return t}getDebugInfo(t){return{nodeId:this.nodeId,agentId:t,retry:this.retryCount,verbose:this.graph.verbose,version:this.graph.version,isResult:this.isResult}}beforeConsoleLog(t){!1!==this.console&&(!0===this.console||!0===this.console.before?console.log(JSON.stringify(t.namedInputs,null,2)):this.console.before&&console.log(this.console.before))}}class A extends k{constructor(e,s,i){super(e,i),this.isStaticNode=!0,this.isComputedNode=!1,this.value=s.value,this.update=s.update?t(s.update):void 0,this.isResult=s.isResult??!1,this.console=s.console??{}}injectValue(t,e){this.state=exports.NodeState.Injected,this.result=t,this.log.onInjected(this,this.graph,e),this.onSetResult()}consoleLog(){this.afterConsoleLog(this.result)}}const L=["nodes","concurrency","agentId","loop","verbose","version"],C=["inputs","output","anyInput","params","retry","timeout","agent","graph","graphLoader","isResult","priority","if","unless","defaultValue","filterParams","console","passThrough"],j=["value","update","isResult","console"];class x extends Error{constructor(t){super(`[41m${t}[0m`),Object.setPrototypeOf(this,x.prototype)}}const O=(e,s)=>{(t=>{if(void 0===t.nodes)throw new x("Invalid Graph Data: no nodes");if("object"!=typeof t.nodes)throw new x("Invalid Graph Data: invalid nodes");if(Array.isArray(t.nodes))throw new x("Invalid Graph Data: nodes must be object");if(0===Object.keys(t.nodes).length)throw new x("Invalid Graph Data: nodes is empty");Object.keys(t).forEach((t=>{if(!L.includes(t))throw new x("Graph Data does not allow "+t)}))})(e),(t=>{if(t.loop){if(void 0===t.loop.count&&void 0===t.loop.while)throw new x("Loop: Either count or while is required in loop");if(void 0!==t.loop.count&&void 0!==t.loop.while)throw new x("Loop: Both count and while cannot be set")}if(void 0!==t.concurrency){if(!Number.isInteger(t.concurrency))throw new x("Concurrency must be an integer");if(t.concurrency<1)throw new x("Concurrency must be a positive integer")}})(e);const i=[],n=[],r=new Set;return Object.keys(e.nodes).forEach((t=>{const s=e.nodes[t],o=!("agent"in s);(t=>{if(t.agent&&t.value)throw new x("Cannot set both agent and value")})(s);const a=o?"":s.agent;var h;o&&(h=s,Object.keys(h).forEach((t=>{if(!j.includes(t))throw new x("Static node does not allow "+t)})),1)&&n.push(t),!o&&(t=>(Object.keys(t).forEach((t=>{if(!C.includes(t))throw new x("Computed node does not allow "+t)})),!0))(s)&&i.push(t)&&"string"==typeof a&&r.add(a)})),((t,e)=>{t.forEach((t=>{if(!e.has(t)&&":"!==t[0])throw new x("Invalid Agent : "+t+" is not in AgentFunctionInfoDictionary.")}))})(r,new Set(s)),((e,s,i)=>{const n=new Set(Object.keys(e.nodes)),r={},o={};i.forEach((t=>{const s=e.nodes[t];r[t]=new Set;const i=(e,s)=>{s.forEach((s=>{if(s){if(!n.has(s))throw new x(`${e} not match: NodeId ${t}, Inputs: ${s}`);void 0===o[s]&&(o[s]=new Set),r[t].add(s),o[s].add(t)}}))};"agent"in s&&s&&(s.inputs&&i("Inputs",p(c(s.inputs))),s.params&&i("Params",p(c(s.params))),s.if&&i("If",p(c({if:s.if}))),s.unless&&i("Unless",p(c({unless:s.unless}))),s.graph&&"string"==typeof s?.graph&&i("Graph",p(c({graph:s.graph}))),"string"==typeof s.agent&&":"===s.agent[0]&&i("Agent",p(c({agent:s.agent}))))})),s.forEach((s=>{const i=e.nodes[s];if("value"in i&&i.update){const e=i.update,r=t(e).nodeId;if(!r)throw new x("Update it a literal");if(!n.has(r))throw new x(`Update not match: NodeId ${s}, update: ${e}`)}}));const a=t=>{t.forEach((t=>{(o[t]||[]).forEach((e=>{r[e].delete(t)}))}));const e=[];return Object.keys(r).forEach((t=>{0===r[t].size&&(e.push(t),delete r[t])})),e};let h=a(s);if(0===h.length)throw new x("No Initial Runnning Node");do{h=a(h)}while(h.length>0);if(Object.keys(r).length>0)throw new x("Some nodes are not executed: "+Object.keys(r).join(", "))})(e,n,i),!0};class E{constructor(t){this.taskQueue=[],this.runningNodes=new Set,this.concurrency=t}dequeueTaskIfPossible(){if(this.runningNodes.size<this.concurrency){const t=this.taskQueue.shift();t&&(this.runningNodes.add(t.node),t.callback(t.node))}}addTask(t,s,i){const n=this.taskQueue.filter((e=>e.node.priority>=t.priority)).length;e(n<=this.taskQueue.length,"TaskManager.addTask: Something is really wrong."),this.taskQueue.splice(n,0,{node:t,graphId:s,callback:i}),this.dequeueTaskIfPossible()}isRunning(t){return[...this.runningNodes].filter((e=>e.graphId==t)).length>0||Array.from(this.taskQueue).filter((e=>e.graphId===t)).length>0}onComplete(t){e(this.runningNodes.has(t),`TaskManager.onComplete node(${t.nodeId}) is not in list`),this.runningNodes.delete(t),this.dequeueTaskIfPossible()}prepareForNesting(){this.concurrency++}restoreAfterNesting(){this.concurrency--}getStatus(t=!1){const e=Array.from(this.runningNodes).map((t=>t.nodeId)),s=this.taskQueue.map((t=>t.node.nodeId)),i=t?{runningNodes:e,queuedNodes:s}:{};return{concurrency:this.concurrency,queue:this.taskQueue.length,running:this.runningNodes.size,...i}}}const F=.5;exports.GraphAI=class{createNodes(t){const e=Object.keys(t.nodes).reduce(((e,s)=>{const i=t.nodes[s];return e[s]="agent"in i?new S(this.graphId,s,i,this):new A(s,i,this),e}),{});return Object.keys(e).forEach((t=>{const s=e[t];s.isComputedNode&&s.pendings.forEach((s=>{if(!e[s])throw new Error(`createNode: invalid input ${s} for node, ${t}`);e[s].waitlist.add(t)}))})),e}getValueFromResults(t,e){return I(t.nodeId?e[t.nodeId]:void 0,t,this.propFunctions)}initializeStaticNodes(t=!1){Object.keys(this.graphData.nodes).forEach((e=>{const s=this.nodes[e];if(s?.isStaticNode){const i=s?.value;void 0!==i&&this.injectValue(e,i,e),t&&s.consoleLog()}}))}updateStaticNodes(t,e=!1){Object.keys(this.graphData.nodes).forEach((s=>{const i=this.nodes[s];if(i?.isStaticNode){const n=i?.update;if(n&&t){const e=this.getValueFromResults(n,t);this.injectValue(s,e,n.nodeId)}e&&i.consoleLog()}}))}constructor(t,e,s={taskManager:void 0,agentFilters:[],bypassAgentIds:[],config:{},graphLoader:void 0}){this.logs=[],this.config={},this.onLogCallback=(t,e)=>{},this.repeatCount=0,t.version||s.taskManager||console.warn("------------ missing version number"),this.version=t.version??F,this.version<F&&console.warn("------------ upgrade to 0.5!"),this.retryLimit=t.retry,this.graphId=URL.createObjectURL(new Blob).slice(-36),this.graphData=t,this.agentFunctionInfoDictionary=e,this.propFunctions=y,this.taskManager=s.taskManager??new E(t.concurrency??8),this.agentFilters=s.agentFilters??[],this.bypassAgentIds=s.bypassAgentIds??[],this.config=s.config,this.graphLoader=s.graphLoader,this.loop=t.loop,this.verbose=!0===t.verbose,this.onComplete=()=>{throw new Error("SOMETHING IS WRONG: onComplete is called without run()")},O(t,[...Object.keys(e),...this.bypassAgentIds]),(t=>{Object.keys(t).forEach((e=>{if("default"!==e){const s=t[e];if(!s||!s.agent)throw new x("No Agent: "+e+" is not in AgentFunctionInfoDictionary.")}}))})(e),this.nodes=this.createNodes(t),this.initializeStaticNodes(!0)}getAgentFunctionInfo(t){if(t&&this.agentFunctionInfoDictionary[t])return this.agentFunctionInfoDictionary[t];if(t&&this.bypassAgentIds.includes(t))return{agent:async()=>null,inputs:null,cacheType:void 0};throw new Error("No agent: "+t)}asString(){return Object.values(this.nodes).map((t=>t.asString())).join("\n")}results(t){return Object.keys(this.nodes).filter((e=>t||this.nodes[e].isResult)).reduce(((t,e)=>{const s=this.nodes[e];return void 0!==s.result&&(t[e]=s.result),t}),{})}errors(){return Object.keys(this.nodes).reduce(((t,e)=>{const s=this.nodes[e];return s.isComputedNode&&void 0!==s.error&&(t[e]=s.error),t}),{})}pushReadyNodesIntoQueue(){Object.keys(this.nodes).forEach((t=>{const e=this.nodes[t];e.isComputedNode&&this.pushQueueIfReady(e)}))}pushQueueIfReady(t){t.isReadyNode()&&this.pushQueue(t)}pushQueueIfReadyAndRunning(t){this.isRunning()&&this.pushQueueIfReady(t)}pushQueue(t){t.beforeAddTask(),this.taskManager.addTask(t,this.graphId,(s=>{e(t.nodeId===s.nodeId,"GraphAI.pushQueue node mismatch"),t.execute()}))}async run(t=!1){if(Object.values(this.nodes).filter((t=>t.isStaticNode)).some((t=>void 0===t.result&&void 0===t.update)))throw new Error("Static node must have value. Set value or injectValue or set update");if(this.isRunning())throw new Error("This GraphAI instance is already running");return this.pushReadyNodesIntoQueue(),this.isRunning()?new Promise(((e,s)=>{this.onComplete=()=>{const i=this.errors(),n=Object.keys(i);n.length>0?s(i[n[0]]):e(this.results(t))}})):(console.warn("-- nothing to execute"),{})}isRunning(){return this.taskManager.isRunning(this.graphId)}onExecutionComplete(t){this.taskManager.onComplete(t),this.isRunning()||this.processLoopIfNecessary()||this.onComplete()}processLoopIfNecessary(){this.repeatCount++;const e=this.loop;if(!e)return!1;const s=this.results(!0);if(this.updateStaticNodes(s),void 0===e.count||this.repeatCount<e.count){if(e.while){const s=t(e.while),i=this.getValueFromResults(s,this.results(!0));if(!u(i))return!1}return this.initializeGraphAI(),this.updateStaticNodes(s,!0),this.pushReadyNodesIntoQueue(),!0}return!1}initializeGraphAI(){if(this.isRunning())throw new Error("This GraphAI instance is running");this.nodes=this.createNodes(this.graphData),this.initializeStaticNodes()}setPreviousResults(t){this.updateStaticNodes(t)}setLoopLog(t){t.isLoop=!!this.loop,t.repeatCount=this.repeatCount}appendLog(t){this.logs.push(t),this.onLogCallback(t,!1)}updateLog(t){this.onLogCallback(t,!0)}transactionLogs(){return this.logs}injectValue(t,e,s){const i=this.nodes[t];if(!i||!i.isStaticNode)throw new Error(`injectValue with Invalid nodeId, ${t}`);i.injectValue(e,s)}resultsOf(t,e=!1){const s=b(t??[],this.nodes,this.propFunctions);return e?(t=>Object.keys(t).reduce(((e,s)=>{const n=v(t[s]);return i(n)||(e[s]=n),e}),{}))(s):s}resultOf(t){return N(t,this.nodes,this.propFunctions)}},exports.ValidationError=x,exports.agentInfoWrapper=t=>({agent:t,mock:t,...r}),exports.assert=e,exports.debugResultKey=a,exports.defaultAgentInfo=r,exports.defaultConcurrency=8,exports.defaultTestContext={debugInfo:{nodeId:"test",retry:0,verbose:!0},params:{},filterParams:{},agents:{},log:[]},exports.graphDataLatestVersion=F,exports.inputs2dataSources=c,exports.isObject=s,exports.parseNodeName=t,exports.sleep=async t=>await new Promise((e=>setTimeout(e,t))),exports.strIntentionalError=n;
//# sourceMappingURL=bundle.cjs.js.map
