(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{256:function(e,t,n){e.exports=n(555)},550:function(e,t,n){},555:function(e,t,n){"use strict";n.r(t);var a=n(4),s=n(5),i=n(7),o=n(6),l=n(8),r=n(23),c=n(1),u=n.n(c),h=n(26),d=n.n(h),m=n(20),p=n.n(m),f=function(e,t){return p.a.post("/api/directory/".concat(e),t)},b=function(){function e(){Object(a.a)(this,e)}return Object(s.a)(e,null,[{key:"accountData",value:function(){return p.a.get("/api/account/my")}},{key:"myDocuments",value:function(e,t){return f(t?"my/".concat(t):"my",e)}},{key:"sharedWithMe",value:function(e){return f("my/shared",e)}},{key:"createFolder",value:function(e,t){return p.a.post("/api/folder",{title:e,parent:t})}},{key:"renameFolder",value:function(e,t){return p.a.put("/api/folder/".concat(e,"?title=").concat(t))}},{key:"deleteFolder",value:function(e){return p.a.delete("/api/folder/".concat(e))}},{key:"bulkDeleteFolders",value:function(e){return p.a.delete("/api/folder/bulk",{data:e})}},{key:"deleteDocument",value:function(e){return p.a.delete("/api/document/".concat(e))}},{key:"bulkDeleteDocuments",value:function(e){return p.a.delete("/api/document/bulk",{data:e})}},{key:"unshareDocument",value:function(e){return p.a.delete("/api/shared/document/".concat(e))}},{key:"bulkUnshareDocuments",value:function(e){return p.a.delete("/api/shared/document/bulk",{data:e})}},{key:"updateReadme",value:function(e,t){return t?p.a.post("/api/folder/".concat(t,"/readme"),{data:e}):p.a.post("/api/directory/my/readme",{data:e})}},{key:"deleteReadme",value:function(e){return e?p.a.delete("/api/folder/".concat(e,"/readme")):p.a.delete("/api/directory/my/readme")}}]),e}(),v=n(128),E=n(127),y=n(44),g=n(27),k=n(41),O=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return u.a.createElement("div",{className:"meter",style:{position:"relative"}},u.a.createElement("div",{className:"bar",style:{width:"".concat(100*this.props.value,"%"),height:"100%"}}))}}]),t}(c.Component),w=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state=n._emptyState(e),n.start(),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"_emptyState",value:function(e){return{files:e.files,remoteSource:e.url,phase:"Uploading",totalSize:e.files.reduce(function(e,t){return e+t.size},0),filepartIds:e.files.length>0?e.files.map(function(){return null}):[null],uploadId:null,uploadStatus:e.files.length>0?e.files.map(function(){return"UPLOADING"}):["UPLOADING"],progress:e.files.length>0?e.files.map(function(){return 0}):[0],errors:[]}}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.props.files===e.files&&this.props.url===e.url||this.setState(this._emptyState(e),function(){return t.start()})}},{key:"start",value:function(){var e=this;this.initNewDocument().then(function(t){return e.setState({uploadId:t.data.id}),e.state.files.length>0?e.uploadFiles():e.state.remoteSource?e.registerURL():void 0}).catch(function(t){e.setState(function(e){var n=e.errors.slice(0);return n.push(t.response.data),{errors:n}})}).then(this.finalizeDocument.bind(this))}},{key:"initNewDocument",value:function(){var e=1===this.state.files.length?this.state.files[0].name:"New document",t=new FormData;return t.append("title",e),p.a.post("/my/upload",t,{headers:{"X-Requested-With":"XMLHttpRequest"}})}},{key:"registerURL",value:function(){this.setState({phase:"Importing"});var e=new FormData;return e.append("url",this.state.remoteSource),p.a.post("/my/upload/".concat(this.state.uploadId,"/file"),e,{headers:{"X-Requested-With":"XMLHttpRequest"}})}},{key:"uploadFiles",value:function(){var e=this,t=this.state.files.map(function(t,n){return function(t,n){var a=new FormData;a.append("file",t);return p.a.post("/my/upload/".concat(e.state.uploadId,"/file"),a,{headers:{"X-Requested-With":"XMLHttpRequest"},onUploadProgress:function(t){var a=e.state.progress.slice(0);a[n]=t.loaded,e.setState({progress:a})}}).then(function(t){return e.setState(function(e){var a=e.filepartIds.slice(0);return a[n]=t.data.uuid,{filepartIds:a}}),t}).catch(function(t){e.setState(function(e){var a=e.uploadStatus.slice(0);a[n]="FAILED";var s=e.errors.slice(0);return s.push(t.response.data),{uploadStatus:a,errors:s}})})}(t,n)});return Promise.all(t)}},{key:"finalizeDocument",value:function(){var e=this,t=document.location.hash.substring(1),n=t?"/my/upload/".concat(this.state.uploadId,"/finalize?folder=").concat(t):"/my/upload/".concat(this.state.uploadId,"/finalize");return p.a.post(n,{headers:{"X-Requested-With":"XMLHttpRequest"}}).then(function(t){var n=t.data.running_tasks;n.length>0?(e.setState({phase:"Importing..."}),e.pollTaskProgress(t.data.document_id,n)):e.props.onUploadComplete()}).catch(function(e){})}},{key:"updateStatusForFile",value:function(e,t){var n=this,a=t.subtasks.find(function(t){return t.filepart_id===e}),s=this.state.filepartIds.indexOf(e),i=function(e){n.setState(function(t){var n=t.uploadStatus.slice(0);return n[s]=e,{uploadStatus:n}})};i(a?a.status:"COMPLETED")}},{key:"pollTaskProgress",value:function(e,t){var n=this;p.a.get("/api/task?id=".concat(e)).then(function(a){n.state.filepartIds.map(function(e){return n.updateStatusForFile(e,a.data)}),"COMPLETED"===a.data.status||"FAILED"===a.data.status?n.props.onUploadComplete():setTimeout(function(){return n.pollTaskProgress(e,t)},1e3)})}},{key:"isUploadComplete",value:function(){return this.state.uploadStatus.reduce(function(e,t){return e&&("COMPLETED"===t||"FAILED"===t)})}},{key:"onCancel",value:function(e){this.isUploadComplete()&&this.props.onUploadComplete()}},{key:"render",value:function(){var e=this,t=this.state.progress.reduce(function(e,t){return e+t},0);return u.a.createElement("div",{className:"upload-progress"},u.a.createElement("div",{className:"phase"},this.state.phase,u.a.createElement("button",{className:"close nostyle",onClick:this.onCancel.bind(this)},"\ue897")),u.a.createElement("ul",{className:"files".concat(this.state.errors.length>0?" has-errors":"")},this.state.files.map(function(t,n){return u.a.createElement("li",{key:n},t.name,u.a.createElement("span",{className:"icon spinner ".concat(e.state.uploadStatus[n])}))}),this.state.remoteSource&&u.a.createElement("li",null,"Fetching content from remote source...",u.a.createElement("span",{className:"icon spinner RUNNING"}))),this.state.errors.length>0&&u.a.createElement("ul",{className:"errors"},this.state.errors.map(function(e,t){return u.a.createElement("li",{key:t},e)})),u.a.createElement("div",{className:"progress"},u.a.createElement(O,{value:t/this.state.totalSize})))}}]),t}(c.Component),S=n(71),C=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).onMousedown=n.onMousedown.bind(Object(r.a)(Object(r.a)(n))),n.onKeydown=n.onKeydown.bind(Object(r.a)(Object(r.a)(n))),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.onMousedown,!1),document.addEventListener("keydown",this.onKeydown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.onMousedown,!1),document.removeEventListener("keydown",this.onKeydown,!1)}},{key:"onMousedown",value:function(e){var t=!this._node.contains(e.target),n=e.target.classList.contains("advanced");t&&!n&&this.props.onClose()}},{key:"onKeydown",value:function(e){27===e.which&&this.props.onClose()}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{ref:function(t){return e._node=t},className:"advanced-search"},u.a.createElement("button",{className:"close nostyle",onClick:this.props.onClose},"\ue897"),u.a.createElement("form",null,u.a.createElement("fieldset",null,u.a.createElement("p",null,u.a.createElement("label",null,"Search in"),u.a.createElement("select",null,u.a.createElement("option",null,"All of Recogito"),u.a.createElement("option",null,"My documents"),u.a.createElement("option",null,"Shared with me")),u.a.createElement("span",{className:"hint"})),u.a.createElement("p",null,u.a.createElement("label",null,"Document type"),u.a.createElement("select",null,u.a.createElement("option",null,"Any"),u.a.createElement("option",null,"Text"),u.a.createElement("option",null,"Image"),u.a.createElement("option",null,"Table")),u.a.createElement("span",{className:"hint"})),u.a.createElement("p",null,u.a.createElement("label",null,"Owner"),u.a.createElement("select",null,u.a.createElement("option",null,"Anyone"),u.a.createElement("option",null,"me"),u.a.createElement("option",null,"specific user")),u.a.createElement("span",{className:"hint"})),u.a.createElement("p",null,u.a.createElement("label",null,"Metadata contains"),u.a.createElement("input",{type:"text"}),u.a.createElement("span",{className:"hint"})),u.a.createElement("p",null,u.a.createElement("label",null,"Last modified"),u.a.createElement("select",null,u.a.createElement("option",null,"Any time"),u.a.createElement("option",null,"this week")),u.a.createElement("span",{className:"hint"}))),u.a.createElement("fieldset",{className:"buttons"},u.a.createElement("button",{className:"nostyle clear"},"Clear"),u.a.createElement("button",{type:"submit",className:"btn"},"Search"))))}}]),t}(c.Component),N=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={advancedSearchOpen:!1},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"toggleAdvancedSearch",value:function(){this.setState(function(e){return{advancedSearchOpen:!e.advancedSearchOpen}})}},{key:"render",value:function(){return u.a.createElement("div",{className:"wrapper"},u.a.createElement("div",{className:"search"},u.a.createElement("div",{className:"wrapper"},u.a.createElement("input",{placeholder:"Search Recogito..."})),u.a.createElement("span",{className:"icon hand-lens"},"\uf002")),this.state.advancedSearchOpen&&u.a.createElement(C,{onClose:this.toggleAdvancedSearch.bind(this)}))}}]),t}(c.Component),j=n(86),D=n(118),_=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).onMousedown=n.onMousedown.bind(Object(r.a)(Object(r.a)(n))),n.onKeydown=n.onKeydown.bind(Object(r.a)(Object(r.a)(n))),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.onMousedown,!1),document.addEventListener("keydown",this.onKeydown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.onMousedown,!1),document.removeEventListener("keydown",this.onKeydown,!1)}},{key:"onMousedown",value:function(e){!this._node.contains(e.target)&&this.props.onCancel()}},{key:"onKeydown",value:function(e){27===e.which&&this.props.onCancel()}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{ref:function(t){return e._node=t},className:"modal-menu ".concat(this.props.className)},u.a.createElement("ul",null,this.props.menu.map(function(t){return u.a.createElement("li",{key:t.group,className:"group ".concat(t.group)},u.a.createElement("ul",null,t.options.map(function(t){return u.a.createElement("li",{key:t.value||t.link,className:"option".concat(t.disabled?" disabled":""),onClick:t.disabled||!t.value?null:e.props.onSelect.bind(e,t.value)},t.link?u.a.createElement("a",{href:t.link},u.a.createElement("span",{className:"icon"},t.icon)," ",t.label):u.a.createElement(u.a.Fragment,null,u.a.createElement("span",{className:"icon"},t.icon)," ",t.label))})))})))}}]),t}(c.Component),M=n(117),U=n.n(M),F=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).onKeydown=n.onKeydown.bind(Object(r.a)(Object(r.a)(n))),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"onKeydown",value:function(e){27===e.which&&this.props.onNo()}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeydown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeydown,!1)}},{key:"render",value:function(){var e=this.props.type?"prompt ".concat(this.props.type.toLowerCase()):"prompt";return u.a.createElement("div",{className:"clicktrap"},u.a.createElement(U.a,{handle:".prompt-header"},u.a.createElement("div",{className:e},u.a.createElement("div",{className:"prompt-header"},u.a.createElement("h1",{className:"title"},this.props.title)),u.a.createElement("div",{className:"prompt-body"},u.a.createElement("p",{className:"message"},this.props.message),u.a.createElement("p",{className:"buttons"},u.a.createElement("button",{className:"btn yes",onClick:this.props.onYes},"YES"),u.a.createElement("button",{className:"btn outline no",onClick:this.props.onNo},"NO"))))))}}]),t}(c.Component),R=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"deleteFolders",value:function(e){var t=e.map(function(e){return e.id});return t.length>0?1===t.length?b.deleteFolder(t[0]):b.bulkDeleteFolders(t):new Promise(function(e){e()})}},{key:"deleteDocuments",value:function(e){var t=e.map(function(e){return e.id});return t.length>0?1===t.length?"MY_DOCUMENTS"===this.props.view?b.deleteDocument(t[0]):b.unshareDocument(t[0]):"MY_DOCUMENTS"===this.props.view?b.bulkDeleteDocuments(t):b.bulkUnshareDocuments(t):new Promise(function(e){e()})}},{key:"executeDelete",value:function(){var e=this,t=this.props.selection.filter(function(e){return"FOLDER"===e.type}),n=this.props.selection.filter(function(e){return"DOCUMENT"===e.type});t.length+n.length>0?(this.props.onStart(),this.deleteDocuments(n).then(function(){return e.deleteFolders(t)}).then(function(){e.props.onSuccess()}).catch(function(t){e.props.onError(t)})):this.props.onCancel()}},{key:"render",value:function(){var e="MY_DOCUMENTS"===this.props.view?"You are about to permanently delete the selected documents. Are you sure?":"This will remove the selected documents from your shared documents list. Are you sure?";return d.a.createPortal(u.a.createElement(F,{title:"Delete",type:"WARNING",message:e,onNo:this.props.onCancel,onYes:this.executeDelete.bind(this)}),document.body)}}]),t}(c.Component),A=n(116),T=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"onChange",value:function(e){var t=this.props.selected,n=t.indexOf(e);n<0?t.push(e):t.splice(n,1),this.props.onChange(t)}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"authorities"},u.a.createElement("h2",null,"Authority Files"),u.a.createElement("input",{type:"checkbox",id:"use-all-authorities",checked:this.props.useAll,onChange:this.props.onToggleAll}),u.a.createElement("label",{htmlFor:"use-all-authorities"},"identify entities against all available authority files"),u.a.createElement("div",{className:"authority-list".concat(this.props.useAll?" disabled":"")},u.a.createElement("table",null,u.a.createElement("tbody",null,this.props.authorities.map(function(t){return u.a.createElement("tr",{key:t.identifier},u.a.createElement("td",null,u.a.createElement("input",{type:"checkbox",id:t.identifier,checked:e.props.selected.includes(t.identifier),onChange:e.onChange.bind(e,t.identifier)}),u.a.createElement("label",{htmlFor:t.identifier})),u.a.createElement("td",{className:"shortname"},u.a.createElement("span",{style:{backgroundColor:t.color}},t.homepage?u.a.createElement("a",{href:t.homepage,target:"_blank"},t.shortname):t.shortname)),u.a.createElement("td",{className:"fullname"},t.fullname))})))))}}]),t}(c.Component),L=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"engines"},u.a.createElement("h2",null,"Recognition Engines"),u.a.createElement("table",{cellspacing:"0"},u.a.createElement("tbody",null,this.props.engines.map(function(t){return u.a.createElement("tr",{key:t.name},u.a.createElement("td",{className:"name"},u.a.createElement("input",{id:t.identifier,type:"radio",group:"engines",checked:e.props.selected===t.identifier,onChange:e.props.onChange.bind(e,t.identifier)}),u.a.createElement("label",{htmlFor:t.identifier},u.a.createElement("span",{className:"name"},t.name))),u.a.createElement("td",{className:"languages"},t.languages.map(function(e){return u.a.createElement("span",{key:e},e)})),u.a.createElement("td",{className:"description"},t.description))}))),u.a.createElement("p",{className:"note"},"Note: different engines can provide different results and are generally optimized for a specific language."))}}]),t}(c.Component),I=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={available_engines:[],available_authorities:[],selected_engine:null,selected_all_authorities:!0,selected_authorities:[]},n.initAvailableAuthorities(),n.initAvailableEngines(),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"isInitComplete",value:function(){return this.state.available_engines.length>0&&this.state.available_authorities.length>0}},{key:"initAvailableEngines",value:function(){var e=this;0===this.state.available_engines.length&&p.a.get("/api/plugins/ner").then(function(t){var n={available_engines:t.data};e.state.selected_engine||(n.selected_engine=t.data[0]&&t.data[0].identifier),e.setState(n)})}},{key:"initAvailableAuthorities",value:function(){var e=this;p.a.get("/api/authorities/gazetteers").then(function(t){var n={available_authorities:t.data};(e.state.selected_all_authorities||!e.state.selected_all_authorities&&0===e.state.selected_authorities.length)&&(n.selected_authorities=t.data.map(function(e){return e.identifier})),e.setState(n)})}},{key:"changeEngine",value:function(e){this.setState({selected_engine:e})}},{key:"toggleAllAuthorities",value:function(){this.setState(function(e){return{selected_all_authorities:!e.selected_all_authorities}})}},{key:"changeAuthorities",value:function(e){this.setState({selected_authorities:e})}},{key:"onStart",value:function(){var e={engine:this.state.selected_engine};this.state.selected_all_authorities?e.all_authorities=!0:e.authorities=this.state.selected_authorities,this.props.onStart(e)}},{key:"render",value:function(){return u.a.createElement(A.a,{className:"ner",title:"Named Entity Recognition (NER)",onClose:this.props.onCancel},u.a.createElement("p",null,"NER identifies places and persons in your text automatically. Depending on the length of your text, this may take a while."),u.a.createElement(L,{engines:this.state.available_engines,selected:this.state.selected_engine,onChange:this.changeEngine.bind(this)}),u.a.createElement(T,{authorities:this.state.available_authorities,useAll:this.state.selected_all_authorities,selected:this.state.selected_authorities,onToggleAll:this.toggleAllAuthorities.bind(this),onChange:this.changeAuthorities.bind(this)}),u.a.createElement("div",{className:"buttons"},u.a.createElement("button",{className:"btn start",onClick:this.onStart.bind(this)},"Start NER"),u.a.createElement("button",{className:"btn outline cancel",onClick:this.props.onCancel},"Cancel")))}}]),t}(c.Component),V=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"startNER",value:function(e){var t=this.props.selection.filter(function(e){var t="DOCUMENT"===e.type,n=e.filetypes.filter(function(e){return e.startsWith("TEXT_")}).length>0;return t&&n}),n=Object.assign({task_type:"NER",documents:t.map(function(e){return e.id})},e);p.a.post("/api/task",n)}},{key:"render",value:function(){return d.a.createPortal(u.a.createElement(I,{onStart:this.startNER.bind(this),onCancel:this.props.onCancel}),document.body)}}]),t}(c.Component),K=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={action:null,menuVisible:!1},document.body.addEventListener("keydown",n.onKeydown.bind(Object(r.a)(Object(r.a)(n))),!1),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"onKeydown",value:function(e){this.props.selection.length>0&&46===e.which&&this.setState({action:"DELETE"})}},{key:"startDeleteAction",value:function(){var e=u.a.createElement(R,{view:this.props.view,selection:this.props.selection,onStart:this.props.onDelete,onSuccess:this.onDeleteSuccess.bind(this),onError:this.onDeleteError.bind(this),onCancel:this.cancelAction.bind(this)});this.setState({action:e})}},{key:"cancelAction",value:function(){this.setState({action:null})}},{key:"onDeleteSuccess",value:function(){var e=this;this.setState({action:null},function(){e.props.afterDelete()})}},{key:"onDeleteError",value:function(e){var t=this;this.setState({action:null},function(){t.props.afterDelete()})}},{key:"showActionsMenu",value:function(){this.setState({menuVisible:!0})}},{key:"onSelectMenuOption",value:function(e){this.setState({menuVisible:!1}),"NER"===e&&this.setState({action:u.a.createElement(V,{selection:this.props.selection,onCancel:this.cancelAction.bind(this)})})}},{key:"onCancelMenu",value:function(){this.setState({menuVisible:!1})}},{key:"render",value:function(){var e=this.props.selection.length>0;return u.a.createElement("div",{className:this.props.readme?"header":"header no-readme"},u.a.createElement("div",{className:"top-row"},u.a.createElement(N,null),u.a.createElement("div",{className:"header-icons"},u.a.createElement(j.a,{icon:"\ue64a",className:"help stroke7",link:"/help"}))),u.a.createElement("div",{className:"subheader"},u.a.createElement(D.a,{view:this.props.view,path:this.props.breadcrumbs,count:this.props.docCount},!this.props.readme&&"MY_DOCUMENTS"===this.props.view&&u.a.createElement("button",{className:"add-abstract nostyle",onClick:this.props.onCreateReadme},u.a.createElement("span",{className:"icon"},"\uf055"),u.a.createElement("span",{className:"label"},"Add a description..."))),u.a.createElement("div",{className:"subheader-icons"},u.a.createElement(S.CSSTransition,{in:e,timeout:500,classNames:"selection-actions"},u.a.createElement("div",{className:"selection-actions"},u.a.createElement("span",{className:"delete icon",onClick:this.startDeleteAction.bind(this)},"\uf014"),u.a.createElement("span",{className:"more icon",onClick:this.showActionsMenu.bind(this)},"\uf078"))),this.state.menuVisible&&u.a.createElement(_,{className:"selection-actions-menu",menu:[{group:"root",options:[{icon:"\uf085",label:"Named Entity Recognition",value:"NER"}]}],onSelect:this.onSelectMenuOption.bind(this),onCancel:this.onCancelMenu.bind(this)}),u.a.createElement(j.a,{className:"presentation-toggle stroke7",icon:"TABLE"===this.props.presentation?"\ue645":"\ue636",onClick:this.props.onTogglePresentation}),this.state.action)))}}]),t}(c.Component),P=n(119),W=n(124),Y=n(126),x=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={menuVisible:!1},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"onSelectMenuOption",value:function(e){"SETTINGS"===e?window.location.href="/settings/account":"SIGNOUT"===e&&(window.location.href="/logout"),window.location.href="/help"}},{key:"showMenu",value:function(){this.setState({menuVisible:!0})}},{key:"closeMenu",value:function(){this.setState({menuVisible:!1})}},{key:"render",value:function(){return u.a.createElement("div",{className:"section account",onClick:this.showMenu.bind(this)},u.a.createElement(Y.a,{account:this.props.account}),this.state.menuVisible&&u.a.createElement(_,{className:"account-menu",menu:[{group:"settings",options:[{icon:"\uf0ad",label:"Account settings",link:"/settings/account"}]},{group:"general",options:[{icon:"\uf128",label:"Help",link:"/help"},{icon:"\uf011",label:"Sign out",link:"/logout"}]}],onSelect:this.onSelectMenuOption.bind(this),onCancel:this.closeMenu.bind(this)}))}}]),t}(c.Component),q=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={menuVisible:!1},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"onShowOptions",value:function(){this.setState({menuVisible:!0})}},{key:"onSelectOption",value:function(e){var t=this;if(this.setState({menuVisible:!1}),"FOLDER"===e){var n=document.location.hash.substring(1);b.createFolder("Unnamed Folder",n).then(function(){return t.props.onFolderCreated()})}else"FILE"===e&&this._input.click()}},{key:"onUploadFiles",value:function(e){var t=Array.from(e.target.files);this.props.onUploadFiles(t)}},{key:"onCancel",value:function(){this.setState({menuVisible:!1})}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"section create-new"},u.a.createElement("button",{className:"btn create-new",onClick:this.onShowOptions.bind(this)},u.a.createElement("span",{className:"icon"},"\uf067"),u.a.createElement("span",{className:"label"},"New")),u.a.createElement("input",{ref:function(t){return e._input=t},type:"file",name:"file",multiple:!0,onChange:this.onUploadFiles.bind(this),style:{display:"none"}}),this.state.menuVisible&&u.a.createElement(_,{className:"create-new",menu:[{group:"local",options:[{icon:"\uf07b",label:"Folder",value:"FOLDER"},{icon:"\uf15b",label:"File upload",value:"FILE"}]},{group:"remote",options:[{icon:"\uf0c1",label:"From IIIF manifest",value:"IIIF",disabled:!0},{icon:"\uf121",label:"From CTS service",value:"CTS",disabled:!0}]}],onSelect:this.onSelectOption.bind(this),onCancel:this.onCancel.bind(this)}))}}]),t}(c.Component),B=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return u.a.createElement("li",{className:this.props.current?"current":null,onClick:this.props.onClick},u.a.createElement("span",{className:"icon"},this.props.icon)," ",this.props.children)}}]),t}(c.Component),z=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return u.a.createElement("div",{className:"section views"},u.a.createElement("ul",null,u.a.createElement(B,{icon:"\uf2be",current:"MY_DOCUMENTS"===this.props.currentView,onClick:this.props.onChangeView.bind(this,"MY_DOCUMENTS")},"My Documents"),u.a.createElement(B,{icon:"\uf064",current:"SHARED_WITH_ME"===this.props.currentView,onClick:this.props.onChangeView.bind(this,"SHARED_WITH_ME")},"Shared with me")))}}]),t}(c.Component),H=n(63),X=n.n(H),G=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.account&&this.props.account.storage,t=e?this.props.account.storage.quota_mb:0,n=e?this.props.account.storage.used_mb:0;return u.a.createElement("div",{className:"section storage"},u.a.createElement("span",{className:"icon"},"\uf1c0")," Storage",u.a.createElement("div",{className:"used-diskspace"},u.a.createElement(O,{value:t>0?n/t:0}),u.a.createElement("div",{className:"label"},u.a.createElement(X.a,{displayType:"text",value:n,thousandSeparator:!0})," of  ",u.a.createElement(X.a,{displayType:"text",value:t,thousandSeparator:!0})," MB used")))}}]),t}(c.Component),J=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={collaborators:[]},n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return u.a.createElement("div",{className:"sidebar"},u.a.createElement(x,{account:this.props.account}),u.a.createElement(q,{onFolderCreated:this.props.onFolderCreated,onUploadFiles:this.props.onUploadFiles}),u.a.createElement(z,{account:this.props.account,currentView:this.props.currentView,onChangeView:this.props.onChangeView}),u.a.createElement(G,{account:this.props.account}),u.a.createElement(P.a,{className:"section",width:237,height:55,fill:"#4483c4",stats:this.props.account&&this.props.account.stats}),u.a.createElement(W.a,{className:"section collaborators",title:"My top collaborators",username:this.props.account&&this.props.account.username}))}}]),t}(c.Component);n(550);n.d(t,"default",function(){return Q});var Q=function(e){function t(e){var n;Object(a.a)(this,t),n=Object(i.a)(this,Object(o.a)(t).call(this,e));var s={account:null,view:"MY_DOCUMENTS",breadcrumbs:[],presentation:"TABLE",table_columns:["author","title","language","date_freeform","uploaded_at","last_edit_at"],table_sorting:null,busy:!1,folders:[],documents:[],total_docs:null,readme:null,selection:[],fileUploads:[],urlUpload:null};return Object.assign(s,k.a.load()),n.state=s,n._root=document.getElementById("app"),n.onKeydown=n.onKeydown.bind(Object(r.a)(Object(r.a)(n))),n.onMousedown=n.onMousedown.bind(Object(r.a)(Object(r.a)(n))),window.onhashchange=n.changeFolder.bind(Object(r.a)(Object(r.a)(n))),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"onKeydown",value:function(e){27===e.which&&this.setState({selection:[]})}},{key:"onMousedown",value:function(e){!(document.querySelector(".documents-pane").contains(e.target)||document.querySelector(".subheader-icons").contains(e.target))&&this.setState({selection:[]})}},{key:"componentDidMount",value:function(){this._root.addEventListener("keydown",this.onKeydown,!1),this._root.addEventListener("mousedown",this.onMousedown,!1),this.fetchAccountData(),this.refreshCurrentView()}},{key:"componentWillUnmount",value:function(){this._root.removeEventListener("keydown",this.onKeydown,!1),this._root.removeEventListener("mousedown",this.onMousedown,!1)}},{key:"getDisplayConfig",value:function(){if("GRID"!==this.state.presentation)return{columns:g.b.expandAggregatedColumns(this.state.table_columns),sort:this.state.table_sorting}}},{key:"fetchAccountData",value:function(){var e=this;return b.accountData().then(function(t){e.setState({account:t.data})})}},{key:"fetchMyDocuments",value:function(){var e=this;this.setState({busy:!0});var t=document.location.hash.substring(1);return b.myDocuments(this.getDisplayConfig(),t).then(function(t){e.setState({breadcrumbs:t.data.breadcrumbs,readme:t.data.readme,documents:t.data.items,total_docs:t.data.total,busy:!1})})}},{key:"fetchSharedWithMe",value:function(){var e=this;return this.setState({busy:!0}),b.sharedWithMe(this.getDisplayConfig()).then(function(t){e.setState({breadcrumbs:[],documents:t.data.items,total_docs:t.data.total,busy:!1})})}},{key:"changeView",value:function(e){var t=this;this.state.view!==e&&(k.a.save("view",e),this.setState({view:e,documents:[]},function(){"MY_DOCUMENTS"===e?t.fetchMyDocuments():t.fetchSharedWithMe()}))}},{key:"refreshCurrentView",value:function(){return"MY_DOCUMENTS"===this.state.view?this.fetchMyDocuments():this.fetchSharedWithMe()}},{key:"changeFolder",value:function(){this.setState({selection:[]}),this.refreshCurrentView()}},{key:"togglePresentation",value:function(){this.setState(function(e){var t="TABLE"===e.presentation?"GRID":"TABLE";return k.a.save("presentation",t),{presentation:t}})}},{key:"onChangeColumnPrefs",value:function(e){var t=this;k.a.save("table_columns",e),this.setState({table_columns:e},function(){t.refreshCurrentView()})}},{key:"onSortTable",value:function(e){var t=this;k.a.save("table_sorting",e),this.setState({table_sorting:e},function(){t.refreshCurrentView()})}},{key:"onSelect",value:function(e){this.setState({selection:e})}},{key:"onRenameFolder",value:function(e,t){var n=this;b.renameFolder(e.id,t).then(function(){return n.refreshCurrentView()})}},{key:"createReadme",value:function(){this.setState({readme:!0})}},{key:"onUpdateReadme",value:function(e){var t=document.location.hash.substring(1);b.updateReadme(e,t).then(this.setState({readme:e}))}},{key:"onDeleteReadme",value:function(){var e=document.location.hash.substring(1);b.deleteReadme(e).then(this.setState({readme:null}))}},{key:"startUpload",value:function(e){this.setState({fileUploads:e,urlUpload:null})}},{key:"startRegisterRemoteSource",value:function(e){this.setState({fileUploads:[],urlUpload:e})}},{key:"onUploadComplete",value:function(){var e=this;this.setState({view:"MY_DOCUMENTS",fileUploads:[],urlUpload:null},function(){e.refreshCurrentView().then(e.fetchAccountData.bind(e))})}},{key:"setBusy",value:function(e){this.setState({busy:e})}},{key:"afterDelete",value:function(){var e=this;this.refreshCurrentView().then(function(){return e.setState({busy:!1,selection:[]})}).then(this.fetchAccountData.bind(this))}},{key:"render",value:function(){var e=this.state.fileUploads.length>0||this.state.urlUpload;return u.a.createElement(u.a.Fragment,null,u.a.createElement(J,{account:this.state.account,onFolderCreated:this.refreshCurrentView.bind(this),onUploadFiles:this.startUpload.bind(this),currentView:this.state.view,onChangeView:this.changeView.bind(this)}),u.a.createElement("div",{className:"container"},u.a.createElement(K,{view:this.state.view,breadcrumbs:this.state.breadcrumbs,readme:this.state.readme,docCount:this.state.total_docs,selection:this.state.selection,presentation:this.state.presentation,onDelete:this.setBusy.bind(this,!0),afterDelete:this.afterDelete.bind(this),onTogglePresentation:this.togglePresentation.bind(this),onCreateReadme:this.createReadme.bind(this)}),"TABLE"===this.state.presentation?u.a.createElement(E.a,{view:this.state.view,folders:this.state.folders,documents:this.state.documents,columns:this.state.table_columns,sorting:this.state.table_sorting,busy:this.state.busy,selection:this.state.selection,disableFiledrop:"MY_DOCUMENTS"!==this.state.view,onSort:this.onSortTable.bind(this),onSelect:this.onSelect.bind(this),onDropFiles:this.startUpload.bind(this),onDropURL:this.startRegisterRemoteSource.bind(this),onChangeColumnPrefs:this.onChangeColumnPrefs.bind(this),onRenameFolder:this.onRenameFolder.bind(this)},this.state.readme&&u.a.createElement(y.a,{content:this.state.readme,onUpdate:this.onUpdateReadme.bind(this),onDelete:this.onDeleteReadme.bind(this)})):u.a.createElement(v.a,{folders:this.state.folders,documents:this.state.documents,busy:this.state.busy,selection:this.state.selection,onSelect:this.onSelect.bind(this),disableFiledrop:"MY_DOCUMENTS"!==this.state.view,onDropFiles:this.startUpload.bind(this),onDropURL:this.startRegisterRemoteSource.bind(this)},this.state.readme&&u.a.createElement(y.a,{content:this.state.readme,onUpdate:this.onUpdateReadme.bind(this),onDelete:this.onDeleteReadme.bind(this)}))),e&&u.a.createElement(w,{files:this.state.fileUploads,url:this.state.urlUpload,onUploadComplete:this.onUploadComplete.bind(this)}))}}]),t}(c.Component);Object(h.render)(u.a.createElement(Q,null),document.getElementById("app"))}},[[256,4,0,1]]]);
//# sourceMappingURL=workspace.96f85524.chunk.js.map